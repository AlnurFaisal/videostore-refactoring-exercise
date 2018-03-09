const Customer = require("./customer");
const Movie = require("./movie");
const Rental = require("./rental");
module.exports = function statement(customer, movies) {
  let totalAmount = 0;
  let RenterPoints = 0;
  let myCustomer = new Customer({name: customer.name});
  let result = `Rental Record for ${myCustomer.name}\n`;

  for (let rental of customer.rentals) {
    // console.log(rental);
    let movie = new Movie({
      id: rental.movieID,
      title: movies[rental.movieID].title,
      code: movies[rental.movieID].code
    });
    let cost = 0;

    // determine amount for each movie
    switch (movie.code) {
      case "regular":
        cost = 2;
        if (rental.days > 2) {
          cost += (rental.days - 2) * 1.5;
        }
        break;
      case "new":
        cost = rental.days * 3;
        break;
      case "children":
        cost = 1.5;
        if (rental.days > 3) {
          cost += (rental.days - 3) * 1.5;
        }
        break;
      default:
        throw new Error("Invalid move type:" + movie.code);
    }

    //add frequent renter points
    RenterPoints++;
    // add bonus for a two day new release rental
    if (movie.code === "new" && rental.days > 2) RenterPoints++;

    //print figures for this rental
    result += `\t${movie.title}\t${cost}\n`;
    totalAmount += cost;
  }
  // add footer lines
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${RenterPoints} frequent renter points\n`;

  return result;
};
