const secretKey = "fc3980413b6d4addb6ac76f06072ab7a"
const rawgUrl = `https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=${secretKey}`

/* Function to input data into the HTML file */
const dataContainer = document.getElementById("container");

function insertIntoHtml(name, rating, numberOfTags) {
    let tempHtml = document.createElement("div");
    tempHtml.style.boxShadow = "5px 5px 20px #b0b";
    tempHtml.innerHTML = `<h2>${name}</h2><p>Rating:${rating} - Number of tags:${numberOfTags}</p>`
    dataContainer.appendChild(tempHtml);
}

/* Function to handle loading toggle */
const loadingScreen = document.getElementById("loader");

const toggleLoading = () => {

    /* Method to toggle loading */
    if (loadingScreen.classList.contains("hidden")) {
        console.log("loading-off");
        loadingScreen.classList.remove("hidden");

    } else {
        console.log("loading-on");
        loadingScreen.classList.add("hidden");
    }
}

/* Function to fetch the API data */
const fetchRawData = async () => {
    try {
        const res = await fetch(rawgUrl);
        let result = await res.json();

        /* Hide loadingscreen after 1s */
        setTimeout(toggleLoading, 1000);

        if (result.results.length > 0) {
            let max = 8;

            if (result.results.length < 8) {
                max = result.results.length;
            }

            for (let i = 0; i < max; i++) {
                /* Error handeling from the data */
                const name = result.results[i].name ?? "No name";
                const rating = result.results[i].rating ?? 0;

                if (isNaN(rating)) {
                    rating = 0;
                }

                const tags = result.results[i].tags;
                let numberOfTags = 0;

                if (tags?.length > 0) {
                    numberOfTags = tags.length;
                }

                insertIntoHtml(name, rating, numberOfTags);
            }

        } else {
            /* Error where we get a response without data */
            insertIntoHtml("Error, no data found...", 0, 0);
        }

    } catch (error) {
        console.error(error);
    }
}

/* Starting the loadingscreen */
toggleLoading();
setTimeout(fetchRawData, 1000);
