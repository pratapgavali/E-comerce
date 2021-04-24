var express = require('express');
var router = express.Router();
const {signout,signup,signin, isSignedIn} = require("../controllers/auth");
const { body, validationResult } = require('express-validator');


router.post("/signup",[

    body("name","name should be atleast 3 character long!!!").isLength({min:3}),
    body("email","email is required!!!").isEmail(),
    body("password","password shoud atleast 3 char").isLength({min:3})

],
signup
);

router.get("/signin", [
    body("email","Email is required!!!").isEmail(),
    body("password","Password is required").isLength({min:1})
] ,signin);

router.get("/signout",signout);



module.exports = router;