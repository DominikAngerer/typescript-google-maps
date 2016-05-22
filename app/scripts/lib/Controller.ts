/**
 * Generic controller class to entcapsulate the parsing
 * and other generic stuff
 * 
 * @export
 * @class Controller
 */
export class Controller {

    /**
     * Selector which will be overwritten from the 
     * other Controllers so the parse function 
     * can directly query according to that selector.
     * 
     * @static
     * @type {string} 
     */
    static selector: string;

    /**
     * Instances of the Controller
     * 
     * @static
     * @type {Array<Controller>}
     */
    static _instances: Array<Controller> = [];

    /**
     * HTML attribute to mark elements which are already parsed
     * 
     * @static
     */
    static PARSE_ID_ATTRIBUTE = 'data-parse-id';

    /**
     * Element where the instance is applied
     * 
     * @private
     * @type {Element}
     */
    private _element: Element;

    /**
     * Access element or query by selector
     */
    get $() {
        return function(selector?: string): any {
            if (!(this._element instanceof Element)) {
                throw new Error('This controller has no element!');
            }
            return selector ? this._element.querySelectorAll(selector) : this._element;
        }
    }
    set $(value) {
        throw new Error('Setting $ is not allowed');
    }


	/**
     * Creates an instance of a Controller.
     * 
     * @param {Element} root The element where the controller has been applied
     */
    constructor(element: Element) {
        this._element = element;
    }
    
    getControllersByClass(controllerClass: Function): Array<Controller> {
        const instances: Array<Controller> = Controller._instances;
        const result: Array<Controller> = [];
        for (let i = 0, max = instances.length; i < max; i++) {
            let instance = instances[i];
            if (instance instanceof controllerClass) {
                result.push(instance);
            }
        }
        return result;
    }

    /**
     * Hook for running code before the controller is instantiated
     * 
     * @static
     * @param {NodeListOf<Element>} elements List of elements where the controller will be applied
     */
    static beforeInstantiating(elements: NodeListOf<Element>): void { }

    /**
     * Hook for running code after the controller has been instantiated.
     * 
     * @static
     * @param {NodeListOf<Element>} elements List of elements where the controller has been applied
     * @param {Array<Controller>} instances List of controller instances created
     */
    static afterInstantiating(elements: NodeListOf<Element>, instances: Array<Controller>): void { }

    /**
     * Look for elements with a specific selector and creates an instance for
     * every element.
     * 
     * @static
	 * @param {string} selector Dom selector
     * @param {Element} [root=document.body] Starting element for parsing
     */
    static parse(selector?: string, root: Element | DocumentFragment = document.body): void {
        if (typeof this.selector === 'string' && this.selector.length) {
            selector = this.selector;
        } else if (!selector) {
            throw new Error('No Selector for Controller found!');
        }
        const elements: NodeListOf<Element> = root.querySelectorAll(selector);
        this.beforeInstantiating(elements);

        for (let i = 0; i < elements.length; i++) {
            let element: Element = elements[i];
            let className = /^function\s+([\w\$]+)\s*\(/.exec(this.toString())[1];
            className = className.toLocaleLowerCase();
            if (element.getAttribute(Controller.PARSE_ID_ATTRIBUTE + '-' + className)) {
                continue;
            }
            element.setAttribute(Controller.PARSE_ID_ATTRIBUTE + '-' + className, Math.floor(Math.random() * 10 + 1) * Date.now() + '');
            Controller._instances.push(new this(element));
        }

        this.afterInstantiating(elements, Controller._instances);
    }
}