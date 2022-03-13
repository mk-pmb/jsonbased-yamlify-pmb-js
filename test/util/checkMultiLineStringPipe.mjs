// -*- coding: utf-8, tab-width: 2 -*-

import pTapeTest from 'p-tape';
import equal from 'equal-pmb';
import parseYAML from 'safeload-yaml-pmb';

import multiLineStringPipe from '../../src/multiLineStringPipe.mjs';
import yamlify from '../../src/yamlify.mjs';
import shortTrace from './shortTrace.mjs';

function chk(descr, input, wantLines) {
  if (!Array.isArray(wantLines)) { return chk(descr, input, [wantLines]); }
  const trace = shortTrace();
  function wr(t, subDescr, wrapped, prefix, indentWidth) {
    const indentStr = '                '.slice(0, +indentWidth || 0);
    const yaml = multiLineStringPipe(yamlify(wrapped));
    const tn = (descr + ', ' + subDescr + ' (' + trace + ')');
    equal.named(tn, () => {
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
    t.equal(0, 0);
  }
  pTapeTest(descr, function wrapTest(t) {
    t.plan(3);
    wr(t, 'unwrapped', input, '', 0);
    wr(t, 'as list item', [input], '  - ', 4);
    wr(t, 'as map entry', { key: input }, 'key: ', 0);
  });
}

export default chk;
