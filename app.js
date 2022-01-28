var button = document.getElementById('fetch-button');
var infoButton = document.getElementById('fetch-info-button');
var displayTitle = document.getElementById('display-title');
var displayBodyContent = document.getElementById('display-body-content');
var userInput = document.getElementById('stocks');

function getApi() {

    displayTitle.innerHTML = '';
    var searchValue = userInput.value; 

    fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ searchValue + '&api-key=' + 'oiZefQYBJaX74nivdLCxx5Mq615naOVs')
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
}

button.addEventListener('click', getApi);
