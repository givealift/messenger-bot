import { Http } from "./http";
import { MOCK_ROUTES } from './stub-api';
import { City } from "./_models/city";
import { CitiesProvider } from "./cities.provider";
import { startsWith } from "./_models/utils";

export class APIService {

    private readonly GIVEALIFT_API_URL = "https://mysterious-lowlands-82501.herokuapp.com/api";
    private http = new Http();

    constructor() { }

    async searchRoutes(from: string, to: string, date: string) {
        let fromCity = await this.getCity(from);
        let toCity = await this.getCity(to);

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
            // return await this.http.get<Route[]>(url, params);
            return MOCK_ROUTES;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getCity(name: string): Promise<City | null> {
        const cities: City[] = await CitiesProvider.getCities();
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
}