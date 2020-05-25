import {Category as Cg} from '../../../../class/category/category';
import {Observable} from 'rxjs';

export interface Category {
  writeCategory(category: Cg): void;
  getCategory(userId: string): Observable<any[]>;
  removeCategory(removeCategory: Cg):Promise<void>;
}
