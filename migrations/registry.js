const registry = {
  users: require("./users"),
  funds: require("./funds"),
  fund_histories: require("./fund_histories"),
  orders: require("./orders"),
  transactions: require("./transactions"),
  total_funds: require("./total_funds"),
  withdraws: require("./withdraws"),
  add_withdrawls: require("./add_withdrawls"),
};

module.exports = registry;
