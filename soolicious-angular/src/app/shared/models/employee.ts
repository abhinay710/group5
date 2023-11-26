import { Util } from "./util";

export interface Employee extends Util {
    id?: number;
    firstName?: string;
    lastName?: string;
    designation?: string;
    emailID?: string;
    password?: string;
    createdOn?: Date;
    activeYN?: string;
}