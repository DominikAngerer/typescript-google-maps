import { IIterableObject } from './Interfaces';

/**
 * Simple to use Template Function which will replace
 * placeholder like `{{title}` with the property which has
 * the key title in the data Object
 * 
 * @export
 * @param {string} template HTML as string
 * @param {IIterableObject<any>} [data] Data with key's which should replace the placeholder
 * @returns HTML as string
 */
export function template(template: string, data?:IIterableObject<any>): string {
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            let value:any = data[key];
            template = template.replace(new RegExp('\{\{' + key + '\}\}', 'g'), value);
        }
    }
    return template;
}