var http = require("https");

const stockRoutes = (app, fs) => {
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
            method: "GET",
            hostname: "apidojo-yahoo-finance-v1.p.rapidapi.com",
            port: null,
            path:
              `/stock/v2/get-chart?interval=1d&region=US&symbol=${e.etf}&lang=en&range=6mo`,
            headers: {
              "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
              "x-rapidapi-key": process.env.YAHOOFINANCE_KEY
            }
          };

          var req = http.request(options, function(res) {
            var chunks = [];

            res.on("data", function(chunk) {
              chunks.push(chunk);
            });

            res.on("end", function() {
              var body = Buffer.concat(chunks);
              //   console.log(body.toString());
              response.json({ data: body.toString() });
            });
          });

          req.end();
        }
      });
    }, true);
  });
};

module.exports = stockRoutes;
