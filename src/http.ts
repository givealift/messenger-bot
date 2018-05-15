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
        const response = await this._httpClient.get<T>(url, { params: params });
        console.log(`HTTP < ${url} ${response.status}`);
        return response.data;
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        console.log(`POST > ${url}`);
        const response = await this._httpClient.post(url, data, config);

        if (!response.data) {
            return response.status;
        }
        console.log(`POST < ${url} ${response.status}`);
        return response.data;
    }

    public async delete<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        console.log(`DELETE > ${url}`);
        const response = await this._httpClient.delete(url, { data: data });
        console.log(`DELETE < ${url} ${response.status}`);
        return response.data;
    }
}