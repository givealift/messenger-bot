import { Moment } from "moment";

export interface IRouteParams {
    from: string;
    to: string;
    date: Moment | null;
}