import { User } from "../models/User";

/**
 * Returns a users of array
*/
export const getUsersAccordingRole = (array:Array<User>,role:number): User[]=> {
    
    const users = [];

    for(let element of array){
        if(element.roleId===role){
            users.push(element)
        }
    }

    return users;
};

/**
 * Returns a random value from the given array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array from which to extract the random value.
 * @returns {T} - The random value extracted from the array.
 */
export const getRandomValueFromArray = <T>(array: T[]): T => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

/**
 * Returns a completely random subarray from a given array.
 *
 * @param {T[]} array - The array from which to extract the random subarray.
 * @param {number} length - The length of the random subarray to extract.
 * @returns {T[]} - The extracted random subarray.
 * @throws {Error} - If the requested length is greater than the length of the array.
 */
export const getRandomSubarray = <T>(array: T[], length: number): T[] => {
    if (length > array.length) {
       throw new Error(
          "The requested length is greater than the length of the array."
       );
    }
 
    const shuffledArray = array.slice().sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, length);
};