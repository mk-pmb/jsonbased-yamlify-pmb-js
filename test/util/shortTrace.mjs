// -*- coding: utf-8, tab-width: 2 -*-

function shortTrace() {
  let t = (new Error()).stack;
  t = t.split(/\n/).map(function shorten(s) {
    let b = s.split(/\/(test\/)(?!util\/|all\.mjs\b)/);
    if (b.length < 2) { return; }
    b = b.slice(-2).join('');
    b = b.replace(/\)$/, '');
    return b;
  }).filter(Boolean);
  t.reverse();
  t = t.join(' -> ');
  return t;
}

export default shortTrace;
