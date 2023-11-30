import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient, Inventory } from '../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  API: string = 'http://localhost:8080/inventory/';

  constructor(private http: HttpClient) { }

  
  public getInventories(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.API);
  }

  public getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.API + 'ingredients');
  }

  public saveInventory(inv: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(this.API + 'save', inv);
  }

  public addIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.API + 'add-ingredient', ingredient);
  }
}
