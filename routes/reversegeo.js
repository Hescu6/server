

const reversegeoRoutes = (app, fetch) => {
    app.get("/reversegeo/:latlon", async (request, response) => {
      console.log(request.params.latlon);
      const latlon = request.params.latlon.split(",");
      lat = latlon[0];
      lon = latlon[1];
      let geocodeAPI = `http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      let reversegeoResponse = await fetch(geocodeAPI);
      let reverse = await reversegeoResponse.json();
      console.log(reverse)
      response.json(reverse);
    });
  };
  
  module.exports = reversegeoRoutes;
  