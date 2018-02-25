import { Injectable } from "@angular/core";
import { Http, Headers, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';

import { HttpClient } from "./http.service";
import { User } from '../models/user';

@Injectable()
export class ApiService {
    get serverUrl(): string { return 'http://localhost:3000'; }
    
    constructor(private http: HttpClient) {}

    private getAuthApiEndPoint(endPoint: string): string {
        return `${this.serverUrl}/auth/${endPoint}`;
    }

    login(email:string, password: string) {
        return this.http.post(this.getAuthApiEndPoint('login'), {email, password})
            .map(res => {
                return {
                    token: res.json().data.token,
                    user: <User>res.json().data
                }
            });
    }

    getCurrentUser() {
        return this.http.get(this.getAuthApiEndPoint('current'))
            .map(res => <User>res.json().data);
    }
}