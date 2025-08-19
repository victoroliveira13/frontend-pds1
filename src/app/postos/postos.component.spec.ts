import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostosService, Posto } from '../../services/postos.service';

@Component({
  standalone: true,
  selector: 'app-postos',
  templateUrl: './postos.component.html',
  styleUrls: ['./postos.component.css'],
  imports: [CommonModule, FormsModule]
})
export class PostosComponent implements OnInit {
  postos: Posto[] = [];
  filtro: string = '';

  constructor(private postosService: PostosService) {}

  ngOnInit(): void {
    this.postosService.listar().subscribe((dados) => {
      console.log('Retorno backend:', dados);
      this.postos = dados || [];
    });
  }

  get postosFiltrados() {
    const texto = this.filtro.toLowerCase().trim();
    return this.postos.filter(p => p.razaoSocial.toLowerCase().includes(texto));
  }
}
