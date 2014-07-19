// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic RFID example listens for an RFID
device to come within range of the module,
then logs its UID to the console.
*********************************************/

var child_process = require('child_process');
// child_process.exec('say "hello Patrick"', [], function(){console.log('ran it');});

var tessel = require('tessel');
var rfidlib = require('rfid-pn532');


var rfid = rfidlib.use(tessel.port['D']); 

rfid.on('ready', function (version) {
  console.log('Ready to read RFID card');

  rfid.on('data', function(card) {
    console.log('UID:', card.uid.toString('hex'));
    // run_cmd('say', ['hello patrick'], function(){console.log('shell callback');});
    child_process.exec('say "hello Patrick"', [], function(){console.log('ran it');})
 
  });
});

rfid.on('error', function (err) {
  console.error(err);
});


var run_cmd = function (cmd, args, callBack ) {
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString() });
    child.stdout.on('end', function() { callBack (resp) });
}