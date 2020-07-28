// -*- coding: utf-8, tab-width: 2 -*-

import test from './util/cmpTest';

const foo = ['Foo', ['fOo', 'foO'], [], 'fOO', ['FOO']];
const bar = [['BAR'], 'bAR', [], ['baR', 'bAr'], 'Bar'];


test('foo bar list', {
  input: [foo, bar, []],
  want: [
    '  -   - "Foo"',
    '      -   - "fOo"',
    '          - "foO"',
    '      - []',
    '      - "fOO"',
    '      -   - "FOO"',
    '  -   -   - "BAR"',
    '      - "bAR"',
    '      - []',
    '      -   - "baR"',
    '          - "bAr"',
    '      - "Bar"',
    '  - []',
  ],
});


test('foo bar dict of lists', {
  input: { foo, bar, qux: [] },
  want: [
    'foo:',
    '  - "Foo"',
    '  -   - "fOo"',
    '      - "foO"',
    '  - []',
    '  - "fOO"',
    '  -   - "FOO"',
    'bar:',
    '  -   - "BAR"',
    '  - "bAR"',
    '  - []',
    '  -   - "baR"',
    '      - "bAr"',
    '  - "Bar"',
    'qux: []',
  ],
});


test('foo bar dict with nested dict', {
  input: { foo: [...foo, { bar, qux: {} }], baz: {} },
  want: [
    'foo:',
    '  - "Foo"',
    '  -   - "fOo"',
    '      - "foO"',
    '  - []',
    '  - "fOO"',
    '  -   - "FOO"',
    '  - bar:',
    '      -   - "BAR"',
    '      - "bAR"',
    '      - []',
    '      -   - "baR"',
    '          - "bAr"',
    '      - "Bar"',
    '    qux: {}',
    'baz: {}',
  ],
});
