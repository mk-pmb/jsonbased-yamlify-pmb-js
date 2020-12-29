// -*- coding: utf-8, tab-width: 2 -*-

const EX = function multiLineStringPipe(jsonyYaml, origOpt) {
  const opt = { ...origOpt };
  function dflt(k, v) { if (opt[k] === undefined) { opt[k] = v; } }
  dflt('multiLineStringPipe', 2);
  return jsonyYaml.split(/\n/).map(EX.optimizeValue.bind(opt)).join('\n');
  // return jsYaml.safeDump(x, EX.dumpOpt);
};

Object.assign(EX, {

  dumpOpt: {},

  optimizeValue(origLn) {
    const opt = this;
    const comma = (origLn.endsWith(',') ? ',' : '');
    const ln = (comma ? origLn.slice(0, -1) : origLn);
    if (ln.endsWith('"')) { return EX.optimizeString(ln, opt) + comma; }
    return ln + comma;
  },

  optimizeString(origLn, opt) {
    const minNl = (+opt.multiLineStringPipe || 0);
    if (!minNl) { return origLn; }
    const ind = /^\s*(?:\-\s+|)/.exec(origLn)[0];
    let val = origLn.slice(ind.length);
    let key = (/: (?=")/.exec(val) || '');
    if (key) {
      key = val.slice(0, key.index) + key[0];
      val = val.slice(key.length);
    }
    try {
      val = JSON.parse(val);
    } catch (bad) {
      if (bad.name === 'SyntaxError') {
        const msg = `Cannot parse JSON: ${bad} while trying to parse ‹${val}›`;
        const err = new SyntaxError(msg);
        err.name = 'JSONParseError';
        throw err;
      }
      throw bad;
    }

    // Unfortunately, we cannot pipe-encode without trailing newline:
    if (!val.endsWith('\n')) { return origLn; }
    // Neither multiple trailing newlines:
    if (val.endsWith('\n\n')) { return origLn; }
    // Neither a CR:
    if (val.includes('\r')) { return origLn; }
    // Neither ambiguous indentation:
    if (!/(?:^|\n)\S/.exec(val)) { return origLn; }

    val = val.slice(0, -1).split(/\n/);
    if (val.length < minNl) { return origLn; }
    val = val.join('\n').replace(/(^|\n+)(?!\n)/g,
      '$1  ' + ind.replace(/\-/, ' '));
    val = ind + key + '|\n' + val;
    return val;
  },

});

export default EX;
