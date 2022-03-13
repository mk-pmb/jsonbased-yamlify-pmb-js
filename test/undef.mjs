// -*- coding: utf-8, tab-width: 2 -*-

import test from 'p-tape';

import cmp from './util/cmp.mjs';

const cannot = /^TypeError: Cannot yamlify /;

test('just undef', (t) => {
  t.plan(2);
  const input = undefined;
  cmp(t, { input }, cannot);
  const opt = { undef: 'ø' };
  cmp(t, { input, opt }, 'ø\n');
});


test('list and dict with undef', (t) => {
  t.plan(3);
  const input = [
    true,
    undefined,
    null,
    false,
    { foo: true, bar: false, qux: undefined },
  ];

  cmp(t, { input }, cannot);

  const opt = { undef: 'ø' };
  cmp(t, { input, opt }, [
    '  - yes',
    '  - ø',
    '  - null',
    '  - no',
    '  - foo: yes',
    '    bar: no',
  ]);

  opt.dictUndef = '(-)';
  cmp(t, { input, opt }, [
    '  - yes',
    '  - ø',
    '  - null',
    '  - no',
    '  - foo: yes',
    '    bar: no',
    '    qux: (-)',
  ]);
});
