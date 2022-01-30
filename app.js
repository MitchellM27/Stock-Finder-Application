var button = document.getElementById('fetch-button');
var buttonNav = document.getElementById('nav-btn');
var displayTitle = document.getElementById('display-title');
var userInput = document.getElementById('stocks');
let API_KEY_1 = 'f291824c7bmsh540cb4118e2e904p137ff7jsn7d53ba9ab701'

function getApi() {

    var ticker = document.getElementById('stocks').value || document.getElementById('stocks-nav').value
    alert(ticker)

    if (!ticker) {
        return;
    }

    fetch("https://alpha-vantage.p.rapidapi.com/query?keywords=" + ticker + "&function=SYMBOL_SEARCH&datatype=json", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
		"x-rapidapi-key": API_KEY_1
	}
    }).then(response => {
        return response.json();
    })
    .then(data => {

        let stockName = data.bestMatches['0']['2. name']

        fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ stockName + '&api-key=' + 'oiZefQYBJaX74nivdLCxx5Mq615naOVs')
        .then(response => {
            return response.json();
        }).then (d => {
            var data = d.response.docs;

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

button.addEventListener('click', getApi);
buttonNav.addEventListener('click', getApi);