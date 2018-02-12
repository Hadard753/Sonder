import { Injectable } from "@angular/core";
import { Http, Headers, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
    get serverUrl(): string { return 'http://localhost:3000'; }
    
    constructor(private http: Http) {}

    private getAuthApiEndPoint(endPoint: string): string {
        return `${this.serverUrl}/auth/${endPoint}`;
    }

    login(email:string, password: string) {
        return this.http.post(this.getAuthApiEndPoint('login'), {email, password})
            .map(res => res.json());
    }
}