const wfRoutes = require("./workflows");
const emailRoutes = require("./email");
const weatherRoutes = require("./weather");
const stockRoutes = require("./stock");
const bordersRoutes = require("./borders");
const reversegeoRoutes = require("./reversegeo");

const appRouter = (app, fs, fetch) => {
  wfRoutes(app, fs);
  emailRoutes(app);
  weatherRoutes(app, fetch);
  stockRoutes(app, fs);
  bordersRoutes(app, fetch, fs);
  reversegeoRoutes(app, fetch);
};

module.exports = appRouter;
