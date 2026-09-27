/* ============================================================
   Fincodex — Console
   Menangkap log dari iframe via postMessage.
   ============================================================ */

const FincodexConsole = {
  el: null,

  init() {
    this.el = document.getElementById('console');
    if (!this.el) return;

    window.addEventListener('message', (e) => this.handle(e.data));
  },

  handle(data) {
    if (!data || data.source !== 'fincodex') return;

    const line = document.createElement('div');
    line.className = 'log-line ' + data.type;

    const time = new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    line.innerHTML =
      `<span class="prefix">${time}</span>` +
      this.escape(data.args.join(' '));

    this.el.appendChild(line);
    this.el.scrollTop = this.el.scrollHeight;

    if (data.type === 'error') {
      const consoleTab = document.querySelector('[data-view="console"]');
      if (consoleTab) consoleTab.click();
    }
  },

  escape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  },

  clear() {
    if (this.el) this.el.innerHTML = '';
  }
};
