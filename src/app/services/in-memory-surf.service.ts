import { InMemoryDbService } from 'angular-in-memory-web-api';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Spot } from '../classes/spot';

export class InMemSurfService implements InMemoryDbService {
    constructor(private http: HttpClient) { }

    createDb() {
        return this.http.get('/assets/mock/surf.json')
            .map( (res: Response) => res.json());
    }
}
