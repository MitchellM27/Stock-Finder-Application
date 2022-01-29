var tickerInput = 'TSLA';
var stockName;
fetch("https://alpha-vantage.p.rapidapi.com/query?keywords=" + tickerInput + "&function=SYMBOL_SEARCH&datatype=json", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
		"x-rapidapi-key": "04fab6f718msh76dd0a57c7ff60cp183364jsn8a83f4feee7e"
	}
}).then(response => {
	return response.json();
})
.then(data => {
	let stockName = data.bestMatches['0']['2. name']

	console.log(stockName)
	
})
.catch(err => {
	console.error(err);
});


fetch("https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=" + tickerInput + "&outputsize=compact&datatype=json", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
		"x-rapidapi-key": "04fab6f718msh76dd0a57c7ff60cp183364jsn8a83f4feee7e"
	}
}).then(response => {
	return response.json();
}).then(data=> {

	let tsd =(data['Time Series (Daily)']);
	var arrayTSD = Object.keys(tsd);


	var storeDays = [];
	var storeClose = [];

	for (i=21 ; i>=0 ; i--) {
		let date = arrayTSD[i];
		let closePrice = tsd[date]['4. close']
		storeClose.push(closePrice)
		storeDays.push(arrayTSD[i])
	}

	new Chart(document.getElementById("stockChart"), {
		type: 'line',
		data: {
		  labels: storeDays,
		  datasets: [{ 
			  data: storeClose,
			  label: tickerInput,
			  borderColor: "#3e95cd",
			  fill: false
			},
		  ]
		},
		options: {
		  title: {
			display: true,
			text: tickerInput +  ' Monthly Price Chart'
		  }
		}
	  });


}).catch(err => {
	console.error(err);
});