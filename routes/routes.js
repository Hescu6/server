// load up our shiny new route for users
const wfRoutes = require('./workflows');
const emailRoutes = require('./email');

const appRouter = (app, fs) => {
    wfRoutes(app, fs);
    emailRoutes(app);
};

// this line is unchanged
module.exports = appRouter;