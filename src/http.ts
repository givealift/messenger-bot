import axios, { AxiosInstance } from 'axios';

export class Http {
    private _httpClient: AxiosInstance;

    constructor() {
        this._httpClient = axios.create({
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public async get<T>(url: string, params: { [key: string]: any }) {
        const response = await this._httpClient.get<T>(url, { params: params });
        return response.data;
    }
}