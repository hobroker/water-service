const controller = require("./controller");
const prefix = "";
const router = new require("koa-router")({prefix});

router.get("", controller.indexPage);

module.exports = router;
