(function () {
  "use strict";

  var root = document.documentElement;
  var STORAGE_KEY = "gmc-theme";

  function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  function currentTheme() {
    return root.getAttribute("data-theme") || systemTheme();
  }
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
  }

  var SUN =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>';
  var MOON =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>';

  function paint(btn) {
    // mostra o ícone do modo para o qual o clique vai mudar
    btn.innerHTML = currentTheme() === "light" ? MOON : SUN;
  }

  function makeToggle() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    btn.setAttribute("aria-label", "Alternar tema claro/escuro");
    paint(btn);
    btn.addEventListener("click", function () {
      var next = currentTheme() === "light" ? "dark" : "light";
      applyTheme(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
      paint(btn);
    });
    document.body.appendChild(btn);
  }

  function initPageTransitions() {
    document.querySelectorAll('a[href$=".html"]').forEach(function (a) {
      if (a.target === "_blank") return;
      a.addEventListener("click", function (e) {
        var href = a.getAttribute("href");
        if (!href) return;
        e.preventDefault();
        document.body.classList.add("fade-out");
        setTimeout(function () {
          window.location.href = href;
        }, 180);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    makeToggle();
    initPageTransitions();
  });
})();
