// -*- coding: utf-8, tab-width: 2 -*-

import pTapeTest from 'p-tape';

import cmp from './cmp';

function test(name, func, count) {
  if (!func.call) { return test(name, wrCmp => wrCmp(func)); }
  return pTapeTest(name, function wrapTapeTest(t) {
    t.plan(count || 1);
    function wrapCmp(how, ...args) { return cmp({ ...how, t }, ...args); }
    wrapCmp.t = t;
    return func(wrapCmp);
  });
}



export default test;
