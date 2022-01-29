var button = document.getElementById('fetch-button');
var searchInput = document.getElementById('stocks');

function getName() {

	var tickerInput = searchInput.value;
	
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
		var stockName = data.bestMatches['0']['2. name']

		console.log(stockName)

		return stockName;
		
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

	if (!tickerInput.value) {
		console.error('You need a company ticker value!');		

		// <div class="modal-content">
      	// 	<h4>Modal Header</h4>
      	// 	<p>A bunch of text</p>
    	// </div>
        return;
    }

	fetch("https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=" + tickerValue + "&outputsize=compact&datatype=json", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
			"x-rapidapi-key": "04fab6f718msh76dd0a57c7ff60cp183364jsn8a83f4feee7e"
		}
	}).then(response => {
		return response.json();
	}).then(data=> {

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
		color = '#32a852'
	} else {
		color = '#a83232'
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
		  title: {
			display: true,
			text: ticker +  ' Monthly Price Chart'
		  }
		}

		new Chart(document.getElementById("stockChart"), {
			type: 'line',
			data: {
			labels: storeDays,
			datasets: [{ 
				data: storeClose,
				label: tickerValue,
				borderColor: "#3e95cd",
				fill: false
				},
			]
			},
			options: {
			title: {
				display: true,
				text: tickerValue + 'Monthly Chart',
			}
			}
		});


	}).catch(err => {
		console.error(err);
	});
}

}).catch(err => {
	console.error(err);
});
}

button.addEventListener('click', getChart);
