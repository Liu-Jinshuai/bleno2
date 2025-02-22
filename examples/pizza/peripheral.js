var util = require('util');

//
// Require bleno peripheral library.
// https://github.com/sandeepmistry/bleno
//
var bleno = require('../..');

//
// Pizza
// * has crust
// * has toppings
// * can be baked
//
var pizza = require('./pizza');

//
// The BLE Pizza Service!
//
var PizzaService = require('./pizza-service');

//
// A name to advertise our Pizza Service.
//
var name = 'PizzaSquat';
var pizzaService = new PizzaService(new pizza.Pizza());

//
// Wait until the BLE radio powers on before attempting to advertise.
// If you don't have a BLE radio, then it will never power on!
//
bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    //
    // We will also advertise the service ID in the advertising packet,
    // so it's easier to find.
    //
    bleno.startAdvertising(name, [pizzaService.uuid], function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  else {
    bleno.stopAdvertising();
  }
});

bleno.on('accept', function(clientAddress) {
  console.log('Accepted connection from address: ' + clientAddress);
});

bleno.on('disconnect', function(clientAddress) {
  console.log('Disconnected from address: ' + clientAddress);
});

bleno.on('rssiUpdate', function(rssi) {
  console.log('RSSI updated: ' + rssi);
});

bleno.on('servicesSet', function() {
  console.log('Services are now set');
});

bleno.on('servicesSetError', function(error) {
  console.log('Error setting services: ' + error);
});

bleno.on('advertisingStartError', function(error) {
  console.log('Error starting advertising: ' + error);
});

bleno.on('advertisingStop', function() {
  console.log('Advertising stopped');
});

bleno.on('advertisingStart', function(error) {
  console.log('Advertising started');
});

bleno.on('accept', function(clientAddress) {
  console.log('Accepted connection from address: ' + clientAddress);
});

bleno.on('advertisingStart', function(err) {
  if (!err) {
    console.log('advertising...');
    //
    // Once we are advertising, it's time to set up our services,
    // along with our characteristics.
    //
    bleno.setServices([
      pizzaService
    ]);
  }
});
