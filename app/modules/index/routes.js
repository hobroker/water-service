const controller = require("./controller");
const prefix = "";
const router = new require("koa-router")({prefix});

router.get("", controller.indexPage);
router.get("/model/:key", controller.listPage);
router.get("/model/:key/update/:id", controller.updatePage);
router.get("/model/:key/create", controller.createPage);

module.exports = router;