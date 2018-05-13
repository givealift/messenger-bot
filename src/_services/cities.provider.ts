import { City } from "../_models/city";
import { Http } from "../http";

export class CitiesProvider {

    private static cities: City[] = [];
    private static initialised = false;
    private static http = new Http();

    public static async getCities() {
        if (this.initialised) {
            return this.cities;
        } else {
            await this.initialize();
            return this.cities;
        }
    }

    private constructor() { }

    static async initialize() {

        this.cities = await this.fetchCities();
        this.initialised = true;
    }

    private static async fetchCities() {
        const url = `https://mysterious-lowlands-82501.herokuapp.com/api/city`;
        let response: City[];
        try {
            response = await this.http.get<City[]>(url);
            response = response.filter(city => city.name);
        } catch (error) {
            console.log(error);
        }
        return response || [];
    }
}

