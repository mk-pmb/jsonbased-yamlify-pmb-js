
<!--#echo json="package.json" key="name" underline="=" -->
jsonbased-yamlify-pmb
=====================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
A simple, feature-incomplete YAML writer
<!--/#echo -->



API
---

This module ESM-exports one function with one method:

### yamlify(x)

Returns a string containing a YAML representation of
the JSON-able portions of `x`.


### yamlify.cfg(opt)

Return a potentially-customized version of the `yamlify` function.
`opts` is an optional options object that supports these keys:

* `dictUndef`: The YAML representation of `undefined` in the role as the
  value of a dictionary entry.
  Defaults to the false-y value `undefined`, which means to omit the entry.
* `undef`: The YAML representation to use for `undefined` in cases where
  `dictUndef` does not apply.
  Defaults to the false-y value `undefined`, which means there is no YAML
  representation and instead a TypeError shall be thrown.
* `trPrim`:
  A dictionary object to translate primitive values (i.e. non-containers),
  or `false` to disable this feature.
  The dictionary should map JSON representations¹ to YAML representations.
  The default is to map Booleans to `yes` and `no`.
  (¹ For convenience, in addition to valid JSON as keys, you may specify
  a key named `undefined` to override the `undef` option.)
* `strQuotMark`:
  Preferred quotation character for strings whose JSON representation
  contains neither this string nor a backslash.
  Default: `"'"` (U+0027 apostrophe)





<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
