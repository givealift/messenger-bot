import { Route } from "./_models/route";

import moment from 'moment';

export const MOCK_ROUTES: Route[] =
    [
        {
            "routeId": 212,
            "galUserPublicResponse": {
                "firstName": "jan",
                "lastName": "brzechwa",
                "email": "jan@brzechwa",
                "phone": "123456",
                "gender": "male"
            },
            "ownerId": 0,
            "from": {
                "localizationId": 210,
                "city": {
                    "cityId": 1,
                    "name": "Warszawa",
                    "country": "powiat Warszawa",
                    "province": "mazowieckie",
                    "cityInfo": {
                        "cityInfoId": 2,
                        "population": 1724404,
                        "citySize": 517
                    }
                },
                "placeOfMeeting": "string",
                "date": moment().format("YYYY-MM-DD hh:mm")
            },
            "stops": [
                {
                    "localizationId": 213,
                    "city": {
                        "cityId": 3,
                        "name": "Kraków",
                        "country": null,
                        "province": null,
                        "cityInfo": null
                    },
                    "placeOfMeeting": "string",
                    "date": moment().format("YYYY-MM-DD hh:mm")
                },
                {
                    "localizationId": 214,
                    "city": {
                        "cityId": 5,
                        "name": "Łódź",
                        "country": null,
                        "province": null,
                        "cityInfo": null
                    },
                    "placeOfMeeting": "string",
                    "date": moment().format("YYYY-MM-DD hh:mm")
                }
            ],
            "to": {
                "localizationId": 211,
                "city": {
                    "cityId": 7,
                    "name": "Wrocław",
                    "country": "powiat Wrocław",
                    "province": "dolnośląskie",
                    "cityInfo": {
                        "cityInfoId": 8,
                        "population": 632067,
                        "citySize": 293
                    }
                },
                "placeOfMeeting": "string",
                "date": moment().format("YYYY-MM-DD hh:mm")
            },
            "numberOfSeats": 0,
            "numberOfOccupiedSeats": 0,
            "price": 0
        },
        {
            "routeId": 217,
            "galUserPublicResponse": {
                "firstName": "jan",
                "lastName": "brzechwa",
                "email": "jan@brzechwa",
                "phone": "123456",
                "gender": "male"
            },
            "ownerId": 0,
            "from": {
                "localizationId": 215,
                "city": {
                    "cityId": 1,
                    "name": "Warszawa",
                    "country": "powiat Warszawa",
                    "province": "mazowieckie",
                    "cityInfo": {
                        "cityInfoId": 2,
                        "population": 1724404,
                        "citySize": 517
                    }
                },
                "placeOfMeeting": "string",
                "date": moment().format("YYYY-MM-DD hh:mm")
            },
            "stops": [
                {
                    "localizationId": 218,
                    "city": {
                        "cityId": 3,
                        "name": "Kraków",
                        "country": null,
                        "province": null,
                        "cityInfo": null
                    },
                    "placeOfMeeting": "string",
                    "date": moment().format("YYYY-MM-DD hh:mm")
                },
                {
                    "localizationId": 219,
                    "city": {
                        "cityId": 5,
                        "name": "Łódź",
                        "country": null,
                        "province": null,
                        "cityInfo": null
                    },
                    "placeOfMeeting": "string",
                    "date": moment().format("YYYY-MM-DD hh:mm")
                }
            ],
            "to": {
                "localizationId": 216,
                "city": {
                    "cityId": 7,
                    "name": "Wrocław",
                    "country": "powiat Wrocław",
                    "province": "dolnośląskie",
                    "cityInfo": {
                        "cityInfoId": 8,
                        "population": 632067,
                        "citySize": 293
                    }
                },
                "placeOfMeeting": "string",
                "date": moment().format("YYYY-MM-DD hh:mm")
            },
            "numberOfSeats": 0,
            "numberOfOccupiedSeats": 0,
            "price": 0
        },
        {
            "routeId": 222,
            "galUserPublicResponse": {
                "firstName": "jan",
                "lastName": "brzechwa",
                "email": "jan@brzechwa",
                "phone": "123456",
                "gender": "male"
            },
            "ownerId": 0,
            "from": {
                "localizationId": 220,
                "city": {
                    "cityId": 1,
                    "name": "Warszawa",
                    "country": "powiat Warszawa",
                    "province": "mazowieckie",
                    "cityInfo": {
                        "cityInfoId": 2,
                        "population": 1724404,
                        "citySize": 517
                    }
                },
                "placeOfMeeting": "string",
                "date": moment().format("YYYY-MM-DD hh:mm")
            },
            "stops": [
                {
                    "localizationId": 223,
                    "city": {
                        "cityId": 3,
                        "name": "Kraków",
                        "country": null,
                        "province": null,
                        "cityInfo": null
                    },
                    "placeOfMeeting": "string",
                    "date": moment().format("YYYY-MM-DD hh:mm")
                },
                {
                    "localizationId": 224,
                    "city": {
                        "cityId": 5,
                        "name": "Łódź",
                        "country": null,
                        "province": null,
                        "cityInfo": null
                    },
                    "placeOfMeeting": "string",
                    "date": moment().format("YYYY-MM-DD hh:mm")
                }
            ],
            "to": {
                "localizationId": 221,
                "city": {
                    "cityId": 7,
                    "name": "Wrocław",
                    "country": "powiat Wrocław",
                    "province": "dolnośląskie",
                    "cityInfo": {
                        "cityInfoId": 8,
                        "population": 632067,
                        "citySize": 293
                    }
                },
                "placeOfMeeting": "string",
                "date": moment().format("YYYY-MM-DD hh:mm")
            },
            "numberOfSeats": 0,
            "numberOfOccupiedSeats": 0,
            "price": 0
        },
        {
            "routeId": 227,
            "galUserPublicResponse": {
                "firstName": "jan",
                "lastName": "brzechwa",
                "email": "jan@brzechwa",
                "phone": "123456",
                "gender": "male"
            },
            "ownerId": 0,
            "from": {
                "localizationId": 225,
                "city": {
                    "cityId": 1,
                    "name": "Warszawa",
                    "country": "powiat Warszawa",
                    "province": "mazowieckie",
                    "cityInfo": {
                        "cityInfoId": 2,
                        "population": 1724404,
                        "citySize": 517
                    }
                },
                "placeOfMeeting": "string",
                "date": moment().format("YYYY-MM-DD hh:mm")
            },
            "stops": [
                {
                    "localizationId": 228,
                    "city": {
                        "cityId": 3,
                        "name": "Kraków",
                        "country": null,
                        "province": null,
                        "cityInfo": null
                    },
                    "placeOfMeeting": "string",
                    "date": moment().format("YYYY-MM-DD hh:mm")
                },
                {
                    "localizationId": 229,
                    "city": {
                        "cityId": 5,
                        "name": "Łódź",
                        "country": null,
                        "province": null,
                        "cityInfo": null
                    },
                    "placeOfMeeting": "string",
                    "date": moment().format("YYYY-MM-DD hh:mm")
                }
            ],
            "to": {
                "localizationId": 226,
                "city": {
                    "cityId": 7,
                    "name": "Wrocław",
                    "country": "powiat Wrocław",
                    "province": "dolnośląskie",
                    "cityInfo": {
                        "cityInfoId": 8,
                        "population": 632067,
                        "citySize": 293
                    }
                },
                "placeOfMeeting": "string",
                "date": moment().format("YYYY-MM-DD hh:mm")
            },
            "numberOfSeats": 0,
            "numberOfOccupiedSeats": 0,
            "price": 0
        },
        {
            "routeId": 232,
            "galUserPublicResponse": {
                "firstName": "jan",
                "lastName": "brzechwa",
                "email": "jan@brzechwa",
                "phone": "123456",
                "gender": "male"
            },
            "ownerId": 0,
            "from": {
                "localizationId": 230,
                "city": {
                    "cityId": 1,
                    "name": "Warszawa",
                    "country": "powiat Warszawa",
                    "province": "mazowieckie",
                    "cityInfo": {
                        "cityInfoId": 2,
                        "population": 1724404,
                        "citySize": 517
                    }
                },
                "placeOfMeeting": "string",
                "date": moment().format("YYYY-MM-DD hh:mm")
            },
            "stops": [
                {
                    "localizationId": 233,
                    "city": {
                        "cityId": 3,
                        "name": "Kraków",
                        "country": null,
                        "province": null,
                        "cityInfo": null
                    },
                    "placeOfMeeting": "string",
                    "date": moment().format("YYYY-MM-DD hh:mm")
                },
                {
                    "localizationId": 234,
                    "city": {
                        "cityId": 5,
                        "name": "Łódź",
                        "country": null,
                        "province": null,
                        "cityInfo": null
                    },
                    "placeOfMeeting": "string",
                    "date": moment().format("YYYY-MM-DD hh:mm")
                }
            ],
            "to": {
                "localizationId": 231,
                "city": {
                    "cityId": 7,
                    "name": "Wrocław",
                    "country": "powiat Wrocław",
                    "province": "dolnośląskie",
                    "cityInfo": {
                        "cityInfoId": 8,
                        "population": 632067,
                        "citySize": 293
                    }
                },
                "placeOfMeeting": "string",
                "date": moment().format("YYYY-MM-DD hh:mm")
            },
            "numberOfSeats": 0,
            "numberOfOccupiedSeats": 0,
            "price": 0
        },
        {
            "routeId": 237,
            "galUserPublicResponse": {
                "firstName": "jan",
                "lastName": "brzechwa",
                "email": "jan@brzechwa",
                "phone": "123456",
                "gender": "male"
            },
            "ownerId": 0,
            "from": {
                "localizationId": 235,
                "city": {
                    "cityId": 1,
                    "name": "Warszawa",
                    "country": "powiat Warszawa",
                    "province": "mazowieckie",
                    "cityInfo": {
                        "cityInfoId": 2,
                        "population": 1724404,
                        "citySize": 517
                    }
                },
                "placeOfMeeting": "string",
                "date": moment().format("YYYY-MM-DD hh:mm")
            },
            "stops": [
                {
                    "localizationId": 238,
                    "city": {
                        "cityId": 3,
                        "name": "Kraków",
                        "country": null,
                        "province": null,
                        "cityInfo": null
                    },
                    "placeOfMeeting": "string",
                    "date": moment().format("YYYY-MM-DD hh:mm")
                },
                {
                    "localizationId": 239,
                    "city": {
                        "cityId": 5,
                        "name": "Łódź",
                        "country": null,
                        "province": null,
                        "cityInfo": null
                    },
                    "placeOfMeeting": "string",
                    "date": moment().format("YYYY-MM-DD hh:mm")
                }
            ],
            "to": {
                "localizationId": 236,
                "city": {
                    "cityId": 7,
                    "name": "Wrocław",
                    "country": "powiat Wrocław",
                    "province": "dolnośląskie",
                    "cityInfo": {
                        "cityInfoId": 8,
                        "population": 632067,
                        "citySize": 293
                    }
                },
                "placeOfMeeting": "string",
                "date": moment().format("YYYY-MM-DD hh:mm")
            },
            "numberOfSeats": 0,
            "numberOfOccupiedSeats": 0,
            "price": 0
        }
    ]