// create router instance.
const router = require("express").Router();
const { userValidation } = require('../middlewares/authMiddleware');
const { signup, login } = require('../controllers/authController');

router.post("/signup", userValidation, signup);
router.post('/login', login);

module.exports = router;