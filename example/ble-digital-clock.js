'use strict';

var noble = require('noble');

var calliopeAddress;
var uartServiceUuid = '6e400001b5a3f393e0a9e50e24dcca9e';
var txCharacteristicUuid = '6e400003b5a3f393e0a9e50e24dcca9e';

if (process.argv.length < 3) {
  console.log('please specify the bluetooth address of the calliope mini on the command line');
  process.exit(0);
}

calliopeAddress = process.argv[2].toLowerCase();

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning([], false);
  }
  else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  if (peripheral.address === calliopeAddress) {
    noble.stopScanning();

    peripheral.on('disconnect', function() {
      process.exit(0);
    });

    peripheral.connect(function(err) {
      if (err) throw err;

      peripheral.discoverServices([uartServiceUuid], function(err, services) {
        if (err) throw err;

        services[0].discoverCharacteristics([txCharacteristicUuid], function (err, characteristics) {
          if (err) throw err;

          publishTime(characteristics[0]);
        });
      });
    });
  }
});

function publishTime(txCharacteristic) {
  setInterval(function () {
    var date = new Date();
    var time = new Buffer(date.getHours().toString().padStart(2, '0') +
      ':' +
      date.getMinutes().toString().padStart(2, '0') +
      '\r');

    txCharacteristic.write(time, true, function (err) {
      if (err) throw err;
    });
  }, 1000);
}

