import { Route } from "./_models/route";
import moment from 'moment';
import { ITextResponse, ITemplateParams } from "./_interfaces/responses";
import { ListTemplateBuilder } from "./list-template-builder";


class ResponseBuilder {

    public text(text: string): ITextResponse {
        return { "text": text };
    }

    public genericTemplate({ title, subtitle, buttons }: ITemplateParams) {
        return {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": title,
                        "subtitle": subtitle,
                        "buttons": buttons
                    }]
                }
            }
        }
    }

    public list() {
        return new ListTemplateBuilder();
    }

    public routeAnnouncment(from: string, to: string) {
        return {
            "dynamic_text": {
                "text": `Hej, {{first_name}}! Pojawił się przejazd na trasie ${from} - ${to}`,
                "fallback_text": `Hej! Pojawił się przejazd na trasie ${from} - ${to}`
            }
        }
    }

    public subscribedRoute(route: Route) {
        return {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": `${route.from.city.name} - ${route.to.city.name}, ${moment(route.from.date).format("LL")}`,
                            "subtitle": `${route.galUserPublicResponse.firstName} ${route.galUserPublicResponse.lastName}`,
                            "buttons": [
                                {
                                    "title": "Szczegóły",
                                    "type": "web_url",
                                    "url": `https://givealift.herokuapp.com/route/${route.routeId}`
                                },
                                {
                                    "title": "Zadzwoń",
                                    "type": "phone_number",
                                    "payload": route.galUserPublicResponse.phone
                                }
                            ]
                        }
                    ],
                }
            }
        }
    }
}

export const responseBuilder = new ResponseBuilder();