'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

/* *************
Exercise 1
************* */

// computes the number of days between 2 dates (inputed as parameters)
function numberDays(d1,d2)
{
     var ts1 = new Date(d1).getTime();
     var ts2 = new Date(d2).getTime();
	 
     return ((ts2-ts1)/(86400*1000))+1;
}

// updates the array rentals with an updated price
function newRentals(tabDriver, tabCar)
{
	for(var i = 0; i < tabDriver.length; i++)
	{
		var idCar = tabDriver[i].carId;
		var dist = tabDriver[i].distance;	
		var varNumberDays = numberDays(tabDriver[i].pickupDate, tabDriver[i].returnDate);
				
		for(var j = 0; j < tabCar.length; j++)
		{
			if (idCar == tabCar[j].id)
			{
				var distanceComponent = dist*(tabCar[j].pricePerKm);
				var timeComponent = varNumberDays*(tabCar[j].pricePerDay);
				var price = distanceComponent + timeComponent;
				
				tabDriver[i].price = price;	
			}
		}			
	}
}

// exercise 1
console.log("Exercise 1");
newRentals(rentals, cars);
console.log(rentals);

/* *************
Exercise 2
************* */

function decreasedPrice(tabDriver, tabCar)
{
	for(var i = 0; i < tabDriver.length; i++)
	{	
		var idCar = tabDriver[i].carId;
		var dist = tabDriver[i].distance;	
		var varNumberDays = numberDays(tabDriver[i].pickupDate, tabDriver[i].returnDate);
		
		for(var j = 0; j < tabCar.length; j++)
		{
			if (idCar == tabCar[j].id)
			{
				var distanceComponent = dist*(tabCar[j].pricePerKm);
				var timeComponent = 0;
				
				if (varNumberDays == 1)
				{
					timeComponent += varNumberDays*(tabCar[j].pricePerDay) * 1;
				}
				
				if (varNumberDays > 1 && varNumberDays <= 4)
				{
					timeComponent += varNumberDays*(tabCar[j].pricePerDay) * 0.90;
				}
		
				if (varNumberDays > 4 && varNumberDays <= 10)
				{
					timeComponent += varNumberDays*(tabCar[j].pricePerDay) * 0.70;
				}
		
				if (varNumberDays > 10)
				{
					timeComponent += varNumberDays*(tabCar[j].pricePerDay) * 0.50;
				}	
				
				var price = distanceComponent + timeComponent;
				
				tabDriver[i].price = price;	
			}
		}
	}
}

// exercise 2
console.log("Exercise 2");
decreasedPrice(rentals, cars);
console.log(rentals);

/* *************
Exercise 3
************* */







console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
