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
}

export const responseBuilder = new ResponseBuilder();