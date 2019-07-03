import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeFeedComponent} from './home-feed.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {APP_BASE_HREF, Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Subscription} from "rxjs";

describe('HomeFeedComponent', () => {
  let component: HomeFeedComponent;
  let fixture: ComponentFixture<HomeFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [HomeFeedComponent],
      providers: [
        Location,
        {provide: LocationStrategy, useClass: PathLocationStrategy},
        {provide: APP_BASE_HREF, useValue: '/my/app'},
        HttpClient,
        HttpHandler,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
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
