// LIVE
export let config = {
    google: {
        map: {
            apiKey: 'AIzaSyDkMIvtXdg8Nuy9lR0HUWxyAD6xlcP7kZ8'
        }
    },
    project: {
        version: 'FPeSe6S6hfIyXoVqAA74',
        paths: {
            markers: '/data/markers.json'
        }
    }
}

// TEST
if (window.location.hostname.search(/test.ts-google-map.dominikangerer.com/i) != -1) {
}

// DEV
if (window.location.hostname.search(/localhost/i) != -1 || window.location.hostname.search(/0.0.0.0/i) != -1) {
    config.project.paths.markers = '/data/markers.json'; // use file from data folder always if on localhost.
}