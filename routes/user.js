const express = require("express");
const router = express.Router();

const {
  login,
  register,
  dashboard,
  getAllUsers,
  registeragain,
  deleteUser,
  logBoolean
} = require("../controllers/user");
const {
  getBalance,
  getTransacton_history,
  getOrder,
  getFund_history,
  postFund_history,
  getTotal_fund,
  postTotal_fund,
  postTransaction_history,
  postOrder,
  deleteOrder,
  getAdminFund,
  putFund_history,
  createMarketOrder,
  getMarketPrice,
} = require("../controllers/transaction");
const authMiddleware = require("../middleware/auth");
const { requireAdmin } = require("../middleware/auth");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/registeragain").post(authMiddleware, registeragain);
router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/getAllusers").get(authMiddleware, requireAdmin, getAllUsers);
router.route("/getAllusers/:id").delete(authMiddleware, requireAdmin, deleteUser);

router.route("/balance").get(authMiddleware, getBalance);

router
  .route("/getTransacton_history")
  .get(authMiddleware, getTransacton_history);
router
  .route("/getTransacton_history")
  .post(authMiddleware, requireAdmin, postTransaction_history);

router.route("/getMarketPrice/:symbol").get(authMiddleware, getMarketPrice);
router.route("/createMarketOrder").post(authMiddleware, createMarketOrder);

router.route("/getFund_history").get(authMiddleware, getFund_history);
router.route("/getFund_history").post(authMiddleware, postFund_history);

router.route("/getpending").get(authMiddleware, requireAdmin, getAdminFund);
router.route("/getpending").put(authMiddleware, requireAdmin, putFund_history);

router.route("/getOrder").get(authMiddleware, getOrder);
router.route("/getOrder").post(authMiddleware, requireAdmin, postOrder);
router.route("/getOrder/:id").delete(authMiddleware, requireAdmin, deleteOrder);

router.route("/getTotal_fund").get(authMiddleware, getTotal_fund);
router.route("/getTotal_fund").post(authMiddleware, requireAdmin, postTotal_fund);

router.route("/logout").post(logBoolean);
module.exports = router;
