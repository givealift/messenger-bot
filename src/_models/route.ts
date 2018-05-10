import { City } from "./city";

interface Location {
    localizationId: number;
    city: City;
    date: string;
    placeOfMeeting: string;
}

interface User {
    "firstName": string;
    "lastName": string;
    "email": string;
    "phone": string;
    "gender": string;
}

export interface Route {
    driver?: any; // temp fix until views are not updated
    routeId: number;
    galUserPublicResponse: User;
    ownerId: number;
    numberOfSeats: number;
    numberOfOccupiedSeats: number;
    price: number;

    from: Location;
    to: Location;
    stops: Array<Location>;
}
