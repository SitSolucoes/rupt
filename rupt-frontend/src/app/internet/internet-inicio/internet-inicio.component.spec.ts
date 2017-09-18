import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetInicioComponent } from './internet-inicio.component';

describe('InternetInicioComponent', () => {
  let component: InternetInicioComponent;
  let fixture: ComponentFixture<InternetInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternetInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternetInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
