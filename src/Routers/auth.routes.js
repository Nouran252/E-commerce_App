const {Router} = require("express")
const router = Router()
const controller = require("../Controller/auth.controller.js")

router.post("/signup", controller.signUp);
router.post("/signin", controller.signIn);
router.get("/signout", controller.signOut);

module.exports = router