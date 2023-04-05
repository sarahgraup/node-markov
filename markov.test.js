const { MarkovMachine } = require("./markov");

describe("getChains function", function () {
  test("getChains should return a Map with each word from our text", function () {
    const catInTheHat = new MarkovMachine("The cat and a hat.");
    expect(catInTheHat.getChains().size).toEqual(5);
    expect(catInTheHat.chains).toEqual(
      new Map([
        ["The", ["cat"]],
        ["cat", ["and"]],
        ["and", ["a"]],
        ["a", ["hat."]],
        ["hat.", [null]],
      ])
    );
  });

  test("getChains should return a Map with words from our text", function () {
    const catInTheHat = new MarkovMachine("The cat and a hat and cat");
    expect(catInTheHat.getChains().size).toEqual(5);
  });
});

describe("getText function", function () {
  test("getText returns the same string if there are no branches.", function () {
    const catInTheHat = new MarkovMachine("The cat and a hat.");
    expect(catInTheHat.getText()).toEqual("The cat and a hat.");
    expect(catInTheHat.getText()).not.toContain("The hat.");
  });
  test("getText returns the first and last word even if there are branches", function () {
    const catInTheHat = new MarkovMachine("The cat and a hat in the hat.");
    expect(catInTheHat.getText()).toContain("The");
    expect(catInTheHat.getText()).toContain("hat.");
    expect(catInTheHat.getText().endsWith("hat.")).toEqual(true);
  });
});
