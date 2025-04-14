const express = require("express");
const router = express.Router();

const controller = require("../Controller/user.controller");

router.get("/get-todos", controller.get_todos);
router.get("/get-remain-todos",controller.get_remain_todos);

module.exports = router 
