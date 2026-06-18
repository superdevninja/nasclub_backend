const Fund = require("../models/Fund");
const Transaction = require("../models/Transaction");

function calcAvailableFromFunds(funds) {
  let balance = 0;
  funds.forEach((f) => {
    if (f.Type !== "success") return;
    if (f.Format === "fund") balance += parseFloat(f.amount);
    if (f.Format === "withdraw") balance -= parseFloat(f.amount);
  });
  return balance;
}

async function calcInvestedAmount(email) {
  const transactions = await Transaction.find({ sender: email });
  return transactions.reduce(
    (sum, t) => sum + parseFloat(t.value_cost || 0),
    0
  );
}

async function getUserBalance(email) {
  const funds = await Fund.find({ sender: email });
  const available = calcAvailableFromFunds(funds);
  const invested = await calcInvestedAmount(email);
  const totalDeposits = funds
    .filter((f) => f.Format === "fund" && f.Type === "success")
    .reduce((sum, f) => sum + parseFloat(f.amount), 0);

  return {
    email,
    available,
    invested,
    totalDeposits,
    openingBalance: available + invested,
  };
}

async function getAdminBalanceSummary() {
  const allFunds = await Fund.find({});
  const senders = [...new Set(allFunds.map((f) => f.sender).filter(Boolean))];

  const perUser = await Promise.all(senders.map((email) => getUserBalance(email)));

  const totalClientDeposits = allFunds
    .filter((f) => f.Format === "fund" && f.Type === "success")
    .reduce((sum, f) => sum + parseFloat(f.amount), 0);

  const totalAvailableAcrossClients = perUser.reduce(
    (sum, u) => sum + u.available,
    0
  );

  return {
    totalClientDeposits,
    totalAvailableAcrossClients,
    perUser,
  };
}

module.exports = {
  calcAvailableFromFunds,
  calcInvestedAmount,
  getUserBalance,
  getAdminBalanceSummary,
};
