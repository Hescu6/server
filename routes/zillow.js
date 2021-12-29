
const zillowRoutes = (app, req) => {
  app.get("/zillow/:location", async (request, response) => {

    const options = {
      method: "GET",
      url: "https://zillow-com1.p.rapidapi.com/propertyExtendedSearch",
      qs: { location: request.params.location, home_type: "Houses" },
      headers: {
        "x-rapidapi-host": "zillow-com1.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_ZILLOW_RAPID_API_KEY,
        useQueryString: true,
      },
    };

    req(options, function (error, response1, body) {
      if (error) throw new Error(error);

      response.json(body);
    //   console.log(body);
    });
  });
};

module.exports = zillowRoutes;
