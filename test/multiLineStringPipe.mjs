// -*- coding: utf-8, tab-width: 2 -*-

import pTapeTest from 'p-tape';
import equal from 'equal-pmb';
import parseYAML from 'safeload-yaml-pmb';

import multiLineStringPipe from '../src/multiLineStringPipe';
import yamlify from '..';

function chk(descr, input, wantLines) {
  if (!Array.isArray(wantLines)) { return chk(descr, input, [wantLines]); }
  function wr(subDescr, wrapped, prefix, indentWidth) {
    const indentStr = '                '.slice(0, +indentWidth || 0);
    const yaml = multiLineStringPipe(yamlify(wrapped));
    equal.named(descr + ', ' + subDescr, () => {
      equal.named('decodes as expected', () => {
        equal(parseYAML(yaml), wrapped);
      });
      equal.named('encodes as expected', () => {
        equal.lines(yaml.replace(/\n$/, '').replace(/\\/g, '¦'), [
          prefix + wantLines[0],
          ...wantLines.slice(1).map(s => (s && (indentStr + s))),
        ]);
      });
    });
  }
  pTapeTest(descr, function wrapTest(t) {
    t.plan(1);
    wr('unwrapped', input, '', 0);
    wr('as list item', [input], '  - ', 4);
    wr('as map entry', { key: input }, 'key: ', 0);
    t.ok(true);
  });
}

chk('empty string', '', '""');

chk('no trailing newline',
  '\\\\\n1\\n2\r\n3\n4n5\n6',
  '"¦¦¦¦¦n1¦¦n2¦r¦n3¦n4n5¦n6"');

chk('CR',
  '\\\\\n1\\n2\r\n3\n4n5\n',
  '"¦¦¦¦¦n1¦¦n2¦r¦n3¦n4n5¦n"');

chk('Acceptable', '\\\\\n1\\n2\n3\n4n5\n', [
  '|',
  '  ¦¦',
  '  1¦n2',
  '  3',
  '  4n5',
]);

chk('blank first line', '\nhello\n\nworld!\n', [
  '|',
  '',
  '  hello',
  '',
  '  world!',
]);

chk('blank line between', 'hello\n\nworld!\n', [
  '|',
  '  hello',
  '',
  '  world!',
]);

chk('EOL whitespace', 'hello\n\nworld! \n', [
  '|',
  '  hello',
  '',
  '  world! ',
]);

chk('Blank last line',
  'hello\n\nworld!\n\n',
  '"hello¦n¦nworld!¦n¦n"');

chk('Ambiguous indentation',
  ' hello\n \n world!\n',
  '" hello¦n ¦n world!¦n"');









console.info('+OK stringBasics test passed.');
