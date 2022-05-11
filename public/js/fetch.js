
let events = document.querySelector('#events-container');
let pageNumber = 1;
let maxPageNumber;
let eventData = [];
let nextBtn = document.querySelector('#next')
let previousBtn = document.querySelector('#previous')

function apiDataPull () {
    fetch(
        `https://api.artic.edu/api/v1/events?limit=24&page=${pageNumber}`
    )
    .then ((response) => response.json())
    .then ((museumData) => {
        maxPageNumber = museumData.pagination.total_pages;
        console.log(museumData);
        for (let i = 0; i < museumData.data.length; i++) {
            let pEl = document.createElement('h2');
            pEl.innerText =museumData.data[i].title + "     "+ museumData.data[i].start_date;
            events.appendChild(pEl);
            let pEl2 = document.createElement('p');
            pEl2.innerHTML =museumData.data[i].short_description;
            events.appendChild(pEl2);
        }
        //id (not displayed)
        //title
        //short_desc
    })
    }

nextBtn.addEventListener('click', function(event) {
    if(pageNumber < maxPageNumber) {
    pageNumber ++;
    events.innerHTML = '';
    } else (pageNumber = 1)
    apiDataPull();
})
previousBtn.addEventListener('click', function(event) {
    if( 1 < pageNumber) {
    pageNumber --
    events.innerHTML = '';
    } else (pageNumber = maxPageNumber)
    apiDataPull();
})
apiDataPull();