import * as controllers from '../controllers/Controllers';

/**
 * Import's all Controllers which are exported in the Controllers.ts
 * so we can initialize all Types of Controller easier.
 * 
 * This function also allows us to execute the initialization of
 * Controllers only for a part type of the DOM - let's say a 
 * newly generated and added DOM Component. So we won't have to 
 * reinitialize all Components - only the Components which are
 * inside that newly created HTMLElement.
 * 
 * @export
 * @param {HTMLElement} [element] DOM Element in which the Controller should be initialized - if not set we're using the document.body;
 */
export function parse(element?: Element | DocumentFragment) {
    let controllerClasses: any = controllers;
    if (!element) {
        element = document.body;
    }
    for (let key in controllerClasses) {
        if (controllerClasses.hasOwnProperty(key)) {
            let controllerClass: any = controllerClasses[key];
            if (typeof controllerClass.parse === 'function') {
                controllerClass.parse('', element);
            }
        }
    }
}