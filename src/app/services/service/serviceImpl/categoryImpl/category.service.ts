import { Injectable } from '@angular/core';
import {Category} from '../../service/category/category';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {Category as Cg} from '../../../../class/category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements  Category{

  constructor(private db: AngularFireDatabase) { }

  public writeCategory(category: Cg): void {
    firebase.database().ref('users/' + category.getUserId() + '/category/' + category.getCategory()).set({
      category: category.getCategory(),
      color: category.getColor(),
    });
  }
  public getCategory(userId: string): Observable<any[]> {
    return this.db.list('users/' + userId + '/category/').valueChanges();
  }
  public removeCategory(removeCategory: Cg):Promise<void>{
    return this.db.list('users/' + removeCategory.getUserId() + '/category/').remove(removeCategory.getCategory());
  }
}
