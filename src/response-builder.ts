export  interface ITextResponse {
    text: string
}

interface ITemplateButton {
    type?: "postback",
    title: string,
    payload: string,
}

interface ITemplateParams {
    title: string;
    subtitle: string;
    buttons: ITemplateButton[]
}

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
}

export const responseBuilder = new ResponseBuilder();