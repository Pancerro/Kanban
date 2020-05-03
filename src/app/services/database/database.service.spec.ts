import { TestBed } from '@angular/core/testing';
import { DataService } from './database.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
describe('DatabaseService', () => {
  let service:DataService
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AngularFireDatabase]
    });
    service=TestBed.get(DataService);
  });
  it('be able to retrieve posts from the API bia GET', () => {
    service.getAllUser().subscribe(res => {
        expect(res.length).toBe(2);
    });
})
});

