/* Math random may not be uniqe here but it will do the trick for now */

const semiUniqe = (min= 1 , max = 300): number => {
    return Math.floor(Math.random()*(max-min) + min);
}
export default semiUniqe;