const accountTypeChecker = (accountBalanceHistory) => {
  if (accountBalanceHistory && accountBalanceHistory.length > 1) {
    let amounts = accountBalanceHistory
      .sort((prev, cur) => {
        // sort by month
        if (!prev.account || !cur.account) throw "missing account object";
        else if (!prev.account.balance || !cur.account.balance)
          throw "missing account balance object";
        else if (
          typeof prev.account.balance.amount !== "number" ||
          typeof cur.account.balance.amount !== "number"
        )
          throw "missing account balance amount";
        return prev.account.balance.amount - cur.account.balance.amount;
      })
      .map((monthData) => {
        // extract balance
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
