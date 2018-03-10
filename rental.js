class Rental {
  constructor({ movie, days }) {
    this.movie = movie;
    this.days = days;
  }

  getCost() {
    let cost = 0;
    // determine amount for each movie
    switch (this.movie.code) {
      case "regular":
        cost = 2;
        if (this.days > 2) {
          cost += (this.days - 2) * 1.5;
        }
        break;
      case "new":
        cost = this.days * 3;
        break;
      case "children":
        cost = 1.5;
        if (this.days > 3) {
          cost += (this.days - 3) * 1.5;
        }
        break;
      default:
        throw new Error("Invalid move type:" + this.movie.code);
    }
    return cost;
  }

  isEligibleForBonusRenterPoint() {
    return this.movie.code === "new" && this.days > 2;
  }
}

module.exports = Rental;
