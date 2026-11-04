export interface TVEpisodeInfo {
  showName: string;
  episodeName: string;
  season: number;
  number: number;
  summary: string;
  airdate?: string;
  imageUrl?: string;
}

/**
 * Parsea cadenas como:
 * - "Temporada 4, episodio 2"
 * - "Temporada 4 Episodio 2"
 * - "T4 E2" o "T4E2"
 * - "4x02" o "S04E02"
 * - "Season 4 Episode 2"
 * - "Temporada 2, capítulo 1"
 */
export function parseSeasonAndEpisode(text: string): { season: number; episode: number } | null {
  if (!text) return null;
  const norm = text.toLowerCase().trim();

  // Formato compacto: s04e02, 4x02, s4e2
  const compactMatch = norm.match(/s?(\d+)[xe](\d+)/i);
  if (compactMatch) {
    return {
      season: parseInt(compactMatch[1], 10),
      episode: parseInt(compactMatch[2], 10)
    };
  }

  // Formato con palabras: temporada 4, episodio 2 / season 4 episode 2 / cap 2
  const sMatch = norm.match(/(?:temporada|season|temp|t)\s*[:#]?\s*(\d+)/i);
  const eMatch = norm.match(/(?:episodio|episodi|capitulo|capítulo|episode|ep|cap|e)\s*[:#]?\s*(\d+)/i);

  if (sMatch && eMatch) {
    return {
      season: parseInt(sMatch[1], 10),
      episode: parseInt(eMatch[1], 10)
    };
  }

  // Si solo dice temporada (ej. "Temporada 2"), asumir episodio 1
  if (sMatch && !eMatch) {
    return {
      season: parseInt(sMatch[1], 10),
      episode: 1
    };
  }

  // Si solo dice episodio (ej. "Episodio 3"), asumir temporada 1
  if (!sMatch && eMatch) {
    return {
      season: 1,
      episode: parseInt(eMatch[1], 10)
    };
  }

  return null;
}

/**
 * Limpia el título quitando etiquetas adicionales entre paréntesis o palabras clave
 * ej. "The Gentlemen (Serie de Netflix)" -> "The Gentlemen"
 */
export function cleanShowTitle(title: string): string {
  return title
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/\b(?:serie|series|netflix|amazon|prime|hbo|max|apple\s*tv|disney\+?)\b/gi, '')
    .trim();
}

/**
 * Busca en tiempo real en la API pública de TVMaze (sin API key, CORS permitido)
 * la información oficial, nombre y sinopsis del episodio consultado.
 */
export async function fetchOnlineEpisodeData(
  showTitle: string,
  episodeStr: string
): Promise<TVEpisodeInfo | null> {
  try {
    const target = parseSeasonAndEpisode(episodeStr);
    const cleanTitle = cleanShowTitle(showTitle);
    if (!cleanTitle) return null;

    // 1. Buscar el show en TVMaze
    const searchRes = await fetch(
      `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(cleanTitle)}`
    );
    if (!searchRes.ok) return null;

    const searchData: Array<{ show: { id: number; name: string; image?: { medium?: string } } }> =
      await searchRes.json();
    if (!searchData || searchData.length === 0) return null;

    // Priorizar coincidencia exacta de nombre o tomar el primer resultado
    const exactMatch = searchData.find(
      (item) => item.show.name.toLowerCase() === cleanTitle.toLowerCase()
    );
    const show = exactMatch ? exactMatch.show : searchData[0].show;

    // 2. Obtener lista completa de episodios del show
    const epsRes = await fetch(`https://api.tvmaze.com/shows/${show.id}/episodes`);
    if (!epsRes.ok) return null;

    const eps: Array<{
      id: number;
      name: string;
      season: number;
      number: number;
      summary?: string;
      airdate?: string;
      image?: { medium?: string; original?: string };
    }> = await epsRes.json();

    if (!Array.isArray(eps) || eps.length === 0) return null;

    // 3. Buscar el episodio concreto
    let found = target
      ? eps.find((e) => e.season === target.season && e.number === target.episode)
      : null;

    // Si no encontró por season y number exactos, probar si target era solo temporada
    if (!found && target) {
      found = eps.find((e) => e.season === target.season) || null;
    }

    if (!found) return null;

    // Limpiar etiquetas HTML de la sinopsis (<p>, <br>, etc.)
    const cleanSummary = (found.summary || '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return {
      showName: show.name,
      episodeName: found.name || `Episodio ${found.number}`,
      season: found.season,
      number: found.number,
      summary: cleanSummary || `Episodio ${found.number} de la temporada ${found.season} de ${show.name}.`,
      airdate: found.airdate,
      imageUrl: found.image?.medium || show.image?.medium
    };
  } catch (err) {
    console.warn('No se pudo consultar TVMaze en vivo:', err);
    return null;
  }
}
