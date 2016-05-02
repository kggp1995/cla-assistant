import {Injectable, Inject} from 'angular2/core';
import {ApiService} from '../../utils/api.service';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class ClaLinkService {
    private _apiService: any;

    constructor( @Inject(ApiService) apiService: ApiService) {
        this._apiService = apiService;
    }

    public linkRepos(repos, gistUrl) {
        repos.map((repo) =>{
          repo.repoId = repo.id;
          repo.repo = repo.full_name;
          repo.ownerId = repo.owner.id;
          repo.owner = repo.owner.login;
          repo.gist = gistUrl;
        });

        return this._apiService.post('repos',repos);
    }

}
