// load up our shiny new route for users
const userRoutes = require('./workflows');

const appRouter = (app, fs) => {
    userRoutes(app, fs);
};

// this line is unchanged
module.exports = appRouter;