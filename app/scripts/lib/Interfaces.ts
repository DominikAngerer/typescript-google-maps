/**
 * Allows us to use an iterateable Object
 * 
 * @export
 * @interface IIterableObject
 * @template T
 */
export interface IIterableObject<T> {
    [key: string]: T;
}