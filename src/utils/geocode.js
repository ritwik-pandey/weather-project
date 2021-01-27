const request = require('request');

const geocode = (address , callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoicml0d2lrLXBhbmRleSIsImEiOiJja2s2ZTY0OHAwMzMzMnBueGxrdzB2ODk1In0.H57dOPSP2t5bX4yrlYF2cQ&limit=1"
    request({url , json: true} , (err , {body}) =>{
        if(err){
            callback('Unable to conect to local services!' , undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location try another search' , undefined)
        }else{
            callback(undefined , {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode