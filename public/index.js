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
function newRentals(tabDrivers, tabCars)
{
	for(var i = 0; i < tabDrivers.length; i++)
	{
		var idCar = tabDrivers[i].carId;
		var dist = tabDrivers[i].distance;	
		var varNumberDays = numberDays(tabDrivers[i].pickupDate, tabDrivers[i].returnDate);
				
		for(var j = 0; j < tabCars.length; j++)
		{
			if (idCar == tabCars[j].id)
			{
				var distanceComponent = dist*(tabCars[j].pricePerKm);
				var timeComponent = varNumberDays*(tabCars[j].pricePerDay);
				var price = distanceComponent + timeComponent;
				
				tabDrivers[i].price = price;	
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

// updates the array rentals with a decreased price for longer rentals
function decreasedPrice(tabDrivers, tabCars)
{
	for(var i = 0; i < tabDrivers.length; i++)
	{	
		var idCar = tabDrivers[i].carId;
		var dist = tabDrivers[i].distance;	
		var varNumberDays = numberDays(tabDrivers[i].pickupDate, tabDrivers[i].returnDate);
		
		for(var j = 0; j < tabCars.length; j++)
		{
			if (idCar == tabCars[j].id)
			{
				var distanceComponent = dist * (tabCars[j].pricePerKm);
				var timeComponent = 0;
				
				if (varNumberDays == 1)
				{
					timeComponent += varNumberDays * (tabCars[j].pricePerDay) * 1;
				}
				
				if (varNumberDays > 1 && varNumberDays <= 4)
				{
					timeComponent += varNumberDays * (tabCars[j].pricePerDay) * 0.90;
				}
		
				if (varNumberDays > 4 && varNumberDays <= 10)
				{
					timeComponent += varNumberDays * (tabCars[j].pricePerDay) * 0.70;
				}
		
				if (varNumberDays > 10)
				{
					timeComponent += varNumberDays * (tabCars[j].pricePerDay) * 0.50;
				}	
				
				var price = distanceComponent + timeComponent;
				
				tabDrivers[i].price = price;	
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

// updates the array rentals with an updated commission
function commission(tabDrivers)
{
	for(var i = 0; i < tabDrivers.length; i++)
	{		
		var varNumberDays = numberDays(tabDrivers[i].pickupDate, tabDrivers[i].returnDate);
		var varCommission = tabDrivers[i].price * 0.30;
		var insurance = varCommission * 0.50;
		var assistance = varNumberDays * 1;
		var drivy = varCommission - insurance - assistance;
		
		tabDrivers[i].commission.insurance = insurance;
		tabDrivers[i].commission.assistance = assistance;
		tabDrivers[i].commission.drivy = drivy;
	}
}

// exercise 3
console.log("Exercise 3");
commission(rentals);
console.log(rentals);

/* *************
Exercise 4
************* */

// computes the new amount price if the driver subscribed to deductible option
function deductible(tabDrivers)
{
	for(var i = 0; i < tabDrivers.length; i++)
	{
		var varNumberDays = numberDays(tabDrivers[i].pickupDate, tabDrivers[i].returnDate);
		var varDeductible = 0;
		
		if(tabDrivers[i].options.deductibleReduction == true)
		{
			varDeductible += varNumberDays * 4;
		}
		
		tabDrivers[i].price += varDeductible;
	}
}

// exercise 4
console.log("Exercise 4");
deductible(rentals);
console.log(rentals);

/* *************
Exercise 5
************* */

// updates the array actors with updated amounts
function newActors(tabDrivers, tabActors)
{
	for(var i = 0; i < tabActors.length; i++)
	{
		for(var j = 0; j < tabDrivers.length; j++)
		{
			if(tabActors[i].rentalId == tabDrivers[j].id)
			{
				for(var k = 0; k < tabActors[i].payment.length; k++)
				{
					if(tabActors[i].payment[k].who == "driver")
					{
						tabActors[i].payment[k].amount = tabDrivers[j].price;
					}
					
					if(tabActors[i].payment[k].who == "owner")
					{
						tabActors[i].payment[k].amount = tabDrivers[j].price * 0.70;
					}
			
					if(tabActors[i].payment[k].who == "insurance")
					{
						tabActors[i].payment[k].amount = tabDrivers[j].commission.insurance;
					}
			
					if(tabActors[i].payment[k].who == "assistance")
					{
						tabActors[i].payment[k].amount = tabDrivers[i].commission.assistance;
					}
			
					if(tabActors[i].payment[k].who == "drivy")
					{
						
						var varNumberDays = numberDays(tabDrivers[j].pickupDate, tabDrivers[j].returnDate);
						var varDeductible = 0;
		
						if(tabDrivers[j].options.deductibleReduction == true)
						{
							varDeductible += varNumberDays * 4;
						}
						
						tabActors[i].payment[k].amount = tabDrivers[i].commission.drivy + varDeductible;
					}					
				}
			}
		}
	}
}

// exercise 5
console.log("Exercise 5");
newActors(rentals, actors);
console.log(actors);




console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
