// -*- coding: utf-8, tab-width: 2 -*-

import univeil from 'univeil';
import getOwn from 'getown';

const { jsonify } = univeil;

const yesNoBools = { 'true': 'yes', 'false': 'no' };
const dictKeyRgx = /^[A-Za-z_][A-Za-z0-9_]*$/;

function isObj(x) { return (x && typeof x) === 'object'; }

function cannotUndef() {
  throw new TypeError('Cannot yamlify undefined as a primitive value.');
}

function cfg(opt) {
  if (!opt) { return cfg(true); }
  const {
    dictUndef,
  } = opt;

  const trPrim = { // translate primitives?
    undefined: opt.undef,
    ...getOwn(opt, 'trPrim', yesNoBools),
  };
  if (trPrim.undefined === undefined) { trPrim.undefined = cannotUndef; }

  function f(x, ind, brk) {
    if (!isObj(x)) { return f.prim(x); }
    return (Array.isArray(x) ? f.list : f.dict)(brk, ind, x);
  }

  f.prim = function primitive(x) {
    const p = jsonify(x);
    let t = getOwn(trPrim, p, p);
    if (t && t.call) { t = t.call(f, x); }
    // console.error({ trPrim, p }, (t === p) ? '' : { t });
    return String(t) + '\n';
  };

  f.list = function itemize(brk, ind, list) {
    if (!list.length) { return '[]\n'; }
    const bul = ind + '  - ';
    const sub = ind + '    ';
    return (brk || '') + list.map(x => bul + f(x, sub, '\r\n')).join('');
  };

  function dictItem(k, v, ind) {
    const m = dictKeyRgx.exec(k);
    const t = ind + ((m && (m[0] === k)) ? k : jsonify(k)) + ': ';
    if (v === undefined) {
      if (dictUndef === undefined) { return ''; }
      return t + dictUndef + '\n';
    }
    if (!isObj(v)) { return t + f.prim(v); }
    if (Array.isArray(v)) { return t + f.list('\n', ind, v); }
    return t + f.dict('\n', ind + '    ', v);
  }

  f.dict = function dict(brk, ind, x) {
    function each([k, v]) { return dictItem(k, v, ind); }
    const ent = Object.entries(x).map(each).filter(Boolean);
    if (!ent.length) { return '{}\n'; }
    return (brk || '') + ent.join('');
  };

  return Object.assign(function yamlify(x) {
    let y = f(x, '').replace(/ $/mg, '');
    y = y.replace(/\r\n\s+(?=\-)/g, '   ');
    y = y.replace(/\r\n\s+(?=\S)/g, ' ');
    y = y.replace(/\r/g, '«');
    return y;
  }, {
    cfg: function customize(upd) { return cfg({ ...opt, ...upd }); },
  });
}

let vaniCache;
export default Object.assign(function vanillaYamlify(x) {
  if (!vaniCache) { vaniCache = cfg(); }
  return vaniCache(x);
}, {
  cfg,
});
