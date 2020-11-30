import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cartItems;
  itemName = '';
  itemObj = [];
  itemData;
  constructor(private http: HttpClient, private dataService: DataService,
    private route: Router) { }

  ngOnInit() {
    if(this.dataService.getItemData())
    this.itemObj = this.dataService.getItemData();
    console.log(this.itemObj);
    this.getCartDetails();
  }

  getCartDetails(){
    this.http.get('https://api.myjson.com/bins/qhnfp').subscribe((res: any) => {
      console.log(res);
      this.cartItems = res;
    })
  }

  onAddItem(itemDetails){
    console.log(itemDetails);
    this.itemName = itemDetails.name;
    this.itemObj.push(itemDetails);
    this.dataService.saveItemToCart(this.itemObj);
  }

  onNavigateToCart(){
    this.route.navigate(['cart']);
  }

}
