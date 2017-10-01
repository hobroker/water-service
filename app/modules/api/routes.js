const controller = require("./controller");
const prefix = "/api";
const router = new require("koa-router")({prefix});

router.get("/list/:key", controller.list);
router.delete("/delete/:key/:id", controller.del);
router.get("/columns/:key", controller.columns);

module.exports = router;
