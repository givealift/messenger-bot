import { caller } from './caller';
import { responseBuilder, ITextResponse } from "./response-builder";

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

    handleMessage(sender_psid: string, received_message: any) {
        let response;
        let text: string = received_message.text;

        // Checks if the message contains text
        if (text) {
            switch (this.getTextType(text)) {
                case "help":
                    response = this.getHelpResponse();
                    break;
                case "search":
                    // TODO: build list template respnose
                    const searchResults = this.search(text);
                    response = responseBuilder.text(searchResults);
                    break;
                case "emoticon":
                    response = responseBuilder.text(text);
                    break;
                case "XD":
                    response = responseBuilder.text(text + text[text.length - 1]);
                    break;
                default:
                    response = responseBuilder.text(this.unknownCommand(text));
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
    search(text: string): string {
        text = text
            .replace(/\s\s+/g, ' ') // remove duplicated white spaces.
            .replace(/ z | do /g, " "); // trim ' z ' ' do ' as they're just to make query more natural.

        let [przejazd, from, to] = text.split(" ");
        console.log("debug: ", przejazd, from, to);

        if (from && to) {
            return `Wygląda na to, że szukasz przejazdu z ${from} do ${to}.`;
        }
        return "Nic nie znalazłem :/";
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