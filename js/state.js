/* ============================================================
   Fincodex — State
   Single source of truth untuk data aplikasi.
   ============================================================ */

const FincodexState = {
  html: `<!DOCTYPE html>
<html>
<head></head>
<body>
  <h1>Halo, Fincodex! 👋</h1>
  <p>Ubah kode di atas, hasilnya muncul live.</p>
</body>
</html>`,

  css: `body {
  font-family: sans-serif;
  text-align: center;
  padding: 40px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}`,

  js: `console.log("Selamat datang di Fincodex!");`,

  active: 'html',

  defaults: {
    html: `<!DOCTYPE html>
<html>
<head></head>
<body>
  <h1>Halo, Fincodex! 👋</h1>
</body>
</html>`,
    css: `body { font-family: sans-serif; text-align: center; padding: 40px; }`,
    js: `console.log("Halo dari Fincodex!");`
  },

  setValue(lang, value) {
    if (this[lang] !== undefined) this[lang] = value;
  },

  getActive() {
    return this[this.active] || '';
  },

  reset() {
    this.html = this.defaults.html;
    this.css = this.defaults.css;
    this.js = this.defaults.js;
  }
};
