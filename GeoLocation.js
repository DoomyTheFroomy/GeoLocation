/**
 * <p>Represents a point on the surface of a sphere. (The Earth is almost
 * spherical.)</p>
 *
 * <p>To create an instance, call one of the static methods fromDegrees() or
 * fromRadians().</p>
 *
 * <p>This code was originally published at
 * <a href="http://JanMatuschek.de/LatitudeLongitudeBoundingCoordinates#Java">
 * http://JanMatuschek.de/LatitudeLongitudeBoundingCoordinates#Java</a>.</p>
 *
 * @author Jan Philip Matuschek
 * @version 22 September 2010
 */

function GeoLocation () {
  this._MIN_LAT = this._toRad(-90)
  this._MAX_LAT = this._toRad(90)
  this._MIN_LON = this._toRad(-180)
  this._MAX_LON = this._toRad(180)
}

GeoLocation.prototype.getLatitudeInDegrees = function () {
  return this._degLat
}

GeoLocation.prototype.getLongitudeInDegrees = function () {
  return this._degLon
}

GeoLocation.prototype.getLatitudeInRadians = function () {
  return this._radLat
}

GeoLocation.prototype.getLongitudeInRadians = function () {
  return this._radLon
}

GeoLocation.prototype.toString = function () {
  return '(' + this._degLat + '\u00B0, ' + this._degLon + '\u00B0) = (' +
       this._radLat + ' rad, ' + this._radLon + ' rad)'
}

/**
 * Computes the great circle distance between this GeoLocation instance
 * and the location argument.
 * @param {object} location second location
 * @param {double} radius the radius of the sphere, e.g. the average radius for a
 * spherical approximation of the figure of the Earth is approximately
 * 6371.01 kilometers.
 * @return the distance, measured in the same unit as the radius
 * argument.
 */
GeoLocation.prototype.distanceTo = function (location, radius) {
  return Math.acos(
    Math.sin(this._radLat) * Math.sin(location.getLatitudeInRadians()) +
    Math.cos(this._radLat) * Math.cos(location.getLatitudeInRadians()) *
    Math.cos(this._radLon - location.getLongitudeInRadians())
  ) * radius
}

/**
 * <p>Computes the bounding coordinates of all points on the surface
 * of a sphere that have a great circle distance to the point represented
 * by this GeoLocation instance that is less or equal to the distance
 * argument.</p>
 * <p>For more information about the formulae used in this method visit
 * <a href="http://JanMatuschek.de/LatitudeLongitudeBoundingCoordinates">
 * http://JanMatuschek.de/LatitudeLongitudeBoundingCoordinates</a>.</p>
 * @param  {double} distance   the distance from the point represented by this
 * GeoLocation instance. Must me measured in the same unit as the radius
 * argument.
 * @param  {double} radius   the radius of the sphere, e.g. the average radius for a
 * spherical approximation of the figure of the Earth is approximately
 * 6371.01 kilometers.
 * @return {array} an array of two GeoLocation objects such that:<ul>
 * <li>The latitude of any point within the specified distance is greater
 * or equal to the latitude of the first array element and smaller or
 * equal to the latitude of the second array element.</li>
 * <li>If the longitude of the first array element is smaller or equal to
 * the longitude of the second element, then
 * the longitude of any point within the specified distance is greater
 * or equal to the longitude of the first array element and smaller or
 * equal to the longitude of the second array element.</li>
 * <li>If the longitude of the first array element is greater than the
 * longitude of the second element (this is the case if the 180th
 * meridian is within the distance), then
 * the longitude of any point within the specified distance is greater
 * or equal to the longitude of the first array element
 * <strong>or</strong> smaller or equal to the longitude of the second
 * array element.</li>
 * </ul>
 */
GeoLocation.prototype.boundingCoordinates = function (distance, radius) {
  if (radius < 0 || isNaN(radius)) throw new Error('Wrong radius')
  if (distance < 0 || isNaN(distance)) throw new Error('Wrong distance')

  var radDis = distance / radius
  var minLat = this._radLat - radDis
  var maxLat = this._radLat + radDis
  var minLon
  var maxLon
  var boundingBox = []

  if (minLat > this._MIN_LAT && maxLat < this._MAX_LAT) {
    var deltaLon = Math.asin(Math.sin(radDis) / Math.cos(this._radLat))

    minLon = this._radLon - deltaLon
    if (minLon < this._MIN_LON) minLon += 2 * Math.PI

    maxLon = this._radLon + deltaLon
    if (maxLon > this._MAX_LON) maxLon -= 2 * Math.PI
  } else {
    // a pole is within the distance
    minLat = Math.max(minLat, this._MIN_LAT)
    maxLat = Math.min(maxLat, this._MAX_LAT)
    minLon = this._MIN_LON
    maxLon = this._MAX_LON
  }

  boundingBox.push(fromRadians(minLat, minLon))
  boundingBox.push(fromRadians(maxLat, maxLon))

  return boundingBox
}

GeoLocation.prototype._checkBounds = function () {
  if (this._radLat < this._MIN_LAT || this._radLat > this._MAX_LAT ||
    this._radLon < this._MIN_LON || this._radLon > this._MAX_LON) {
    throw new Error('Wrong latitude or longitude')
  };
}

GeoLocation.prototype._toRad = function (degrees) {
  return degrees * Math.PI / 180
}

GeoLocation.prototype._toDregrees = function (radians) {
  return radians * 180 / Math.PI
}

/**
 *
 * @param  {double} latitude  in degrees
 * @param  {double} longitude in degrees
 * @return {Object}           GeoLocation
 */
function fromDegrees (latitude, longitude) {
  var geoLoc = new GeoLocation()
  geoLoc._radLat = geoLoc._toRad(latitude)
  geoLoc._radLon = geoLoc._toRad(longitude)
  geoLoc._degLat = latitude
  geoLoc._degLon = longitude
  geoLoc._checkBounds()
  return geoLoc
}

/**
 *
 * @param  {double} latitude  in radians
 * @param  {double} longitude in radians
 * @return {Object}           GeoLocation
 */
function fromRadians (latitude, longitude) {
  var geoLoc = new GeoLocation()
  geoLoc._radLat = latitude
  geoLoc._radLon = longitude
  geoLoc._degLat = geoLoc._toDregrees(latitude)
  geoLoc._degLon = geoLoc._toDregrees(longitude)
  geoLoc._checkBounds()
  return geoLoc
}

exports.fromDegrees = fromDegrees
exports.fromRadians = fromRadians
