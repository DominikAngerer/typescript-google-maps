import { config } from '../Config';
import { Controller } from '../lib/Controller';
import { template } from '../lib/Template';

import { IFreeGeoIPLocation }  from '../models/map/IFreeGeoIPLocation';
import { IMarkerData }  from '../models/map/IMarkerData';
import { snazzyMapsStyle } from '../models/map/SnazzyMaps';

import { google } from '../shims/Google';
import { infoBox } from '../shims/InfoBox';

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
     * @type {string} Canvas Selector
     */
    static canvas: string = '[data-google-map-canvas]';
    
    /**
     * Selector for your infobox Template
     * 
     * @static
     * @type {string} Infobox Template Selector
     */
    static infoboxTemplate: string = '[data-google-map-infobox-template]';
    
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
                let markerData: Array<IMarkerData> = JSON.parse(xhttp.responseText);
                this.setMarkersOnMap(markerData);
            }
        };
        xhttp.open('GET', config.project.paths.markers, true);
        xhttp.send();
    }

    /**
     * Transforms the current MarkerData to google maps markers
     * and saves them in the markes array.
     */
    setMarkersOnMap(markerData:Array<IMarkerData>) {
        let icon: any = {
            url: '/images/icon.png?v=' + config.project.version,
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
            let currentMarkerData: IMarkerData = markerData[i];

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
    
    /**
     * Generates an InfoBox Element using the InfoBox.JS Library
     * replacing the placeholder from the <script> tag and retrieves it.
     * 
     * @param {IMarkerData} markerData current markerData
     * @returns Instance of an InfoBox
     */
    getInfoBox(markerData: IMarkerData) {
        let infoBoxTemplate:string = this.$(MapController.infoboxTemplate)[0].innerHTML.trim();

        let infoBoxTemplateData: any = {
            company: markerData.company,
            picture: markerData.picture
        }

        let currentInfoBox: any = new infoBox({
            content: template(infoBoxTemplate, infoBoxTemplateData),
            disableAutoPan: false,
            maxWidth: 'auto',
            pixelOffset: new google.maps.Size(-102, 40),
            infoBoxClearance: new google.maps.Size(1, 1),
            closeBoxURL: '' // removes close button
        });

        return currentInfoBox;
    }

}