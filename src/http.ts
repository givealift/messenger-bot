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
        console.log(`HTTP <`);
        if (response.data instanceof Array && response.data.length > 5) {
            console.log(response.data.slice(0,5));
            console.log("...");
        } else {
            console.log(response.data);
        }
        return response.data;
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        const response = await this._httpClient.post(url, data, config);
        return response.data;
    }
}