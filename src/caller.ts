import request from 'request';
import axios from 'axios';
import { City } from './_models/city';
import { Route } from './_models/route';
import { Http } from './http';
import { MOCK_ROUTES } from './stub-api';

class Caller {
    private readonly PAGE_ACCESS_TOKEN = process.env.BOT_PAGE_ACCESS_TOKEN;
    private readonly GIVEALIFT_API_URL = "https://mysterious-lowlands-82501.herokuapp.com/api";
    private http = new Http();

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
                console.log(body);
            } else {
                console.error("Unable to send message:" + err);
            }
        });
    }

    async searchRoutes(from: string, to: string, date: string) {

        let [fromCity] = await this.getCity(from);
        let [toCity] = await this.getCity(to);

        if (!(fromCity && toCity)) {
            return [];
        }
        
        let response;
        let params = {
            from: fromCity.cityId || 0,
            to: toCity.cityId || 0,
            date: date
        };
        try {
            // response = await this.http.get<Route[]>(this.GIVEALIFT_API_URL + "/route/search", params);
            response = MOCK_ROUTES;
        } catch (error) {
            console.log(error);
        }
        return response || [];
    }

    async getCity(city: string) {
        const url = `${this.GIVEALIFT_API_URL}/city/search`;
        const params = { search: city, limit: 1 };
        let response;
        try {
            response = await this.http.get<City[]>(url, params);
        } catch (error) {
            console.log(error);
        }
        return response || [];
    }

    async getUserInfo(userId: number) {
        let response;
        try {
            response = axios.get<City[]>(this.GIVEALIFT_API_URL + `/user/${userId}`);
        } catch (error) {
            console.log(error);
        }
        return response;
    }
}

export const caller = new Caller();