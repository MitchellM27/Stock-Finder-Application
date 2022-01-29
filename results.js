var searchButton = document.getElementById('fetch-button');
var tickerInput = document.getElementById('stocks');


function searchApi() {

	document.innerHTML = '';              
	var tickerValue = tickerInput.value;

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

		console.log(data);

		let tsd =(data['Time Series (Daily)']);
		var arrayTSD = Object.keys(tsd);

		var storeDays = [];
		var storeClose = [];

		for ( var i = 21 ; i >= 0 ; i--) {
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

searchButton.addEventListener('click', searchApi);
