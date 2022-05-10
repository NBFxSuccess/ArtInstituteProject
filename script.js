// Delcaring Variables.


    fetch(`https://api.artic.edu/api/v1/events`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
  console.log(data)

        });

    // fetch(`${link}`)
    //     .then(function (response) {
    //         return response.json();
    //     })

    //     .then(function (data) {
           

    //     });
   

    // fetch(`${link}`)
    //     .then(function (response) {
    //         return response.json();
    //     })

    //     .then(function (data) {
      
    //     });



