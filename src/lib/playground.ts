// Syntax highlighting and playground utilities for code editors

const JS_KEYWORDS = new Set([
  'const', 'let', 'var', 'if', 'else', 'for', 'while', 'do', 'switch',
  'case', 'break', 'continue', 'return', 'function', 'class', 'try',
  'catch', 'finally', 'throw', 'new', 'typeof', 'instanceof', 'in', 'of',
  'await', 'async'
]);

const JS_LITERALS = new Set(['true', 'false', 'null', 'undefined', 'NaN', 'Infinity']);

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function highlightJavaScript(code: string): string {
  let i = 0;
  let result = '';

  function push(type: string | null, value: string) {
    if (!value) return;
    const escaped = escapeHtml(value);
    if (type) {
      result += `<span class="token ${type}">${escaped}</span>`;
    } else {
      result += escaped;
    }
  }

  while (i < code.length) {
    const char = code[i];

    if (char === '/' && code[i + 1] === '/') {
      const start = i;
      i += 2;
      while (i < code.length && code[i] !== '\n') {
        i++;
      }
      push('comment', code.slice(start, i));
      continue;
    }

    if (char === '/' && code[i + 1] === '*') {
      const start = i;
      i += 2;
      while (i < code.length && !(code[i] === '*' && code[i + 1] === '/')) {
        i++;
      }
      if (i < code.length) {
        i += 2;
      }
      push('comment', code.slice(start, i));
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      const quote = char;
      const start = i;
      i++;
      while (i < code.length) {
        if (code[i] === '\\') {
          i += 2;
          continue;
        }
        if (code[i] === quote) {
          i++;
          break;
        }
        i++;
      }
      push('string', code.slice(start, i));
      continue;
    }

    if (/[0-9]/.test(char)) {
      const start = i;
      i++;
      while (i < code.length && /[0-9._xXbBeE]/.test(code[i])) {
        i++;
      }
      push('number', code.slice(start, i));
      continue;
    }

    if (/[A-Za-z_$]/.test(char)) {
      const start = i;
      i++;
      while (i < code.length && /[A-Za-z0-9_$]/.test(code[i])) {
        i++;
      }
      const word = code.slice(start, i);
      if (JS_KEYWORDS.has(word)) {
        push('keyword', word);
      } else if (JS_LITERALS.has(word)) {
        push('literal', word);
      } else {
        push(null, word);
      }
      continue;
    }

    push(null, char);
    i++;
  }

  return result || '&nbsp;';
}

export function getHighlightedCode(code: string, language?: string): string {
  if (language === 'js') {
    return highlightJavaScript(code);
  }
  return escapeHtml(code);
}

export interface HighlighterController {
  update: () => void;
}

const highlightControllers = new WeakMap<HTMLTextAreaElement, HighlighterController>();

export function attachHighlighter(textarea: HTMLTextAreaElement): void {
  const language = textarea.dataset.highlight;
  if (!language) return;
  const wrapper = textarea.closest('.editor-area') as HTMLDivElement | null;
  const highlightLayer = wrapper?.querySelector('.editor-highlight') as HTMLPreElement | null;
  if (!wrapper || !highlightLayer) return;

  wrapper.setAttribute('data-has-highlight', 'true');

  const updateHighlight = () => {
    const code = textarea.value || '';
    const highlighted = getHighlightedCode(code, language);
    highlightLayer.innerHTML = `${highlighted}<span class="token placeholder">&nbsp;</span>`;
    highlightLayer.scrollTop = textarea.scrollTop;
    highlightLayer.scrollLeft = textarea.scrollLeft;
  };

  const syncScroll = () => {
    highlightLayer.scrollTop = textarea.scrollTop;
    highlightLayer.scrollLeft = textarea.scrollLeft;
  };

  textarea.addEventListener('input', updateHighlight);
  textarea.addEventListener('scroll', syncScroll);

  highlightControllers.set(textarea, { update: updateHighlight });
  updateHighlight();
}

export function refreshHighlight(textarea?: HTMLTextAreaElement | null): void {
  if (!textarea) return;
  const controller = highlightControllers.get(textarea);
  if (controller) {
    controller.update();
  }
}

export interface PlaygroundOptions {
  isJsOnly?: boolean;
  height?: string;
}

export function initPlayground(container: HTMLElement, options: PlaygroundOptions = {}): void {
  const { isJsOnly = false, height = '400px' } = options;

  const htmlEditor = container.querySelector('.html-editor') as HTMLTextAreaElement | null;
  const cssEditor = container.querySelector('.css-editor') as HTMLTextAreaElement | null;
  const jsEditor = container.querySelector('.js-editor') as HTMLTextAreaElement | null;
  const previewFrame = container.querySelector('.preview-frame') as HTMLIFrameElement | null;
  const resetButton = container.querySelector('[data-action="reset"]') as HTMLButtonElement | null;
  const controlButtons = container.querySelectorAll('.control-button') as NodeListOf<HTMLButtonElement>;
  const runJsButton = container.querySelector('[data-action="run-js"]') as HTMLButtonElement | null;
  const consoleOutput = container.querySelector('[data-console-output]') as HTMLDivElement | null;

  const textareas = container.querySelectorAll('.editor-textarea') as NodeListOf<HTMLTextAreaElement>;
  textareas.forEach(textarea => attachHighlighter(textarea));

  // JS-Only mode: no HTML/CSS editors, no iframe live preview, only run JS on demand
  if (isJsOnly && jsEditor && runJsButton && consoleOutput) {
    const originalJS = jsEditor.value;

    function runUserCode() {
      if (!consoleOutput) return;
      consoleOutput.textContent = '';
      const logs: string[] = [];

      const originalLog = console.log;
      (console as any).log = (...args: any[]) => {
        logs.push(args.map(a => {
          if (typeof a === 'object') {
            try {
              return JSON.stringify(a);
            } catch {
              return String(a);
            }
          }
          return String(a);
        }).join(' '));
        originalLog.apply(console, args);
      };

      try {
        if (!jsEditor) {
          throw new Error('Editor de JS no encontrado.');
        }
        // eslint-disable-next-line no-new-func
        const fn = new Function(jsEditor.value);
        fn();
      } catch (error: any) {
        logs.push('❌ Error: ' + (error && error.message ? error.message : String(error)));
      } finally {
        console.log = originalLog;
      }

      if (!consoleOutput) return;
      if (logs.length === 0) {
        consoleOutput.textContent = 'No hubo salida con console.log().';
      } else {
        consoleOutput.textContent = logs.join('\n');
      }
    }

    runJsButton.addEventListener('click', runUserCode);

    if (resetButton) {
      resetButton.addEventListener('click', () => {
        if (jsEditor) {
          jsEditor.value = originalJS;
          refreshHighlight(jsEditor);
        }
        if (consoleOutput) {
          consoleOutput.textContent = 'Editor reseteado. Haz clic en "Ejecutar código" para ver la salida.';
        }
      });
    }

    return;
  }

  // HTML/CSS/JS playground (modo clásico)
  if (!htmlEditor || !cssEditor || !previewFrame) {
    refreshHighlight(jsEditor);
    return;
  }

  const originalHTML = htmlEditor.value;
  const originalCSS = cssEditor.value;
  const originalJS = jsEditor ? jsEditor.value : '';

  function updatePreview() {
    if (!htmlEditor || !cssEditor || !previewFrame) return;

    const htmlContent = htmlEditor.value;
    const cssContent = cssEditor.value;
    const jsContent = jsEditor ? jsEditor.value : '';

    const previewDocument = `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { padding: 1rem; font-family: system-ui, -apple-system, sans-serif; }
            ${cssContent}
          </style>
        </head>
        <body>
          ${htmlContent}
          <script>
            ${jsContent}
          <\/script>
        </body>
      </html>
    `;

    const blob = new Blob([previewDocument], { type: 'text/html; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    previewFrame.src = url;

    previewFrame.onload = () => {
      URL.revokeObjectURL(url);
    };
  }

  let timeoutId: number;
  function handleInput() {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(updatePreview, 300);
  }

  htmlEditor.addEventListener('input', handleInput);
  cssEditor.addEventListener('input', handleInput);
  if (jsEditor) {
    jsEditor.addEventListener('input', handleInput);
  }

  controlButtons.forEach(button => {
    button.addEventListener('click', () => {
      const cssChange = button.dataset.cssChange;
      if (cssChange) {
        cssEditor.value = cssChange;
        updatePreview();
      }
    });
  });

  if (resetButton) {
    resetButton.addEventListener('click', () => {
      htmlEditor.value = originalHTML;
      cssEditor.value = originalCSS;
      if (jsEditor) {
        jsEditor.value = originalJS;
        refreshHighlight(jsEditor);
      }
      updatePreview();
    });
  }

  updatePreview();
}

export function initAllPlaygrounds(): void {
  const playgrounds = document.querySelectorAll('.playground-container');
  playgrounds.forEach(playground => {
    const isJsOnly = playground.getAttribute('data-js-only') === 'true';
    initPlayground(playground as HTMLElement, { isJsOnly });
  });
}
