//combustivel.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Distribuidor {
  id: string;
  nome: string;
}

export interface Combustivel {
  id: string;
  tipo: string;
  distribuidor: Distribuidor;
}

@Injectable({ providedIn: 'root' })
export class CombustivelService {
  private readonly apiUrl = 'http://localhost:8080/combustivel';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Combustivel[]> {
    return this.http.get<Combustivel[]>(this.apiUrl);
  }

  buscarPorTipo(tipo: string): Observable<Combustivel> {
    return this.http.get<Combustivel>(`${this.apiUrl}/tipo/${tipo}`);
  }

  mediaPorCombustivel(id: string): Observable<number> {
    return this.http.get<number>(`http://localhost:8080/combustivelPosto/media/${id}`);
  }
}
