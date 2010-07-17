require('../common');
var exec = require('child_process').exec,
    sys = require('sys');
success_count = 0;
error_count = 0;
response = "";

child = exec('/usr/bin/env', [], function (err, stdout, stderr) {
  if (err) {
    error_count++;
    console.log('error!: ' + err.code);
    console.log('stdout: ' + JSON.stringify(stdout));
    console.log('stderr: ' + JSON.stringify(stderr));
    assert.equal(false, err.killed);
  } else {
    success_count++;
    assert.equal(true, stdout != "");
  }
}, {'HELLO' : 'WORLD'});

child.stdout.setEncoding('utf8');

child.stdout.addListener('data', function (chunk) {
  response += chunk;
});

process.addListener('exit', function () {
  assert.equal(1, success_count);
  assert.equal(0, error_count);
  assert.ok(response.indexOf('HELLO=WORLD') >= 0);
});