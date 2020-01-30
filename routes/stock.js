
const stockRoutes = (app, fs, req) => {
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

  app.get("/api/stock/:config", async (request, response) => {
    readFile(etfData => {
      etfData.forEach(e => {
        if (e.country === request.params.config) {
          console.log(request.params.config);

          var options = {
            method: 'GET',
            url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart',
            qs: {interval: '1d', region: 'US', symbol: e.etf, lang: 'en', range: '1y'},
            headers: {
              'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
              'x-rapidapi-key': process.env.YAHOOFINANCE_KEY
            }
          };
          
          req(options, function (error, response1, body) {
            if (error) throw new Error(error);
            
            console.log(body);
            console.log(response);
            response.json({ data: body.toString() })
          });

        }
      });
    }, true);
  });
};

module.exports = stockRoutes;
