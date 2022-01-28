var tickerInput = 'TSLA';


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
	console.log (tsd['2022-01-25']['4. close'])
	console.log (arrayTSD[0])


	var storeDays = [];
	var storeClose = [];

	for (i=21 ; i>=0 ; i--) {
		let date = arrayTSD[i];
		let closePrice = tsd[date]['4. close']
		storeClose.push(closePrice)
		storeDays.push(arrayTSD[i])
	}

	console.log (storeDays)
	console.log (storeClose)

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
			text: 'Tesla Motors Monthly Price Chart'
		  }
		}
	  });


}).catch(err => {
	console.error(err);
});





