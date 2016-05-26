/**
 * This is the response we will get from
 * freegeoip.net - to make it typesafe & sure
 * I've created that Interfac
 * 
 * @interface IFreeGeoIPLocation
 */
export interface IFreeGeoIPLocation {
    city : string;
    country_code : string;
    country_name : string;
    ip : string;
    latitude : number;
    longitude : number;
    metro_code : number;
    region_code : string;
    region_name : string;
    time_zone : string;
    zip_code : string;
}