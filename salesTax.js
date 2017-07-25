var salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

var companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];

function calculateSalesTax(salesData, taxRates) {
  companiesWithTax = [];
  for (var i = 0; i < salesData.length; i++) {
    var result = {}
    result.name = salesData[i].name;
    result.totalSales = salesData[i].sales.reduce((a, b) => a + b);
    result.totalTaxes = result.totalSales * salesTaxRates[salesData[i]["province"]];
    companiesWithTax.push(result);
  }
  var companiesCombined = combineObjects(companiesWithTax);
  console.log(JSON.stringify(companiesWithTax, undefined, 2));
}

function combineObjects(array) {
  for (var i = array.length - 1; i >= 0; i--) {
    for (var j = i - 1; j >= 0; j--) {
      if (array[i].name == array[j].name) {
        array[i].totalSales += array[j].totalSales
        array[i].totalTaxes += array[j].totalTaxes
        array.splice(j, 1);
      } 
    }
  }
}


var results = calculateSalesTax(companySalesData, salesTaxRates);

/* Expected Results:
{
  Telus: {
    totalSales: 1300
    totalTaxes: 144
  },
  Bombardier: {
    totalSales: 800,
    totalTaxes: 40
  }
}
*/
