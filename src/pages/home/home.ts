import {Item} from './../../models/items/item.model';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {ShoppingListService} from
'./../../service/shopping-list/shopping-list.service';
import {Observable} from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shoppingList$: Observable<Item[]>;

  constructor(public navCtrl: NavController,
    private shopping: ShoppingListService,
) {
    this.shoppingList$ = this.shopping
      .getShoppingList() //database list
      .snapshotChanges() //key and value pairs
      .map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val(),
          }));
        });
  }

}
