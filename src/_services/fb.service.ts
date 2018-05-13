import { Http } from '../http';

export class FacebookService {
    private readonly PAGE_ACCESS_TOKEN = process.env.BOT_PAGE_ACCESS_TOKEN;
    private readonly URI = "https://graph.facebook.com/v2.11/me/messages";
    private readonly accessTokenParams = { "access_token": this.PAGE_ACCESS_TOKEN };
    private http = new Http();


    private async send(request_body: any) {
        try {
            const body = await this.http.post(this.URI, request_body, { params: this.accessTokenParams })
            console.log('message sent!')
            console.log(body);
        } catch (error) {
            console.error("Unable to send message: " + error);
        }
    }
    async sendResponse(sender_psid: string, response: any) {
        const request_body = this.constructResponseBody(sender_psid, response);
        await this.send(request_body);
    }

    async sendNotificaiton(sender_psid: string, response: any) {
        const request_body = this.constructPairingBody(sender_psid, response);
        await this.send(request_body);
    }

    private constructResponseBody(sender_psid: string, response: any) {
        return {
            "messaging_type": "RESPONSE",
            "recipient": {
                "id": sender_psid
            },
            "message": response
        };
    }

    private constructPairingBody(sender_psid: string, response: any) {
        return {
            "messaging_type": "MESSAGE_TAG",
            "tag": "PAIRING_UPDATE",
            "recipient": {
                "id": sender_psid
            },
            "message": response
        };
    }
}
