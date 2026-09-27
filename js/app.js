/* ============================================================
   Fincodex — App Bootstrap
   ============================================================ */

(function () {
  'use strict';

  function bootstrap() {
    FincodexStorage.load();

    FincodexEditor.init();
    FincodexPreview.init();
    FincodexConsole.init();

    document.addEventListener('fincodex:change', () => {
      FincodexPreview.schedule();
      FincodexStorage.save();
    });

    document.getElementById('btnReset')?.addEventListener('click', () => {
      if (!confirm('Reset semua kode ke default?')) return;
      FincodexState.reset();
      FincodexStorage.clear();
      FincodexEditor.el.value = FincodexState.getActive();
      FincodexPreview.render();
      FincodexConsole.clear();
    });

    document.getElementById('btnExport')?.addEventListener('click', () => {
      const blob = new Blob([FincodexState.html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'fincodex-export.html';
      a.click();
      URL.revokeObjectURL(url);
    });

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

    FincodexPreview.render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
