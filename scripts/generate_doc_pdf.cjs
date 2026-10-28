const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>EngDrill Pro - Arquitectura y Funcionamiento Interno del Código</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 18mm 16mm 20mm 16mm;
      @bottom-right {
        content: counter(page);
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 9pt;
        color: #64748b;
      }
      @bottom-left {
        content: "EngDrill Pro (A2+ a B2+) — Documento de Arquitectura y Código";
        font-family: 'Segoe UI', system-ui, sans-serif;
        font-size: 8.5pt;
        color: #94a3b8;
      }
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      background: #ffffff;
      line-height: 1.55;
      font-size: 10pt;
      margin: 0;
      padding: 0;
    }

    .cover-page {
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 94vh;
      padding: 40px 10px 20px 10px;
    }

    .badge {
      display: inline-block;
      padding: 4px 12px;
      font-size: 8.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      border-radius: 9999px;
      background: #e0e7ff;
      color: #3730a3;
      margin-bottom: 14px;
    }

    .cover-title {
      font-size: 30pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
      margin: 0 0 10px 0;
      letter-spacing: -0.02em;
    }

    .cover-subtitle {
      font-size: 13.5pt;
      color: #475569;
      margin: 0 0 30px 0;
      font-weight: 400;
      line-height: 1.4;
    }

    .cover-highlights {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-top: 30px;
    }

    .highlight-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 16px;
    }

    .highlight-card h4 {
      margin: 0 0 6px 0;
      font-size: 10.5pt;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .highlight-card p {
      margin: 0;
      font-size: 8.5pt;
      color: #64748b;
      line-height: 1.45;
    }

    .cover-footer {
      border-top: 2px solid #e2e8f0;
      padding-top: 18px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 8.5pt;
      color: #64748b;
    }

    h1, h2, h3, h4 {
      color: #0f172a;
      font-weight: 700;
      page-break-after: avoid;
    }

    h2 {
      font-size: 16pt;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 6px;
      margin-top: 26px;
      margin-bottom: 12px;
      letter-spacing: -0.01em;
    }

    h3 {
      font-size: 12pt;
      margin-top: 18px;
      margin-bottom: 8px;
      color: #1e293b;
    }

    p {
      margin-top: 0;
      margin-bottom: 10px;
      text-align: justify;
    }

    .page-break {
      page-break-before: always;
    }

    .no-break {
      page-break-inside: avoid;
    }

    .callout {
      border-left: 4px solid #4f46e5;
      background: #f5f3ff;
      padding: 12px 16px;
      border-radius: 0 8px 8px 0;
      margin: 14px 0;
      font-size: 9.5pt;
    }

    .callout-success {
      border-left-color: #10b981;
      background: #ecfdf5;
    }

    .callout-warning {
      border-left-color: #f59e0b;
      background: #fffbeb;
    }

    .callout-title {
      font-weight: 700;
      margin-bottom: 4px;
      color: #0f172a;
      display: block;
    }

    code {
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 8.5pt;
      background: #f1f5f9;
      color: #0f172a;
      padding: 2px 5px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
    }

    pre {
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 8pt;
      background: #0f172a;
      color: #f8fafc;
      padding: 12px 14px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 10px 0 14px 0;
      line-height: 1.45;
      page-break-inside: avoid;
    }

    pre .comment { color: #94a3b8; font-style: italic; }
    pre .keyword { color: #c084fc; font-weight: bold; }
    pre .string { color: #86efac; }
    pre .func { color: #67e8f9; }
    pre .number { color: #fde047; }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0 16px 0;
      font-size: 8.5pt;
      page-break-inside: avoid;
    }

    th, td {
      border: 1px solid #cbd5e1;
      padding: 8px 10px;
      text-align: left;
    }

    th {
      background: #f1f5f9;
      color: #0f172a;
      font-weight: 700;
    }

    tr:nth-child(even) {
      background: #f8fafc;
    }

    .diagram-box {
      background: #f8fafc;
      border: 2px dashed #cbd5e1;
      border-radius: 10px;
      padding: 16px;
      margin: 14px 0;
      text-align: center;
      page-break-inside: avoid;
    }

    .flow-step {
      display: inline-block;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      box-shadow: 0 2px 4px rgba(0,0,0,0.04);
      border-radius: 8px;
      padding: 8px 12px;
      margin: 4px;
      font-size: 8.5pt;
      font-weight: 600;
      color: #1e293b;
      vertical-align: middle;
    }

    .flow-arrow {
      display: inline-block;
      color: #6366f1;
      font-weight: 900;
      font-size: 11pt;
      margin: 0 4px;
      vertical-align: middle;
    }

    ul, ol {
      margin-top: 0;
      margin-bottom: 12px;
      padding-left: 20px;
    }

    li {
      margin-bottom: 4px;
    }

    .toc {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px 20px;
      margin-bottom: 24px;
      page-break-inside: avoid;
    }

    .toc-item {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dotted #cbd5e1;
      padding: 5px 0;
      font-size: 9pt;
    }

    .toc-item a {
      text-decoration: none;
      color: #1e293b;
      font-weight: 600;
    }

    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
  </style>
</head>
<body>

  <!-- ==================== PORTADA ==================== -->
  <div class="cover-page">
    <div>
      <span class="badge">Documento Técnico Oficial & Arquitectura</span>
      <h1 class="cover-title">EngDrill Pro</h1>
      <div class="cover-subtitle">
        Manual de Arquitectura, Funcionamiento Interno del Código y Guía Pedagógica (Niveles A2+ a B2+ Advanced)
      </div>

      <p style="font-size: 10.5pt; color: #334155; line-height: 1.6;">
        Este documento explica en detalle cómo está construida la aplicación <strong>EngDrill Pro</strong> por dentro:
        cómo funciona su arquitectura <em>client-side first</em>, su generador combinatorio infinito sin coste de servidores,
        su motor de evaluación tolerante a la ortografía informal de trabajo, su algoritmo de Repetición Espaciada (SRS),
        y su integración serverless con modelos de Inteligencia Artificial (Groq / OpenAI / Llama 3).
      </p>

      <div class="cover-highlights">
        <div class="highlight-card">
          <h4>⚡ Zero-Backend / 100% Client-Side</h4>
          <p>Toda la lógica de evaluación, combinatoria gramatical y persistencia de fallos corre en el navegador en JavaScript puro sin dependencias de base de datos externas.</p>
        </div>
        <div class="highlight-card">
          <h4>🎯 Enfoque de Machaque A2+ a B2+</h4>
          <p>Sin distracciones de audios ni tests para niños: 100% ejercicios activos de gramática Cambridge, phrasal verbs, collocations y redacción en situaciones reales.</p>
        </div>
        <div class="highlight-card">
          <h4>🧠 Motor de Tolerancia Ortográfica</h4>
          <p>Algoritmo con distancia Levenshtein que jamás penaliza guiones (<code>second hand</code> vs <code>second-hand</code>), apóstrofes o erratas menores de teclado.</p>
        </div>
        <div class="highlight-card">
          <h4>📱 PWA Offline & Despliegue en 2 Clics</h4>
          <p>Service Worker v5 con soporte para instalación en iPhone y Android sin pasar por App Store y 0 € de coste de alojamiento en GitHub Pages.</p>
        </div>
      </div>
    </div>

    <div class="cover-footer">
      <div>
        <strong>Repositorio Oficial:</strong> github.com/adrianSG25/aprende-en<br>
        <strong>URL en Producción:</strong> https://adriansg25.github.io/aprende-en/<br>
        <strong>Tecnologías:</strong> React 19, TypeScript, Vite, Tailwind CSS v4, Web Workers
      </div>
      <div style="text-align: right;">
        <strong>Versión:</strong> 5.0.0 (Release Non-Pedantic)<br>
        <strong>Fecha:</strong> Octubre 2026<br>
        <strong>Estado:</strong> Producción Activa
      </div>
    </div>
  </div>

  <!-- ==================== ÍNDICE ==================== -->
  <h2>Tabla de Contenidos</h2>
  <div class="toc">
    <div class="toc-item"><a href="#sec-1">1. Visión General y Filosofía de Diseño</a> <span>Pág. 2</span></div>
    <div class="toc-item"><a href="#sec-2">2. Arquitectura Global del Sistema (Por Dentro)</a> <span>Pág. 3</span></div>
    <div class="toc-item"><a href="#sec-3">3. El Motor de Evaluación y Tolerancia Ortográfica</a> <span>Pág. 4</span></div>
    <div class="toc-item"><a href="#sec-4">4. El Generador Infinito de Ejercicios (Sin IA / Cero Coste)</a> <span>Pág. 5</span></div>
    <div class="toc-item"><a href="#sec-5">5. Capa de Inteligencia Artificial Serverless (IA Opcional)</a> <span>Pág. 6</span></div>
    <div class="toc-item"><a href="#sec-6">6. Persistencia y Algoritmo de Repetición Espaciada (SRS)</a> <span>Pág. 7</span></div>
    <div class="toc-item"><a href="#sec-7">7. Recorrido por el Código Fuente (Archivo por Archivo)</a> <span>Pág. 8</span></div>
    <div class="toc-item"><a href="#sec-8">8. Cómo Explicar la App a Otra Persona (El Pitch de 2 Minutos)</a> <span>Pág. 9</span></div>
    <div class="toc-item"><a href="#sec-9">9. Despliegue, PWA y Acceso Móvil</a> <span>Pág. 10</span></div>
  </div>

  <!-- ==================== SECCIÓN 1 ==================== -->
  <h2 id="sec-1">1. Visión General y Filosofía de Diseño</h2>
  <p>
    La mayoría de las aplicaciones de aprendizaje de idiomas del mercado (como Duolingo o Babbel) están orientadas a principiantes absolutos (A0–A1), utilizan mecánicas infantiles con animaciones lentas y dedican demasiado tiempo a audios básicos. Cuando un estudiante ya tiene un nivel intermedio (A2) y necesita consolidar las estructuras complejas del <strong>B1 y B2</strong> (inversiones sintácticas, condicionales mixtos, preposiciones dependientes y más de 60 phrasal verbs imprescindibles), este tipo de herramientas se vuelve ineficaz.
  </p>
  <p>
    <strong>EngDrill Pro</strong> se diseñó bajo una premisa pedagógica radicalmente diferente:
  </p>
  <ul>
    <li><strong>Cero audios ni pérdida de tiempo pasiva:</strong> El input auditivo se adquiere de forma natural viendo series o podcasts en versión original. La app se concentra al 100% en la <em>producción activa y la fijación de patrones gramaticales por repetición masiva</em>.</li>
    <li><strong>Entrenamiento por patrones y machaque:</strong> Los hispanohablantes suelen cometer siempre los mismos 30 errores estructurales (ej. decir <em>"I am agree"</em> en vez de <em>"I agree"</em>, o <em>"married with"</em> en vez de <em>"married to"</em>). EngDrill Pro cuenta con matrices específicas para desactivar esos errores mediante memoria muscular de tecleo.</li>
    <li><strong>Inmediatez absoluta:</strong> Tiempo de respuesta menor a <strong>5 milisegundos</strong>. Cada ejercicio se evalúa al instante, mostrando en rojo la palabra fallada y en verde la solución correcta con su regla gramatical explicada en español.</li>
    <li><strong>Simulaciones reales de trabajo y vida cotidiana:</strong> En la sección de redacción libre y situaciones ("¿Qué le responderías?"), el usuario se enfrenta a imprevistos reales (negociar un presupuesto con un mecánico en Londres, quejarse al casero por una fuga de agua, pedir explicaciones en un aeropuerto).</li>
  </ul>

  <!-- ==================== SECCIÓN 2 ==================== -->
  <div class="page-break"></div>
  <h2 id="sec-2">2. Arquitectura Global del Sistema (Por Dentro)</h2>
  <p>
    EngDrill Pro está desarrollada como una <strong>Single Page Application (SPA) / Progressive Web App (PWA)</strong> en <strong>React 19 con TypeScript estricto</strong>, compilada mediante el empaquetador ultrarrápido <strong>Vite</strong> y estilizada con <strong>Tailwind CSS v4</strong>.
  </p>

  <div class="diagram-box">
    <div style="font-size: 8.5pt; font-weight: 700; color: #475569; margin-bottom: 8px;">ARQUITECTURA CLIENT-SIDE FIRST & SERVERLESS DE ENGDRILL PRO</div>
    <div>
      <div class="flow-step" style="border-left: 4px solid #6366f1;">
        <strong>Navegador del Usuario</strong><br>
        React 19 + TypeScript + UI
      </div>
      <div class="flow-arrow">⇄</div>
      <div class="flow-step" style="border-left: 4px solid #10b981;">
        <strong>Generador Local</strong><br>
        1000+ Matrices / Levenshtein
      </div>
      <div class="flow-arrow">⇄</div>
      <div class="flow-step" style="border-left: 4px solid #f59e0b;">
        <strong>Storage Local (SRS)</strong><br>
        LocalStorage + Baúl Errores
      </div>
    </div>
    <div style="margin-top: 10px;">
      <div class="flow-arrow" style="transform: rotate(90deg);">⇄</div>
    </div>
    <div>
      <div class="flow-step" style="border-left: 4px solid #ec4899; width: 65%;">
        <strong>Capa de IA Opcional (Directa desde el Cliente)</strong><br>
        Groq API / OpenAI (Llama 3.3 / GPT-4o-mini) — <em>Cero servidores intermedios</em>
      </div>
    </div>
  </div>

  <h3>¿Por qué esta arquitectura es superior para el usuario?</h3>
  <ol>
    <li>
      <strong>Coste Cero de Servidor (0 €/mes):</strong> Al no existir un backend en Node, Python o PHP que deba procesar cada clic, el proyecto se aloja como archivos estáticos puros en GitHub Pages. Puede atender a 1 persona o a 50.000 personas simultáneas sin que se caiga y sin pagar ni un solo céntimo.
    </li>
    <li>
      <strong>Privacidad Total:</strong> Los datos del usuario (estadísticas, errores cometidos, racha y clave API de IA si la usa) se almacenan <strong>únicamente en el propio dispositivo del usuario</strong> a través de <code>localStorage</code>. No hay bases de datos externas recopilando datos personales.
    </li>
    <li>
      <strong>Funcionamiento Offline:</strong> Gracias al <code>Service Worker v5</code>, una vez abierta la app en el móvil o portátil, el 90% de las funciones (todos los ejercicios de gramática, phrasal verbs, vocabulario y exámenes) funcionan en un avión o en el metro sin tener conexión a internet.
    </li>
  </ol>

  <!-- ==================== SECCIÓN 3 ==================== -->
  <div class="page-break"></div>
  <h2 id="sec-3">3. El Motor de Evaluación y Tolerancia Ortográfica</h2>
  <p>
    Uno de los problemas más frustrantes de las plataformas de idiomas convencionales es su <strong>pedantería ortográfica</strong>: si un usuario escribe <code>second hand</code> en lugar de <code>second-hand</code>, o si teclea rápido en el móvil y pone <code>dont</code> en vez de <code>don't</code>, muchas apps le dan la respuesta por errónea y le restan vidas.
  </p>
  <p>
    En EngDrill Pro implementamos un motor de evaluación inteligente en dos capas dentro de <a href="file:///c:/Users/adria/OneDrive/Escritorio/Aprende_EN/src/data/infiniteGenerator.ts"><code>src/data/infiniteGenerator.ts</code></a> y <a href="file:///c:/Users/adria/OneDrive/Escritorio/Aprende_EN/src/services/aiService.ts"><code>src/services/aiService.ts</code></a>:
  </p>

  <h3>1. Normalización Lingüística No Pedante (<code>normalizeAnswer</code>)</h3>
  <pre><span class="keyword">export function</span> <span class="func">normalizeAnswer</span>(raw: <span class="string">string</span>): <span class="string">string</span> {
  <span class="keyword">let</span> s = raw.toLowerCase().trim();
  
  <span class="comment">// 1. Los guiones se tratan exactamente igual que espacios (second-hand === second hand)</span>
  s = s.replace(/[-–—_]/g, <span class="string">' '</span>);
  
  <span class="comment">// 2. Expansión tolerante de contracciones sin apóstrofe para tecleo móvil</span>
  s = s.replace(/\bdont\b/g, <span class="string">"don't"</span>).replace(/\bcant\b/g, <span class="string">"can't"</span>)
       .replace(/\bive\b/g, <span class="string">"i've"</span>).replace(/\bim\b/g, <span class="string">"i'm"</span>);
       
  <span class="comment">// 3. Eliminación de signos de puntuación periféricos y espacios dobles</span>
  s = s.replace(/[.,!?;:"'«»()\[\]]/g, <span class="string">''</span>).replace(/\s+/g, <span class="string">' '</span>).trim();
  <span class="keyword">return</span> s;
}</pre>

  <h3>2. Tolerancia a Erratas Menores de Teclado (Fuzzy Matching con Levenshtein)</h3>
  <p>
    Cuando el usuario teclea palabras largas (5 letras o más), la función <code>checkAnswerMatch</code> calcula la distancia de edición de Levenshtein. Si el usuario escribió por ejemplo <code>responsible</code> pero se le escapó un dedo y puso <code>responsable</code>, o <code>explained</code> vs <code>expalined</code>, el evaluador local lo acepta pero le muestra en la interfaz la corrección visual exacta para que no se frustre por una simple pulsación de tecla.
  </p>

  <div class="callout callout-success">
    <span class="callout-title">✓ Filosofía de Corrección en Situaciones Reales</span>
    En un entorno laboral o cotidiano en Londres o Nueva York, escribir <em>"second hand part"</em> o <em>"dont worry"</em> en un correo o mensaje es 100% comprensible y natural. La app solo penaliza fallos <strong>gramaticales y conceptuales reales</strong> (como usar un tiempo verbal incorrecto o una preposición dependiente equivocada).
  </div>

  <!-- ==================== SECCIÓN 4 ==================== -->
  <div class="page-break"></div>
  <h2 id="sec-4">4. El Generador Infinito de Ejercicios (Sin IA / Cero Coste)</h2>
  <p>
    El corazón de la práctica masiva de la aplicación reside en el archivo <a href="file:///c:/Users/adria/OneDrive/Escritorio/Aprende_EN/src/data/infiniteGenerator.ts"><code>src/data/infiniteGenerator.ts</code></a>.
    En lugar de hacer que cada ejercicio dependa de una llamada a una IA externa (lo que sería lento, costoso y requeriría conexión continua), la app cuenta con un <strong>motor combinatorio procedimental</strong>.
  </p>

  <table class="no-break">
    <thead>
      <tr>
        <th style="width: 25%;">Tipo de Ejercicio</th>
        <th style="width: 35%;">Estructura en el Código</th>
        <th style="width: 40%;">Objetivo Pedagógico Cambridge</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Cloze / Relleno</strong></td>
        <td><code>type: 'cloze'</code><br>Oración con hueco <code>___</code> y 4 opciones o respuesta abierta.</td>
        <td>Preposiciones dependientes (<em>"accused of"</em>, <em>"congratulate on"</em>) y partículas de phrasal verbs.</td>
      </tr>
      <tr>
        <td><strong>Corrección de Errores</strong></td>
        <td><code>type: 'error_correction'</code><br>Muestra una frase con una trampa típica de hispanohablantes.</td>
        <td>Detección activa del fallo (<em>"Most of people"</em> ➔ <em>"Most people"</em>; <em>"explain me"</em> ➔ <em>"explain to me"</em>).</td>
      </tr>
      <tr>
        <td><strong>Transformación de Oraciones</strong></td>
        <td><code>type: 'transformation'</code><br>Oración base + Palabra Clave (KEY WORD) en mayúsculas.</td>
        <td>Equivalente al ejercicio estrella de Cambridge B2 First (Use of English Part 4). Ejemplo: <em>AS</em> ➔ <em>not as fast as</em>.</td>
      </tr>
      <tr>
        <td><strong>Formación de Palabras</strong></td>
        <td><code>type: 'cloze'</code> con raíz léxica en mayúsculas (ej. <em>SUCCEED</em> ➔ <em>success / successfully</em>).</td>
        <td>Familias de sufijos y prefijos (Use of English Part 3): sustantivos, adjetivos, adverbios y opuestos con <em>un-</em>, <em>dis-</em>.</td>
      </tr>
    </tbody>
  </table>

  <h3>Algoritmo de Mezcla Barajada (Fisher-Yates)</h3>
  <p>
    La función <code>generateInfiniteDrillQueue(filterLevel, filterCategory)</code> toma el banco estático curado más las matrices combinatorias procedimentales, filtra por nivel y aplica un algoritmo de barajado <em>Fisher-Yates</em> garantizando que nunca aparezcan dos ejercicios idénticos seguidos, ofreciendo una experiencia infinita de práctica continua.
  </p>

  <!-- ==================== SECCIÓN 5 ==================== -->
  <div class="page-break"></div>
  <h2 id="sec-5">5. Capa de Inteligencia Artificial Serverless (IA Opcional)</h2>
  <p>
    Toda la lógica de IA se encuentra aislada en <a href="file:///c:/Users/adria/OneDrive/Escritorio/Aprende_EN/src/services/aiService.ts"><code>src/services/aiService.ts</code></a>. Se conecta directamente desde el navegador del usuario a cualquier proveedor con formato OpenAI compatible (por defecto <strong>Groq Cloud</strong> por su extrema velocidad y generoso plan gratuito, pero también OpenAI, OpenRouter o servidores locales como Ollama).
  </p>

  <h3>Innovación Técnica 1: Auto-Descubrimiento de Modelos en Vivo</h3>
  <p>
    Un fallo común en apps que usan APIs es que cuando una empresa da de baja un modelo (por ejemplo, al migrar de <em>llama-3.1-70b</em> a <em>llama-3.3-70b</em>), la app arroja un error <code>404 model_not_found</code>. En EngDrill Pro implementamos la función:
  </p>
  <pre><span class="keyword">export async function</span> <span class="func">fetchAvailableModelsForKey</span>(apiKey: <span class="string">string</span>): <span class="string">Promise</span>&lt;<span class="string">string[]</span>&gt; {
  <span class="comment">// Consulta el endpoint GET /v1/models de la API en vivo con la clave del usuario</span>
  <span class="keyword">const</span> res = <span class="keyword">await</span> fetch(<span class="string">'https://api.groq.com/openai/v1/models'</span>, {
    headers: { <span class="string">'Authorization'</span>: <span class="string">\`Bearer \${apiKey.trim()}\`</span> }
  });
  <span class="keyword">const</span> data = <span class="keyword">await</span> res.json();
  <span class="comment">// Filtra automáticamente los modelos de chat activos y vigentes</span>
  <span class="keyword">return</span> data.data.map(m =&gt; m.id).filter(id =&gt; !id.includes(<span class="string">'whisper'</span>));
}</pre>

  <h3>Innovación Técnica 2: Evaluación No Pedante por IA en Situaciones Reales</h3>
  <p>
    En la función <code>evaluateRoleplayResponseWithAI</code> (empleada en el simulador de "¿Qué le responderías?"), el prompt del sistema y el código TypeScript tienen reglas estrictas:
  </p>
  <ul>
    <li>El prompt ordena explícitamente al LLM: <em>"NEVER flag missing hyphens (e.g. 'second hand' vs 'second-hand'), missing apostrophes in contractions, or minor spelling slips as errors"</em>.</li>
    <li>Posteriormente, el código ejecuta la función <code>isPedanticOrMinorOrthography</code> como filtro de seguridad en TypeScript sobre la lista de errores devuelta por la IA. Si la IA devuelve un error tiquismiquis, <strong>el código lo descarta y eleva la nota a 9.5/10</strong>.</li>
    <li>Además, genera automáticamente dos elementos de alto valor pedagógico:
      <ol>
        <li><strong>Versión B2 Native Upgrade:</strong> Cómo diría esa misma frase un nativo británico o americano usando colocaciones más ricas.</li>
        <li><strong>Character Follow-Up:</strong> Qué responde el personaje a continuación (ej. qué replica el mecánico o casero) para permitir una conversación continua.</li>
      </ol>
    </li>
  </ul>

  <!-- ==================== SECCIÓN 6 ==================== -->
  <div class="page-break"></div>
  <h2 id="sec-6">6. Persistencia y Algoritmo de Repetición Espaciada (SRS)</h2>
  <p>
    En <a href="file:///c:/Users/adria/OneDrive/Escritorio/Aprende_EN/src/services/storageService.ts"><code>src/services/storageService.ts</code></a> reside la lógica del <strong>Baúl de Errores (Mistake Vault)</strong>.
    Aprender un idioma no consiste en acertar a la primera por casualidad, sino en transformar los errores sistemáticos en hábitos automáticos.
  </p>

  <div class="diagram-box">
    <div style="font-size: 8.5pt; font-weight: 700; color: #475569; margin-bottom: 8px;">CICLO DE DOMINIO DEL BAÚL DE ERRORES (SRS)</div>
    <div class="flow-step" style="border-color: #ef4444; color: #b91c1c;">
      1. El usuario falla un ejercicio<br>
      <code>failCount++</code> | <code>consecutive = 0</code>
    </div>
    <div class="flow-arrow">➔</div>
    <div class="flow-step" style="border-color: #f59e0b; color: #b45309;">
      2. Entra en el Baúl de Errores<br>
      Disponible en la pestaña de repaso
    </div>
    <div class="flow-arrow">➔</div>
    <div class="flow-step" style="border-color: #10b981; color: #047857;">
      3. Lo acierta 3 veces seguidas<br>
      <code>consecutive >= 3</code> ➔ <strong>MASTERED</strong>
    </div>
  </div>

  <h3>La Regla de las 3 Victorias Consecutivas</h3>
  <p>
    Cuando el usuario entra en la pestaña <em>"Baúl de Errores"</em>, solo se le presentan los ejercicios en los que ha tropezado.
    Para que un ejercicio salga del baúl y se marque como <code>mastered: true</code>, el usuario está obligado a <strong>acertarlo 3 veces consecutivas</strong>. Si lo acierta 2 veces pero al tercer día vuelve a fallar, el contador <code>consecutiveCorrect</code> se resetea inmediatamente a <code>0</code>.
  </p>

  <h3>Control de Racha Diaria (Streak)</h3>
  <p>
    La app compara la fecha actual (<code>YYYY-MM-DD</code>) con <code>lastActiveDate</code>. Si el usuario practicó ayer, incrementa <code>streakDays + 1</code>. Si dejó pasar más de 48 horas sin practicar, la racha vuelve a 1 día, incentivando el hábito diario de tecleo.
  </p>

  <!-- ==================== SECCIÓN 7 ==================== -->
  <div class="page-break"></div>
  <h2 id="sec-7">7. Recorrido por el Código Fuente (Archivo por Archivo)</h2>
  <p>
    A continuación se describe la responsabilidad exacta de cada archivo clave dentro del directorio <code>src/</code>:
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 28%;">Archivo</th>
        <th style="width: 72%;">Responsabilidad y Funciones Clave</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>src/types/index.ts</code></td>
        <td>
          Contrato de datos de todo el proyecto en TypeScript. Define los niveles (<code>A2+</code>, <code>B1</code>, <code>B1+</code>, <code>B2</code>, <code>B2+</code>), las interfaces <code>Exercise</code>, <code>MistakeRecord</code>, <code>UserStats</code>, <code>RoleplayScenario</code> y <code>ExamResult</code>.
        </td>
      </tr>
      <tr>
        <td><code>src/App.tsx</code></td>
        <td>
          Componente raíz. Gestiona la barra de navegación superior (tabs), el estado global de la sesión, la racha diaria de fuego, el botón de ajustes y la orquestación de componentes.
        </td>
      </tr>
      <tr>
        <td><code>src/components/ExerciseCard.tsx</code></td>
        <td>
          Motor visual de renderizado de preguntas. Gestiona el campo de texto, el botón para mostrar la traducción al español, el resaltado de diferencias palabra por palabra (diff rojo/verde), y el botón de "Añadir al Baúl de Errores".
        </td>
      </tr>
      <tr>
        <td><code>src/components/DrillArena.tsx</code></td>
        <td>
          La arena de entrenamiento masivo. Permite alternar entre el modo infinito procedimental, el generador con IA por temas libres, y el Baúl de Errores para machaque intensivo.
        </td>
      </tr>
      <tr>
        <td><code>src/components/WritingZone.tsx</code></td>
        <td>
          Módulo de redacción y situaciones reales ("¿Qué le responderías?"). Contiene escenarios preconfigurados (el mecánico, el casero, el trabajo) y generador de nuevos escenarios interactivos.
        </td>
      </tr>
      <tr>
        <td><code>src/components/ReadingZone.tsx</code></td>
        <td>
          Lector comprensivo con análisis sintáctico "Rayos X". Desglosa los párrafos de historias B1/B2 señalando las construcciones gramaticales utilizadas y lanza preguntas abiertas de redacción.
        </td>
      </tr>
      <tr>
        <td><code>src/components/PhrasalVerbsZone.tsx</code></td>
        <td>
          Explorador de 60+ Phrasal Verbs organizados por la <em>lógica de la partícula</em> (ej. <em>OFF</em> = desconexión/salida; <em>UP</em> = finalización completa) con 3 modos de práctica.
        </td>
      </tr>
      <tr>
        <td><code>src/components/ExamZone.tsx</code></td>
        <td>
          Simulador oficial cronometrado Cambridge Use of English B1/B2 y test diagnóstico de nivelación con desglose de porcentajes por categoría gramatical.
        </td>
      </tr>
      <tr>
        <td><code>src/public/sw.js</code></td>
        <td>
          Service Worker v5. Intercepta las peticiones de red y cachea todos los ficheros JS, CSS, iconos y HTML para arranque instantáneo y uso sin internet.
        </td>
      </tr>
    </tbody>
  </table>

  <!-- ==================== SECCIÓN 8 ==================== -->
  <div class="page-break"></div>
  <h2 id="sec-8">8. Cómo Explicar la App a Otra Persona (El Pitch de 2 Minutos)</h2>
  <p>
    Si un amigo, compañero de trabajo, profesor o entrevistador te pregunta: <em>"¿Cómo funciona esta app de inglés por detrás?"</em>, aquí tienes la explicación perfecta estructurada en 4 puntos clave:
  </p>

  <div class="callout">
    <span class="callout-title">🗣️ Guion de Respuesta Rápida:</span>
    <p>
      <em>"Es una Progressive Web App desarrollada en <strong>React 19 y TypeScript</strong> pensada para saltar del nivel A2 al B2 avanzado de Cambridge. A diferencia de las apps típicas, está 100% enfocada en machacar gramática y redacción de situaciones reales sin perder el tiempo en audios básicos.</em>
    </p>
    <p>
      <em>Por dentro funciona con una arquitectura <strong>client-side first</strong>: tiene un generador combinatorio con más de mil ejercicios algorítmicos que se ejecutan en local a cero coste y en menos de 5 milisegundos, sin necesidad de servidores. Tiene un sistema de <strong>repetición espaciada</strong> que te obliga a acertar cada fallo 3 veces consecutivas para darlo por superado.</em>
    </p>
    <p>
      <em>Además, cuenta con una integración serverless con <strong>modelos de lenguaje (IA)</strong> que evalúa respuestas libres y te pone en situaciones cotidianas (como defenderte en el taller mecánico en inglés). El evaluador está programado con un algoritmo de <strong>tolerancia ortográfica</strong>: no es pedante con guiones ni apóstrofes y se centra en enseñarte inglés real y práctico para trabajar."</em>
    </p>
  </div>

  <h3>Preguntas Frecuentes que te pueden hacer y cómo responder:</h3>
  <ul>
    <li>
      <strong>"¿Cuánto cuesta mantener la app online?"</strong><br>
      <em>0 euros al mes. Está alojada de forma estática en GitHub Pages y compilada con Vite. No requiere ningún servidor en la nube de pago.</em>
    </li>
    <li>
      <strong>"¿Cómo hace para no dar error si pongo 'second hand' sin guion?"</strong><br>
      <em>El código pasa cualquier respuesta por una función llamada <code>normalizeAnswer</code> que unifica guiones con espacios y tolera contracciones informales, y si se usa la IA, un filtro post-procesador descarta cualquier corrección tiquismiquis antes de mostrarla.</em>
    </li>
    <li>
      <strong>"¿Cómo se instala en el móvil si no está en la App Store?"</strong><br>
      <em>Es una PWA (Progressive Web App). Al abrir el enlace desde Safari en iPhone o Chrome en Android, pulsas 'Compartir' o menú de 3 puntos y seleccionas 'Añadir a pantalla de inicio'. Se instala al instante como si fuera nativa y funciona a pantalla completa.</em>
    </li>
  </ul>

  <!-- ==================== SECCIÓN 9 ==================== -->
  <div class="page-break"></div>
  <h2 id="sec-9">9. Despliegue, PWA y Acceso Móvil</h2>

  <h3>Proceso de Compilación y Publicación en GitHub Pages</h3>
  <ol>
    <li>
      <strong>Compilación con Typecheck:</strong> Se ejecuta <code>npm run build</code>, que primero valida todos los tipos con <code>tsc -b</code> y luego genera el paquete optimizado y minificado con Vite en la carpeta <code>dist/</code>.
    </li>
    <li>
      <strong>Soporte SPA en Servidores Estáticos:</strong> Se copia <code>dist/index.html</code> a <code>dist/404.html</code> para que las recargas directas o rutas profundas en GitHub Pages no provoquen error 404.
    </li>
    <li>
      <strong>Despliegue a la rama <code>gh-pages</code>:</strong> El contenido de <code>dist/</code> se empuja mediante Git a la rama huérfana <code>gh-pages</code> del repositorio de GitHub, quedando inmediatamente disponible a nivel mundial bajo CDN de alta velocidad.
    </li>
  </ol>

  <h3>PWA Manifest y Service Worker v5</h3>
  <p>
    El archivo <code>public/manifest.json</code> declara el modo <code>display: "standalone"</code>, con tema oscuro (<code>#0f172a</code>) y los iconos vectoriales SVG. El <code>public/sw.js</code> implementa una estrategia de caché <strong>Network-First con fallback a Cache Storage</strong>:
  </p>
  <pre><span class="comment">// public/sw.js - Versión 5 de Caché PWA</span>
<span class="keyword">const</span> CACHE_NAME = <span class="string">'engdrill-pro-v5'</span>;

self.addEventListener(<span class="string">'activate'</span>, (event) =&gt; {
  <span class="comment">// Limpia automáticamente versiones antiguas de caché cuando se sube una nueva release</span>
  event.waitUntil(
    caches.keys().then((keys) =&gt;
      Promise.all(keys.map(k =&gt; k !== CACHE_NAME ? caches.delete(k) : <span class="keyword">null</span>))
    ).then(() =&gt; self.clients.claim())
  );
});</pre>

  <div class="callout callout-success" style="margin-top: 25px;">
    <span class="callout-title">📌 Conclusión y Resumen del Proyecto</span>
    EngDrill Pro combina lo mejor de la ingeniería de software moderna (TypeScript estricto, React 19, PWA offline, zero-backend serverless) con una metodología pedagógica basada en la práctica activa y el machaque de patrones de alto rendimiento para hispanohablantes.
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
  }
} catch (err) {
  console.error('❌ Error al ejecutar Edge headless:', err);
} finally {
  if (fs.existsSync(htmlPath)) {
    fs.unlinkSync(htmlPath);
  }
}
