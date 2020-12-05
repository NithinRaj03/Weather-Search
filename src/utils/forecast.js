const request = require("request");

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c09f60cd22b190820498972d25f08094&query=${lat},${long}&units=m`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to network services", undefined);
        } else if (body.error) {
            callback("Unable to find Location", undefined);
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degree out. Wind Speed is : ${body.current.wind_speed}`);
        }
    });
}

module.exports = forecast;