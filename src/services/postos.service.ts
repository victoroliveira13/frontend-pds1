import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Combustivel {
  id: string;
  tipo: string;
  preco: number;
}

export interface Posto {
  id: string;
  razaoSocial: string;
  logradouro: string;
  numero: string;
  cidade: string;
  combustiveis?: Combustivel[];
  destacado?: boolean;
}

@Injectable({ providedIn: 'root' })
export class PostosService {
  private readonly apiUrl = 'http://localhost:8080/combustivelPosto/postos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Posto[]> {
    return this.http.get<Posto[]>(this.apiUrl);
  }
}
