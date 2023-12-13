import { Component, OnInit } from '@angular/core';
import { PokeapiserviceService, TypePokemon } from './pokeapiservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokeapp';
  team: { id: number; name: string; spriteUrl: string } [] = [];

  constructor(private pokeapiService: PokeapiserviceService
  ) {
    this.generateRandomTeam();

  }

  ngOnInit() {
    this.generateRandomTeam();
  }

  getRandomPokemonWithSprite(type: TypePokemon): void {
    this.pokeapiService.getTypePokemons(type).subscribe(
      (data) => {
        const availablePokemon = data.filter(pokemon => !this.team.some(teamPokemon => teamPokemon.name === pokemon.name));
  
        if (availablePokemon.length > 0 && this.team.length < 4) {
          const randomPokemon = availablePokemon[Math.floor(Math.random() * availablePokemon.length)];
          const pokemonWithSprite = {
            id: randomPokemon.id,
            name: randomPokemon.name,
            spriteUrl: `https://pokeapi.co/media/sprites/pokemon/${randomPokemon.id}.png`,
          };
          this.team.push(pokemonWithSprite);
        }
  
        
        if (this.team.length === 4) {
          
          console.log('Equipo completo:', this.team);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  

  generateRandomTeam(): void {
    const types = [TypePokemon.Fire, TypePokemon.Water, TypePokemon.Electric, TypePokemon.Rock];
    this.team = [];

    for (const type of types) {
      this.getRandomPokemonWithSprite(type);
    }
  }
}

/*Agregue constructor y ngOnInit que llama a la funcion generateRandomTeam para inicializar el equipo cuando carga el componente
generateRandomTeam recorre los tipos de pokemon y llama a getRandomPokemonWithSprite para agarrar un pokemon random de cada tipo
getRandomPokemonWithSprite usa el servicio pokeapiService para obtener la lista de pokemones de los tipos especificos
filtra los disponibles, selecciona random uno disponible y crea el objeto con la info y el url del sprite, agrega el pokemon al 
equipo si no supera el limite de 4.
No pude obtener las imagenes desde la api porque parece que no tengo los permisos para acceder a los sprites. */
