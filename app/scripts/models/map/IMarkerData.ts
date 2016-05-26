import { IMarker }  from './IMarker';

/**
 * This is how a marker should
 * look like with a little bit more data in it
 * 
 * @interface IMarkerData
 */
export interface IMarkerData extends IMarker {
    company: string;
    picture: string;
}