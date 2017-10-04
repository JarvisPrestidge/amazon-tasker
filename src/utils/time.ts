import * as moment from "moment";

export type Shift = "DAY" | "NIGHT";

/**
 * If we're currently between the hours of 6am - 6pm then return day else night
 * 
 * @returns {Shift} 
 */
export const getShift = (): Shift => {
    return moment().isBetween(moment({hour: 6}), moment({hour: 18}))
        ? "DAY"
        : "NIGHT";
};
