(function () {
  'use strict';

  var NAV = [
    { href: '首页.html', label: '首页', en: 'HOME' },
    { href: '永定河志.html', label: '永定河志', en: 'THE RIVER' },
    { href: '历史.html', label: '历史', en: 'HISTORY' },
    { href: '数字展厅.html', label: '数字展厅', en: 'EXHIBITIONS' },
    { href: '馆藏精粹.html', label: '馆藏精粹', en: 'COLLECTION' },
    { href: '参观指南.html', label: '参观指南', en: 'VISITOR GUIDE' }
  ];

  var currentPage = (function () {
    var p = location.pathname.split('/').pop();
    p = p && p.indexOf('.') > -1 ? p : '首页.html';
    var halls = ['序厅.html', '第一展厅.html', '第二展厅.html', '第三展厅.html', '第四展厅.html', '尾厅.html'];
    if (halls.indexOf(p) > -1) p = '数字展厅.html';
    return p;
  })();

  var SPRITE = [
    '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden">',
    '<defs>',

    // —— 主题图形 120×120 ——
    '<symbol id="ic-bridge" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">',
    '<path d="M12 58h96"/><path d="M14 50h92"/><path d="M14 58V50h92v8"/>',
    '<path d="M24 50v-6M40 50v-6M56 50v-6M72 50v-6M88 50v-6M104 50v-6"/>',
    '<path d="M20 80V58M44 80V58M68 80V58M92 80V58"/>',
    '<path d="M20 80a12 12 0 0 1 24 0"/><path d="M44 80a12 12 0 0 1 24 0"/><path d="M68 80a12 12 0 0 1 24 0"/>',
    '<path d="M12 80h96"/>',
    '<circle cx="24" cy="42" r="2.3"/><circle cx="56" cy="42" r="2.3"/><circle cx="88" cy="42" r="2.3"/>',
    '<path d="M14 92c4-3 8-3 12 0s8 3 12 0 8-3 12 0 8 3 12 0 8-3 12 0 8 3 12 0 8-3 12 0"/>',
    '<path d="M22 101c4-3 8-3 12 0s8 3 12 0 8-3 12 0 8 3 12 0 8-3 12 0"/>',
    '</symbol>',

    '<symbol id="ic-lion" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">',
    '<circle cx="60" cy="52" r="33"/><circle cx="60" cy="52" r="22"/>',
    '<path d="M60 19v-8M60 85v8M27 52h-8M93 52h8M37 29l-6-6M83 29l6-6M37 75l-6 6M83 75l6 6"/>',
    '<path d="M47 33l-4-8M73 33l4-8"/>',
    '<circle cx="52" cy="48" r="2.6" fill="currentColor"/><circle cx="68" cy="48" r="2.6" fill="currentColor"/>',
    '<path d="M56 57c0 3 1.8 5 4 5s4-2 4-5"/><path d="M60 62v5"/>',
    '<path d="M42 96h36"/><path d="M48 96v7h24v-7"/>',
    '</symbol>',

    '<symbol id="ic-dam" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">',
    '<path d="M10 76l22-33 18 27"/><path d="M110 76L88 41 70 68"/>',
    '<path d="M44 76h32l7 13H37z"/><path d="M44 76h32"/>',
    '<rect x="54" y="57" width="12" height="14" rx="1"/>',
    '<path d="M51 57h18l-3-7H54z"/>',
    '<path d="M14 94c6-3 10-3 16 0s10 3 16 0 10-3 16 0 10 3 16 0 10-3 16 0"/>',
    '<path d="M22 103c6-3 10-3 16 0s10 3 16 0 10-3 16 0 10 3 16 0"/>',
    '</symbol>',

    '<symbol id="ic-vessel" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">',
    '<ellipse cx="60" cy="38" rx="22" ry="6"/>',
    '<path d="M38 38c0 20 8 33 22 33s22-13 22-33"/>',
    '<path d="M38 51c6 3 12 4 22 4s16-1 22-4"/>',
    '<path d="M50 68l-5 19M60 71v16M70 68l5 19"/>',
    '<path d="M38 43c-8 2-8 11 0 13"/><path d="M82 43c8 2 8 11 0 13"/>',
    '<path d="M50 27v-5M60 25v-7M70 27v-5"/>',
    '</symbol>',

    '<symbol id="ic-stele" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">',
    '<path d="M48 34v46h24V34"/><path d="M44 34h32"/>',
    '<path d="M41 34l7-11h24l7 11"/>',
    '<path d="M41 80h38"/><path d="M46 88h28"/><path d="M46 94h28"/>',
    '<path d="M54 48h12M54 56h12M54 64h12M58 72h4"/>',
    '</symbol>',

    '<symbol id="ic-drum" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">',
    '<circle cx="60" cy="50" r="30"/><circle cx="60" cy="50" r="21"/>',
    '<path d="M56 81h8v15h-8z"/>',
    '<path d="M44 27l-4-6M76 27l4-6M28 50h-6M92 50h6M38 72l-5 5M82 72l5 5"/>',
    '<path d="M60 29v42"/>',
    '</symbol>',

    '<symbol id="ic-mountain" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">',
    '<path d="M10 82L38 38l16 26 14-30 20 48"/><path d="M10 82h100"/>',
    '<path d="M30 52l8 6 6-4M62 46l8 8 6-4"/>',
    '<path d="M18 92c5-3 9-3 14 0s9 3 14 0 9-3 14 0 9 3 14 0 9-3 14 0"/>',
    '<path d="M26 101c5-3 9-3 14 0s9 3 14 0 9-3 14 0 9 3 14 0"/>',
    '</symbol>',

    '<symbol id="ic-arch" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">',
    '<path d="M22 92V54a38 38 0 0 1 76 0v38"/>',
    '<path d="M36 92V56a24 24 0 0 1 48 0v36"/>',
    '<path d="M14 92h92"/>',
    '<path d="M52 33l8-6 8 6"/><path d="M30 47h6M84 47h6"/>',
    '</symbol>',

    '<symbol id="ic-fish" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">',
    '<path d="M30 58c11 15 35 15 46 0-11-15-35-15-46 0z"/>',
    '<path d="M76 58l18-12v24z"/>',
    '<circle cx="40" cy="55" r="2" fill="currentColor"/>',
    '<path d="M56 47c3-6 8-7 12-3"/>',
    '<path d="M16 82c5-4 9-4 14 0s9 4 14 0 9-4 14 0 9 4 14 0 9-4 14 0"/>',
    '<path d="M26 92c5-4 9-4 14 0s9 4 14 0 9-4 14 0 9 4 14 0"/>',
    '</symbol>',

    '<symbol id="ic-scroll" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">',
    '<rect x="26" y="40" width="68" height="40" rx="2"/>',
    '<ellipse cx="26" cy="60" rx="7" ry="20"/><ellipse cx="94" cy="60" rx="7" ry="20"/>',
    '<path d="M40 51h34M40 60h40M40 69h24"/>',
    '</symbol>',

    '<symbol id="ic-banner" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">',
    '<path d="M46 20v76"/><path d="M34 26h48"/>',
    '<path d="M58 26h22v46l-11-6-11 6z"/>',
    '<path d="M58 74v12M80 74v12"/>',
    '<path d="M30 100h60"/>',
    '</symbol>',

    '<symbol id="ic-seal" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">',
    '<rect x="32" y="32" width="56" height="56" rx="3"/><rect x="39" y="39" width="42" height="42" rx="1"/>',
    '<path d="M47 52h26M47 61h26M47 70h16M69 61v9"/>',
    '</symbol>',

    '<symbol id="ic-wall" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">',
    '<path d="M18 92V56h84v36z"/><path d="M18 68h84M18 80h84"/>',
    '<path d="M30 56V44h12v12M54 56V44h12v12M78 56V44h12v12"/>',
    '<path d="M44 68v12M68 68v12M32 80v12M56 80v12M80 80v12"/>',
    '<path d="M14 92h92"/>',
    '</symbol>',

        '<symbol id="ic-bird" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">',
    '<circle cx="66" cy="34" r="7"/>',
    '<path d="M73 33l12-4"/>',
    '<path d="M62 41c-5 3-7 9-6 17l2 11"/>',
    '<path d="M58 69c9 6 19 5 26-2 4-4 6-9 6-15"/>',
    '<path d="M60 69c-6 2-10 0-13-5"/>',
    '<path d="M58 69v16M64 70v16"/>',
    '<path d="M46 96c5-4 9-4 14 0s9 4 14 0 9-4 14 0 9 4 14 0"/>',
    '<path d="M54 106c5-4 9-4 14 0s9 4 14 0 9-4 14 0"/>',
    '</symbol>',

    '<symbol id="ic-blade" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">',
    '<path d="M34 78L50 40l22-12 16 14-8 26-24 16z"/>',
    '<path d="M50 40l4 28M72 28l-6 40M44 66l26-2"/>',
    '<path d="M78 30l10 8-4 12"/>',
    '<path d="M26 92h66"/>',
    '</symbol>',

    '<symbol id="ic-shell" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">',
    '<path d="M60 90L28 50a38 38 0 0 1 64 0z"/>',
    '<path d="M60 90V26M60 90L38 34M60 90l22-56M60 90L26 54M60 90l34-36"/>',
    '<path d="M24 52a42 42 0 0 1 72 0"/>',
    '<path d="M54 90h12"/>',
    '</symbol>',

    '<symbol id="i-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></symbol>',
    '<symbol id="i-ticket" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M9 6v12" stroke-dasharray="2 2.4"/></symbol>',
    '<symbol id="i-train" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3.5" width="12" height="13" rx="3"/><path d="M6 11h12"/><circle cx="9.5" cy="14" r=".9" fill="currentColor"/><circle cx="14.5" cy="14" r=".9" fill="currentColor"/><path d="M8.5 20.5l2-4M15.5 20.5l-2-4"/></symbol>',
    '<symbol id="i-headset" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.5V12a8 8 0 0 1 16 0v2.5"/><rect x="2.5" y="13" width="4" height="6" rx="2"/><rect x="17.5" y="13" width="4" height="6" rx="2"/><path d="M19.5 19v.6a2.4 2.4 0 0 1-2.4 2.4H14"/></symbol>',
    '<symbol id="i-info" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r=".9" fill="currentColor"/></symbol>',
    '<symbol id="i-access" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="4.6" r="1.9"/><path d="M11 7v5.5h5l3 6"/><path d="M11 9.5H8"/><path d="M10.4 17.2a4.2 4.2 0 1 1 5.2-6.4"/></symbol>',
    '<symbol id="i-wifi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.2a13 13 0 0 1 18 0"/><path d="M6.6 12.6a8 8 0 0 1 10.8 0"/><path d="M10 15.9a3.6 3.6 0 0 1 4 0"/><circle cx="12" cy="19" r="1" fill="currentColor"/></symbol>',
    '<symbol id="i-bag" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 8h15l-1.3 12h-12.4z"/><path d="M9 8V6.2a3 3 0 0 1 6 0V8"/></symbol>',
    '<symbol id="i-audio" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10v4h3l4 3.6V6.4L7 10z"/><path d="M15 9.6a3.4 3.4 0 0 1 0 4.8"/><path d="M17.6 7a7 7 0 0 1 0 10"/></symbol>',
    '<symbol id="i-parking" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3.5" width="16" height="17" rx="2.5"/><path d="M10 16.5V7.5h3.2a2.8 2.8 0 0 1 0 5.6H10"/></symbol>',
    '<symbol id="i-cup" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h12v5.5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 9h2a2.5 2.5 0 0 1 0 5h-2"/><path d="M4.5 20.5h12"/></symbol>',
    '<symbol id="i-map" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4L3.5 6.2v13.6L9 17.6l6 2.2 5.5-2.2V3.9L15 6.1z"/><path d="M9 4v13.6M15 6.1v13.7"/></symbol>',
    '<symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></symbol>',
    '<symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.6 7l8.4 6 8.4-6"/></symbol>',
    '<symbol id="i-calendar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></symbol>',
    '<symbol id="i-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15"/><path d="M13 6l6 6-6 6"/></symbol>',
    '<symbol id="i-arrow-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V5"/><path d="M6 11l6-6 6 6"/></symbol>',
    '<symbol id="i-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9.5l6 6 6-6"/></symbol>',
    '<symbol id="i-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></symbol>',
    '<symbol id="i-expand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"/></symbol>',
    '<symbol id="i-play" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 5.5l10 6.5-10 6.5z"/></symbol>',
    '<symbol id="i-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.8" cy="10.8" r="6.3"/><path d="M15.6 15.6L20.5 20.5"/></symbol>',

    '</defs>',
    '</svg>'
  ].join('');

  function navMarkup(cls) {
    return NAV.map(function (item) {
      var active = item.href === currentPage ? ' is-active' : '';
      var aria = item.href === currentPage ? ' aria-current="page"' : '';
      return '<li><a class="' + cls + active + '" href="' + item.href + '"' + aria + '>' + item.label + '</a></li>';
    }).join('');
  }

  function headerMarkup() {
    return [
      '<a class="skip-link" href="#main">跳到主要内容</a>',
      '<header class="site-header site-header--over" id="siteHeader">',
      '<div class="site-header__inner">',
      '<a class="brand" href="首页.html" aria-label="永定河数字博物馆 首页">',
      '<span class="brand__seal" aria-hidden="true">永</span>',
      '<span class="brand__text">',
      '<span class="brand__name">永定河数字博物馆</span>',
      '<span class="brand__sub">Yongding River · Digital Museum</span>',
      '</span>',
      '</a>',
      '<nav class="nav" aria-label="主导航"><ul style="display:flex;align-items:center;gap:2px;margin:0;padding:0;list-style:none">' +
        navMarkup('nav__link') + '</ul></nav>',
      '<div class="header-right">',
      '<a class="btn btn--ghost btn--sm" href="数字展厅.html">进入展厅' +
        '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrow"/></svg></a>',
      '<button class="burger" type="button" aria-label="打开菜单" aria-expanded="false" aria-controls="mobileMenu">' +
        '<span></span><span></span><span></span></button>',
      '</div>',
      '</div>',
      '</header>',
      '<div class="mobile-menu" id="mobileMenu" aria-hidden="true">',
      '<nav aria-label="移动端导航"><ul class="mobile-menu__list">' +
        NAV.map(function (item, i) {
          return '<li style="transition-delay:' + (120 + i * 60) + 'ms"><a href="' + item.href + '">' +
            item.label + '<span>' + item.en + '</span></a></li>';
        }).join('') + '</ul></nav>',
      '<div class="mobile-menu__foot">线上展厅 7 × 24 小时开放 · 全部免费</div>',
      '</div>'
    ].join('');
  }

  function footerMarkup() {
    return [
      '<footer class="site-footer">',
      '<div class="container">',
      '<div class="footer-grid">',
      '<div class="footer-brand">',
      '<div class="brand"><span class="brand__seal" aria-hidden="true">永</span>',
      '<span class="brand__text"><span class="brand__name">永定河数字博物馆</span>',
      '<span class="brand__sub">Yongding River · Digital Museum</span></span></div>',
      '<p>一条河与一座城的八百万年。以数字方式收藏永定河的山水、桥梁、水利与烟火，让母亲河的故事可以被看见、被听见、被带走。</p>',
      '</div>',
      '<div class="footer-col"><h4>Visit</h4><ul>',
      '<li><a href="参观指南.html">参观指南</a></li>',
      '<li><a href="guide.html#hours">开放时间</a></li>',
      '<li><a href="guide.html#transport">交通与寻访</a></li>',
      '<li><a href="guide.html#faq">常见问题</a></li>',
      '</ul></div>',
      '<div class="footer-col"><h4>Explore</h4><ul>',
      '<li><a href="永定河志.html">永定河志</a></li>',
      '<li><a href="历史.html">历史</a></li>',
      '<li><a href="数字展厅.html">数字展厅</a></li>',
      '<li><a href="馆藏精粹.html">馆藏精粹</a></li>',
      '<li><a href="river.html#heritage">文化遗产</a></li>',
      '</ul></div>',
      '<div class="footer-col footer-info">',
      '<h4>Contact</h4>',
      '<div><b>线上开放</b>每日 7 × 24 小时 · 全年无休</div>',
      '<div><b>线下寻访</b>卢沟桥 · 官厅水库 · 三家店 · 门头沟</div>',
      '</div>',
      '</div>',
      '<div class="footer-bottom">',
      '<span>© 2025 永定河数字博物馆 · 本站为概念性数字展馆，内容据公开资料整理</span>',
      '<span><a href="图片展示.html" style="border-bottom:1px solid rgba(255,255,255,.28)">实拍照片来源与许可</a></span>',
      '</div>',
      '</div>',
      '<div class="footer-watermark" aria-hidden="true">永定河</div>',
      '</footer>'
    ].join('');
  }

  function initRiverCanvas(canvas) {
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, curves = [], motes = [], raf = 0, t = 0;

    function build() {
      var n = 15;
      curves = [];
      for (var i = 0; i < n; i++) {
        var p = i / (n - 1);
        curves.push({
          base: H * (0.40 + p * 0.66),
          amp: 6 + p * 44,
          freq: 0.0016 + p * 0.0014,
          phase: Math.random() * Math.PI * 2,
          speed: 0.10 + p * 0.26,
          width: 0.55 + p * 1.15,
          alpha: (1 - p) * 0.30 + 0.055
        });
      }
      motes = [];
      for (var j = 0; j < 70; j++) {
        motes.push({
          x: Math.random() * W,
          y: H * (0.34 + Math.random() * 0.66),
          r: Math.random() * 1.5 + 0.5,
          v: Math.random() * 0.24 + 0.05,
          a: Math.random() * 0.42 + 0.1,
          ph: Math.random() * Math.PI * 2
        });
      }
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      draw(t);
    }

    function draw(now) {
      ctx.clearRect(0, 0, W, H);

      var glow = ctx.createRadialGradient(W * 0.32, H * 0.18, 0, W * 0.32, H * 0.18, H * 0.72);
      glow.addColorStop(0, 'rgba(143, 195, 196, 0.20)');
      glow.addColorStop(0.45, 'rgba(34, 130, 143, 0.09)');
      glow.addColorStop(1, 'rgba(8, 38, 45, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      for (var i = 0; i < curves.length; i++) {
        var c = curves[i];
        var phase = c.phase + now * c.speed * 0.001;
        ctx.beginPath();
        for (var x = -20; x <= W + 20; x += 14) {
          var y = c.base
            + Math.sin(x * c.freq + phase) * c.amp
            + Math.sin(x * c.freq * 2.7 + phase * 1.6) * (c.amp * 0.22);
          if (x === -20) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        var g = (i / curves.length);
        ctx.strokeStyle = 'rgba(' + Math.round(143 + 60 * (1 - g)) + ',' +
          Math.round(195 + 40 * (1 - g)) + ',' + Math.round(196 + 40 * (1 - g)) + ',' + c.alpha + ')';
        ctx.lineWidth = c.width;
        ctx.stroke();
      }

      for (var k = 0; k < motes.length; k++) {
        var m = motes[k];
        var y2 = m.y + Math.sin(now * 0.0006 + m.ph) * 9;
        ctx.beginPath();
        ctx.arc(m.x, y2, m.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(216, 240, 236, ' + m.a + ')';
        ctx.fill();
      }
    }

    function loop(now) {
      t = now;
      for (var i = 0; i < motes.length; i++) {
        var m = motes[i];
        m.x += m.v;
        if (m.x > W + 10) { m.x = -10; m.y = H * (0.34 + Math.random() * 0.66); }
      }
      draw(now);
      raf = requestAnimationFrame(loop);
    }

    resize();
    var ro = ('ResizeObserver' in window) ? new ResizeObserver(function () { resize(); }) : null;
    if (ro) ro.observe(canvas); else window.addEventListener('resize', resize);

    if (reduce) { draw(0); return; }
    raf = requestAnimationFrame(loop);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { cancelAnimationFrame(raf); }
      else { raf = requestAnimationFrame(loop); }
    });
  }


  var MAP_BBOX = { lon0: 111.3, lon1: 118.9, lat0: 38.4, lat1: 41.3 };
  var MAP_W = 1000;
  var MAP_H = 500;

  function mapX(lon) {
    return ((lon - MAP_BBOX.lon0) / (MAP_BBOX.lon1 - MAP_BBOX.lon0)) * MAP_W;
  }
  function mapY(lat) {
    return (1 - (lat - MAP_BBOX.lat0) / (MAP_BBOX.lat1 - MAP_BBOX.lat0)) * MAP_H;
  }
  function mp(lon, lat) {
    return [Math.round(mapX(lon) * 10) / 10, Math.round(mapY(lat) * 10) / 10];
  }


  var RIVER_MAIN = [
    [112.05, 38.85], [112.43, 39.30], [113.10, 39.75], [113.85, 40.05],
    [114.60, 40.18], [115.10, 40.30], [115.45, 40.35], [115.62, 40.22],
    [115.80, 40.10], [115.95, 40.00], [116.11, 39.94], [116.21, 39.85],
    [116.25, 39.70], [116.30, 39.40], [116.70, 39.25], [117.30, 39.15],
    [117.75, 39.10]
  ];
  var RIVER_YANG = [
    [113.85, 40.95], [114.40, 40.85], [114.90, 40.70], [115.45, 40.35]
  ];
  var RIVER_QINGSHUI = [
    [115.62, 39.80], [115.78, 39.92], [115.95, 40.00]
  ];

  function smoothPath(lonlats) {
    var pts = lonlats.map(function (p) { return mp(p[0], p[1]); });
    var d = "M" + pts[0][0] + " " + pts[0][1];
    for (var i = 1; i < pts.length - 1; i++) {
      var mx = (pts[i][0] + pts[i + 1][0]) / 2;
      var my = (pts[i][1] + pts[i + 1][1]) / 2;
      d += " Q" + pts[i][0] + " " + pts[i][1] + " " + mx + " " + my;
    }
    var last = pts[pts.length - 1];
    return d + " L" + last[0] + " " + last[1];
  }

  var MAP_NODES = [
    {
      id: "source", name: "桑干河源", lon: 112.05, lat: 38.85, lx: 99, ly: 401, anchor: "middle",
      kicker: "南支 · 正源", title: "管涔山 · 桑干之源",
      text: "桑干河发源于山西宁武县管涔山，古称桑干水、㶟水，是永定河的南支正源。上游穿行于黄土高原，挟带大量泥沙，故永定河素有“小黄河”之称。",
      meta: ["山西省宁武县", "黄土高原"]
    },
    {
      id: "yanghe", name: "洋河", lon: 113.85, lat: 40.95, lx: 336, ly: 39, anchor: "middle",
      kicker: "北支 · 洋河", title: "洋河 · 北支来水",
      text: "洋河源自内蒙古兴和县以北的山麓，自北向南流，与桑干河在河北怀来相汇。两条支流一南一北，共同构成了永定河的上源。",
      meta: ["内蒙古兴和县", "北支"]
    },
    {
      id: "huailai", name: "怀来汇流", lon: 115.45, lat: 40.35, lx: 552, ly: 122, anchor: "middle",
      kicker: "干流起点", title: "怀来 · 二源合一",
      text: "桑干河与洋河在河北省怀来县境内汇合，自此以下河段始称永定河。旧时因河道游荡、迁徙无常，民间又称之为“无定河”。",
      meta: ["河北怀来", "干流起点"]
    },
    {
      id: "guanting", name: "官厅水库", lon: 115.62, lat: 40.22, lx: 604, ly: 179, anchor: "start",
      kicker: "水利 · 1954", title: "官厅水库",
      text: "1951 年 10 月动工、1954 年 5 月竣工的官厅水库，是新中国成立后兴建的第一座大型水库，被誉为“新中国水利事业的摇篮”。库容 41.6 亿立方米，为下游拦洪、供水、发电。",
      meta: ["总库容 41.6 亿 m³", "1954 年竣工"]
    },
    {
      id: "gorge", name: "官厅山峡", lon: 115.95, lat: 40.00, lx: 588, ly: 259, anchor: "end",
      kicker: "西山峡谷", title: "官厅山峡",
      text: "永定河切穿西山，形成长约 92 公里的官厅山峡。河谷深切、峰峦夹岸，是北京西部的天然屏障，也是京西山水格局的骨架。",
      meta: ["峡谷段 92 公里", "门头沟区"]
    },
    {
      id: "sanjiaidian", name: "三家店", lon: 116.11, lat: 39.94, lx: 660, ly: 226, anchor: "start",
      kicker: "出山口", title: "三家店 · 出山之口",
      text: "三家店是永定河出山的门户，历史上为京西古渡与商旅要津，也是永定河引水渠的渠首。河水在此告别峡谷，进入北京平原。",
      meta: ["出山口", "引水渠首"]
    },
    {
      id: "lugou", name: "卢沟桥", lon: 116.21, lat: 39.85, lx: 654, ly: 275, anchor: "start",
      kicker: "金 · 1189—1192", title: "卢沟桥",
      text: "金大定二十九年（1189）始建、明昌三年（1192）建成的卢沟桥，全长 266.5 米、十一孔，望柱上石狮五百余尊。“卢沟晓月”为燕京八景之一；1937 年 7 月 7 日，七七事变在此爆发。",
      meta: ["11 孔 · 501 只石狮", "全国重点文物保护单位"]
    },
    {
      id: "plain", name: "冲积扇", lon: 116.30, lat: 39.40, lx: 676, ly: 334, anchor: "start",
      kicker: "北京平原", title: "洪积冲积扇",
      text: "出山之后，永定河在平原上反复摆动，堆积出广阔的洪积冲积扇。北京城正坐落在这一扇形台地之上——没有永定河，就没有北京城。",
      meta: ["冲积扇", "北京城的地理基底"]
    },
    {
      id: "sea", name: "入海", lon: 117.75, lat: 39.10, lx: 849, ly: 403, anchor: "middle",
      kicker: "渤海", title: "永定新河 · 入海",
      text: "永定河经永定新河汇入渤海。2021 年 9 月，断流多年的永定河实现自 1996 年以来首次全线通水，一条河的重生由此被记录下来。",
      meta: ["天津市", "2021 年全线通水"]
    }
  ];

  var MAP_REGIONS = [
    { t: "内蒙古", x: 430, y: 30 },
    { t: "山西省", x: 106, y: 302 },
    { t: "河北省", x: 700, y: 118 },
    { t: "天津市", x: 776, y: 402 },
    { t: "渤海", x: 918, y: 424, sea: true }
  ];

  function buildMap(compact) {
    var nodes = MAP_NODES.map(function (n) {
      var p = mp(n.lon, n.lat);
      return '<g class="node" tabindex="0" role="button" data-node="' + n.id + '" ' +
        'aria-label="' + n.name + '：查看介绍">' +
        '<circle class="node__ring" cx="' + p[0] + '" cy="' + p[1] + '" r="6.5"/>' +
        '<circle class="node__core" cx="' + p[0] + '" cy="' + p[1] + '" r="2.6"/>' +
        '<text class="node__label" x="' + n.lx + '" y="' + n.ly + '" text-anchor="' + n.anchor + '">' + n.name + '</text>' +
        '</g>';
    }).join("");

    var regions = MAP_REGIONS.map(function (r) {
      return '<text class="' + (r.sea ? "sea-label" : "region-label") + '" x="' + r.x + '" y="' + r.y + '" text-anchor="middle">' + r.t + "</text>";
    }).join("");

    return [
      '<div class="map-head"><div><h3>永定河流域示意图</h3>',
      '<p>Schematic of the Yongding River Basin</p></div>',
      '<div class="map-legend">',
      '<span><i></i>干流</span><span><i class="trib"></i>支流</span><span><i class="pt"></i>流域地标</span>',
      '</div>',
      '<p class="map-hint">左右滑动查看完整流域</p></div>',

      '<div class="map-canvas"><svg class="map-svg" viewBox="0 0 1000 500" role="img" aria-label="永定河流域示意图：卫星影像底图，自山西桑干河源、洋河，经怀来、官厅水库、官厅山峡、三家店、卢沟桥，至天津入渤海">',
      '<defs>',
      '<radialGradient id="mapVig" cx="50%" cy="48%" r="72%">',
      '<stop offset="0.55" stop-color="#f8f4ec" stop-opacity="0"/>',
      '<stop offset="1" stop-color="#f8f4ec" stop-opacity=".82"/>',
      '</radialGradient>',
      '<linearGradient id="mapVigY" x1="0" y1="0" x2="0" y2="1">',
      '<stop offset="0" stop-color="#f8f4ec" stop-opacity=".32"/>',
      '<stop offset="0.18" stop-color="#f8f4ec" stop-opacity="0"/>',
      '<stop offset="0.86" stop-color="#f8f4ec" stop-opacity="0"/>',
      '<stop offset="1" stop-color="#f8f4ec" stop-opacity=".45"/>',
      '</linearGradient>',
      '<filter id="mapFlow" x="-10%" y="-10%" width="120%" height="120%">',
      '<feGaussianBlur stdDeviation="1.2"/>',
      '</filter>',
      '</defs>',

      '<image href="系项目/图/basin-satellite.jpg" x="0" y="0" width="1000" height="500" preserveAspectRatio="none"/>',
      '<rect x="0" y="0" width="1000" height="500" fill="url(#mapVig)"/>',
      '<rect x="0" y="0" width="1000" height="500" fill="url(#mapVigY)"/>',

      regions,

      '<path class="river-casing" d="' + smoothPath(RIVER_MAIN) + '"/>',
      '<path class="river-main" d="' + smoothPath(RIVER_MAIN) + '"/>',
      '<path class="river-flow" d="' + smoothPath(RIVER_MAIN) + '"/>',
      '<path class="river-trib" d="' + smoothPath(RIVER_YANG) + '"/>',
      '<path class="river-trib" d="' + smoothPath(RIVER_QINGSHUI) + '"/>',


      '<g opacity=".55" transform="translate(936,64)">',
      '<circle r="15" fill="rgba(248,244,236,.72)" stroke="rgba(22,20,26,.28)" stroke-width="1"/>',
      '<path d="M0 -10L4 3 0 0 -4 3z" fill="rgba(22,20,26,.55)"/>',
      '<text x="0" y="-21" text-anchor="middle" style="font-size:9px;letter-spacing:.14em;fill:rgba(22,20,26,.55);font-family:var(--latin)">N</text>',
      '</g>',

      nodes,
      '</svg></div>',

      '<div class="map-panel" data-map-panel>',
      '<div class="map-panel__kicker">Yongding River</div>',
      '<h4 class="map-panel__title">一条河，八百万年</h4>',
      '<p class="map-panel__text">点击图中的节点，沿河而行。从桑干之源到渤海之滨，永定河串起古人类的足迹、都城的营造、桥梁的记忆与一条河的重生。</p>',
      '<div class="map-panel__meta"><span>759 公里</span><span>4.7 万平方公里</span></div>',
      '</div>'
    ].join("");
  }

  function initMaps() {
    var wraps = document.querySelectorAll('[data-river-map]');
    Array.prototype.forEach.call(wraps, function (wrap) {
      var compact = wrap.hasAttribute('data-compact');
      wrap.classList.add('map-wrap');
      wrap.innerHTML = buildMap(compact);
      var panel = wrap.querySelector('[data-map-panel]');
      var nodes = wrap.querySelectorAll('.node');
      var def = panel ? panel.innerHTML : '';
      var current = null;

      function activate(id) {
        var data = null;
        for (var i = 0; i < MAP_NODES.length; i++) if (MAP_NODES[i].id === id) data = MAP_NODES[i];
        if (!data || !panel) return;
        if (current === id) return;
        current = id;
        Array.prototype.forEach.call(nodes, function (n) {
          n.classList.toggle('is-active', n.getAttribute('data-node') === id);
        });
        panel.innerHTML =
          '<div class="map-panel__kicker">' + data.kicker + '</div>' +
          '<h4 class="map-panel__title">' + data.title + '</h4>' +
          '<p class="map-panel__text">' + data.text + '</p>' +
          '<div class="map-panel__meta"><span>' + data.meta[0] + '</span><span>' + data.meta[1] + '</span></div>';
      }

      Array.prototype.forEach.call(nodes, function (n) {
        var id = n.getAttribute('data-node');
        n.addEventListener('mouseenter', function () { activate(id); });
        n.addEventListener('focus', function () { activate(id); });
        n.addEventListener('click', function () { activate(id); });
        n.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(id); }
        });
      });

      if (panel) {
        wrap.addEventListener('mouseleave', function () {
          current = null;
          Array.prototype.forEach.call(nodes, function (n) { n.classList.remove('is-active'); });
          panel.innerHTML = def;
        });
      }
    });
  }

  function initReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(els, function (el) { el.classList.add('is-in'); });
      return;
    }

    var groups = new Map();
    Array.prototype.forEach.call(els, function (el) {
      var p = el.parentElement;
      if (!groups.has(p)) groups.set(p, 0);
      var idx = groups.get(p);
      groups.set(p, idx + 1);
      if (!el.style.getPropertyValue('--d')) {
        el.style.setProperty('--d', Math.min(idx, 6) * 80 + 'ms');
      }
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  }

  function initCounters() {
    var nums = document.querySelectorAll('[data-count]');
    if (!nums.length || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        var target = parseFloat(el.getAttribute('data-count'));
        var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
        var dur = 1500;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          el.textContent = target.toFixed(dec);
          return;
        }
        var start = null;
        function tick(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * eased).toFixed(dec);
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target.toFixed(dec);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(nums, function (el) { io.observe(el); });
  }

  function initHeader() {
    var header = document.getElementById('siteHeader');
    var burger = document.querySelector('.burger');
    var menu = document.getElementById('mobileMenu');
    var lastY = 0;

    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      if (header) {
        header.classList.toggle('site-header--solid', y > 64);
        header.classList.toggle('site-header--over', y <= 64);
      }
      lastY = y;
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (burger && menu) {
      burger.addEventListener('click', function () {
        var open = document.body.classList.toggle('menu-open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        burger.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
        menu.setAttribute('aria-hidden', open ? 'false' : 'true');
        document.documentElement.style.overflow = open ? 'hidden' : '';
      });
      Array.prototype.forEach.call(menu.querySelectorAll('a'), function (a) {
        a.addEventListener('click', function () {
          document.body.classList.remove('menu-open');
          burger.setAttribute('aria-expanded', 'false');
          document.documentElement.style.overflow = '';
        });
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
          document.body.classList.remove('menu-open');
          burger.setAttribute('aria-expanded', 'false');
          document.documentElement.style.overflow = '';
        }
      });
    }

    var bar = document.querySelector('.scroll-progress');
    if (bar) {
      var upd = function () {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        var p = h > 0 ? (window.scrollY || 0) / h : 0;
        bar.style.transform = 'scaleX(' + Math.min(p, 1) + ')';
      };
      upd();
      window.addEventListener('scroll', upd, { passive: true });
      window.addEventListener('resize', upd);
    }

    var top = document.querySelector('.to-top');
    if (top) {
      top.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      window.addEventListener('scroll', function () {
        top.classList.toggle('is-visible', (window.scrollY || 0) > 700);
      }, { passive: true });
    }
  }

  function initTabs(root) {
    var buttons = root.querySelectorAll('.tab-btn');
    var panels = root.querySelectorAll('.tab-panel');
    Array.prototype.forEach.call(buttons, function (btn, i) {
      btn.addEventListener('click', function () {
        Array.prototype.forEach.call(buttons, function (b) {
          b.setAttribute('aria-selected', 'false');
          b.setAttribute('tabindex', '-1');
        });
        Array.prototype.forEach.call(panels, function (p) { p.hidden = true; });
        btn.setAttribute('aria-selected', 'true');
        btn.setAttribute('tabindex', '0');
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        if (panel) panel.hidden = false;
      });
      btn.addEventListener('keydown', function (e) {
        var dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!dir) return;
        e.preventDefault();
        var next = (i + dir + buttons.length) % buttons.length;
        buttons[next].focus();
        buttons[next].click();
      });
    });
  }

  function initFilter() {
    var filters = document.querySelectorAll('[data-filter]');
    if (!filters.length) return;
    var pieces = document.querySelectorAll('[data-cat]');
    var counter = document.querySelector('[data-count-visible]');
    Array.prototype.forEach.call(filters, function (f) {
      f.addEventListener('click', function () {
        var cat = f.getAttribute('data-filter');
        Array.prototype.forEach.call(filters, function (x) {
          x.classList.remove('is-active');
          x.setAttribute('aria-pressed', 'false');
        });
        f.classList.add('is-active');
        f.setAttribute('aria-pressed', 'true');
        var shown = 0;
        Array.prototype.forEach.call(pieces, function (p) {
          var match = cat === 'all' || p.getAttribute('data-cat') === cat;
          p.classList.toggle('is-hidden', !match);
          if (match) shown++;
        });
        if (counter) counter.textContent = String(shown).padStart(2, '0');
      });
    });
  }

  function initPieceModal() {
    var dialog = document.getElementById('pieceDialog');
    if (!dialog || typeof dialog.showModal !== 'function') return;
    var body = dialog.querySelector('[data-modal-body]');
    var art = dialog.querySelector('[data-modal-art]');
    var canSpeak = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance === 'function';

    function open(piece) {
      var title = piece.getAttribute('data-title');
      var sub = piece.getAttribute('data-sub') || '';
      var cat = piece.getAttribute('data-cat-label') || '';
      var text = piece.getAttribute('data-text') || '';
      var facts = (piece.getAttribute('data-facts') || '').split(';').filter(Boolean);
      var tag = piece.getAttribute('data-tag') || '实拍';
      var img = piece.getAttribute('data-img');
      var alt = piece.getAttribute('data-alt') || title;
      var credit = piece.getAttribute('data-credit') || '';
      var link = piece.getAttribute('data-link') || '';

      if (img) {
        art.innerHTML = '<img src="' + img + '" alt="' + alt + '">' +
          '<span class="modal-art__tag">' + tag + '</span>';
      } else {
        var sym = piece.getAttribute('data-sym') || 'ic-scroll';
        art.innerHTML = '<svg class="art" viewBox="0 0 120 120" aria-hidden="true"><use href="#' + sym + '"/></svg>' +
          '<span class="modal-art__tag">' + tag + '</span>';
      }

      body.innerHTML =
        '<div class="modal-body__kicker">' + cat + '</div>' +
        '<h3>' + title + '</h3>' +
        '<div class="modal-body__sub">' + sub + '</div>' +
        '<p class="modal-body__text">' + text + '</p>' +
        '<dl class="modal-facts">' + facts.map(function (f) {
          var i = f.indexOf(':');
          return '<div><dt>' + f.slice(0, i) + '</dt><dd>' + f.slice(i + 1) + '</dd></div>';
        }).join('') + '</dl>' +
        (credit ? '<p class="piece__credit" style="margin-top:16px">' + credit + '</p>' : '') +
        '<div class="modal-actions">' +
        (canSpeak ? '<button class="btn btn--ghost btn--sm" type="button" data-speak>语音朗读</button>' : '') +
        (link ? '<a class="btn btn--ghost btn--sm" href="' + link + '" target="_blank" rel="noopener">查看原始文件</a>' : '') +
        '<a class="btn btn--sm" href="数字展厅.html">进入相关展厅<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrow"/></svg></a>' +
        '</div>';

      dialog.showModal();
      dialog.setAttribute('aria-label', title);
      document.documentElement.style.overflow = 'hidden';
    }

    document.addEventListener('click', function (e) {
      var piece = e.target.closest ? e.target.closest('.piece') : null;
      if (piece) { open(piece); return; }
      if (e.target.closest && e.target.closest('[data-speak]')) {
        var btn = e.target.closest('[data-speak]');
        if (!('speechSynthesis' in window)) { btn.textContent = '当前浏览器不支持朗读'; return; }
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
          btn.textContent = '语音朗读';
          return;
        }
        var txt = dialog.querySelector('h3').textContent + '。' +
          dialog.querySelector('.modal-body__text').textContent;
        var u = new SpeechSynthesisUtterance(txt);
        u.lang = 'zh-CN';
        u.rate = 0.92;
        u.pitch = 1;
        u.onend = function () { btn.textContent = '语音朗读'; };
        btn.textContent = '正在朗读 · 点击停止';
        window.speechSynthesis.speak(u);
      }
    });

    dialog.addEventListener('close', function () {
      document.documentElement.style.overflow = '';
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    });
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) dialog.close();
    });
    var closeBtn = dialog.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', function () { dialog.close(); });
  }

  function initPlan() {
    var plan = document.querySelector('[data-plan]');
    if (!plan) return;
    var caption = document.querySelector('[data-plan-caption]');
    var defaultText = caption ? caption.textContent : '';
    var rooms = plan.querySelectorAll('.plan__room');
    Array.prototype.forEach.call(rooms, function (r) {
      function set() {
        Array.prototype.forEach.call(rooms, function (x) { x.classList.remove('is-active'); });
        r.classList.add('is-active');
        if (caption) caption.textContent = r.getAttribute('data-room') || '';
      }
      r.addEventListener('mouseenter', set);
      r.addEventListener('click', set);
      r.addEventListener('focus', set);
      r.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); set(); }
      });
    });
    plan.addEventListener('mouseleave', function () {
      Array.prototype.forEach.call(rooms, function (x) { x.classList.remove('is-active'); });
      if (caption) caption.textContent = defaultText;
    });
  }

  function initSpy() {
    var nav = document.querySelector('[data-spy]');
    if (!nav || !('IntersectionObserver' in window)) return;
    var links = nav.querySelectorAll('a[href^="#"]');
    var map = {};
    var targets = [];
    Array.prototype.forEach.call(links, function (a, i) {
      var id = a.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (!el) return;
      map[id] = a;
      targets.push(el);
    });
    if (!targets.length) return;

    function setActive(id) {
      Array.prototype.forEach.call(links, function (a) { a.classList.remove('is-active'); });
      if (map[id]) map[id].classList.add('is-active');
    }

    var io = new IntersectionObserver(function (entries) {
      var best = null;
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          if (!best || en.intersectionRatio > best.intersectionRatio) best = en;
        }
      });
      if (best) setActive(best.target.id);
    }, { rootMargin: '-140px 0px -62% 0px', threshold: [0, 0.2, 0.6] });

    targets.forEach(function (t) { io.observe(t); });
  }

  function initLoader() {
    var el = document.getElementById('loader');
    if (!el) return;
    var bar = el.querySelector('.loader__bar i');
    var num = el.querySelector('.loader__num b');
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var seen = false;
    try { seen = window.sessionStorage.getItem('ydLoaderSeen') === '1'; }
    catch (e) { seen = window.name === 'yd-loader-seen'; }
    if (seen || calm) { el.remove(); return; }
    try { window.sessionStorage.setItem('ydLoaderSeen', '1'); }
    catch (e) { window.name = 'yd-loader-seen'; }

    var reg = window.__ydLoader = { done: false, onDone: [] };
    var t0 = performance.now();
    var dur = 900;
    var done = false;
    var holding = false;

    function finish() {
      if (done) return;
      done = true;
      reg.done = true;
      el.classList.add('is-done');
      for (var i = 0; i < reg.onDone.length; i++) {
        try { reg.onDone[i](); } catch (err) {}
      }
      window.setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 800);
    }

    function tick(now) {
      var p = Math.min(1, (now - t0) / dur);
      var e = 1 - Math.pow(1 - p, 2.4);
      if (bar) bar.style.width = (e * 100).toFixed(1) + '%';
      if (num) num.textContent = Math.round(e * 100);
      if (p < 1) requestAnimationFrame(tick); else hold();
    }

    function hold() {
      if (done || holding) return;
      holding = true;
      if (bar) bar.style.width = '100%';
      if (num) num.textContent = '100';
      window.setTimeout(finish, 500);
    }

    requestAnimationFrame(tick);
    window.setTimeout(hold, 3200);
  }

function boot() {
    safe(initLoader);
    document.body.insertAdjacentHTML('afterbegin', SPRITE + headerMarkup());
    document.body.insertAdjacentHTML('beforeend', footerMarkup());

    document.body.insertAdjacentHTML('afterbegin',
      '<div class="scroll-progress" aria-hidden="true"></div>');
    document.body.insertAdjacentHTML('beforeend',
      '<button class="to-top" type="button" aria-label="回到顶部">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrow-up"/></svg></button>');

    var canvas = document.getElementById('river-canvas');
    if (canvas) safe(initRiverCanvas, canvas);
    safe(initMaps);
    safe(initReveal);
    safe(initCounters);
    safe(initHeader);
    safe(initFilter);
    safe(initPieceModal);
    safe(initPlan);
    safe(initSpy);

    var tabsRoot = document.querySelector('[data-tabs]');
    if (tabsRoot) safe(initTabs, tabsRoot);

    var hero = document.querySelector('.hero');
    if (hero) {
      var markReady = function () { hero.classList.add('is-ready'); };
      var ld = window.__ydLoader;
      if (ld && !ld.done) {
        ld.onDone.push(markReady);
        setTimeout(markReady, 3000);
      } else {
        markReady();
      }
    }
    setTimeout(function () {
      var hidden = document.querySelectorAll('[data-reveal]:not(.is-in)');
      if (hidden.length === document.querySelectorAll('[data-reveal]').length) {
        Array.prototype.forEach.call(hidden, function (el) { el.classList.add('is-in'); });
      }
    }, 1800);
    if (location.hash) {
      var target = document.querySelector(location.hash);
      if (target) {
        var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        setTimeout(function () {
          target.scrollIntoView(calm ? { block: 'start' } : { behavior: 'smooth', block: 'start' });
        }, 120);
      }
    }
  }

  function safe(fn, arg) {
    try {
      fn(arg);
    } catch (err) {
      if (window.console && console.warn) console.warn('[yd-museum]', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
