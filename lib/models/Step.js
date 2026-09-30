import Feature from "./Feature";

export default class Step extends Feature {
  constructor({ number, ...rest }) {
    super(rest);         
    this.number = number; 
  }
}