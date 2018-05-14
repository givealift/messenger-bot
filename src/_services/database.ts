import loki from 'lokijs';
import { IRouteSubscription } from '../_interfaces/route-subscription';
import { City } from '../_models/city';
import { httpify } from 'caseless';
import { CitiesProvider } from './cities.provider';

const CITIES = 'cities';
const SUBSCRIBERS = 'subscribers';

class Database {
    private db: loki;

    constructor() {
        this.db = this.initialize();
    }

    get cities(): Collection<City> {
        return this.db.getCollection(CITIES);
    }

    get subscribers(): Collection<IRouteSubscription> {
        return this.db.getCollection(SUBSCRIBERS)
    }

    private initialize(): loki {

        const initCollection = async () => {
            let subscribers = db.getCollection(SUBSCRIBERS);
            let cities = db.getCollection("cities");

            if (!subscribers) {
                subscribers = db.addCollection<IRouteSubscription>(SUBSCRIBERS, { indices: ['subscriber'] })
            }

            if (!cities) {
                cities = db.addCollection<City>("cities");
                let data = await CitiesProvider.fetchCities();
                data.forEach(city => cities.insert(city));
            }
        }

        let db = new loki('database.db', {
            autoload: true,
            autoloadCallback: initCollection,
            autosave: true,
            autosaveInterval: 4000
        });
        return db;
    }
}

export const database = new Database();