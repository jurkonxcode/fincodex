/* ============================================================
   Fincodex — App Bootstrap
   Titik masuk: menyambungkan semua modul.
   ============================================================ */

(function () {
  'use strict';

  function bootstrap() {
    // 1. Load state dari storage
    FincodexStorage.load();

    // 2. Inisialisasi modul
    FincodexEditor.init();
    FincodexPreview.init();
    FincodexConsole.init();

    // 3. Listen perubahan dari editor
    document.addEventListener('fincodex:change', () => {
      FincodexPreview.schedule();
      FincodexStorage.save();
    });

    // 4. Tombol Reset
    document.getElementById('btnReset')?.addEventListener('click', () => {
      if (!confirm('Reset semua kode ke default?')) return;
      FincodexState.reset();
      FincodexStorage.clear();
      FincodexEditor.el.value = FincodexState.getActive();
      FincodexPreview.render();
    });

    // 5. Tombol Export
    document.getElementById('btnExport')?.addEventListener('click', () => {
      const blob = new Blob([FincodexState.html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'fincodex-export.html';
      a.click();
      URL.revokeObjectURL(url);
    });

    // 6. Tab Output (Preview / Console)
    document.querySelectorAll('.out-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.out-tab')
          .forEach(t => t.classList.toggle('active', t === tab));
        const view = tab.dataset.view;
        document.getElementById('preview').style.display =
          view === 'preview' ? 'block' : 'none';
        document.getElementById('console').classList.toggle('hidden',
          view !== 'console');
      });
    });

    // 7. Render pertama
    FincodexPreview.render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
