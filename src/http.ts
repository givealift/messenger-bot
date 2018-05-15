import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class Http {
    private _httpClient: AxiosInstance;

    constructor() {
        this._httpClient = axios.create({
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public async get<T>(url: string, params?: { [key: string]: any }) {
        console.log(`HTTP > ${url}`);
        console.log(params);
        const response = await this._httpClient.get<T>(url, { params: params });
        console.log(`HTTP < ${response.status}`);
        if (response.data instanceof Array && response.data.length > 5) {
            console.log(response.data.slice(0, 5));
            console.log("...");
        } else {
            console.log(response.data);
        }
        return response.data;
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        console.log(`POST > ${url}`);
        console.log(data);

        const response = await this._httpClient.post(url, data, config);

        if (!response.data) {
            return response.status;
        }

        console.log(`POST < ${response.status}`);
        console.log(response.data);
        return response.data;
    }

    public async delete<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        console.log(`DELETE > ${url}`);
        console.log(data);

        const response = await this._httpClient.delete(url, { data: data });
        console.log(`DELETE < ${response.status}`);
        console.log(response.data);
        return response.data;
    }
}