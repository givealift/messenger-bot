import { City } from "../_models/city";

export interface IRouteSubscription {
    notificationType: string;
    subscriber: string;
    fromId: number;
    toId: number;
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