import API_KEY from "/env.js"


let count = 5;
const apiKey = API_KEY.API_KEY_UNSPLASHE;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

const imageContainer = document.getElementById('container_image');
const loader = document.getElementById('loader');

let photosArray = []
let ready = false;
let imagesLoaded = 0;
let totalImages = 0

function countChanging() {
    count = 30
}

// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++

    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        countChanging()
    }
}

// Getting the photos

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data)
        photosArray = data
        displayPhotos()
    } catch (error) {
        console.log(error)
    }
}

function setAttributes(element, attributes) {
    for(const key in attributes)  {
        element.setAttribute(key, attributes[key])
    }
}

// FUnction displaying the photos

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length
    
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

        newImgElement.addEventListener('load', imageLoaded())

        newElement.appendChild(newImgElement)
        imageContainer.appendChild(newElement)
    
    }

}

// Check to see if scrollling near bottom of page, load more photos

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos()
        
    }
})


// On loads,

getPhotos()