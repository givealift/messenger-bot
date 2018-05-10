import { caller } from './caller';
import { responseBuilder, ITextResponse } from "./response-builder";
import moment from 'moment';
import { Route } from './_models/route';
type TextType =
    "help"
    | "search"
    | "add"
    | "emoticon"
    | "XD"
    | "unknown"

export class MessageHandler {

    private readonly helpMessage =
        "Aby znaleźć przejazd wpisz 'przejazd (z) _Miasto-startowe_ " +
        "(do) _Miasto-końcowe_, bez odmieniania przez przypadki. \n" +
        "Na przykład: przejazd Warszawa Katowice";

    private readonly unknownCommand = (cmd: string): string => {
        if (cmd.length < 10) {
            return `Wybacz, ale dopiero się uczę i nie rozumiem co znaczy "${cmd}" :(. Wpisz "pomoc", aby zobaczyć na co znam odpowiedź!`;
        } else {
            return "Wybacz, ale dopiero się uczę i nie rozumiem.:(. Wpisz \"pomoc\", aby zobaczyć na co znam odpowiedź!"
        }
    }

    async handleMessage(sender_psid: string, received_message: any) {
        let response;
        let text: string = received_message.text;

        // Checks if the message contains text
        if (text) {
            switch (this.getTextType(text)) {
                case "help":
                    response = this.getHelpResponse();
                    console.debug("Responding with: help");
                    break;
                case "search":
                    // TODO: build list template respnose
                    let searchResults = await this.search(text);
                    if (!searchResults.length) {
                        response = responseBuilder.text("Niestety nic nie znalazłem :(.");
                        console.debug("Responding with: nothing found");
                    } else {
                        let from = searchResults[0].from.city.cityId;
                        let to = searchResults[0].to.city.cityId;
                        let date = searchResults[0].from.date;
                        date = moment(date).format("YYYY-MM-DD");
                        const builder = responseBuilder.newListTemplateBuilder();
                        builder.addElements(searchResults);
                        if (searchResults.length > 4) {
                            builder.addButton({
                                "type": "web_url",
                                "url": `https://givealift.herokuapp.com/route/search/?from=${from}&to=${to}&date=${date}`,
                                "title": "Szukaj dalej"
                            })
                        }
                        response = builder.build();

                        console.debug("Responding with: list");
                    }
                    break;
                case "emoticon":
                    response = responseBuilder.text(text);
                    console.debug("Responding with: emoticon");
                    break;
                case "XD":
                    if (text.length > 30) {
                        response = responseBuilder.text("Opanuj się.")
                    } else {
                        response = responseBuilder.text(text + text[text.length - 1]);
                    }
                    console.debug("Responding with: xD");
                    break;
                default:
                    response = responseBuilder.text(this.unknownCommand(text));
                    console.debug("Responding with: unknown");
            }
        }
        // Sends the response message
        caller.callSendAPI(sender_psid, response);
    }

    getTextType(text: string): TextType {
        switch (true) {
            case /[xX][D+d+]/.test(text):
                return "XD";
            case /[:;B][\)\(\/\|]/.test(text):
                return "emoticon";
            case text.toLowerCase() === "pomoc" || text.toLowerCase() === "instrukcja":
                return "help";
            case text.toLowerCase().startsWith("przejazd"):
                return "search";
            case text.toLowerCase().startsWith("dodaj"):
                return "add";
            default:
                return "unknown"
        }
    }

    // TODO: move to service, return list or sth
    async search(text: string): Promise<Route[]> {
        text = text
            .replace(/\s\s+/g, ' ') // remove duplicated white spaces.
            .replace(/ z | do /g, " "); // trim ' z ' ' do ' as they're just to make query more natural.

        let [przejazd, from, to] = text.split(" ");
        console.log("debug: ", przejazd, from, to);

        let response;
        if (from && to) {
            response = await Promise.all(
                [
                    caller.searchRoutes(from, to, moment().format("YYYY-MM-DD")).then(x => { console.log(x.length); return x; }),
                    caller.searchRoutes(from, to, moment().add(1, "day").format("YYYY-MM-DD")).then(x => { console.log(x.length); return x; }),
                    caller.searchRoutes(from, to, moment().add(2, "day").format("YYYY-MM-DD")).then(x => { console.log(x.length); return x; })
                ]
            );
            response = response.reduce((a, b) => a.concat(b), []);
            console.log(response.length);
            return response;

        }
        return response || [];
    }

    getHelpResponse(): ITextResponse {
        return responseBuilder.text(this.helpMessage);
    }

    handlePostback(sender_psid: string, received_postback: any) {
        let response;

        // Get the payload for the postback
        let payload = received_postback.payload;

        try {
            payload = JSON.parse(payload);
        } catch (err) {
            console.error("payload is not a json object");
        }
        // Set the response based on the postback payload
        if (payload.type === 'search') {
            if (payload.value === 'yes') {
                response = { "text": "Ha! Dobry jestem B)" }
            } else if (payload.value === 'no') {
                response = { "text": "Uops." }
            }
        }
        // Send the message to acknowledge the postback
        caller.callSendAPI(sender_psid, response);
    }
}