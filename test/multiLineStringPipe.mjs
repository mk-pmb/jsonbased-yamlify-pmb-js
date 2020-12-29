// -*- coding: utf-8, tab-width: 2 -*-

import pTapeTest from 'p-tape';
import equal from 'equal-pmb';
import jsYaml from 'js-yaml';

import multiLineStringPipe from '../src/multiLineStringPipe';
import yamlify from '..';

function chk(descr, input, wantLines) {
  pTapeTest(descr, function wrapTest(t) {
    t.plan(1);
    const yaml = multiLineStringPipe(yamlify(input));
    equal.named('encodes as expected', () => {
      equal.lines(yaml.replace(/\n$/, '').replace(/\\/g, '¦'), wantLines);
    });
    equal.named('decodes as expected', () => {
      equal(jsYaml.safeLoad(yaml), input);
    });
    t.ok(true);
  });
}

chk('empty string',
  { x: '' },
  'x: ""');

chk('no trailing newline',
  { x: '\\\\\n1\\n2\r\n3\n4n5\n6' },
  'x: "¦¦¦¦¦n1¦¦n2¦r¦n3¦n4n5¦n6"');

chk('CR',
  { x: '\\\\\n1\\n2\r\n3\n4n5\n' },
  'x: "¦¦¦¦¦n1¦¦n2¦r¦n3¦n4n5¦n"');

chk('Acceptable', { x: '\\\\\n1\\n2\n3\n4n5\n' }, [
  'x: |',
  '  ¦¦',
  '  1¦n2',
  '  3',
  '  4n5',
]);

chk('blank first line', { x: '\nhello\n\nworld!\n' }, [
  'x: |',
  '  ',
  '  hello',
  '  ',
  '  world!',
]);

chk('blank line between', { x: 'hello\n\nworld!\n' }, [
  'x: |',
  '  hello',
  '  ',
  '  world!',
]);

chk('EOL whitespace', { x: 'hello\n\nworld! \n' }, [
  'x: |',
  '  hello',
  '  ',
  '  world! ',
]);

chk('Blank last line',
  { x: 'hello\n\nworld!\n\n' },
  'x: "hello¦n¦nworld!¦n¦n"');

chk('Ambiguous indentation',
  { x: ' hello\n \n world!\n' },
  'x: " hello¦n ¦n world!¦n"');









console.info('+OK stringBasics test passed.');
