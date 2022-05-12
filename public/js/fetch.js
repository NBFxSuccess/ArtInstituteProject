
let events = document.querySelector('#events-container');
let pageNumber = 1;
let maxPageNumber;
let nextBtn = document.querySelector('#next');
let previousBtn = document.querySelector('#previous');
let eventData = [];

function apiDataPull () {
    fetch(
        `https://api.artic.edu/api/v1/events?limit=24&page=${pageNumber}`
    )
    .then ((response) => response.json())
    .then ((museumData) => {
        eventData = [];
        maxPageNumber = museumData.pagination.total_pages;
        for (let i = 0; i < museumData.data.length; i++) {
            let h2El = document.createElement('h2');
            h2El.innerText =museumData.data[i].title + "     "+ museumData.data[i].start_date;
            events.appendChild(h2El);
            let pEl = document.createElement('p');
            pEl.innerHTML =museumData.data[i].short_description;
            events.appendChild(pEl);
            let addBtn = document.createElement('button');
            addBtn.innerText = 'Save Event';
            events.appendChild(addBtn);
            addBtn.setAttribute('class','btn btn-primary mt-5 mb-5 addBtn');
            addBtn.setAttribute('data-i',i);
            let eventObj = {
                id: museumData.data[i].id, 
                name: museumData.data[i].title,
                description: museumData.data[i].short_description,
                event_date: museumData.data[i].start_date
            };
            eventData.push(eventObj);
            let addButtons = document.querySelectorAll('.addBtn');
        }
        //id (not displayed)
        //title
        //short_desc
        console.log(eventData);
    })
    }

nextBtn.addEventListener('click', function(event) {
    events.innerHTML = '';
    if(pageNumber < maxPageNumber) {
    pageNumber ++;
    } else (pageNumber = 1)
    apiDataPull();
})
previousBtn.addEventListener('click', function(event) {
    events.innerHTML = '';
    if( 1 < pageNumber) {
    pageNumber --;
    } else (pageNumber = maxPageNumber);
    apiDataPull();
})

events.addEventListener('click', async function(event){
    if (event.target.matches('button')) {
        const response = await fetch(`/api/events`, {
            method: 'POST',
            body: JSON.stringify(eventData[event.target.dataset.i]),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
              
            const response = await fetch(`/api/events/savedEvents`, {
                method: 'POST',
                body: JSON.stringify({event_id: eventData[event.target.dataset.i].id }),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if(response.ok){
                  console.log("savedEvents worked")
              }
              else{
                  console.log("saved events didnt work")
              }
          } else {
            alert('Failed to create project');
          }
        console.log(eventData[event.target.dataset.i])
    }
})
apiDataPull();
 
