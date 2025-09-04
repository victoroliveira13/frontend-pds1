import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Historico {
  postoId: string;
  combustivelId: string;
  dataAlteracao: string;
  preco: number;
}

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {
  private apiUrl = 'http://localhost:8080/historico';

  constructor(private http: HttpClient) { }

  getHistoricoCompleto(): Observable<Historico[]> {
    return this.http.get<Historico[]>(this.apiUrl).pipe(
      map(historico => 
        historico.sort((a, b) => 
          new Date(b.dataAlteracao).getTime() - new Date(a.dataAlteracao).getTime()
        )
      )
    );
  }
}