export interface ITextResponse {
    text: string
}

export interface IListResponse {

}

export interface IButton {
    title?: string;
    type?: string;
    payload?: string;
    url?: string;
    messenger_extensions?: boolean | string;
    webview_height_ratio?: string;
    fallback_url?: string;
}

export interface ITemplateButton {
    type?: "postback",
    title: string,
    payload: string,
}

export interface ITemplateParams {
    title: string;
    subtitle: string;
    buttons: ITemplateButton[]
}

