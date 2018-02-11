import{ Injectable } from '@angular/core';
import { Person } from '../entities/person';

import{Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ContactService{

    constructor(private http: Http){}
//retrieving contacts

getContacts()
{
    return this.http.get('http://localhost:3000/api/contacts')
    .map(res => res.json());
}

//add contact

addContacts(newContact)
{
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/contacts',newContact,{headers :headers })
    .map(res => res.json());
}

//deleteMethod

deleteContact(id)
{
    return this.http.delete('http://localhost:3000/api/contact/'+id)
    .map(res => res.json());
}


}


 