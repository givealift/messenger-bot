export interface IRouteSubscription {
    subscriber: string;
    fromCityId: number;
    toCityId: number;
    date: string;
    routeId?: number;
}