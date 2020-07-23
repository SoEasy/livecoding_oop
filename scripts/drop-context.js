class Card {
  constructor(name) {
    this._name = name;
  }

  preview() {
    console.log(this, this._name);
  }
}

const card = new Card('Alaska');
const preview = card.preview;
preview(); // Контекст потерян
card.preview(); // Контекст не потерян
