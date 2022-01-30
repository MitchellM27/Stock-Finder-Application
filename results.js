var button = document.getElementById('fetch-button');
var buttonNav = document.getElementById('nav-btn')
var searchInput = document.getElementById('stocks');

let API_KEY = 'f291824c7bmsh540cb4118e2e904p137ff7jsn7d53ba9ab701'
var displayTitle = document.getElementById('display-title');

/*
function getApi(ticker) {


    if (!ticker) {
        return;
    }

    fetch("https://alpha-vantage.p.rapidapi.com/query?keywords=" + ticker + "&function=SYMBOL_SEARCH&datatype=json", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
		"x-rapidapi-key": API_KEY
	}
    }).then(response => {
        return response.json();
    })
    .then(data => {

        
    })
    .catch(err => {
        console.error(err);
    });

}*/

function getName(ticker) {

	if (!ticker) {
		return alert("Please include a ticker value")
	}

	fetch("https://alpha-vantage.p.rapidapi.com/query?keywords=" + ticker + "&function=SYMBOL_SEARCH&datatype=json", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
			"x-rapidapi-key": API_KEY
		}
	}).then(response => {
		return response.json();
	})
		.then(data => {
	
			let stockName = data.bestMatches['0']['2. name']
			getChart(ticker, stockName)

			fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ stockName + '&api-key=' + 'oiZefQYBJaX74nivdLCxx5Mq615naOVs')
			.then(response => {
				return response.json();
			}).then (d => {
				var data = d.response.docs;
				displayTitle.innerHTML = ''
	
				for (var i = 0; i < data.length; i++) {
					var showTitle = data[i].headline.main;
					var urlLink = data[i].web_url;
					var storyName = document.createElement('h5');
					var displayLink = document.createElement('a');
					displayLink.setAttribute('href', urlLink);
	
					storyName.textContent = showTitle;
					displayLink.textContent = urlLink;
	
					displayTitle.append(storyName);
					displayTitle.append(displayLink);
				}
				
			})
			.catch(err => {
				console.error(err);
			});


		})
		.catch(err => {
			console.error(err);
		});
}
function getChart(ticker, stockName) {

	fetch("https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=" + ticker + "&outputsize=compact&datatype=json", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
			"x-rapidapi-key": API_KEY
		}
	}).then(response => {
		return response.json();
	}).then(data => {
		
		let tsd = (data['Time Series (Daily)']);
		var arrayTSD = Object.keys(tsd);

		var storeDays = [];
		var storeClose = [];

		for (i = 21; i >= 0; i--) {
			let date = arrayTSD[i];
			let closePrice = tsd[date]['4. close']
			storeClose.push(closePrice)
			storeDays.push(arrayTSD[i])
		}

		var firstPrice = parseFloat(storeClose[0]);
		var lastPrice = parseFloat(storeClose[21]);
		var color;

		if (lastPrice > firstPrice) {
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
					text: stockName + ' Price Chart (1 Month)'
				}
			}
		});


	}).catch(err => {
		console.error(err);
	});
}

function doStuff() {
	var ticker = document.getElementById('stocks').value || document.getElementById('stocks-nav').value
	document.getElementById('stocks').value = ''
	document.getElementById('stocks-nav').value = ''
	//getApi(ticker)
	getName(ticker)
	//getChart(ticker)
}

button.addEventListener('click', doStuff);
buttonNav.addEventListener('click', doStuff)
