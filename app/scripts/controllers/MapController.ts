import { Controller } from '../lib/Controller';
import { google } from '../shims/Google';
import { IFreeGeoIPLocation }  from '../models/IFreeGeoIPLocation';

export class MapController extends Controller {

    static style: any = [{ 'stylers': [{ 'hue': '#ff1a00' }, { 'invert_lightness': true }, { 'saturation': -100 }, { 'lightness': 33 }, { 'gamma': 0.5 }] }, { 'featureType': 'water', 'elementType': 'geometry', 'stylers': [{ 'color': '#2D333C' }] }];    

    /**
     * Google Maps API Key from the
     * your google account.
     * 
     * @static
     * @type {string} APIKey
     */
    static googleMapsApiKey: string = '';

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
     * Default Location for initialization
     * 
     * @static
     * @type {Object} center
     */
    static center: Object = { lat: 40.538532, lng: 14.917102 };
    
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
     * Splitted Retailer Data from Silhouette API stored
     * as Google Maps Markers Array.
     */
    private markers: Array<any> = new Array<any>();

    
    /**
     * Creates an instance of RetailerSearchController.
     * 
     * @param {HTMLElement} element Selected Element from RetailerSearchController.canvas
     */
    constructor(element: HTMLElement) {
        super(element);
        this.initMap();
    }

    
    /**
     * Initialize the current map with default values.
     */
    initMap() {
        this.map = new google.maps.Map(this.$(MapController.canvas)[0], {
		    center: MapController.center,
		    scrollwheel: false,
            styles: MapController.style,
		    zoom: 8
        });
        this.initMarkers();
    }  

    /**
     * Get Current Retailers from the Silhouette API
     * as trigger the setRetailersAsMarkers function
     */
    initMarkers() {
        let xhttp:XMLHttpRequest = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                this.setMarkersOnMap(JSON.parse(xhttp.responseText));
            }
        };
        xhttp.open('GET', '/data/markers.json', true);
        xhttp.send();
    }

    /**
     * Transforms the current Retailers to google maps markers
     * and saves them in the markes array.
     */
    setMarkersOnMap(markers:Array<any>) {
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

        for (let i:number = 0, max:number = markers.length; i < max; i++) {
            let marker: any = new google.maps.Marker({
                position: new google.maps.LatLng(markers[i].latitude, markers[i].longitude),
                map: this.map,
                icon: icon,
                retailerData: markers[i]
            });
            this.markers.push(marker);
        }
        
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