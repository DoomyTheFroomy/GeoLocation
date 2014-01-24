describe('geolocation functionality', function() {
  var geoLocation = require('../geoLocation.js'),
  _ = require('underscore'),
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

  it('should be possible to create a boundary box', function () {
    var boundingBoxCPT = geoLocCapeTown.boundingCoordinates(5,6371.01)
    assert.strictEqual(true,_.isArray(boundingBoxCPT),"The result should be an Array.");
    assert.strictEqual(2,boundingBoxCPT.length, "The should have a length of 2.");
    assert.strictEqual(true, _.isObject(boundingBoxCPT[0]), "First Entry should be an Object");
    assert.strictEqual(true, _.isObject(boundingBoxCPT[1]), "Second Entry should be an Object");
    assert.notStrictEqual(boundingBoxCPT[0].getLatitudeInDegrees(),boundingBoxCPT[1].getLatitudeInDegrees(),"The latitude degrees should be different");
    assert.notStrictEqual(true,boundingBoxCPT[0].getLatitudeInDegrees() > boundingBoxCPT[1].getLatitudeInDegrees(),"First latitude should be bigger than second");
    assert.notStrictEqual(boundingBoxCPT[0].getLongitudeInDegrees(),boundingBoxCPT[1].getLongitudeInDegrees(),"The longitude degrees should be different");
    assert.notStrictEqual(true,boundingBoxCPT[0].getLongitudeInDegrees() > boundingBoxCPT[1].getLongitudeInDegrees(),"First Longitude should be bigger than second");
  });
  
})