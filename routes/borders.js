const bordersRoutes = (app, fetch, fs) => {
  const etfPath = "data/ETF.json";

  const readFile = (
    callback,
    returnJson = false,
    filePath = etfPath,
    encoding = "utf8"
  ) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }
      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  app.get("/borders/:config", async (request, response) => {
    //get Lines for all countries
    const geoBorder_api_url = `https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson`;
    const borderResponse = await fetch(geoBorder_api_url);
    const borderData = await borderResponse.json();

    if (request.params.config == "countryETF") {
      readFile(etfData => {


        lines = [];
        etfData.forEach(e=>{
            borderData['features'].forEach(g => {
                if (g.properties.sovereignt === e.country){
                    lines.push(g.geometry);
                }
            } )
        })

        response.json(lines);
      }, true);

      
    }
  });
};

module.exports = bordersRoutes;
