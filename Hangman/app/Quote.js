//class for checking guessed letters
export class Quote {
  constructor(text) {
    this.text = text;
    //array of guessed letters
    this.guessed = [];

    //property which decides to win
    this.catched = false; 
  }
  //display password in depending on guessed letters
  getContent() {
    let content = '';
    for (const char of this.text) {
      
      char === " "
      ? content += char
      : this.guessed.includes(char)
        ? content += char
        : content += "_";
    }
    //win condition
    if (content === this.text) {
      this.catched = true;
    }
    return content;
  }
  //method which check whether we guessed a letter
  guess(letter) {
    if (!this.text.includes(letter)) return false;
    else {
      this.guessed.push(letter);
      return true;
    }
  }
}