import { shim } from '../shims/Shim';

/**
 * Loads variable from window with the
 * name 'infoBox'
 * 
 * @export
 * @returns {*} window['infoBox']
 */
export let infoBox = shim('infoBox'); 