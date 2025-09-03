import { Component, AfterViewInit } from '@angular/core';
import { PostosService, Posto } from '../../services/postos.service';
import { environment } from '../../../environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FiltroPostosPipe } from './filtro-postos.pipe';

declare const google: any;

@Component({
  selector: 'app-pesquisa-postos',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    FiltroPostosPipe
  ],
  templateUrl: './pesquisa-postos.component.html',
  styleUrls: ['./pesquisa-postos.component.css']
})
export class PesquisaPostosComponent implements AfterViewInit {
  postos: Posto[] = [];
  mapa: any;
  markers: any[] = [];
  filtro: string = '';
  carregandoPostos: boolean = false;

  customIcon = {
    path: 'M16.9,6.2C16.9,6.2,16.9,6.2,16.9,6.2C16.9,6.2,16.9,6.2,16.9,6.2c-0.2-0.2-0.5-0.2-0.7,0l-1.3,1.3c-0.1,0.1-0.1,0.2-0.1,0.3v1.3c0,0.2-0.2,0.4-0.4,0.4H5.1c-0.2,0-0.4-0.2-0.4-0.4V4.1c0-0.2,0.2-0.4,0.4-0.4h4.4c0.2,0,0.4-0.2,0.4-0.4V2.1c0-0.2-0.2-0.4-0.4-0.4H5.1C3.2,1.7,1.7,3.2,1.7,5v13.5c0,0.2,0.2,0.4,0.4,0.4h5.3c0.2,0,0.4-0.2,0.4-0.4v-5c0-0.2,0.2-0.4,0.4-0.4h1.9c0.2,0,0.4,0.2,0.4,0.4v5c0,0.2,0.2,0.4,0.4,0.4h5.3c0.2,0,0.4-0.2,0.4-0.4V10l-2.4-2.4C17.1,7.2,17.2,6.7,16.9,6.2z M12.9,12.1c-0.5,0-1-0.4-1-1c0-0.5,0.4-1,1-1s1,0.4,1,1C13.9,11.6,13.4,12.1,12.9,12.1z',
    fillColor: '#28a745',
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 1.5,
    anchor: new google.maps.Point(10, 20),
  };

  constructor(private postosService: PostosService) {}

  ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => this.inicializarMapa();
    document.body.appendChild(script);
  }

  inicializarMapa(): void {
    this.mapa = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -18.9186, lng: -48.2772 },
      zoom: 12
    });
    this.carregarPostos();
  }

  carregarPostos(): void {
    this.carregandoPostos = true;
    this.postosService.listar().subscribe(postos => {
      this.postos = postos;
      this.markers.forEach(m => m.marker.setMap(null));
      this.markers = [];
      postos.forEach(posto => {
        const endereco = `${posto.logradouro} ${posto.numero}, ${posto.cidade}`;
        this.geocodeEndereco(endereco, posto);
      });
      this.carregandoPostos = false;
    }, error => {
      console.error("Erro ao carregar postos:", error);
      this.carregandoPostos = false;
    });
  }

  geocodeEndereco(endereco: string, posto: Posto) {
    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ address: endereco }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        const marker = new google.maps.Marker({
          position: location,
          map: this.mapa,
          title: posto.razaoSocial,
          icon: this.customIcon
        });
        this.markers.push({ marker: marker, posto: posto });

        const combustiveisHtml = posto.combustiveis?.map(c => `
          <div class="fuel-item">
            <span class="fuel-type">${c.tipo}</span>
            <span class="fuel-price">R$ ${c.preco.toFixed(2)}</span>
          </div>
        `).join('') || '<p class="no-fuel">Preços não disponíveis.</p>';

        const infoWindowContent = `
          <style>
            .info-window-content { font-family: 'Roboto', sans-serif; padding: 5px; max-width: 280px; }
            .info-window-content h3 { margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 8px; }
            .info-window-content p { margin: 0 0 12px 0; font-size: 14px; color: #7f8c8d; }
            .fuel-list { margin: 0; padding: 0; list-style: none; }
            .fuel-item { display: flex; justify-content: space-between; padding: 6px 0; font-size: 15px; border-bottom: 1px solid #f0f0f0; }
            .fuel-item:last-child { border-bottom: none; }
            .fuel-type { color: #34495e; }
            .fuel-price { font-weight: 500; color: #2c3e50; }
            .no-fuel { font-style: italic; color: #95a5a6; }
            .route-button { display: block; width: 100%; padding: 10px; margin-top: 15px; background-color: #3498db; color: white; border: none; border-radius: 5px; font-size: 14px; font-weight: 500; text-align: center; text-decoration: none; cursor: pointer; transition: background-color 0.2s; }
            .route-button:hover { background-color: #2980b9; }
          </style>
          <div class="info-window-content">
            <h3>${posto.razaoSocial}</h3>
            <p>${posto.logradouro}, ${posto.numero} - ${posto.cidade}</p>
            <div class="fuel-list">
              ${combustiveisHtml}
            </div>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(endereco)}" target="_blank" class="route-button">
              Traçar Rota
            </a>
          </div>
        `;
        
        const infoWindow = new google.maps.InfoWindow({ content: infoWindowContent });

        marker.addListener('click', () => infoWindow.open(this.mapa, marker));
        marker.addListener('mouseover', () => this.destacarMarcador(posto, true));
        marker.addListener('mouseout', () => this.destacarMarcador(posto, false));
      } else {
        console.warn('Erro ao geocodificar endereço:', endereco, status);
      }
    });
  }

  destacarMarcador(posto: Posto, destacar: boolean): void {
    const marcadorEncontrado = this.markers.find(m => m.posto.razaoSocial === posto.razaoSocial);
    if (marcadorEncontrado) {
      posto.destacado = destacar;
      marcadorEncontrado.marker.setAnimation(
        destacar ? google.maps.Animation.BOUNCE : null
      );
    }
  }

  irParaPosto(posto: Posto): void {
    const endereco = `${posto.logradouro} ${posto.numero}, ${posto.cidade}`;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: endereco }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        this.mapa.setCenter(results[0].geometry.location);
        this.mapa.setZoom(15);
      }
    });
  }
}