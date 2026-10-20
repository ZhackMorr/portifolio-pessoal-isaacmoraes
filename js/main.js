/* ==========================================================================
   Portfólio — Isaac Moraes
   Interações: cabeçalho, menu mobile, rolagem suave, reveal, abas de
   projeto, lightbox e brilho nos cartões. JavaScript puro, sem dependências.
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Utilidades ---------- */
  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  /* ---------- Ano no rodapé ---------- */
  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Cabeçalho ao rolar ---------- */
  var header = $('.site-header');
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
    // No topo da página nenhuma seção deve aparecer como ativa no menu
    if (navLinks && window.scrollY < 200) {
      navLinks.forEach(function (a) { a.classList.remove('is-current'); a.removeAttribute('aria-current'); });
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  var toggle = $('.menu-toggle');
  var nav = $('#menu');
  var navLinks = $$('a', nav);
  navLinks.forEach(function (a, i) { a.style.setProperty('--i', i); });

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
    doc.body.classList.toggle('menu-open', open);
  }
  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
  });
  window.matchMedia('(min-width: 861px)').addEventListener('change', function (e) {
    if (e.matches) setMenu(false);
  });

  /* ---------- Rolagem suave com easing próprio ---------- */
  var scrollAnimation = null;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function cancelScroll() {
    if (scrollAnimation) { cancelAnimationFrame(scrollAnimation); scrollAnimation = null; }
  }

  function scrollToY(targetY, done) {
    cancelScroll();
    var startY = window.scrollY;
    var distance = targetY - startY;
    if (reduceMotion.matches || Math.abs(distance) < 2) {
      window.scrollTo(0, targetY);
      if (done) done();
      return;
    }
    var duration = Math.min(1400, Math.max(700, Math.abs(distance) * 0.55));
    var startTime = null;

    function step(now) {
      if (startTime === null) startTime = now;
      var progress = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(progress));
      if (progress < 1) {
        scrollAnimation = requestAnimationFrame(step);
      } else {
        scrollAnimation = null;
        if (done) done();
      }
    }
    scrollAnimation = requestAnimationFrame(step);
  }

  ['wheel', 'touchstart', 'keydown'].forEach(function (evt) {
    window.addEventListener(evt, cancelScroll, { passive: true });
  });

  function headerOffset() {
    return 64; // altura do cabeçalho compacto
  }

  doc.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var hash = link.getAttribute('href');
    if (hash.length < 2) return;
    var target = doc.getElementById(hash.slice(1));
    if (!target) return;

    e.preventDefault();
    if (nav.classList.contains('is-open')) setMenu(false);

    var y;
    if (target.id === 'inicio') {
      y = 0;
    } else {
      y = target.getBoundingClientRect().top + window.scrollY - headerOffset() - 8;
    }
    scrollToY(Math.max(0, y), function () {
      if (history.replaceState) history.replaceState(null, '', hash);
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  /* ---------- Revelação ao rolar ---------- */
  var revealItems = $$('.reveal');
  // Escalonamento: cada item recebe um atraso conforme sua posição entre irmãos
  revealItems.forEach(function (el) {
    var siblings = $$('.reveal', el.parentElement).filter(function (s) { return s.parentElement === el.parentElement; });
    el.style.setProperty('--i', Math.min(siblings.indexOf(el), 6));
  });
  $$('.meter').forEach(function (m) {
    $$('i', m).forEach(function (bar, i) { bar.style.setProperty('--i', i + 2); });
  });

  function reveal(el) {
    el.classList.add('is-visible', 'in-view');
    // Libera a transição do cartão para o hover assim que a revelação termina
    window.setTimeout(function () {
      el.classList.remove('reveal', 'is-visible');
      el.style.removeProperty('--i');
    }, 1700);
  }

  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { reveal(entry.target); revealObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealItems.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.remove('reveal'); el.classList.add('in-view'); });
  }

  /* ---------- Link ativo no menu ---------- */
  var sections = $$('main section[id]').filter(function (s) {
    return navLinks.some(function (a) { return a.getAttribute('href') === '#' + s.id; });
  });
  if ('IntersectionObserver' in window) {
    var currentObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + entry.target.id;
          a.classList.toggle('is-current', on);
          if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { currentObserver.observe(s); });
  }

  /* ---------- Abas de projeto ---------- */
  var tabs = $$('.project-tab');
  var panels = $$('.project-panel');
  var stageTag = $('#stage-tag');

  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach(function (p) {
      var on = p.id === tab.getAttribute('aria-controls');
      p.hidden = !on;
      p.classList.remove('is-entering');
      if (on) {
        void p.offsetWidth;
        p.classList.add('is-entering');
        if (stageTag) stageTag.textContent = p.getAttribute('data-tag') || '';
      }
    });
    if (focus) tab.focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab, false); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') next = tabs[0];
      if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); selectTab(next, true); }
    });
  });

  /* ---------- Lightbox ---------- */
  var lightbox = $('#lightbox');
  var lbImg = $('#lightbox-img');
  var lbCap = $('#lightbox-cap');
  var shots = $$('[data-lightbox]');
  var lbIndex = 0;
  var lastTrigger = null;

  function showShot(i) {
    lbIndex = (i + shots.length) % shots.length;
    var btn = shots[lbIndex];
    var img = $('img', btn);
    var cap = $('figcaption span', btn.parentElement);
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = (cap ? cap.textContent : '') + ' · Dados fictícios · ' + (lbIndex + 1) + '/' + shots.length;
  }

  function openLightbox(i, trigger) {
    if (!lightbox || typeof lightbox.showModal !== 'function') {
      window.open(shots[i].querySelector('img').src, '_blank', 'noopener');
      return;
    }
    lastTrigger = trigger;
    showShot(i);
    lightbox.showModal();
  }

  shots.forEach(function (btn, i) {
    btn.addEventListener('click', function () { openLightbox(i, btn); });
  });

  if (lightbox) {
    $('.lb-close', lightbox).addEventListener('click', function () { lightbox.close(); });
    $('.lb-prev', lightbox).addEventListener('click', function (e) { e.stopPropagation(); showShot(lbIndex - 1); });
    $('.lb-next', lightbox).addEventListener('click', function (e) { e.stopPropagation(); showShot(lbIndex + 1); });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.tagName === 'FIGURE') lightbox.close();
    });
    lightbox.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') showShot(lbIndex - 1);
      if (e.key === 'ArrowRight') showShot(lbIndex + 1);
    });
    lightbox.addEventListener('close', function () {
      if (lastTrigger) lastTrigger.focus();
    });
  }

  /* ---------- Brilho que segue o cursor nos cartões ---------- */
  if (window.matchMedia('(hover: hover)').matches && !reduceMotion.matches) {
    doc.addEventListener('pointermove', function (e) {
      var card = e.target.closest && e.target.closest('.card');
      if (!card) return;
      var rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
    }, { passive: true });
  }
})();
