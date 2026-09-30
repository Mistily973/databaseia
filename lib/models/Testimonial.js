export default class Testimonial {
  constructor({ quote, author, business, city }) {
    this.quote = quote;
    this.author = author;
    this.business = business;
    this.city = city;
  }

  // La "M" del círculo de Mariana López
  get initial() {
    return this.author.charAt(0).toUpperCase();
  }

  get subtitle() {
    return `${this.business}, ${this.city}`;
  }
}