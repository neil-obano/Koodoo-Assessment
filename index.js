const accountTypeChecker = (accountBalanceHistory) => {
  if (accountBalanceHistory && accountBalanceHistory.length > 1) {
    let amounts = accountBalanceHistory.map((monthData) => {
      if (!monthData.account) throw "missing account object";
      else if (!monthData.account.balance)
        throw "missing account balance object";
      else if (isNaN(parseInt(monthData.account.balance.amount)))
        throw "missing account balance amount";

      return monthData.account.balance.amount;
    });

    // work out first difference
    let firstDifference = Math.abs(amounts[0] - amounts[1]);
    let result = false;

    // keep comparing each difference in the amounts array till the first that doesn't match
    let idx = 1;
    let len = amounts.length - 1;
    while (idx < len) {
      let currentDifference = Math.abs(amounts[idx] - amounts[idx + 1]);
      if (firstDifference != currentDifference) {
        result = true;
        break;
      }
      idx++;
    }
    return result ? "A" : "B";
  } else {
    throw "Account balance type checker needs at least 2 elements in the array";
  }
};

module.exports.accountTypeChecker = accountTypeChecker;
