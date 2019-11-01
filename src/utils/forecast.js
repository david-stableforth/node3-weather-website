const request = require('request')

const forecast = (lat,long,callback) => {

    const url = 'https://api.darksky.net/forecast/21c76ced2340c8ebfe622f518ef59f47/'+ lat + ',' + long +'?units=si'
    request({url, json: true},(error,{body}) => {
        if (error){
            callback('unable to connect to forecast service', undefined)
        }
        else if (body.error)
        {
            callback('Unable to find location. Check coordinates', undefined)
        }
        else {
            callback(undefined,body.daily.summary + ' It is currently ' + body.currently.temperature + ' degrees out.' + '  There is a '+ body.currently.precipProbability + ' % chance of rain.')
        }
    })
}



module.exports=forecast
