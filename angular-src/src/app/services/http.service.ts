import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { CookieService, CookieBackendService } from 'ngx-cookie';
import 'rxjs/add/operator/share';

import { RequestOptionsArgs } from '@angular/http/src/interfaces';

@Injectable()
export class HttpClient {
  get isDebugging() { return this.document.location.href.startsWith('http://localhost:4200'); }
  get serverUrl(): string { return this.isDebugging ? 'http://localhost:3000' : ''; }

  private requestsCount = 0;
  constructor(
    @Inject(DOCUMENT) private document: any,
    private http: Http,
    private cookieService: CookieService
  ) { }

  // Returns the server url
  getServerUrl(endpoint: string) {
    if (endpoint && endpoint.startsWith('/')) {
      endpoint = endpoint.substring(1);
    }
    return `${this.serverUrl}/${endpoint}`;
  }

  get(url: string, options?: RequestOptionsArgs, disableErrorToast?: boolean) {
    const observable = this.http
      .get(url, this.generateOptions(options))
      .share();

    return observable;
  }

  post(
    url: string,
    data: any,
    options?: RequestOptionsArgs,
    disableErrorToast?: boolean
  ) {
    const observable = this.http
      .post(url, data, this.generateOptions(options))
      .share();

    return observable;
  }

  postWithUrlParams(
    url: string,
    data: any,
    options?: RequestOptionsArgs,
    disableErrorToast?: boolean
  ) {
    options = this.generateOptions(options);
    options.headers = new Headers();
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    const body = new URLSearchParams();

    for (const property of Object.keys(data)) {
      body.set(property, data[property]);
    }

    const observable = this.http.post(url, body, options).share();

    return observable;
  }

  private generateOptions(options?: RequestOptionsArgs) {
    const newOptions = options || {};
    newOptions.withCredentials = true;

    const headers = newOptions.headers || new Headers({});

    // Add authentication token
    const authToken = this.cookieService.get('token');

    if (authToken) {
      headers.append(`Authentication`, `${authToken}`);
      console.log(headers);
    }

    newOptions.headers = headers;
    return newOptions;
  }

}
