import loki from 'lokijs';
import { IRouteSubscription } from '../_interfaces/route-subscription';

const COLLECTION_NAME = 'subscribers';

class SubscriptionDatabase {
    private db: loki;

    constructor() {
        this.db = this.initialize();
    }

    add(data: IRouteSubscription) {
        this.subscribers.insert(data);
    }

    getAll() {
        return this.subscribers.data;

    }

    get subscribers(): Collection<IRouteSubscription> {
        return this.db.getCollection(COLLECTION_NAME);
    }

    private initialize(): loki {
        const initCollection = () => {
            let subscribers = db.getCollection(COLLECTION_NAME);
            if (!subscribers) {
                subscribers = db.addCollection<IRouteSubscription>(COLLECTION_NAME, { indices: ['subscriber'] })
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

export const database = new SubscriptionDatabase();