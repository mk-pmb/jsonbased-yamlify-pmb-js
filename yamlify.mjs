// -*- coding: utf-8, tab-width: 2 -*-

import univeil from 'univeil';

const { jsonify } = univeil;
const dictKeyRgx = /^[A-Za-z_][A-Za-z0-9_]*$/;

function isObj(x) { return (x && typeof x) === 'object'; }

function f(x, ind, brk) {
  if (!isObj(x)) { return jsonify(x) + '\n'; }
  if (Array.isArray(x)) { return f.list(brk, ind, x); }
  return f.dict(brk, ind, x);
}

f.list = function itemize(brk, ind, list) {
  if (!list.length) { return '[]\n'; }
  const bul = ind + '  - ';
  const sub = ind + '    ';
  return (brk || '') + list.map(item => bul + f(item, sub, '\r\n')).join('');
};

function dictItem(k, v, ind) {
  const m = dictKeyRgx.exec(k);
  const t = ((m && (m[0] === k)) ? k : jsonify(k)) + ': ';
  if (!isObj(v)) { return t + jsonify(v) + '\n'; }
  if (Array.isArray(v)) { return t + f.list('\n', ind, v); }
  return t + f.dict('\n', ind + '    ', v);
}

f.dict = function dict(brk, ind, x) {
  const ent = Object.entries(x);
  if (!ent.length) { return '{}\n'; }
  function each([k, v]) { return ind + dictItem(k, v, ind); }
  return (brk || '') + ent.map(each).join('');
};

function yamlify(x) {
  let y = f(x, '').replace(/ $/mg, '');
  y = y.replace(/\r\n\s+(?=\-)/g, '   ');
  y = y.replace(/\r\n\s+(?=\S)/g, ' ');
  y = y.replace(/\r/g, '«');
  return y;
}

export default yamlify;
