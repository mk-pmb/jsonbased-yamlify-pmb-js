// -*- coding: utf-8, tab-width: 2 -*-

import eq from 'equal-pmb';

import yamlify from '../../src/yamlify.mjs';
import shortTrace from './shortTrace.mjs';


function cmp(t, how, guessExpectation) {
  if (guessExpectation) {
    const opt = (guessExpectation instanceof RegExp ? 'fails' : 'want');
    return cmp(t, { ...how, [opt]: guessExpectation });
  }
  const { fails, count } = how;
  if (count) { t.plan(count); }
  if (fails) {
    return (t || eq).throws(() => cmp(t, { ...how, fails: false }), fails);
  }

  let y = yamlify;
  if (how.opt) { y = y.cfg(how.opt); }
  const actual = y(how.input);
  let { want } = how;
  if (Array.isArray(want)) { want = [...want, '']; }

  eq.named.lines(shortTrace(), actual, want);
  if (t) { t.equal(0, 0); }
}


export default cmp;
