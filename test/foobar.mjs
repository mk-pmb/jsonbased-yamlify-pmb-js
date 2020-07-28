// -*- coding: utf-8, tab-width: 2 -*-

import eq from 'equal-pmb';

import yamlify from '..';

function cmp(x, l) { eq.lines(yamlify(x), l.concat('')); }

cmp([1, 'two', 3.1415], [
  '  - 1',
  '  - "two"',
  '  - 3.1415',
]);

const foo = ['Foo', ['fOo', 'foO'], [], 'fOO', ['FOO']];
const bar = [['BAR'], 'bAR', [], ['baR', 'bAr'], 'Bar'];

cmp([foo, bar, []], [
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
]);

cmp({ foo, bar, qux: [] }, [
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
]);


cmp({ foo: [...foo, { bar, qux: {} }], baz: {} }, [
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
]);








console.info('+OK qdYaml.nestedLists tests passed.');
