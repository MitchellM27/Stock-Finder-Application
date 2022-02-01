var button = document.getElementById('fetch-button');
var buttonNav = document.getElementById('nav-btn')
var searchInput = document.getElementById('stocks');

var apple = $("#popularApple");
var tesla = $("#popularTesla");
var amazon = $("#popularAmazon");
var sony= $("#popularSony");
var microsoft = $("#popularMicrosoft");

var appleMobile = $("#popularAppleMobile");
var teslaMobile = $("#popularTeslaMobile");
var amazonMobile = $("#popularAmazonMobile");
var sonyMobile = $("#popularSonyMobile");
var microsoftMobile = $("#popularMicrosoftMobile");

var prevSearchEl = $("#prevSearches");
var prevSearchList = []; 

let API_KEY = 'f291824c7bmsh540cb4118e2e904p137ff7jsn7d53ba9ab701'
var displayTitle = document.getElementById('display-title');


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
			searchList (stockName)

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
			color = '#18B202'
		} else {
			color = '#FF4600'
		}

		var stockChart = document.getElementById("stockChart");
		stockChart.innerHTML = '';

		new Chart(stockChart, {
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
				maintainAspectRatio: false,

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

function init(){
    var storedSearchList = JSON.parse(localStorage.getItem("prevSearchList"));

    
    if ( storedSearchList !== null) {
        prevSearchList = storedSearchList;
      }

    renderSearchesEl();
}

init();

function storeSearches(){
	localStorage.setItem("prevSearchList", JSON.stringify(prevSearchList));
  }

function renderSearchesEl() {
    prevSearchEl.empty();
    
    for (var i = 0; i < prevSearchList.length; i++) {
      var search = prevSearchList[i];
      
      var li = $("<li>").text(search);
      li.attr("id","listEl");
      li.attr("data-search", search);
      li.attr("class", "list-group-item");
      prevSearchEl.prepend(li);
    }
}     

function searchList (stockName) {
	if (prevSearchList.includes(stockName)){
        return false;
    } else {
        prevSearchList.push(stockName);
    }

    storeSearches();
    renderSearchesEl();
}

apple.click (function () {
	var ticker = 'aapl';
	console.log(ticker)
	getName (ticker)
})

tesla.click (function () {
	var ticker = 'tsla';
	console.log(ticker)
	getName (ticker)
})

amazon.click (function () {
	var ticker = 'amzn';
	console.log(ticker)
	getName (ticker)
})

sony.click (function () {
	var ticker = 'sony';
	console.log(ticker)
	getName (ticker)
})

microsoft.click (function () {
	var ticker = 'msft';
	console.log(ticker)
	getName (ticker)
})

appleMobile.click (function () {
	var ticker = 'aapl';
	console.log(ticker)
	getName (ticker)
})

teslaMobile.click (function () {
	var ticker = 'tsla';
	console.log(ticker)
	getName (ticker)
})

amazonMobile.click (function () {
	var ticker = 'amzn';
	console.log(ticker)
	getName (ticker)
})

sonyMobile.click (function () {
	var ticker = 'sony';
	console.log(ticker)
	getName (ticker)
})

microsoftMobile.click (function () {
	var ticker = 'msft';
	console.log(ticker)
	getName (ticker)
})

button.addEventListener('click', doStuff);
buttonNav.addEventListener('click', doStuff);
