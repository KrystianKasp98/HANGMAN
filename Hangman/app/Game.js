//imported class
import {
  Quote
} from './Quote.js';
import {
  QuoteField
} from './QuoteField.js';
import {
  Selector
} from './Selector.js';
//imported const
import {
  LETTERS_WRAPPER_ID,
  AUTHOR_WRAPPER_ID,
  WORD_WRAPPER_ID,
  IMG_CLASS,
  WINS_COUNTER,
  LOSSES_COUNTER,
  LOST_STEP_OPACITY_STYLE,
  STEP_OPACITY_STYLE,
  LETTERS_START_STYLE,
  LETTERS_RESULT_STYLE,
  RESULT_STATMENT_FONT_SIZE_STYLE,
  WIN_TEXT,
  LOSE_TEXT,
  EMPTY_TEXT,
  RESET_ARRAY_LOG
} from './Statements.js';


export class Game extends Selector{
  constructor() {
    super();

    //stats
    this.wins = 0;
    this.losses = 0;
    this.turns = 0;

    //result properties
    this.currentStep = 0;
    this.lastStep = 7;

    this.quoteField = new QuoteField(); //instance which contains a quotes
    this.lengthOfQuotes = this.quoteField.quotes.length;

    this.uniqueQuotes = [];
    
    this.generateQuote();
    this.updateQuoteProperties();
    
    //update author on html
    this.changeTextById(AUTHOR_WRAPPER_ID, this.author);
    
    this.quote = new Quote(this.text); 
  }
  updateQuoteProperties() {
    this.text = this.quoteField.quotes[this.indexOfQuote].text;
    this.author = this.quoteField.quotes[this.indexOfQuote].author;
  }
  //method which generate unique quote
  generateQuote() {
    let unique = false;
    while (!unique) {
      let numb = Math.floor(Math.random() * this.quoteField.quotes.length);
      if (this.uniqueQuotes.indexOf(numb) === -1) {
        this.indexOfQuote = numb;
        this.uniqueQuotes.push(this.indexOfQuote);
        unique = true;
      }
    }
  }
  reset() {
    setTimeout(() => {
      this.changeTextById(LETTERS_WRAPPER_ID, EMPTY_TEXT);
      this.currentStep = 0;

      //clearing uniqueQuotes when any unique qoutes not avaible
      if (this.turns % this.lengthOfQuotes === 0) {
        this.uniqueQuotes = []; 
        console.log(RESET_ARRAY_LOG);
      }
      this.generateQuote();
      this.updateQuoteProperties();

      this.changeTextById(AUTHOR_WRAPPER_ID, this.author);
      this.getElement(LETTERS_WRAPPER_ID).style.textAlign = LETTERS_START_STYLE;
      
      this.quote = new Quote(this.text);  

      this.getElmentsByCSS(IMG_CLASS).forEach(item => item.style.opacity = STEP_OPACITY_STYLE);

      this.start();
    }, 3000)
  }
  //method which update spans: Winsm Losses
  updateStats() {
    this.changeTextByCSS(WINS_COUNTER, this.wins)
    this.changeTextByCSS(LOSSES_COUNTER, this.losses)
  }
  //end game effect
  renderEndGame() {
     this.changeTextById(LETTERS_WRAPPER_ID, EMPTY_TEXT);
     this.getElement(LETTERS_WRAPPER_ID).style.textAlign = LETTERS_RESULT_STYLE;
     this.getElement(LETTERS_WRAPPER_ID).style.fontSize = RESULT_STATMENT_FONT_SIZE_STYLE;
     this.currentStep === this.lastStep ?
       (this.changeTextById(LETTERS_WRAPPER_ID, LOSE_TEXT), this.losses++) :
       (this.changeTextById(LETTERS_WRAPPER_ID, WIN_TEXT), this.wins++);
     this.updateStats(); //update statsyk
  }
  checkState() {
    if (this.currentStep === this.lastStep || this.quote.catched === true) {
      this.turns++;
      this.renderEndGame();
      this.reset()
    }
  }
  loseStep() {
    this.getElmentsByCSS(IMG_CLASS)[this.currentStep].style.opacity = LOST_STEP_OPACITY_STYLE;
  }
  drawLetters() {
    for (let i = 0; i < 26; i++) {
      const label = (i + 10).toString(36); 
      const button = this.createButton();
      button.textContent = label;
      button.disabled = false;
      button.addEventListener('click', (e) => this.guess(e, label));
      this.appendButton(LETTERS_WRAPPER_ID, button);
    }
  }
  //method which checking guessed letter
  guess(e, letter) {
    e.target.disabled = true;
    if (this.quote.guess(letter)) {
      this.drawQuote(); 
    } else {
      this.currentStep++; //lose step increment
      this.loseStep();
    }
    this.checkState();
  }
  //update password on html
  drawQuote() {
    const content = this.quote.getContent();
    this.changeTextById(WORD_WRAPPER_ID, content);
  }
  start() {
    this.loseStep(); 
    this.drawLetters(); 
    this.drawQuote(); 
  }
}


//initialization
const game = new Game({});
game.start();