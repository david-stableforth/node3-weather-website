const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZHN0YWJsZWZvcnRoIiwiYSI6ImNrMjN5Ymh0dDA1MmozaXA0aXA2c2ZnNHQifQ.Ckss_4KMPuLLaWGB1hsOkQ&limit=1'
    console.log(url)
    request({url, json: true},(error,{body}) => {
        if (error){
            callback('unable to connect to location services', undefined)
        }
        else if (body.features.length === 0)
        {
            callback('Unable to find location.  Try another search.', undefined)
        }
        else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode