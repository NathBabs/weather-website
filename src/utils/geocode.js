const request = require('request');
const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmF0aGFuaWVsYmFiYWxvbGExIiwiYSI6ImNqemp2aTNoNTBkYnEzbXVpNjBnYW02N3QifQ.6VHv60lKOGCiwMjB-pjDAw&limit=1';
    request({url, json:true}, (error, {body: {features}}) => {
      if (error) {
        callback('Unable to reach geocoding service!', undefined);
      } else if ( features.length === 0) {
          callback('Sorry there are no matching results for requested location. Try another search', undefined);
      } else {
        callback(undefined, {
            longitude : features[0].center[0], 
            latitude : features[0].center[1],
            location : features[0].place_name
        });
      }
    });
  };

  module.exports = geoCode;