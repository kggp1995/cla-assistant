import {Injectable} from 'angular2/core';
import { Http, HTTP_PROVIDERS} from 'angular2/http';


@Injectable()
export class HomeService {
    private _http: Http;
    constructor(public http: Http) {
        this._http = http;
    }

    public getUser() {
        return this._http.get('/api/github/user')
            .map(res => {
                return res.json().data
            });
    }
}
