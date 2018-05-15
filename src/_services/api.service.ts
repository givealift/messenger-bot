import { Http } from "../http";
import { City } from "../_models/city";
import { CitiesProvider } from "./cities.provider";
import { startsWith } from "../utils";
import { IRouteParams } from "../_interfaces/route-params";
import moment from 'moment';
import { IRouteSubscription } from "../_interfaces/route-subscription";
import { Route } from "../_models/route";
import { database } from "./database";
export class APIService {

    private readonly GIVEALIFT_API_URL = "https://mysterious-lowlands-82501.herokuapp.com/api";
    private http = new Http();

    constructor() { }

    async searchRoutes(from: string, to: string, date: string) {

        let [fromCity] = database.cities.where(city => startsWith(from)(city.name));
        let [toCity] = database.cities.where(city => startsWith(to)(city.name));

        if (!(fromCity && toCity)) {
            return [];
        }

        const params = {
            from: fromCity.cityId,
            to: toCity.cityId,
            date: date
        };

        try {
            const url = `${this.GIVEALIFT_API_URL}/route/search`;
            return await this.http.get<Route[]>(url, params);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getCity(name: string): Promise<City | null> {
        const cities: City[] = database.cities.data;
        const matches = cities.filter(city => startsWith(name)(city.name));
        if (matches.length) {
            return matches[0];
        }

        const params = { search: name, limit: 1 };
        let response: City;
        try {
            const url = `${this.GIVEALIFT_API_URL}/city/search`;
            [response] = await this.http.get<City[]>(url, params);
        } catch (error) {
            console.log(error);
        }
        return response || null;
    }

    async getRoute(routeId: number): Promise<Route | null> {
        try {
            const url = `${this.GIVEALIFT_API_URL}/route/${routeId}`;
            return await this.http.get<Route>(url);
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    private async prepareSubscriptionBody(owner_psid: string, params: IRouteParams): Promise<IRouteSubscription> {
        let fromCity = await this.getCity(params.from);
        let toCity = await this.getCity(params.to);

        if (!(fromCity && toCity)) {
            throw new Error("CITY_NOT_FOUND");
        }

        let date = params.date ? moment(params.date).format("YYYY-MM-DD") : null;

        const body: IRouteSubscription = {
            subscriber: owner_psid,
            fromCityId: fromCity.cityId,
            toCityId: toCity.cityId,
            date: date
        }
        return body;
    }

    async subscribeForNotification(sender_psid: string, params: IRouteParams) {
        const url = `${this.GIVEALIFT_API_URL}/subscription`;
        // const url = "http://localhost:1337/subscribe";
        let response;
        try {
            const body = await this.prepareSubscriptionBody(sender_psid, params);
            return await this.http.post(url, body);
        } catch (error) {
            console.error(error);
        }
        return null;
    }

    async cancelSubscription(sender_psid: string, params: IRouteParams) {
        // const url = `${this.GIVEALIFT_API_URL}/subscribe`;
        const url = "http://localhost:1337/subscribe";
        let response;
        try {
            const body = await this.prepareSubscriptionBody(sender_psid, params);
            response = await this.http.delete(url, body);
        } catch (error) {
            console.error(error);
        }
        return response;
    }
}