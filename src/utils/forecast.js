const request = require('request')

const forecast = (latitide , longitude , callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=96b6c42845761840ebc69dc7181a3616&query=' + latitide +',' + longitude +'';

    request({url , json: true} , (err , {body}) =>{
        if(err){
            callback('Unable to connect to local services' , undefined)
        }else if(body.error){
            callback('Unable to search for location. Try another search' , undefined);
        }else{
            callback(undefined , {
                describe: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                humidity: body.current.humidity
            });
        }
    })
}
module.exports = forecast