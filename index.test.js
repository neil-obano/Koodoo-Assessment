const testData = require("./test-data");
const indexJS = require("./index");

// test cases for Koodoo
describe("accountTypeChecker", () => {
  test(
    "accountTypeChecker should return B when the balance " +
      "increases by the same amount each month.",
    () => {
      expect(indexJS.accountTypeChecker(testData.accountBalanceHistory)).toBe(
        "B"
      );
    }
  );

  test("accountTypeChecker should be able to handle negative amounts ", () => {
    let accountData = [];

    for (var a = 0; a < 10; a++) {
      accountData.push(testData.createMonthDataRandom(-a));
    }

    expect(indexJS.accountTypeChecker(accountData)).toBe("A");
  });

  test(
    "accountTypeChecker should return A when the balance " +
      "amount decreases by varying amounts each month",
    () => {
      let accountData = [];

      for (var a = 0; a < 10; a++) {
        accountData.push(testData.createMonthDataRandom(a));
      }

      expect(indexJS.accountTypeChecker(accountData)).toBe("A");
    }
  );

  test(
    "accountTypeChecker should return B when the balance " +
      "decreases by the same amount each month.",
    () => {
      let accountData = [];

      for (var a = 0; a < 10; a++) {
        accountData.push(testData.createMonthData(a, 1000 - a * 100));
      }
      expect(indexJS.accountTypeChecker(accountData)).toBe("B");
    }
  );

  test(
    "accountTypeChecker should return A when the balance " +
      "increases or decreases by a random amount each month.",
    () => {
      let accountData = [];
      for (var a = 0; a < 10; a++) {
        let fakeAmount = a * 100 * (Math.round(Math.random()) === 0 ? -1 : 1);
        accountData.push(testData.createMonthData(a, fakeAmount));
      }
      expect(indexJS.accountTypeChecker(accountData)).toBe("A");
    }
  );

  test(
    "accountTypeChecker should complete " +
      "in under 500 milliseconds for 1,000,000 records where the monthly amount difference changes",
    () => {
      let accountData = [];
      for (var a = 0; a < 1000000; a++) {
        let fakeAmount = a * 100 * (Math.round(Math.random()) === 0 ? -1 : 1);
        accountData.push(testData.createMonthData(a, fakeAmount));
      }
      let startTime = performance.now();
      let result = indexJS.accountTypeChecker(accountData);
      let endTime = performance.now();
      let totalTime = endTime - startTime;
      expect(result).toBe("A");
      expect(totalTime < 500).toBeTruthy();
    }
  );

  test(
    "accountTypeChecker should complete " +
      "in under 500 milliseconds for 1,000,000 records where the monthly amount difference remains constant",
    () => {
      let accountData = [];
      for (var a = 0; a < 1000000; a++) {
        accountData.push(testData.createMonthData(a, 1000000 - a));
      }
      let startTime = performance.now();
      let result = indexJS.accountTypeChecker(accountData);
      let endTime = performance.now();
      let totalTime = endTime - startTime;
      expect(result).toBe("B");
      expect(totalTime < 500).toBeTruthy();
    }
  );

  test("accountTypeChecker should detect missing account infomation ", () => {
    let accountData = [];
    for (var a = 0; a < 10; a++) {
      accountData.push(testData.createMonthData(a, 1000 - a));
    }
    try {
      delete accountData[5].account;
      let result = indexJS.accountTypeChecker(accountData);
    } catch (e) {
      expect(e).toBe("missing account object");
    }
  });

  test("accountTypeChecker should detect missing balance infomation ", () => {
    let accountData = [];
    for (var a = 0; a < 10; a++) {
      accountData.push(testData.createMonthData(a, 1000 - a));
    }
    try {
      delete accountData[5].account.balance;
      indexJS.accountTypeChecker(accountData);
    } catch (e) {
      expect(e).toBe("missing account balance object");
    }
  });

  test("accountTypeChecker should detect missing account balance amount ", () => {
    let accountData = [];
    for (var a = 0; a < 10; a++) {
      accountData.push(testData.createMonthData(a, 1000 - a));
    }
    try {
      accountData[5].account.balance.amount = null;
      indexJS.accountTypeChecker(accountData);
    } catch (e) {
      expect(e).toBe("missing account balance amount");
    }
  });

  test("accountTypeChecker should detect only 1 account record passed into it ", () => {
    let accountData = [];
    accountData.push(testData.createMonthData(0, 1000));

    try {
      indexJS.accountTypeChecker(accountData);
    } catch (e) {
      expect(e).toBe(
        "Account balance type checker needs at least 2 elements in the array"
      );
    }
  });
});
