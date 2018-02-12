import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlickSliderMobileComponent } from './slick-slider-mobile.component';

describe('SlickSliderMobileComponent', () => {
  let component: SlickSliderMobileComponent;
  let fixture: ComponentFixture<SlickSliderMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlickSliderMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlickSliderMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
