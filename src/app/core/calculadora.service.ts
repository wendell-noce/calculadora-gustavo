import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {
  
  apiUrl: string = environment.apiUrl;

  constructor(
    private http : HttpClient
  ) { }

  sendMail( obj: any ): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };

    const body = {
        "nome" : obj.nome,
        "email": obj.email,
        "genero" : "Feminino",
        "idade" : obj.idade,
        "altura" : obj.altura,
        "nivel": obj.fa
    }
    return this.http.post('https://gastocalorico-api.onrender.com/users/cadastro',JSON.stringify( body ) , httpOptions );         
  }
}
