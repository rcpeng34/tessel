
// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic RFID example listens for an RFID
device to come within range of the module,
then logs its UID to the console.
*********************************************/


var tessel = require('tessel');
var rfidlib = require('rfid-pn532');
var ambientlib = require('ambient-attx4');


var rfid = rfidlib.use(tessel.port['D']); 
var ambient = ambientlib.use(tessel.port['C']);

rfid.on('ready', function (version) {
  console.log('Ready to read RFID card');

  rfid.on('data', function(card) {
    console.log('UID:', card.uid.toString('hex'));
    ambient.getLightLevel( function(err, ldata) {
      ambient.getSoundLevel( function(err, sdata) {
        console.log("Light level:", ldata.toFixed(8), " ", "Sound Level:", sdata.toFixed(8));
      });
    });
  });
});

rfid.on('error', function (err) {
  console.error(err);
});