/* ============================================================
   Fincodex — Editor
   Tab bahasa + textarea.
   ============================================================ */

const FincodexEditor = {
  el: null,
  tabs: null,

  init() {
    this.el = document.getElementById('editor');
    this.tabs = document.querySelectorAll('.lang-tab');
    if (!this.el) return;

    this.el.value = FincodexState.getActive();

    this.el.addEventListener('input', () => {
      FincodexState.setValue(FincodexState.active, this.el.value);
      document.dispatchEvent(new CustomEvent('fincodex:change'));
    });

    this.el.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.el.selectionStart;
        const end = this.el.selectionEnd;
        this.el.value =
          this.el.value.substring(0, start) +
          '  ' +
          this.el.value.substring(end);
        this.el.selectionStart = this.el.selectionEnd = start + 2;
        FincodexState.setValue(FincodexState.active, this.el.value);
        document.dispatchEvent(new CustomEvent('fincodex:change'));
      }
    });

    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => this.switchLang(tab.dataset.lang));
    });
  },

  switchLang(lang) {
    FincodexState.setValue(FincodexState.active, this.el.value);
    FincodexState.active = lang;
    this.tabs.forEach(t =>
      t.classList.toggle('active', t.dataset.lang === lang)
    );
    this.el.value = FincodexState.getActive();
  }
};
