import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiserviceService {

  private readonly baseUrl = "https://pokeapi.co/api/v2/";

  constructor(
    private http : HttpClient
  ) { }

  /**
   * Obtiene listado de pokemons segun el tipo
   *
   * @param {TypePokemon} type
   * @return {*}
   * @memberof PokeapiserviceService
   */
  getTypePokemons(type: TypePokemon){
    return this.http.get<any>(this.baseUrl + `type/${type}`).pipe(map( x =>  {
      let res = x.pokemon.map((x:any) => {
        let str = x.pokemon.url;
        let idx = str.indexOf('pokemon/') + 8;
        str = str.slice(idx);
        let id = str.slice(0, -1);
        return { id : id , name : x.pokemon.name }
      });
      return res as {id:number, name:string} [];
    }));
  }

  getFirePokemons(){
    return this.getTypePokemons(TypePokemon.Fire);
  }
  getElectricPokemons(){
    return this.getTypePokemons(TypePokemon.Electric);
  }
  getRockPokemons(){
    return this.getTypePokemons(TypePokemon.Electric);
  }

  getPokemon(id : number){
    console.error('Not implemented yet. Hint:  https://pokeapi.co/api/v2/pokemon/:id')
  }

}

enum TypePokemon {
  Fire = 10,
  Electric = 13,
  Rock = 6,
  Water = 11
}
