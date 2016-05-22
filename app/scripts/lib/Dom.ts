/**
 * Generate DOM from html string like described here:
 * http://stackoverflow.com/a/494348/1581725
 * 
 * @export
 * @param {string} html html string
 * @param {Document} [context] Document Context - usefull if you want to run it on nodeJS
 * @returns {DocumentFragment} Generated DocumentFragment
 */
export function render(html: string, context?: Document): DocumentFragment {
    context = context ? context : document;
    let fragment:DocumentFragment = context.createDocumentFragment();
    let element:HTMLElement = context.createElement('div');
    let childNodes: NodeListOf<Node> = element.childNodes;
    element.innerHTML = html;
    for (let i = 0, max = childNodes.length; i < max; i++) {
        fragment.appendChild(childNodes[i]);
    }
    return fragment;
}