/* ============================================================
   TSRHA landing page — progressive enhancement
   - mobile nav toggle
   - smooth scroll (JS fallback + close menu on click)
   - active nav highlight via IntersectionObserver
   - back-to-top button
   No content is ever hidden by JS: every section is visible regardless of
   scroll position, JS availability, or IntersectionObserver support.
   ============================================================ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "開啟選單");
  }
  function openNav() {
    if (!nav || !toggle) return;
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "關閉選單");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) closeNav();
      else openNav();
    });
    // Close menu after choosing a link
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
    // Close when resizing up to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) closeNav();
    });
  }

  /* ---------- Smooth in-page scrolling (explicit, honors reduced motion) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start"
      });
      // Move focus for accessibility without extra scroll jump
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      if (history.replaceState) history.replaceState(null, "", id);
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = Array.prototype.slice.call(nav ? nav.querySelectorAll('a[href^="#"]') : []);
  var linkFor = {};
  navLinks.forEach(function (a) {
    linkFor[a.getAttribute("href").slice(1)] = a;
  });

  function setActive(id) {
    navLinks.forEach(function (a) { a.classList.remove("is-active"); });
    if (linkFor[id]) {
      linkFor[id].classList.add("is-active");
      linkFor[id].setAttribute("aria-current", "true");
    }
    navLinks.forEach(function (a) {
      if (!a.classList.contains("is-active")) a.removeAttribute("aria-current");
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Back to top ---------- */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    var onScroll = function () {
      if (window.scrollY > 600) {
        toTop.hidden = false;
        // next frame so transition plays
        requestAnimationFrame(function () { toTop.classList.add("is-visible"); });
      } else {
        toTop.classList.remove("is-visible");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toTop.addEventListener("transitionend", function () {
      if (!toTop.classList.contains("is-visible")) toTop.hidden = true;
    });

    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
      var top = document.getElementById("top");
      if (top) { top.setAttribute("tabindex", "-1"); top.focus({ preventScroll: true }); }
    });
  }
})();
