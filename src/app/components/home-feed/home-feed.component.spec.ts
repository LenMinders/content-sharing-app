import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeFeedComponent} from './home-feed.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {APP_BASE_HREF, Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of, Subscription} from 'rxjs';

describe('HomeFeedComponent', () => {
  let component: HomeFeedComponent;
  let fixture: ComponentFixture<HomeFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HttpClientTestingModule],
      declarations: [HomeFeedComponent],
      providers: [
        Location,
        {provide: LocationStrategy, useClass: PathLocationStrategy},
        {provide: APP_BASE_HREF, useValue: '/my/app'},
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach((done) => {

    spyOn(JSON, 'parse').and.callFake(() => {
      expect(JSON.parse).toHaveBeenCalled();
      done();
    });

    fixture = TestBed.createComponent(HomeFeedComponent);
    component = fixture.componentInstance;

    spyOn(component['http'], 'get').and.returnValue(of('[]'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe on destroy', () => {
    component.getHomeFeedCloudFunctionSubscription = new Subscription();

    spyOn(component.getHomeFeedCloudFunctionSubscription, 'unsubscribe');
    component.ngDestroy();

    expect(component.getHomeFeedCloudFunctionSubscription.unsubscribe).toHaveBeenCalledTimes(1);
  });

});
