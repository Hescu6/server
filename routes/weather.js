const weatherRoutes = (app, fetch) => {
  app.get("/weather/:latlon", async (request, response) => {
    console.log(request.params.latlon);
    const latlon = request.params.latlon.split(",");
    lat = latlon[0];
    lon = latlon[1];
    const weather_api_url = `https://api.darksky.net/forecast/${process.env.DARKSKY_WEATHER_KEY}/${lat},${lon}`;
    const weatherResponse = await fetch(weather_api_url);
    const weatherData = await weatherResponse.json();
    response.json(weatherData);
  });
};

module.exports = weatherRoutes;
