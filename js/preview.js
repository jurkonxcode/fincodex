/* ============================================================
   Fincodex — Preview
   Live render ke iframe dengan debounce.
   ============================================================ */

const FincodexPreview = {
  el: null,
  timer: null,
  DEBOUNCE: 400,

  init() {
    this.el = document.getElementById('preview');
    if (!this.el) return;
  },

  schedule() {
    const status = document.getElementById('status');
    if (status) {
      status.textContent = 'Mengetik...';
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.render(), this.DEBOUNCE);
  },

  render() {
    const doc = FincodexState.html
      .replace(
        '</head>',
        `<style>${FincodexState.css}</style></head>`
      )
      .replace(
        '</body>',
        `<script>${this.consoleBridge()}<\/script>
         <script>${FincodexState.js}<\/script>
         </body>`
      );

    this.el.srcdoc = doc;

    const status = document.getElementById('status');
    if (status) {
      status.textContent = 'Live';
    }
  },

  consoleBridge() {
    return `
      (function(){
        const send = (type, args) => {
          parent.postMessage({
            source: 'fincodex',
            type,
            args: Array.from(args).map(a => {
              try {
                return typeof a === 'object' ? JSON.stringify(a) : String(a);
              } catch(e) { return '[objek]'; }
            })
          }, '*');
        };
        ['log','warn','error','info'].forEach(m => {
          const orig = console[m];
          console[m] = (...a) => { send(m, a); orig.apply(console, a); };
        });
        window.addEventListener('error', (e) =>
          send('error', [e.message + ' (baris ' + e.lineno + ')'])
        );
      })();
    `;
  }
};
