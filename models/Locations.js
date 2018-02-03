const mongoose = require('mongoose');

const pokerLocationSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  gameVariation: {
    type: String,
    required: true
  }
});

const Locations = module.exports = mongoose.model('games', pokerLocationSchema);

module.exports.getLocationss = (userId, callback) => Locations.find({ userId }, callback);

module.exports.getLocationsById = (id, callback) => Locations.findById(id, callback);

module.exports.addLocations = (location, callback) => Locations.create(location, callback);

module.exports.updateLocations = (id, pokerSessionSchema, callback) => Locations.findOneAndUpdate({ _id: id },  pokerSessionSchema, {}, callback);

module.exports.removeLocations = (id, callback) => Locations.remove({ _id: id }, callback);