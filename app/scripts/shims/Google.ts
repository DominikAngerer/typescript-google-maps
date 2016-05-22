import { shim } from '../shims/shim';

/**
 * Loads variable from window with the
 * name 'google'
 * 
 * @export
 * @returns {*} window['google']
 */
export let google = shim('google'); 