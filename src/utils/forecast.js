const request = require('request');

const foreCast = ({longitude}, {latitude}, callback) => {
    const url = 'https://api.darksky.net/forecast/60010343dcf6d4410d8904ec68ba5bb8/' + longitude + ',' + latitude + '?units=si';
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback(body.error, undefined);
        } else {
            callback(undefined, 
                body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + ' chance of rain'
            );
        }
    });
};

module.exports = foreCast;