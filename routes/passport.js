const router = require("express").Router();
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser,
} = require("../utils/Auth");

// Users Registeration Route
router.post("/register-user", async (req, res) => {
  await userRegister(req.body, "user", res);
});

// Admin Registration Route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

// Super Admin Registration Route
router.post("/register-super-admin", async (req, res) => {
  await userRegister(req.body, "superadmin", res);
});

// Users Login Route
router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});

// Admin Login Route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

// Super Admin Login Route
router.post("/login-super-admin", async (req, res) => {
  await userLogin(req.body, "superadmin", res);
});

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

// Users Protected Route
router.get("/user-protected", userAuth, checkRole(["user"]), (req, res) => {
  return res.json("Hello User");
});

// Admin Protected Route
router.get("/admin-protected", userAuth, checkRole(["admin"]), (req, res) => {
  return res.json("Hello Admin");
});

// Super Admin Protected Route
router.get(
  "/super-admin-protected",
  userAuth,
  checkRole(["superadmin"]),
  (req, res) => {
    return res.json("Hello Super Admin");
  }
);

// Super Admin & Admin Protected Route
router.get(
  "/super-admin-and-admin-protected",
  userAuth,
  checkRole(["superadmin", "admin"]),
  (req, res) => {
    return res.json("Super Admin and Admin");
  }
);

module.exports = router;
