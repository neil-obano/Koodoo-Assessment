const accountBalanceHistory = [
  {
    monthNumber: 0, // current month
    account: {
      balance: { amount: 0 },
    },
  },
  {
    monthNumber: 1, // last month
    account: {
      balance: { amount: 100 },
    },
  },
  {
    monthNumber: 2, // two months ago
    account: {
      balance: { amount: 200 },
    },
  },
];

const createMonthData = (monthNumber, amount) => {
  return {
    monthNumber: monthNumber,
    account: {
      balance: { amount: amount },
    },
  };
};

const createMonthDataRandom = (monthNumber) => {
  return createMonthData(monthNumber, randomAmount(0, 1000));
};

const randomAmount = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports.accountBalanceHistory = accountBalanceHistory;
module.exports.createMonthData = createMonthData;
module.exports.createMonthDataRandom = createMonthDataRandom;
