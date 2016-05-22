// LIVE
export let config = {
    google: {
        map: {
            apiKey: 'AIzaSyDkMIvtXdg8Nuy9lR0HUWxyAD6xlcP7kZ8'
        }
    }
}

// TEST
if (window.location.hostname.search(/test.googlemaps.dominikangerer.com/i) != -1) {
}

// DEV
if (window.location.hostname.search(/localhost/i) != -1 || window.location.hostname.search(/0.0.0.0/i) != -1) {

}