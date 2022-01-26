var button = document.getElementById('fetch-button');
var displayTitle = document.getElementById('display-title');

function getNewsApi() {

    fetch('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=' + 'oiZefQYBJaX74nivdLCxx5Mq615naOVs')
    .then(response => {
        return response.json();
    }).then (data => {

        for (var i = 0; i < 6; i++) {
            var showTitle = data.results[i].title;
            var urlLink = data.results[i].url;
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

button.addEventListener('click', getNewsApi);
