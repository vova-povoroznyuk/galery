class KeyGenerator {
  letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  hash = [];
  createKey() {
    const key =
      this.getRandomLetter() + this.getRandomLetter() + this.getRandomLetter();
    if (this.hash.includes(key)) {
      this.createKey();
    } else {
      this.hash.push(key);
      return key;
    }
  }
  getRandomLetter() {
    return this.letters[this.getRandom()];
  }
  getRandom() {
    return Math.floor(Math.random() * 10);
  }
}

export default KeyGenerator;
