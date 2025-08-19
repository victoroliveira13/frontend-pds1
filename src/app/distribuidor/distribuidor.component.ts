import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DistribuidorService } from '../../services/distribuidor.service';

@Component({
  standalone: true,
  selector: 'app-distribuidor',
  templateUrl: './distribuidor.component.html',
  styleUrls: ['./distribuidor.component.css'],
  imports: [CommonModule, FormsModule] 
})
export class DistribuidorComponent implements OnInit {
  distribuidores: any[] = [];
  filtro: string = '';

  constructor(private distribuidorService: DistribuidorService) {}

  ngOnInit(): void {
    this.distribuidorService.listar().subscribe((dados) => {
      this.distribuidores = dados;
    });
  }

  get distribuidoresFiltrados() {
    return this.distribuidores.filter((d) =>
      d.nome.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}
