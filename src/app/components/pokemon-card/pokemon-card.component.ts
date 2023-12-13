import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input() pokemon: { id: number; name: string; spriteUrl: string; } = { id: 0, name: '', spriteUrl: '' };
  

  constructor() {}

  

}
