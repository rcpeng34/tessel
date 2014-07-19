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
var climatelib = require('climate-si7020');

var climate = climatelib.use(tessel.port['A']);
var ambient = ambientlib.use(tessel.port['C']);
var rfid = rfidlib.use(tessel.port['D']); 

var ambientReady = false;
var climateReady = false;

ambient.on('ready', function(version){
  console.log('ambient ready');
  ambientReady = true;
});

climate.on('ready', function(version) {
  console.log('climate ready');
  climateReady = true;
});

rfid.on('ready', function (version) {
  while(!ambientReady || !climateReady) {
    console.log('waiting on module load');
  }
  
  console.log('Ready to read RFID card');

  rfid.on('data', function(card) {
    console.log('UID:', card.uid.toString('hex'));

    ambient.getLightLevel( function(err, ldata) {
      ambient.getSoundLevel( function(err, sdata) {
        console.log("Light level:", ldata.toFixed(8), " ", "Sound Level:", sdata.toFixed(8));
      });
    });

    ambient.on('error', function (err) {
      console.log(err);
    });

    climate.readTemperature('f', function (err, temp) {
      climate.readHumidity(function (err, humid) {
        console.log('Degrees:', temp.toFixed(4) + 'F', 'Humidity:', humid.toFixed(4) + '%RH');
      });
    });

    climate.on('error', function(err) {
      console.log('error connecting climate', err);
    });

  });
});

rfid.on('error', function (err) {
  console.error(err);
});

