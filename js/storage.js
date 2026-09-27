/* ============================================================
   Fincodex — Storage
   Wrapper localStorage untuk auto-save.
   ============================================================ */

const FincodexStorage = {
  KEY: 'fincodex_v1',

  save() {
    try {
      const data = {
        html: FincodexState.html,
        css: FincodexState.css,
        js: FincodexState.js,
        active: FincodexState.active,
        savedAt: Date.now()
      };
      localStorage.setItem(this.KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.warn('Storage save gagal:', e);
      return false;
    }
  },

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (data.html) FincodexState.html = data.html;
      if (data.css)  FincodexState.css  = data.css;
      if (data.js)   FincodexState.js   = data.js;
      if (data.active) FincodexState.active = data.active;
      return true;
    } catch (e) {
      console.warn('Storage load gagal:', e);
      return false;
    }
  },

  clear() {
    try { localStorage.removeItem(this.KEY); } catch (e) {}
  }
};
