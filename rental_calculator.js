const Customer = require("./customer");
const Movie = require("./movie");
const Rental = require("./rental");

function createMovie(rental, movies){
  return new Movie({
    id: rental.movieID,
    title: movies[rental.movieID].title,
    code: movies[rental.movieID].code
  });
}

function calculateRenterPoints(rentals) {
  let RenterPoints = 0;
  for (let rental of rentals) {
    RenterPoints++;
    if (rental.isEligibleForBonusRenterPoint()) RenterPoints++;
  }
  return RenterPoints;
}

function getTotalCost(rentals) {
  let totalCost = 0;
  for (let rental of rentals) {
    console.log(rental);
    let rentalCost = rental.getCost();
    totalCost += rentalCost;
  }
  return totalCost;
}

module.exports = function statement(customer, movies) {
  let myCustomer = new Customer({name: customer.name});
  let result = `Rental Record for ${myCustomer.name}\n`;

  let rentals = customer.rentals.map(
    rental =>
    new Rental({
        movie: createMovie(rental, movies),
        days: rental.days
    })
  );

  for (let rental of rentals) {
    let rentalCost = rental.getCost();
    //print figures for this rental
    result += `\t${rental.movie.title}\t${rentalCost}\n`;
  }

  // add footer lines
  result += `Amount owed is ${getTotalCost(rentals)}\n`;
  result += `You earned ${calculateRenterPoints(rentals)} frequent renter points\n`;

  return result;
};
