import request from 'request';

class Caller {
    private readonly PAGE_ACCESS_TOKEN = process.env.BOT_PAGE_ACCESS_TOKEN;

    callSendAPI(sender_psid: string, response: any) {
        // Construct the message body
        let request_body = {
            "messaging_type": "RESPONSE",
            "recipient": {
                "id": sender_psid
            },
            "message": response
        }

        // Send the HTTP request to the Messenger Platform
        request({
            "uri": "https://graph.facebook.com/v2.11/me/messages",
            "qs": { "access_token": this.PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": request_body
        }, (err, res, body) => {
            if (!err) {
                console.log('message sent!')
            } else {
                console.error("Unable to send message:" + err);
            }
        });
    }
}

export const caller = new Caller();