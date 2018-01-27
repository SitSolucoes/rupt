import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCompartilharComponent } from './modal-compartilhar.component';

describe('ModalCompartilharComponent', () => {
  let component: ModalCompartilharComponent;
  let fixture: ComponentFixture<ModalCompartilharComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCompartilharComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCompartilharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
