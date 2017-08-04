# GeoLocation Helper Functions 

**Finding Points Within a Distance of a Latitude/Longitude Using Bounding Coordinates**

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/DoomyTheFroomy/GeoLocation.svg?branch=develop)](https://travis-ci.org/DoomyTheFroomy/GeoLocation)
[![Greenkeeper badge](https://badges.greenkeeper.io/DoomyTheFroomy/GeoLocation.svg)](https://greenkeeper.io/)

This JavaScript implementation was build up via [Jan Matuscheks Java Implementation](http://janmatuschek.de/LatitudeLongitudeBoundingCoordinates).

I've tried to implement everything so that the look and feel seems to be the same.

## Install

```js
$ npm install GeoLocationHelper
```

## How to Use

### Create a new GeoLocation Object

```js
var geoLocation = require('GeoLocation')
// From Degrees
var geoLocCapeTown = geoLocation.fromDegrees(-33.925278, 18.423889)
// From Radians
var myLocation = geoLocation.fromRadians(1.3963, -0.6981)
```

### Get the distance between two locations

```js
var earthRadius = 6371.01
console.log(geoLocCapeTown.distanceTo(myLocation, earthRadius))
```
