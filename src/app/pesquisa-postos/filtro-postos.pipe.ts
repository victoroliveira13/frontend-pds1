import { Pipe, PipeTransform } from '@angular/core';
import { Posto } from '../../services/postos.service';

@Pipe({
  name: 'filtroPostos',
  standalone: true
})
export class FiltroPostosPipe implements PipeTransform {
  transform(postos: Posto[], filtro: string): Posto[] {
    if (!filtro) {
      return postos;
    }
    const filtroLower = filtro.toLowerCase();
    return postos.filter(p => p.razaoSocial.toLowerCase().includes(filtroLower));
  }
}