/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   * 
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   * 
   * */

  getChains() {
    const chains = new Map();

    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      let nextWord = this.words[i + 1];

      if (nextWord === undefined) {
        nextWord = null;

      }

      if (chains.has(word)) {
        chains.get(word).push(nextWord);
      }
      else {

        chains.set(word, [nextWord]);

      }

    }
    return chains;

  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {

    let firstWord = this.words[0];
    const text = [firstWord];

    while(true){
      const word = this.getRandomItem(this.chains.get(firstWord));
      if(word===null){
        break;
      }
      text.push(word); //could make an array and push onto it and then join into string
      firstWord = word;

    }

    return text.join(" ");

  }

  /**return random item from items array */
  getRandomItem(items){
    const randomIndex = Math.floor(Math.random() * items.length);

    const item = items[randomIndex];

    return item;
  }
}

const catInHatMachine = new MarkovMachine("the brown dog jumped over the lazy fox in a pool.");
console.log(catInHatMachine.getText());
