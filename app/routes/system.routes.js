const controller = require("../controllers/system.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/system/find/formula", controller.find_formula);

  app.put("/api/system/save/formula", controller.save_formula);
};
