// -*- coding: utf-8, tab-width: 2 -*-

import test from './util/cmpTest';

const cannot = /^TypeError: Cannot yamlify /;

test('just undef', (cmp) => {
  const input = undefined;
  cmp({ input }, cannot);

  const opt = { undef: 'ø' };
  cmp({ input, opt }, 'ø\n');
}, 2);


test('list and dict with undef', (cmp) => {
  const input = [
    true,
    undefined,
    null,
    false,
    { foo: true, bar: false, qux: undefined },
  ];

  cmp({ input }, cannot);

  const opt = { undef: 'ø' };
  cmp({ input, opt }, [
    '  - yes',
    '  - ø',
    '  - null',
    '  - no',
    '  - foo: yes',
    '    bar: no',
  ]);

  opt.dictUndef = '(-)';
  cmp({ input, opt }, [
    '  - yes',
    '  - ø',
    '  - null',
    '  - no',
    '  - foo: yes',
    '    bar: no',
    '    qux: (-)',
  ]);
}, 3);
