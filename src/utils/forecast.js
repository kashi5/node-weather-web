const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/ba047e2a523bb64793540c9b1b5d0733/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location ', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 
            ' It is currently ' +
             body.currently.temperature + 
             ' degress out. There is a ' +
              body.currently.precipProbability + 
              '% chance of rain.')
          
        }
    })
}


module.exports = forecast