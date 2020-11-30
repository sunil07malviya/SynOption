import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class DataService {

    saveItemToCart(itemDetails){
        localStorage.setItem('itemData', JSON.stringify(itemDetails));
    }

    getItemData(){
      return JSON.parse(localStorage.getItem('itemData'));
    }
}