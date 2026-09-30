export default class Plan {
  constructor({ tier, price, period = "", features = [], cta, highlighted = false }) {
    this.tier = tier;               
    this.price = price;             
    this.period = period;           
    this.features = features;
    this.cta = cta;                 
    this.highlighted = highlighted; 
  }

  get isFree() {
    return this.price === 0;
  }

  get priceLabel() {
    if (this.price === null) return "A medida";
    if (this.isFree) return "Gratis";
    return `$${this.price.toLocaleString("es-MX")}`;
  }
}