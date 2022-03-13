// -*- coding: utf-8, tab-width: 2 -*-

import chk from './util/checkMultiLineStringPipe.mjs';

chk('empty string', '', "''");

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
