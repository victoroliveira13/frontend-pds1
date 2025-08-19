import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostosService } from '../../services/postos.service';

@Component({
  standalone: true,
  selector: 'app-postos',
  templateUrl: './postos.component.html',
  styleUrls: ['./postos.component.css'],
  imports: [CommonModule, FormsModule]
})
export class PostosComponent implements OnInit {
  postos: any[] = [];
  filtro: string = '';

  constructor(private postosService: PostosService) {}

  ngOnInit(): void {
    this.postosService.listar().subscribe((dados) => {
      console.log('Retorno backend:', dados);
      this.postos = dados || [];
    });
  }

  get postosFiltrados() {
    return this.postos.filter(p =>
      p?.razaoSocial?.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }  
}
