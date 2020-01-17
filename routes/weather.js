

const weatherRoutes = (app, fetch) => {
  app.get("/weather/:latlon", async (request, response) => {
    console.log(request.params.latlon);
    const latlon = request.params.latlon.split(",");
    lat = latlon[0];
    lon = latlon[1];
    const weather_api_url = `https://api.darksky.net/forecast/${process.env.DARKSKY_WEATHER_KEY}/${lat},${lon}`;
    const reverseGeo_api_url = `https://api.geocod.io/v1.4/reverse?q=${lat},${lon}&api_key=${process.env.GEOCOD_REVERSE_API}`
    const weatherResponse = await fetch(weather_api_url);
    const reverseResponse = await fetch(reverseGeo_api_url);
    const weatherData = await weatherResponse.json();
    weatherData.reverseGeo= await reverseResponse.json();
    response.json(weatherData);
  });
};

module.exports = weatherRoutes;
