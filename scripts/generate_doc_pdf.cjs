const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>UK Street English (antes EngDrill Pro) — Arquitectura, Diseño y Código v6.0</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 18mm 16mm 20mm 16mm;
      @bottom-right {
        content: "Pág. " counter(page);
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 8.5pt;
        font-weight: 600;
        color: #525866;
      }
      @bottom-left {
        content: "UK Street English (v6.0 · Noviembre 2026) — Memoria Técnica y Pedagógica";
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 8.2pt;
        color: #666d7d;
      }
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      color: #12151c;
      background: #ffffff;
      line-height: 1.54;
      font-size: 9.8pt;
      margin: 0;
      padding: 0;
    }

    .cover-page {
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 94vh;
      padding: 28px 6px 16px 6px;
    }

    .brand-row {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 18px;
    }

    .badge {
      display: inline-block;
      padding: 4px 11px;
      font-size: 8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      border-radius: 6px;
      background: #edf3fc;
      border: 1px solid #bfd0ec;
      color: #12397a;
    }

    .badge-pine {
      background: #ecf8f2;
      border-color: #b3dfc8;
      color: #0e6b47;
    }

    .badge-brass {
      background: #fef8e7;
      border-color: #eedaa1;
      color: #9a5d07;
    }

    .cover-title {
      font-size: 29pt;
      font-weight: 800;
      color: #12151c;
      line-height: 1.1;
      margin: 0 0 8px 0;
      letter-spacing: -0.025em;
    }

    .cover-formerly {
      font-size: 10.5pt;
      font-weight: 600;
      color: #12397a;
      margin-bottom: 10px;
    }

    .cover-subtitle {
      font-size: 12.5pt;
      color: #525866;
      margin: 0 0 22px 0;
      font-weight: 400;
      line-height: 1.42;
    }

    .cover-highlights {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 20px;
    }

    .highlight-card {
      background: #f5f6f4;
      border: 1px solid #dcdfd8;
      border-radius: 10px;
      padding: 14px;
      page-break-inside: avoid;
    }

    .highlight-card h4 {
      margin: 0 0 5px 0;
      font-size: 10pt;
      color: #12151c;
    }

    .highlight-card p {
      margin: 0;
      font-size: 8.5pt;
      color: #525866;
      line-height: 1.42;
      text-align: left;
    }

    .cover-stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-top: 16px;
    }

    .stat-pill {
      background: #ffffff;
      border: 1px solid #dcdfd8;
      border-top: 3px solid #12397a;
      border-radius: 8px;
      padding: 10px 8px;
      text-align: center;
    }

    .stat-pill strong {
      display: block;
      font-size: 15pt;
      color: #12397a;
      line-height: 1.1;
    }

    .stat-pill span {
      font-size: 7.8pt;
      color: #525866;
    }

    .cover-footer {
      border-top: 2px solid #dcdfd8;
      padding-top: 14px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 8.3pt;
      color: #525866;
    }

    h1, h2, h3, h4 {
      color: #12151c;
      font-weight: 700;
      page-break-after: avoid;
    }

    h2 {
      font-size: 14.5pt;
      border-bottom: 2px solid #dcdfd8;
      padding-bottom: 5px;
      margin-top: 16px;
      margin-bottom: 9px;
      letter-spacing: -0.015em;
    }

    h2 .sec-num {
      color: #12397a;
      margin-right: 4px;
    }

    h3 {
      font-size: 10.8pt;
      margin-top: 12px;
      margin-bottom: 5px;
      color: #12397a;
    }

    p {
      margin-top: 0;
      margin-bottom: 8px;
      text-align: justify;
    }

    .page-break {
      page-break-before: always;
    }

    .no-break {
      page-break-inside: avoid;
    }

    .callout {
      border-left: 4px solid #12397a;
      background: #edf3fc;
      padding: 11px 14px;
      border-radius: 0 8px 8px 0;
      margin: 12px 0;
      font-size: 9.1pt;
      page-break-inside: avoid;
    }

    .callout-success {
      border-left-color: #0e6b47;
      background: #ecf8f2;
    }

    .callout-warning {
      border-left-color: #9a5d07;
      background: #fef8e7;
    }

    .callout-danger {
      border-left-color: #b91c2e;
      background: #fdf2f3;
    }

    .callout-title {
      font-weight: 700;
      margin-bottom: 4px;
      color: #12151c;
      display: block;
    }

    code {
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 8.2pt;
      background: #eceee9;
      color: #12151c;
      padding: 1.5px 4.5px;
      border-radius: 4px;
      border: 1px solid #dcdfd8;
    }

    pre {
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 7.7pt;
      background: #14181f;
      color: #f5f6f4;
      padding: 10px 12px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 8px 0 12px 0;
      line-height: 1.42;
      page-break-inside: avoid;
      white-space: pre-wrap;
    }

    pre .comment { color: #94a3b8; font-style: italic; }
    pre .keyword { color: #93c5fd; font-weight: bold; }
    pre .string { color: #86efac; }
    pre .func { color: #fcd34d; }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0 14px 0;
      font-size: 8.3pt;
      page-break-inside: avoid;
    }

    th, td {
      border: 1px solid #c2c7bd;
      padding: 7px 9px;
      text-align: left;
      vertical-align: top;
    }

    th {
      background: #eceee9;
      color: #12151c;
      font-weight: 700;
    }

    tr:nth-child(even) {
      background: #f5f6f4;
    }

    .diagram-box {
      background: #f5f6f4;
      border: 1.5px solid #c2c7bd;
      border-radius: 10px;
      padding: 14px;
      margin: 12px 0;
      text-align: center;
      page-break-inside: avoid;
    }

    .flow-step {
      display: inline-block;
      background: #ffffff;
      border: 1px solid #c2c7bd;
      border-radius: 8px;
      padding: 7px 10px;
      margin: 3px;
      font-size: 8.1pt;
      font-weight: 600;
      color: #12151c;
      vertical-align: middle;
    }

    .flow-arrow {
      display: inline-block;
      color: #12397a;
      font-weight: 900;
      font-size: 10.5pt;
      margin: 0 3px;
      vertical-align: middle;
    }

    ul, ol {
      margin-top: 0;
      margin-bottom: 10px;
      padding-left: 19px;
    }

    li {
      margin-bottom: 4px;
    }

    .toc {
      background: #f5f6f4;
      border: 1px solid #dcdfd8;
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 18px;
      page-break-inside: avoid;
    }

    .toc-item {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dotted #c2c7bd;
      padding: 5px 0;
      font-size: 8.8pt;
    }

    .toc-item a {
      text-decoration: none;
      color: #12151c;
      font-weight: 600;
    }

    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      page-break-inside: avoid;
    }

    .swatch-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin: 10px 0 14px 0;
      page-break-inside: avoid;
    }

    .swatch {
      border: 1px solid #c2c7bd;
      border-radius: 8px;
      overflow: hidden;
      background: #ffffff;
      font-size: 7.8pt;
    }

    .swatch-color {
      height: 22px;
    }

    .swatch-meta {
      padding: 6px 7px;
    }
  </style>
</head>
<body>

  <!-- ==================== PORTADA ==================== -->
  <div class="cover-page">
    <div>
      <div class="brand-row">
        <svg width="46" height="46" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="40" height="40" rx="10" fill="#0F2747"/>
          <circle cx="20" cy="20" r="11" stroke="#C8102E" stroke-width="3.6" fill="#F7F7F5"/>
          <rect x="4" y="16.5" width="32" height="7" rx="2" fill="#12397A"/>
          <path d="M11.5 18.2V20.5C11.5 21.1 11.9 21.5 12.5 21.5C13.1 21.5 13.5 21.1 13.5 20.5V18.2M15.8 18.2V21.8M15.8 20L17.9 18.2M16.6 19.4L18.1 21.8M22.2 18.2V21.8M24.2 18.2H26.4M24.2 20H26M24.2 21.8H26.4M27.7 21.8V18.2L29.9 21.8V18.2" stroke="#FFFFFF" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div>
          <span class="badge">Memoria Técnica Oficial · Release v6.0</span>
          <span class="badge badge-pine" style="margin-left:4px;">TVMaze Live + London Press UI</span>
        </div>
      </div>

      <h1 class="cover-title">UK Street English</h1>
      <div class="cover-formerly">Antes EngDrill Pro — Evolución a Plataforma Gamificada de Inglés Real Británico</div>
      <div class="cover-subtitle">
        Manual completo de arquitectura <em>client-side first</em>, sistema visual editorial <strong>"London Press &amp; Underground"</strong>, integración en tiempo real con <strong>TVMaze</strong>, enrutador Multi-LLM para 5 proveedores de IA y metodología de fijación muscular <code>0/2</code>.
      </div>

      <p style="font-size: 9.8pt; color: #525866; line-height: 1.55;">
        Este documento detalla de forma técnica y práctica cómo funciona <strong>UK Street English</strong> de principio a fin: desde la progresión gamificada por barrios de Londres (Quids, XP y Jefes Finales) y el simulador de WhatsApp británico hasta las APIs nativas del navegador (<code>&lt;dialog showModal()&gt;</code>, <code>popover="auto"</code>, <code>View Transitions</code>, <code>SpeechSynthesis en-GB</code>), la consulta en vivo a TVMaze para temporadas estrenadas recientemente y el Service Worker offline <code>uk-street-v20</code>.
      </p>

      <div class="cover-highlights">
        <div class="highlight-card">
          <h4>1. TVMaze API en Tiempo Real</h4>
          <p>Antes de invocar al modelo IA en <strong>Series IA</strong>, consulta <code>api.tvmaze.com</code> para extraer la sinopsis oficial exacta de temporadas recientes (ej. <em>The Gentlemen T2</em> o <em>Reacher T4</em>) y bloquea negativas por desactualización.</p>
        </div>
        <div class="highlight-card">
          <h4>2. Rediseño "London Press &amp; Web Nativa"</h4>
          <p>Estética editorial británica sobre papel neutro <code>#F5F6F4</code>, emblema Roundel propio (<code>BrandMark</code>), tipografías <em>Bricolage Grotesque</em> y <em>Onest</em>, barra móvil de 5 ítems con Popover nativo y diálogos accesibles.</p>
        </div>
        <div class="highlight-card">
          <h4>3. Router Multi-LLM (5 Proveedores)</h4>
          <p>Auto-detección transparente por prefijo de API key entre <strong>Groq</strong> (<code>gsk_</code>), <strong>Google Gemini</strong> (<code>AIza</code>), <strong>xAI Grok</strong> (<code>xai-</code>), <strong>OpenRouter</strong> (<code>sk-or-</code>) y <strong>OpenAI</strong> (<code>sk-</code>) con auto-descubrimiento anti-404.</p>
        </div>
        <div class="highlight-card">
          <h4>4. Fijación Muscular (0/2) y Coste 0 €</h4>
          <p>Regla obligatoria de reescribir 2 veces toda estructura fallada, tolerancia Levenshtein en ortografía menor, fonética escrita en español (<code>[uént]</code>), voz <code>en-GB</code> local y PWA <code>uk-street-v20</code> en GitHub Pages.</p>
        </div>
      </div>

      <div class="cover-stats">
        <div class="stat-pill"><strong>600+</strong><span>Ítems curados + lotes IA</span></div>
        <div class="stat-pill"><strong>19</strong><span>Componentes React 19</span></div>
        <div class="stat-pill"><strong>5 + TV</strong><span>APIs IA + TVMaze en vivo</span></div>
        <div class="stat-pill"><strong>0 €/mes</strong><span>Servidor &amp; Hosting PWA</span></div>
      </div>
    </div>

    <div class="cover-footer">
      <div>
        <strong>Repositorio Oficial:</strong> github.com/adrianSG25/aprende-en<br>
        <strong>App en Vivo:</strong> https://adriansg25.github.io/aprende-en/<br>
        <strong>Presentación 3D:</strong> https://adriansg25.github.io/aprende-en/presentacion/<br>
        <strong>Stack:</strong> React 19, TypeScript, Vite, Tailwind CSS v4, PWA v20
      </div>
      <div style="text-align: right;">
        <strong>Versión:</strong> 6.0.0 (London Press &amp; TVMaze)<br>
        <strong>Fecha:</strong> Noviembre 2026<br>
        <strong>Archivo Cache SW:</strong> <code>uk-street-v20</code><br>
        <strong>Estado:</strong> Producción Activa
      </div>
    </div>
  </div>

  <!-- ==================== ÍNDICE ==================== -->
  <h2><span class="sec-num">00.</span> Tabla de Contenidos</h2>
  <div class="toc">
    <div class="toc-item"><a href="#sec-1">1. Evolución Pedagógica: De EngDrill Pro a UK Street English</a> <span>Pág. 2</span></div>
    <div class="toc-item"><a href="#sec-2">2. Sistema Visual "London Press &amp; Underground" y Web APIs Nativas</a> <span>Pág. 3</span></div>
    <div class="toc-item"><a href="#sec-3">3. Arquitectura Global Client-Side First y Tolerancia No Pedante</a> <span>Pág. 4</span></div>
    <div class="toc-item"><a href="#sec-4">4. Niveles por Distritos, WhatsApp UK y Diccionario de Campo</a> <span>Pág. 5</span></div>
    <div class="toc-item"><a href="#sec-5">5. Módulo Series, Cine y Libros + API TVMaze en Tiempo Real</a> <span>Pág. 6</span></div>
    <div class="toc-item"><a href="#sec-6">6. Lecturas con Rayos X Gramaticales y Regla Muscular 0/2</a> <span>Pág. 7</span></div>
    <div class="toc-item"><a href="#sec-7">7. Motor Multi-LLM Serverless, Generador Infinito y SRS</a> <span>Pág. 8</span></div>
    <div class="toc-item"><a href="#sec-8">8. Inventario Completo del Código Fuente (src/ y public/)</a> <span>Pág. 9</span></div>
    <div class="toc-item"><a href="#sec-9">9. Presentación Interactiva 3D, PWA v20 y GitHub Pages</a> <span>Pág. 10</span></div>
    <div class="toc-item"><a href="#sec-10">10. El Pitch de 2 Minutos y Preguntas Frecuentes</a> <span>Pág. 11</span></div>
  </div>

  <!-- ==================== SECCIÓN 1 ==================== -->
  <h2 id="sec-1"><span class="sec-num">01.</span> Evolución Pedagógica: De EngDrill Pro a UK Street English</h2>
  <p>
    La versión inicial del proyecto nació como <strong>EngDrill Pro</strong>: un entrenador intensivo de gramática y transformación de frases enfocado a consolidar niveles <strong>A2+ a B2+</strong> sin audios lentos ni tests infantiles. Sin embargo, al someter la aplicación a uso real por parte del usuario final, surgieron necesidades concretas que guiaron su transformación completa hacia <strong>UK Street English</strong>:
  </p>
  <ul>
    <li><strong>Inglés real de la calle frente a frases de libro:</strong> Nadie saluda en un pub de Camden diciendo <em>"How do you do, sir?"</em> ni compra una entrada escribiendo como una enciclopedia. Se sustituyó la jerga artificial de acrónimos por expresiones reales británicas (<code>quid</code>, <code>innit</code>, <code>sorted</code>, <code>dodgy</code>, <code>fancy a pint</code>, <code>cheers mate</code>).</li>
    <li><strong>Producción escrita activa sobre opciones obvias:</strong> Las respuestas tipo test con dos opciones evidentes provocan una falsa ilusión de dominio. En los módulos de calle, diccionario, lecturas y series, el usuario escribe de su puño y letra la frase o traducción.</li>
    <li><strong>Síntesis de voz británica (<code>en-GB</code>) opcional y directa:</strong> Aunque el enfoque rechaza diálogos pasivos eternos, se integró la <code>Web Speech API</code> nativa del navegador en acento británico (sin latencia ni APIs externas) junto a <strong>transcripciones fonéticas en español</strong> (ej. <code>went</code> = <code>[uént]</code>, <code>knowledge</code> = <code>[nó-ledzh]</code>).</li>
    <li><strong>Progresión tipo videojuego con bloqueos reales:</strong> Para evitar saltar de tema sin asimilar bases, se estructuró una ruta de <strong>3 distritos londinenses</strong> con ganancia de <strong>XP</strong>, monedas <strong>Quids</strong> y combates finales de jefe (<code>StreetBossFight</code>).</li>
  </ul>

  <div class="callout callout-success">
    <span class="callout-title">Principio Rector Actualizado</span>
    Entrenar en el móvil durante 10 minutos al día enfrentándote a mensajes reales de WhatsApp, sinopsis vivas de tu serie actual y corrección inmediata de tus errores hasta fijar la estructura correcta en memoria motora.
  </div>

  <!-- ==================== SECCIÓN 2 ==================== -->
  <div class="page-break"></div>
  <h2 id="sec-2"><span class="sec-num">02.</span> Sistema Visual "London Press &amp; Underground" y Web APIs Nativas</h2>
  <p>
    En versiones anteriores la interfaz abusaba de tarjetas moradas estándar de plantilla IA y saturaba la barra móvil inferior con 7 botones apretujados. En la Release v6.0 se ejecutó un rediseño integral bajo el sistema visual <strong>"London Press &amp; Underground"</strong> (definido en <code>src/index.css</code> e <code>index.html</code>), eliminando CSS heredado innecesario y adoptando primitivas web modernas:
  </p>

  <div class="swatch-grid" style="margin: 8px 0 10px 0;">
    <div class="swatch">
      <div class="swatch-color" style="background:#f5f6f4; border-bottom:1px solid #dcdfd8;"></div>
      <div class="swatch-meta"><strong>Papel Neutro</strong><br><code>#F5F6F4</code> · Fondo base</div>
    </div>
    <div class="swatch">
      <div class="swatch-color" style="background:#12397a;"></div>
      <div class="swatch-meta"><strong>Cobalto Oxford</strong><br><code>#12397A</code> · Acción primaria</div>
    </div>
    <div class="swatch">
      <div class="swatch-color" style="background:#0e6b47;"></div>
      <div class="swatch-meta"><strong>Verde Libra</strong><br><code>#0E6B47</code> · Acierto / TVMaze</div>
    </div>
    <div class="swatch">
      <div class="swatch-color" style="background:#b91c2e;"></div>
      <div class="swatch-meta"><strong>Carmín Bus</strong><br><code>#B91C2E</code> · Roundel / Alerta</div>
    </div>
  </div>

  <h3>Tipografía, Identidad y Ergonomía Táctil</h3>
  <ul style="margin-bottom: 8px;">
    <li><strong>Sistema tipográfico:</strong> Títulos con <code>Bricolage Grotesque</code> (<code>text-wrap: balance</code>), cuerpo en <code>Onest</code> y etiquetas/XP en <code>JetBrains Mono</code> con <code>tabular-nums</code>.</li>
    <li><strong>Emblema vectorial propio (<code>BrandMark.tsx</code>):</strong> Roundel londinense en SVG (<code>#C8102E</code> / <code>#12397A</code>) compartido con <code>public/icon.svg</code> y <code>public/favicon.svg</code>.</li>
    <li><strong>Sin bloqueo de zoom y confort en iOS:</strong> Eliminado <code>maximum-scale=1</code>; objetivos táctiles de 48 px en móvil e inputs a <code>16px</code> mínimos para evitar el auto-zoom en Safari.</li>
  </ul>

  <h3>Modernización con Estándares Web Nativos</h3>
  <table class="no-break" style="margin: 6px 0 8px 0; font-size: 8pt;">
    <thead>
      <tr>
        <th style="width: 24%;">Capacidad Web</th>
        <th style="width: 31%;">Implementación en Código</th>
        <th style="width: 45%;">Beneficio Técnico y de UX</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Native Modal Dialog</strong></td>
        <td><code>src/components/NativeDialog.tsx</code></td>
        <td><code>&lt;dialog showModal()&gt;</code> en <em>top-layer</em>: fondo <code>inert</code> nativo, cierre <code>Esc</code>, <code>closedby="any"</code> y fallback por bounding rect en Safari.</td>
      </tr>
      <tr>
        <td><strong>Popover API Móvil</strong></td>
        <td><code>popover="auto"</code> + <code>#mobile-more-nav</code></td>
        <td>Reduce la barra inferior móvil de 7 pestañas a <strong>5 controles amplios</strong> (Niveles, Vocab, Series IA, Machaque y <strong>Más</strong>) con <em>light-dismiss</em> nativo.</td>
      </tr>
      <tr>
        <td><strong>View Transitions API</strong></td>
        <td><code>runViewTransition()</code> (<code>viewTransition.ts</code>)</td>
        <td>Transiciones suaves entre vistas vía <code>document.startViewTransition</code> + <code>flushSync</code>, respetando <code>prefers-reduced-motion</code> y foco en <code>#main-content</code>.</td>
      </tr>
    </tbody>
  </table>

  <pre style="margin: 6px 0 0 0; padding: 8px 10px; font-size: 7.4pt; line-height: 1.35;"><span class="comment">// NativeDialog.tsx: cierre exterior por coordenadas compatible con Safari</span>
&lt;<span class="keyword">dialog</span> ref={dialogRef} aria-labelledby={labelledBy} {...(lightDismiss ? { closedby: <span class="string">'any'</span> } : {})}
  onPointerDown={(e) =&gt; { pointerDownTargetOutside.current = e.target === dialogRef.current &amp;&amp; <span class="func">isOutsideRect</span>(dialogRef.current, e.clientX, e.clientY); }}
  onPointerUp={(e) =&gt; { <span class="keyword">if</span> (pointerDownTargetOutside.current &amp;&amp; <span class="func">isOutsideRect</span>(dialogRef.current, e.clientX, e.clientY)) <span class="func">onClose</span>(); }} /&gt;</pre>

  <!-- ==================== SECCIÓN 3 ==================== -->
  <div class="page-break"></div>
  <h2 id="sec-3"><span class="sec-num">03.</span> Arquitectura Global Client-Side First y Tolerancia No Pedante</h2>
  <p>
    La aplicación mantiene una arquitectura estrictamente <strong>Client-Side &amp; Serverless</strong> en React 19, TypeScript y Tailwind CSS v4. Esto significa que no existe ningún backend intermedio ni base de datos central que mantener: cada alumno ejecuta el motor de aprendizaje localmente y solo se conecta al exterior bajo demanda hacia la API gratuita de <strong>TVMaze</strong> o hacia el proveedor de IA elegido con su propia clave.
  </p>

  <div class="diagram-box">
    <div style="font-size: 8.3pt; font-weight: 700; color: #525866; margin-bottom: 8px;">FLUJO DE DATOS CLIENT-SIDE Y CONEXIONES EN TIEMPO REAL</div>
    <div>
      <div class="flow-step" style="border-top: 3px solid #12397a;">
        <strong>Cliente React 19 + PWA</strong><br>
        600+ ítems locales + SW <code>uk-street-v20</code>
      </div>
      <div class="flow-arrow">&#8644;</div>
      <div class="flow-step" style="border-top: 3px solid #0e6b47;">
        <strong>TVMaze Live API</strong><br>
        <code>api.tvmaze.com</code> (Sin clave)
      </div>
      <div class="flow-arrow">&#8644;</div>
      <div class="flow-step" style="border-top: 3px solid #9a5d07;">
        <strong>Router Multi-LLM</strong><br>
        Groq / Gemini / GPT / xAI / OR
      </div>
    </div>
    <div style="margin-top: 8px; font-size: 8pt; color: #525866;">
      Persistencia local privada en <code>localStorage</code>: Progreso XP/Quids, Baúl de Errores (SRS), Vocabulario IA y Episodios guardados.
    </div>
  </div>

  <h3>Motor de Tolerancia Ortográfica (Evaluador No Pedante)</h3>
  <p>
    Tanto en la evaluación local (<code>src/data/infiniteGenerator.ts</code> y <code>src/utils/answerChecker.ts</code>) como en el filtro post-procesador sobre respuestas de IA (<code>isPedanticOrMinorOrthography</code> en <code>aiService.ts</code>), se aplica la filosofía práctica: jamás penalizar un guion olvidado (<code>second hand</code> vs <code>second-hand</code>), una contracción sin apóstrofe en teclado móvil (<code>dont</code> / <code>im</code>) ni una errata tipográfica de una letra en palabras largas mediante distancia de <strong>Levenshtein</strong>.
  </p>

  <pre><span class="keyword">export function</span> <span class="func">normalizeAnswer</span>(raw: <span class="string">string</span>): <span class="string">string</span> {
  <span class="keyword">let</span> s = raw.toLowerCase().trim();
  s = s.replace(/[-–—_]/g, <span class="string">' '</span>); <span class="comment">// second-hand === second hand</span>
  s = s.replace(/\\bdont\\b/g, <span class="string">"don't"</span>).replace(/\\bcant\\b/g, <span class="string">"can't"</span>)
       .replace(/\\bive\\b/g, <span class="string">"i've"</span>).replace(/\\bim\\b/g, <span class="string">"i'm"</span>);
  s = s.replace(/[.,!?;:"'«»()\\[\\]]/g, <span class="string">''</span>).replace(/\\s+/g, <span class="string">' '</span>).trim();
  <span class="keyword">return</span> s;
}</pre>

  <!-- ==================== SECCIÓN 4 ==================== -->
  <div class="page-break"></div>
  <h2 id="sec-4"><span class="sec-num">04.</span> Niveles por Distritos, WhatsApp UK y Diccionario de Campo</h2>

  <h3>A. Mapa Callejero por Barrios y Jefes (<code>StreetLevelMap.tsx</code> + <code>StreetBossFight.tsx</code>)</h3>
  <p>
    El aprendizaje central se organiza como una ruta progresiva por 3 escenarios de Reino Unido. Cada nivel contiene micro-lecciones reales (comparativa entre frase académica pedante vs. callejera, secretos culturales y consejos de pronunciación), ejercicios de escritura obligatoria y un <strong>Reto de Jefe Final</strong> para desbloquear el siguiente distrito:
  </p>
  <table class="no-break">
    <thead>
      <tr>
        <th style="width: 12%;">Nivel</th>
        <th style="width: 35%;">Distrito en <code>streetData.ts</code></th>
        <th style="width: 28%;">Situaciones y Temas</th>
        <th style="width: 25%;">Rango Desbloqueado</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Nivel 1</strong></td>
        <td>Heathrow &amp; El Súper de la Esquina</td>
        <td>Saludos reflejo (<code>Alright?</code>, <code>Cheers</code>), pagar y pedir para llevar en cafés/tiendas.</td>
        <td>Guiri Despistado &#8594; Turista Avispado</td>
      </tr>
      <tr>
        <td><strong>Nivel 2</strong></td>
        <td>El Pub The Red Lion &amp; Vida Social</td>
        <td>Pedir pintas, rondas, reaccionar ante precios y charlar en barra con naturalidad.</td>
        <td>Habitual del Pub</td>
      </tr>
      <tr>
        <td><strong>Nivel 3</strong></td>
        <td>El Metro &amp; Mensajes del Día a Día</td>
        <td>Retrasos en el Tube, pisos compartidos y responder rápido sin sonar formal.</td>
        <td>Londinense Adoptao (3/3 Jefes)</td>
      </tr>
    </tbody>
  </table>

  <h3>B. Simulador Multi-Turno WhatsApp UK (<code>StreetWhatsAppSimulator.tsx</code>)</h3>
  <p>
    Recreación interactiva de hilos reales en <code>whatsappScenarios.ts</code> con personajes británicos (<strong>Liam</strong> compartiendo piso, <strong>Sarah</strong> en la oficina por un corte de la Central Line, <strong>Dave</strong> hablando de entradas a <em>forty quid</em> y <strong>Chloe</strong> quedando en Camden). Cada turno evalúa lo que escribe o selecciona el alumno, reproduce voz en <code>en-GB</code> y premia con Quids y XP.
  </p>

  <h3>C. Diccionario de Campo y Generador IA por Lotes de 50 Palabras (<code>FieldDictionaryZone.tsx</code>)</h3>
  <p>
    Reúne <strong>158 fichas curadas</strong> en 6 categorías clave (destacando el <strong>Top 50 palabras más habladas</strong> y <strong>Verbos en Pasado</strong> irregulares) con pronunciación fonética legible en castellano con tildes (<code>[táim]</code>, <code>[pí-pol]</code>, <code>[uént]</code>, <code>[nó-ledzh]</code>), modos <em>Estudio</em>, <em>Quiz escrito</em> y <em>Machaque rápido</em>. Además, permite generar con IA <strong>lotes nuevos de 50 palabras</strong> sin repetir ninguna ya aprendida (pasando hasta 120 palabras existentes en el prompt para evitar duplicados).
  </p>

  <!-- ==================== SECCIÓN 5 ==================== -->
  <div class="page-break"></div>
  <h2 id="sec-5"><span class="sec-num">05.</span> Módulo Series, Cine y Libros + API TVMaze en Tiempo Real</h2>
  <p>
    Una de las funciones más potentes de la app permite estudiar inglés real usando cualquier serie, película o libro que el alumno esté viendo ese mismo día. Al probar con estrenos recientes (como <em>The Gentlemen Temporada 2</em> o <em>Reacher Temporada 4</em>), se detectaron dos limitaciones clásicas de los LLMs estáticos: alucinar tramas de adaptaciones pasadas (película de 2019 vs. serie de Netflix) o responder <em>"Lo siento, no dispongo de información sobre ese episodio"</em>.
  </p>

  <h3>Solución Técnica Definitiva: <code>src/services/tvEpisodeService.ts</code></h3>
  <p>
    Para erradicar la desactualización temporal de los modelos de IA sin necesidad de suscripciones ni servidores backend, integramos la API abierta de <strong>TVMaze</strong> directamente desde el cliente:
  </p>
  <ol>
    <li><strong>Parser flexible de temporadas y capítulos (<code>parseSeasonAndEpisode</code>):</strong> Reconoce formatos naturales españoles o abreviaturas internacionales (<code>"Temporada 4, episodio 2"</code>, <code>"T2 E1"</code>, <code>"4x02"</code>, <code>"S02E01"</code>).</li>
    <li><strong>Búsqueda e inyección previa en el prompt (<code>fetchOnlineEpisodeData</code>):</strong> Limpia ruido del título (como "(Serie de Netflix)"), localiza el identificador de serie en TVMaze, recupera la lista de episodios y extrae el título oficial, fecha de emisión y sinopsis limpia (sin etiquetas HTML).</li>
    <li><strong>Bloqueo de negativas y botón de rescate automático:</strong> El prompt prohíbe explícitamente respuestas de rechazo, existe verificación en TypeScript mediante regex anti-negativas sobre <code>synopsisEs</code> (si detecta un rechazo antiguo, muestra aviso con el botón <strong>"Regenerar con base oficial en vivo"</strong>), y permite <strong>editar la sinopsis manualmente</strong> o usar el <strong>panel de corrección</strong> dentro de <code>MediaLearningZone.tsx</code>.</li>
  </ol>

  <pre><span class="comment">// src/services/tvEpisodeService.ts — Consulta en vivo y desambiguación</span>
<span class="keyword">export async function</span> <span class="func">fetchOnlineEpisodeData</span>(showTitle: <span class="string">string</span>, episodeStr: <span class="string">string</span>) {
  <span class="keyword">const</span> target = <span class="func">parseSeasonAndEpisode</span>(episodeStr);
  <span class="keyword">const</span> searchRes = <span class="keyword">await</span> <span class="func">fetch</span>(\`https://api.tvmaze.com/search/shows?q=\${encodeURIComponent(cleanTitle)}\`);
  <span class="keyword">const</span> show = exactMatch ? exactMatch.show : searchData[0].show;
  <span class="keyword">const</span> eps = <span class="keyword">await</span> (<span class="keyword">await</span> <span class="func">fetch</span>(\`https://api.tvmaze.com/shows/\${show.id}/episodes\`)).json();
  <span class="keyword">const</span> found = eps.find((e) =&gt; e.season === target.season &amp;&amp; e.number === target.episode);
  <span class="keyword">return</span> found ? { showName: show.name, episodeName: found.name, summary: <span class="func">stripHtml</span>(found.summary) } : <span class="keyword">null</span>;
}</pre>

  <div class="callout callout-warning">
    <span class="callout-title">Desambiguación de Adaptaciones (Ejemplo Real: The Gentlemen)</span>
    Además de la consulta a TVMaze, el sistema incluye contexto explícito cuando el título coincide con <em>The Gentlemen</em> para diferenciar la serie de Netflix (Eddie Horniman y Susie Glass negociando en Milán con Marco Moretti en T2) de la película de 2019 (Mickey Pearson), e incluye presets rápidos de un clic.
  </div>

  <!-- ==================== SECCIÓN 6 ==================== -->
  <div class="page-break"></div>
  <h2 id="sec-6"><span class="sec-num">06.</span> Lecturas con Rayos X Gramaticales y Regla Muscular 0/2</h2>

  <h3>1. Lector Comprensivo "Rayos X", Buscador Contextual y Creador Libre (<code>ReadingZone.tsx</code>)</h3>
  <p>
    Incluye <strong>5 historias completas graduadas</strong> (<em>story-a2p-train</em>, <em>remote-work</em>, etc.) más un generador libre con IA y un analizador de cualquier texto inglés pegado por el usuario:
  </p>
  <ul>
    <li><strong>Modo Rayos X:</strong> Al activar el interruptor, resalta estructuras clave dentro de cada párrafo (tiempos narrativos, pasivas, inversiones, <em>be/get used to</em>) para mostrar su regla aplicada sobre texto real, no en tablas aisladas.</li>
    <li><strong>Buscador rápido de palabras en contexto:</strong> Al escribir una palabra desconocida durante la lectura, primero busca en local en el Diccionario de Campo (<code>DICTIONARY_WORDS</code>) y, si no figura, consulta en directo a <code>explainWordInStoryContextWithAI</code> devolviendo significado contextual, fonética española y un botón <strong>+ Guardar en mi Diccionario</strong>.</li>
  </ul>

  <h3>2. La Regla de Oro: Repetición Muscular Guiada (<code>0/2</code>)</h3>
  <p>
    Tanto en el entrenamiento intensivo (<code>StreetDrillArena.tsx</code>) como tras recibir corrección de una pregunta abierta en <strong>Lecturas</strong> o <strong>Series IA</strong>, cada fallo activa el ciclo de fijación motora:
  </p>
  <div class="diagram-box">
    <div class="flow-step" style="border-color:#b91c2e;">
      1. Detección del fallo<br>
      Muestra frase corregida + versión B2
    </div>
    <div class="flow-arrow">&#8594;</div>
    <div class="flow-step" style="border-color:#9a5d07;">
      2. Escritura <code>1 / 2</code><br>
      Reproducir frase exacta de memoria
    </div>
    <div class="flow-arrow">&#8594;</div>
    <div class="flow-step" style="border-color:#0e6b47;">
      3. Escritura <code>2 / 2</code><br>
      Fijación completada y XP sumado
    </div>
  </div>

  <!-- ==================== SECCIÓN 7 ==================== -->
  <div class="page-break"></div>
  <h2 id="sec-7"><span class="sec-num">07.</span> Motor Multi-LLM Serverless, Generador Infinito y SRS</h2>

  <h3>1. Enrutador Multi-Proveedor en Cliente (<code>src/services/aiService.ts</code>)</h3>
  <p>
    Para evitar depender de una única empresa o cuota, <code>resolveProviderAndEndpoint()</code> inspecciona automáticamente el prefijo de la API key guardada en <code>localStorage</code> (permitiendo incluso cambiar de proveedor sin tocar selectores manuales) y consulta el listado vivo de modelos disponibles (<code>fetchAvailableModelsForKey</code>) ordenándolos por prioridad y descartando modelos no aptos (Whisper, TTS, embeddings):
  </p>
  <pre><span class="keyword">if</span> (key.startsWith(<span class="string">'AIza'</span>))   <span class="keyword">return</span> { provider: <span class="string">'gemini'</span>,     baseUrl: <span class="string">'https://generativelanguage.googleapis.com/v1beta'</span> };
<span class="keyword">if</span> (key.startsWith(<span class="string">'xai-'</span>))   <span class="keyword">return</span> { provider: <span class="string">'xai'</span>,        baseUrl: <span class="string">'https://api.x.ai/v1'</span> };
<span class="keyword">if</span> (key.startsWith(<span class="string">'sk-or-'</span>)) <span class="keyword">return</span> { provider: <span class="string">'openrouter'</span>, baseUrl: <span class="string">'https://openrouter.ai/api/v1'</span> };
<span class="keyword">if</span> (key.startsWith(<span class="string">'gsk_'</span>))   <span class="keyword">return</span> { provider: <span class="string">'groq'</span>,       baseUrl: <span class="string">'https://api.groq.com/openai/v1'</span> };
<span class="keyword">if</span> (key.startsWith(<span class="string">'sk-'</span>))    <span class="keyword">return</span> { provider: <span class="string">'openai'</span>,     baseUrl: <span class="string">'https://api.openai.com/v1'</span> };</pre>
  <p>
    También incorpora <code>extractCleanJson()</code> para limpiar bloques <code>&lt;think&gt;...&lt;/think&gt;</code> de modelos de razonamiento (como Qwen o DeepSeek) y vallas Markdown antes de parsear el JSON en caliente.
  </p>

  <h3>2. Generador Combinatorio Offline (<code>infiniteGenerator.ts</code>) y Baúl de Errores SRS</h3>
  <ul>
    <li><strong>Cero dependencia de red para practicar gramática:</strong> Más de 360 ejercicios directos (<code>expandedGrammarExercises.ts</code>, <code>grammarData.ts</code>, <code>phrasalVerbsData.ts</code>, <code>vocabularyData.ts</code>, matrices en <code>infiniteGenerator.ts</code>) barajados mediante <strong>Fisher-Yates</strong>.</li>
    <li><strong>Regla de las 3 victorias consecutivas (<code>storageService.ts</code>):</strong> Todo error cae en el Baúl de Errores y solo pasa a <code>mastered: true</code> cuando el alumno lo acierta <strong>3 veces seguidas</strong>. Un único desliz resetea <code>consecutiveCorrect</code> a <code>0</code>.</li>
  </ul>

  <!-- ==================== SECCIÓN 8 ==================== -->
  <div class="page-break"></div>
  <h2 id="sec-8"><span class="sec-num">08.</span> Inventario Completo del Código Fuente (<code>src/</code> y <code>public/</code>)</h2>
  <p>
    Resumen verificado de los módulos principales que integran la versión actual (40 ficheros fuente en <code>src/</code> y recursos PWA en <code>public/</code>):
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 34%;">Ruta del Archivo</th>
        <th style="width: 66%;">Responsabilidad Exacta</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>src/App.tsx</code> + <code>src/index.css</code></td>
        <td>Shell <em>London Press</em>, cabecera con métricas XP/Quids/Jefes, navegación escritorio, barra móvil de 5 botones + <code>popover="auto"</code> y tokens semánticos CSS.</td>
      </tr>
      <tr>
        <td><code>src/components/BrandMark.tsx</code><br><code>src/components/NativeDialog.tsx</code><br><code>src/utils/viewTransition.ts</code></td>
        <td>Infraestructura visual y web nativa: Roundel SVG de marca, modal accesible sobre <code>&lt;dialog showModal()&gt;</code> y gestor de transiciones suaves con gestión de foco.</td>
      </tr>
      <tr>
        <td><code>src/components/StreetLevelMap.tsx</code><br><code>StreetTopicView.tsx</code> / <code>StreetBossFight.tsx</code></td>
        <td>Mapa progresivo por 3 distritos de Reino Unido, fichas callejeras comparativas, audios <code>en-GB</code> y batallas finales contra jefes para desbloquear niveles.</td>
      </tr>
      <tr>
        <td><code>src/components/MediaLearningZone.tsx</code><br><code>src/services/tvEpisodeService.ts</code></td>
        <td>Módulo Series, Cine y Libros con búsqueda en vivo en <code>api.tvmaze.com</code>, desambiguación, edición inline, panel de corrección y rescate anti-negativas.</td>
      </tr>
      <tr>
        <td><code>src/components/FieldDictionaryZone.tsx</code><br><code>src/data/fieldDictionaryData.ts</code></td>
        <td>Diccionario de campo (158 entradas + 6 categorías, Top 50 y Pasados) con fonética española y generador IA de lotes de 50 palabras sin duplicados.</td>
      </tr>
      <tr>
        <td><code>src/components/StreetWhatsAppSimulator.tsx</code><br><code>src/components/StreetDrillArena.tsx</code><br><code>src/components/StreetProfile.tsx</code></td>
        <td>Simulador multi-turno de chats UK (Liam, Sarah, Dave, Chloe), arena de machaque con repetición <code>0/2</code>, pasaporte de rangos y estadísticas.</td>
      </tr>
      <tr>
        <td><code>src/components/ReadingZone.tsx</code><br><code>src/components/SettingsModal.tsx</code></td>
        <td>Historias con Rayos X, buscador contextual de vocabulario en lectura, creador libre con IA y diálogo nativo de configuración Multi-LLM y respaldo JSON.</td>
      </tr>
      <tr>
        <td><code>src/services/aiService.ts</code><br><code>src/services/storageService.ts</code><br><code>src/utils/answerChecker.ts</code></td>
        <td>Enrutador Multi-LLM (5 proveedores), evaluador no pedante, comparador semántico en español/inglés, persistencia <code>localStorage</code> y Baúl SRS.</td>
      </tr>
      <tr>
        <td><code>public/sw.js</code> &amp; <code>public/presentacion/</code></td>
        <td>Service Worker <code>uk-street-v20</code> (caché offline Network-First) y copia sincronizada de la presentación interactiva 3D en <code>/presentacion/</code>.</td>
      </tr>
    </tbody>
  </table>

  <!-- ==================== SECCIÓN 9 ==================== -->
  <div class="page-break"></div>
  <h2 id="sec-9"><span class="sec-num">09.</span> Presentación Interactiva 3D, PWA <code>v20</code> y GitHub Pages</h2>

  <h3>Showcase 3D Interactivo (<code>presentacion/index.html</code>)</h3>
  <p>
    Además de la app principal, el repositorio incluye una web de presentación interactiva optimizada tanto para escritorio como para móvil (servida automáticamente en <code>/aprende-en/presentacion/</code>). Reúne 12 escenas animadas mediante <code>requestAnimationFrame</code> e interpolación ligada al scroll: globo 3D de partículas con ciudades de Reino Unido enlazadas por arcos (Londres, Birmingham, Mánchester, Bristol, Edimburgo, Camden, Soho, Brixton), carrusel cilíndrico 3D, pila técnica desmontada en 4 capas, tablero orbital de memoria muscular, arquitectura SVG animada, simuladores en vivo de WhatsApp y repetición <code>0/2</code>, tarjetas flip, diario de 8 retos resueltos en vuelo 3D y terminal PowerShell animada.
  </p>

  <h3>Flujo de Compilación, PDF y Despliegue Cero Coste</h3>
  <ol>
    <li><strong>Verificación de tipos y empaquetado (<code>npm run build</code>):</strong> Ejecuta <code>tsc -b</code> y genera en <code>dist/</code> los activos optimizados junto a <code>dist/presentacion/index.html</code>.</li>
    <li><strong>Regeneración automática de esta memoria:</strong> <code>node scripts/generate_doc_pdf.cjs</code> invoca Microsoft Edge Headless (<code>--headless --print-to-pdf</code>) garantizando documentación siempre sincronizada con el código real.</li>
    <li><strong>Service Worker <code>uk-street-v20</code> y GitHub Pages:</strong> Despliega en rama <code>gh-pages</code> con limpieza automática de cachés anteriores al activarse para que cualquier dispositivo iOS/Android reciba el último bundle sin quedarse colgado en versiones viejas.</li>
  </ol>

  <pre><span class="comment">// public/sw.js — Activación limpia con cache-busting uk-street-v20</span>
<span class="keyword">const</span> CACHE_NAME = <span class="string">'uk-street-v20'</span>;

self.<span class="func">addEventListener</span>(<span class="string">'activate'</span>, (event) =&gt; {
  event.<span class="func">waitUntil</span>(
    caches.<span class="func">keys</span>().then((keys) =&gt;
      Promise.all(keys.<span class="func">map</span>((k) =&gt; (k !== CACHE_NAME ? caches.<span class="func">delete</span>(k) : <span class="keyword">null</span>)))
    ).then(() =&gt; self.clients.<span class="func">claim</span>())
  );
});</pre>

  <!-- ==================== SECCIÓN 10 ==================== -->
  <div class="page-break"></div>
  <h2 id="sec-10"><span class="sec-num">10.</span> El Pitch de 2 Minutos y Preguntas Frecuentes</h2>

  <div class="callout">
    <span class="callout-title">Cómo explicar UK Street English en 60 segundos</span>
    <p>
      <em>"Es una PWA creada en <strong>React 19 y TypeScript</strong> diseñada para pasar de un inglés académico rígido al inglés real que se habla en Londres, pubs y chats de WhatsApp. Funciona 100% en cliente, con coste 0 € en servidores, y combina una ruta gamificada por barrios con XP, Quids y Jefes finales junto a un simulador de mensajería cotidiana, lecturas con Rayos X y aprendizaje con series de estreno."</em>
    </p>
    <p style="margin-bottom:0;">
      <em>"Para evitar que la IA alucine o diga que no conoce temporadas recientes como The Gentlemen T2 o Reacher T4, se conecta en directo a <strong>TVMaze</strong> para leer la sinopsis oficial real antes de generar ejercicios. Además usa un motor Multi-LLM compatible con Groq, Gemini, OpenAI, xAI Grok y OpenRouter, audio británico local y regla obligatoria de repetición muscular <code>0/2</code> en cada fallo."</em>
    </p>
  </div>

  <h3>Preguntas Habituales sobre el Funcionamiento Interno</h3>
  <ul>
    <li>
      <strong>¿Por qué ahora sí acierta tramas de series recién estrenadas?</strong><br>
      Porque <code>tvEpisodeService.ts</code> consulta en vivo <code>api.tvmaze.com</code> antes de enviar el prompt a la IA, inyecta los hechos oficiales del episodio y prohíbe respuestas negativas; además se puede editar la sinopsis o rescatar episodios previos con un clic.
    </li>
    <li>
      <strong>¿Si el usuario pone el repositorio en privado o comparte el enlace, pierde acceso alguien?</strong><br>
      En GitHub Pages gratuito los sitios de repos privados requieren cuenta GitHub Pro; con el repositorio público (sin claves en el código, ya que cada persona introduce su propia clave gratuita de Groq/Gemini en su móvil dentro de <code>localStorage</code>) cualquier amigo con el enlace accede al 100% sin riesgo de exponer API keys privadas.
    </li>
    <li>
      <strong>¿Qué cambió a nivel visual en la última actualización (v6.0)?</strong><br>
      Se sustituyeron estilos genéricos y barras saturadas por el sistema editorial <strong>London Press &amp; Underground</strong>: tipografía propia, emblema Roundel (<code>BrandMark</code>), <code>&lt;dialog showModal()&gt;</code>, menú móvil de 5 accesos con <code>popover="auto"</code>, <code>View Transitions</code> nativas y cero bloqueo de zoom.
    </li>
  </ul>

  <div class="callout callout-success" style="margin-top: 18px;">
    <span class="callout-title">Documento Verificado contra Código Fuente Actual</span>
    Generado desde <code>scripts/generate_doc_pdf.cjs</code> para la Release v6.0 de <strong>UK Street English</strong> (Cache PWA <code>uk-street-v20</code> · Noviembre 2026).
  </div>

</body>
</html>
`;

const htmlPath = path.join(__dirname, 'temp_doc.html');
const pdfPath = path.join(__dirname, '..', 'EngDrill_Pro_Arquitectura_y_Codigo.pdf');

console.log('Escribiendo HTML temporal...');
fs.writeFileSync(htmlPath, htmlContent, 'utf8');

console.log('Compilando PDF con Microsoft Edge Headless...');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

try {
  const cmd = `"${edgePath}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfPath}" "${htmlPath}"`;
  execSync(cmd, { stdio: 'inherit' });

  if (fs.existsSync(pdfPath)) {
    const stats = fs.statSync(pdfPath);
    console.log(`✅ PDF generado con éxito: ${pdfPath} (${(stats.size / 1024).toFixed(1)} KB)`);
  } else {
    console.error('❌ Error: El PDF no se creó.');
    process.exitCode = 1;
  }
} catch (err) {
  console.error('❌ Error al ejecutar Edge headless:', err);
  process.exitCode = 1;
} finally {
  if (fs.existsSync(htmlPath)) {
    fs.unlinkSync(htmlPath);
  }
}
