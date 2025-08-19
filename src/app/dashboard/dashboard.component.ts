import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { CombustivelService, Combustivel } from '../../services/combustivel.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  combustiveis: Combustivel[] = [];
  medias: { [id: string]: number } = {};

  constructor(private combustivelService: CombustivelService) { }

  ngOnInit(): void {
    this.combustivelService.listarTodos().subscribe({
      next: (data) => {
        this.combustiveis = data;

        this.combustiveis.forEach(c => {
          this.combustivelService.mediaPorCombustivel(c.id).subscribe({
            next: (media) => this.medias[c.id] = Number(media),
            error: (err) => console.error('Erro ao buscar média', err)
          });

        });
      },
      error: (err) => console.error('Erro ao buscar combustíveis', err)
    });
  }
}
