
let events = document.querySelector('#events-container');
let pageNumber = 1;
let maxPageNumber;
let nextBtn = document.querySelector('#next')
let previousBtn = document.querySelector('#previous')

function apiDataPull () {
    fetch(
        `https://api.artic.edu/api/v1/events?limit=24&page=${pageNumber}`
    )
    .then ((response) => response.json())
    .then ((museumData) => {
        let eventData = [];
        maxPageNumber = museumData.pagination.total_pages;
        for (let i = 0; i < museumData.data.length; i++) {
            let h2El = document.createElement('h2');
            h2El.innerText =museumData.data[i].title + "     "+ museumData.data[i].start_date;
            events.appendChild(h2El);
            let pEl = document.createElement('p');
            pEl.innerHTML =museumData.data[i].short_description;
            events.appendChild(pEl);
            let eventObj = {
                id: museumData.data[i].id, 
                title: museumData.data[i].title,
                despcription: museumData.data[i].short_description,
                event_date: museumData.data[i].start_date
            };
            eventData.push(eventObj);
        }
        //id (not displayed)
        //title
        //short_desc
        console.log(eventData);
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