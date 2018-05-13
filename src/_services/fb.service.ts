import { Http } from '../http';

export class FacebookService {
    private readonly PAGE_ACCESS_TOKEN = process.env.BOT_PAGE_ACCESS_TOKEN;
    private readonly URI = "https://graph.facebook.com/v2.11/me/messages";
    private http = new Http();

    async sendResponse(sender_psid: string, response: any) {
        const request_body = this.constructRequestBody(sender_psid, response);

        try {
            const body = await this.http.post(this.URI, request_body, { params: { "access_token": this.PAGE_ACCESS_TOKEN } })
            console.log('message sent!')
            console.log(body);
        } catch (error) {
            console.error("Unable to send message: " + error);
        }
    }

    private constructRequestBody(sender_psid: string, response: any) {
        return {
            "messaging_type": "RESPONSE",
            "recipient": {
                "id": sender_psid
            },
            "message": response
        };
    }
}
