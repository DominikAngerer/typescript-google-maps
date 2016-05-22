import { Controller } from '../lib/Controller';
import { IFreeGeoIPLocation }  from '../models/IFreeGeoIPLocation';
import { IMarker }  from '../models/IMarker';

import { config } from '../Config';
import { google } from '../shims/Google';

import { snazzyMapsStyle } from '../models/SnazzyMaps';

export class MapController extends Controller {
    
    /**
     * Snazzy Maps styles included from the
     * SnazzyMaps Map
     * 
     * @static
     * @type {*}
     */
    static style: any = snazzyMapsStyle;    

    /**
     * Google Maps API Key from the
     * your google account.
     * 
     * @static
     * @type {string} APIKey
     */
    static googleMapsApiKey: string = config.google.map.apiKey;

    /**
     * Selector for the Controller which contains the
     * google maps canvas
     * 
     * @static
     * @type {string} selector
     */
    static selector: string = '[data-google-map-component]';
    
    /**
     * Selector for the Google Map Canvas Container
     * 
     * @static
     * @type {string} Canvas Class
     */
    static canvas: string = '[data-google-map-canvas]';
    
    /**
     * Default Location for initialization if no
     * current Location was found.
     * 
     * @static
     * @type {Object} center
     */
    static center: Object = { lat: 48.2, lng: 16.3667 };
    
    /**
     * Current instance of a Google Maps
     * 
     * @private
     * @type {*} Google Map
     */
    private map: any;
    
    /**
     * Location Object from //freegeoip.net/json/
     * will be set in the setCurrentLocation();
     * 
     * @private
     * @type {ILocation} location
     */
    private currentLocation: IFreeGeoIPLocation;

    /**
     * Google Maps Markers Array.
     */
    private markers: Array<any> = new Array<any>();

    
    /**
     * Creates an instance of MapController.
     * 
     * @param {HTMLElement} element Selected Element from MapController.canvas
     */
    constructor(element: HTMLElement) {
        super(element);
        this.initMap();
    }

    
    /**
     * Initialize the current map with default values.
     */
    initMap() {
        
        // init Google Maps itself
        this.map = new google.maps.Map(this.$(MapController.canvas)[0], {
		    center: MapController.center,
		    scrollwheel: false,
            styles: MapController.style,
		    zoom: 5
        });
        
        // set to current Location according to IP
        this.initCurrentLocation();

        // initialize markers
        this.initMarkers();
    }  

    /**
     * Get Current Markers from Json
     * 
     * Test Data generated via: http://beta.json-generator.com/Ey5gAmsMW
     *
     */
    initMarkers() {
        let xhttp:XMLHttpRequest = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let markerData: Array<IMarker> = JSON.parse(xhttp.responseText);
                this.setMarkersOnMap(markerData);
            }
        };
        xhttp.open('GET', '/data/markers.json', true);
        xhttp.send();
    }

    /**
     * Transforms the current MarkerData to google maps markers
     * and saves them in the markes array.
     */
    setMarkersOnMap(markerData:Array<IMarker>) {
        let icon: any = {
            url: '/images/icon.png',
            // This marker is 45 pixels wide by 40 pixels high.
            size: new google.maps.Size(45, 40),
            scaledSize: new google.maps.Size(45, 40),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 0).
            anchor: new google.maps.Point(0, 0)
        };

        // iterate over marker data and create a marker
        // also we will append the current marker data to the
        // google marker itself - maybe we will need it later
        for (let i: number = 0, max: number = markerData.length; i < max; i++) {
            let currentMarkerData: IMarker = markerData[i];

            let marker: any = new google.maps.Marker({
                position: new google.maps.LatLng(currentMarkerData.latitude, currentMarkerData.longitude),
                map: this.map,
                icon: icon,
                markerData: markerData
            });

            // add to controllers markers array.
            this.markers.push(marker);
        }

        // Resize Event will be triggered once after markers are set.
        google.maps.event.trigger(this.map, 'resize');
    }  

    /**
     * Get Current Location using freegeoip.net because
     * it's fast and quite accurate
     */
    initCurrentLocation() {
        let xhttp:XMLHttpRequest = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                this.currentLocation = <IFreeGeoIPLocation>JSON.parse(xhttp.responseText);
                this.map.setCenter(new google.maps.LatLng(this.currentLocation.latitude, this.currentLocation.longitude));
            }
        };
        xhttp.open('GET', '//freegeoip.net/json/', true);
        xhttp.send();
    }

}