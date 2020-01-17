const wfRoutes = require('./workflows');
const emailRoutes = require('./email');
const weatherRoutes = require('./weather');

const appRouter = (app, fs, fetch) => {
    wfRoutes(app, fs);
    emailRoutes(app);
    weatherRoutes(app, fetch);
};

module.exports = appRouter;