// -*- coding: utf-8, tab-width: 2 -*-

import eq from 'equal-pmb';

import yamlify from '../..';


function cmp(how, guess) {
  if (guess) {
    const opt = (guess instanceof RegExp ? 'fails' : 'want');
    return cmp({ ...how, [opt]: guess });
  }
  const { t, fails } = how;
  if (fails) {
    return (t || eq).throws(() => cmp({ ...how, fails: false }), fails);
  }

  let y = yamlify;
  if (how.opt) { y = y.cfg(how.opt); }
  const actual = y(how.input);
  let { want } = how;
  if (Array.isArray(want)) { want = [...want, '']; }
  eq.lines(actual, want);
  if (t) { t.equal(0, 0); }
}


export default cmp;
