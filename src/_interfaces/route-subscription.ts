import { City } from "../_models/city";

export interface IRouteSubscription {
    subscriber: string;
    fromCityId: number;
    toCityId: number;
    date: string;
    routeId?: number;
    id?: number;
}

export interface INewRouteNotification {
    subscriber: string,
    email: string,
    from: City,
    to: City,
    routeId: number
}