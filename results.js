var button = document.getElementById('fetch-button');
var searchInput = document.getElementById('stocks');
var stockName;
var tickerInput;

function getName() {

	tickerInput = searchInput.value;

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
		stockName = data.bestMatches['0']['2. name']
		console.log(stockName)
	})
	.catch(err => {
		console.error(err);
	});
}

function getChart() {

	var ticker = searchInput.value;

fetch("https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=" + ticker + "&outputsize=compact&datatype=json", {
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
	
	var firstPrice = parseFloat(storeClose[0]);
	var lastPrice = parseFloat(storeClose[21]);
	var color;

	if(lastPrice > firstPrice) {
		color = '#39FF6E'
	} else {
		color = '#FF4600'
	}

	console.log(firstPrice);
	console.log(lastPrice)
	console.log(typeof lastPrice);
	

	new Chart(document.getElementById("stockChart"), {
		type: 'line',
		data: {
		  labels: storeDays,
		  datasets: [{ 
			  data: storeClose,
			  label: ticker,
			  backgroundColor: color,
			  borderColor: color,
			  fill: false
			},
		  ]
		},
		options: {
			responsive: true,
		  title: {
			display: true,
			text: stockName +  ' Price Chart (1 Month)'
		  }
		}
	  });


}).catch(err => {
	console.error(err);
});
}
button.addEventListener('click', getName);
button.addEventListener('click', getChart);