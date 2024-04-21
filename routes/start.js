const express = require("express");
const UsersController = require("../controllers/UsersController");
const PostsController = require("../controllers/PostsController");
const AuthentificationController = require("../controllers/AuthentificationController");
const AuthMiddleware = require("../middlewares/auth");

const router = express.Router();

router.get("/users", UsersController.index);
router.post("/users", UsersController.store);
router.get("/users/:id", UsersController.show);
router.put("/users/:id", UsersController.update);
router.delete("/users/:id", UsersController.destroy);
router.post("/login", AuthentificationController.login);
router.get(
  "/getMyProfile",
  AuthMiddleware.authenticate,
  UsersController.getMyProfile
);

router.get("/posts", PostsController.index);
router.post("/posts", PostsController.store);
router.get("/posts/:id", PostsController.show);
router.put("/posts/:id", PostsController.update);
router.put("/posts/:id", PostsController.destroy);

module.exports = router;
