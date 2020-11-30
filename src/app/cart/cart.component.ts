import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  itemData;
  newItemData = [];
  constructor(private dataService: DataService, private route: Router) { }

  ngOnInit() {
    this.itemData = this.dataService.getItemData();
    this.itemData.forEach(element => {
      element.qty = 1;
      element.initialPrice = element.price;
    });
    console.log(this.itemData);
    this.claculations(this.itemData);
  }

  onDecItem(index){
    if(this.itemData[index].qty <= 1){
      this.itemData[index].qty = 1;
      this.itemData[index].price = this.itemData[index].initialPrice;
    }else{
      this.itemData[index].qty = --this.itemData[index].qty;
      this.itemData[index].price = (this.itemData[index].price - this.itemData[index].initialPrice);
    }
    this.claculations(this.itemData);
  }

  onIncItem(index){
    this.itemData[index].qty = ++this.itemData[index].qty;
    this.itemData[index].price = (this.itemData[index].initialPrice * this.itemData[index].qty);
    this.claculations(this.itemData);
  }

  totalPrice = 0;
  totalDiscount = 0;
  orderTotal = 0;
  claculations(itemData){
    this.totalPrice = 0;
    this.totalDiscount = 0;
    itemData.forEach((ele) => {
      this.totalPrice += (ele.initialPrice * ele.qty);
      this.totalDiscount += ((ele.discount * ele.initialPrice) / 100) * ele.qty; 
    });
    this.orderTotal =  this.totalPrice - this.totalDiscount;
  }

  onDeleteItem(index){
    this.itemData.splice(index, 1);
    this.claculations(this.itemData);
    this.dataService.saveItemToCart(this.itemData);
    console.log(this.itemData);
  }

  onNavigateBack(){
    this.route.navigate(['']);
  }

}
