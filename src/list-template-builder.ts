import { Route } from "./_models/route";
import { IButton, IListResponse } from "./_interfaces/responses";
import moment from 'moment';


export class ListTemplateBuilder {
    private template = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "list",
                "top_element_style": "compact",
                "elements": new Array(),
                "buttons": new Array<IButton>()
            }
        }
    };

    constructor() { }

    public build(): IListResponse {
        console.log("building");

        return this.template;
    }

    public addButton(button: IButton) {
        console.log("adding button");
        this.template.attachment.payload.buttons.push(button);
        return this;
    }

    private addElement(route: Route) {
        console.log("adding element");
        const from = route.from.city.name;
        const to = route.to.city.name;
        const dateTime = moment(route.from.date);
        const timeDiff = moment(dateTime).diff(moment(), "day")
        const displayTime = moment(dateTime).format("hh:mm");

        const driverName = route.galUserPublicResponse.firstName;
        const driverSurname = route.galUserPublicResponse.lastName;

        const driverPhone = route.galUserPublicResponse.phone;

        let displayDate: string;

        switch (timeDiff) {
            case 0:
                displayDate = "dzisiaj";
                break;
            case 1:
                displayDate = "jutro";
                break;
            default:
                displayDate = moment(dateTime).format("DD/MM");
                break;
        }

        const template = {
            "title": `${from} -> ${to}, ${displayDate} o ${displayTime}`,
            "subtitle": `${driverName} ${driverSurname}`, // TODO: fetch user and add id to the model
            "default_action": {
                "type": "web_url",
                "url": `https://givealift.herokuapp.com/route/${route.routeId}`,
                "messenger_extensions": false,
                "webview_height_ratio": "tall"
            },
            "buttons": [
                {
                    "title": "Zadzwoń do kierowcy",
                    "type": "phone_number",
                    "payload": driverPhone //TODO: fetch user and add phone number here
                }
            ]
        }

        this.template.attachment.payload.elements.push(template);
    }

    public addElements(routes: Route[]) {
        routes = routes.slice(0, 4);
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            this.addElement(route);
        }
        return this;
    }
}
