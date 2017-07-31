import { ConnectionFactory } from "app/classes/connection-factory";

export class UploadItem {
    method: string = 'POST';
    url: string = '';
    headers: any = {};
    formData: any = {};
    withCredentials = false;
    alias: string = 'file';
    file: any = {};

    constructor(file, url){
        this.file = file;
        this.url = ConnectionFactory.API_CONNECTION + url;
    }
}