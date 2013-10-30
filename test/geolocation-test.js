describe('geolocation functionality', function() {
  var geoLocation = require('../geoLocation.js'),
  assert = require('assert'),
  geoLocCapeTown = geoLocation.fromDegrees(-33.925278, 18.423889),
  geoLocBerlin = geoLocation.fromDegrees(52.51705655410402, 13.393707275390625);
  
  it('should be possible to create two different locations', function() {
    assert.notStrictEqual(geoLocCapeTown.toString(), geoLocBerlin.toString(), "Locations of Cape Town and Berlin should be not the same.")
    console.log(geoLocCapeTown.toString());
    console.log(geoLocBerlin.toString());
  });

  it('should be possible to get the distance between to locations', function() {
    assert.strictEqual(9624.376870289261,geoLocCapeTown.distanceTo(geoLocBerlin,6371.01),"The distance between Cape Town and Berlin should be 9624.376870289261 km");
    assert.strictEqual(9624.376870289261,geoLocBerlin.distanceTo(geoLocCapeTown,6371.01),"The distance between Berlin and Cape Town should be 9624.376870289261 km");
    assert.strictEqual(0,geoLocCapeTown.distanceTo(geoLocCapeTown,6371.01),"The distance between the same locations should be 0");
  });
  
})