var http = require("https");

const stockRoutes = (app, fs, fetch) => {
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
          fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=1d&region=US&symbol=${e.etf}&lang=en&range=ytd`, {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
              "x-rapidapi-key": process.env.YAHOOFINANCE_KEY
            }
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });




        }
      });
    }, true);
  });
};

module.exports = stockRoutes;
