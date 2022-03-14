// -*- coding: utf-8, tab-width: 2 -*-

import test from 'p-tape';

import cmp from './util/cmp.mjs';

test('trPrim: doge', (t) => {
  t.plan(5);
  const input = {
    wow: true,
    such: false,
    so: undefined,
    very: [
      'undefined',
      undefined,
      'null',
      null,
    ],
    much: 3,
    many: 5,
    amaze: 'excite',
  };

  let opt = { undef: 'ø' };
  cmp(t, { input, opt }, [
    'wow: yes',
    'such: no',
    // so: omitted
    'very:',
    "  - 'undefined'",
    '  - ø',
    "  - 'null'",
    '  - null',
    '',
    'much: 3',
    'many: 5',
    "amaze: 'excite'",
  ]);

  opt = { undef: 'ø', trPrim: { undefined: '¿?¿' } };
  cmp(t, { input, opt }, [
    'wow: true',
    'such: false',
    // so: omitted
    'very:',
    "  - 'undefined'",
    '  - ¿?¿',
    "  - 'null'",
    '  - null',
    '',
    'much: 3',
    'many: 5',
    "amaze: 'excite'",
  ]);

  opt = { trPrim: { undefined: '¿?¿' } };
  cmp(t, { input, opt }, [
    'wow: true',
    'such: false',
    // so: omitted
    'very:',
    "  - 'undefined'",
    '  - ¿?¿',
    "  - 'null'",
    '  - null',
    '',
    'much: 3',
    'many: 5',
    "amaze: 'excite'",
  ]);

  opt = { dictUndef: 'NULL', trPrim: { undefined: '¿?¿' } };
  cmp(t, { input, opt }, [
    'wow: true',
    'such: false',
    'so: NULL',
    'very:',
    "  - 'undefined'",
    '  - ¿?¿',
    "  - 'null'",
    '  - null',
    '',
    'much: 3',
    'many: 5',
    "amaze: 'excite'",
  ]);

  delete opt.dictUndef;
  opt.trPrim = {
    'true': 'yeah',
    'false': 'nope',
    'undefined': '¿?¿',
    '"undefined"': 'dunno',
    'null': 'NULL',
    '"null"': '„naught“',
    '"excite"': '!!!',
    '3': '∗∗∗··',
    '5': '∗∗∗∗∗',
  };
  cmp(t, { input, opt }, [
    'wow: yeah',
    'such: nope',
    'very:',
    '  - dunno',
    '  - ¿?¿',
    '  - „naught“',
    '  - NULL',
    '',
    'much: ∗∗∗··',
    'many: ∗∗∗∗∗',
    'amaze: !!!',
  ]);
});
