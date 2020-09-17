const express = require("express");
var router = express.Router();
router.get("/welcome", (req, res) => {
   res.render("welcome");
});
module.exports = router;
