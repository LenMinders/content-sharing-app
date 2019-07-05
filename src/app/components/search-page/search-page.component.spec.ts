import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchPageComponent} from './search-page.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../../../environments/environment';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EventsService} from "../../services/events.service";
import {of} from "rxjs";

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        HttpClientTestingModule
      ],
      declarations: [SearchPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    jasmine.clock().install();
  });

  // beforeEach((done) => {
  //   setTimeout(() => {
  //     done();
  //   }, 101);
  // });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', (done) => {
    spyOn(component['http'], 'get').and.returnValue(of('[]'));
    spyOn(JSON, 'parse');

    component.modelChanged.next('');

    jasmine.clock().tick(102);
    expect(component['http'].get).toHaveBeenCalled();
    expect(JSON.parse).toHaveBeenCalled();
    done();
  });

  it('should call onKey', () => {
    spyOn(component['modelChanged'], 'next');

    component.onKey('a');
    expect(component['modelChanged'].next).toHaveBeenCalledWith('a');
  });
});
