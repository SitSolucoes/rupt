import { ConnectionFactory } from "app/classes/connection-factory";

export class UploadItem {
    method: string = 'POST';
    url: string = '';
    headers: any = {};
    formData: any = {};
    withCredentials = false;
    alias: string = 'file';
    file: any = {};
    file_names: any = {};

    constructor(file, file_names, url){
        this.file_names = file_names;
        this.file = file;
        this.url = ConnectionFactory.API_CONNECTION + url;
    }
}