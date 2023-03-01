import API_KEY from "/env.js"


const count = 10;
const apiKey = API_KEY.API_KEY_UNSPLASHE;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

const imageContainer = document.getElementById('container_image');
let photosArray = []

// const fetchUnsplashApi = async () {
//     fetch(URL, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept-Version": "V1",
//         },
//     }).then((response) => response.json())
// }

// Get photos frum Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data)
        photosArray = data
        displayPhotos()
    } catch (error) {
        //Catch error here
    }
}

function setAttributes(element, attributes) {
    for(const key in attributes)  {
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotos(){
    for (let i = 0 ; i < photosArray.length ; i++) {
        const newElement = document.createElement("a")
        const newImgElement = document.createElement("img")

        setAttributes(newElement, {
            "href": photosArray[i].links.html,
            "target": "_blank"
        })

        setAttributes(newImgElement, {
            "src": photosArray[i].urls.regular,
            "alt": photosArray[i].alt_description,
            "title": photosArray[i].description
        })

        newElement.appendChild(newImgElement)
        imageContainer.appendChild(newElement)
    }
}


// On loads,

getPhotos()