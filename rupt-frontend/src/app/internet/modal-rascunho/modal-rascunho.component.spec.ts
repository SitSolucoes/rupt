import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRascunhoComponent } from './modal-rascunho.component';

describe('ModalRascunhoComponent', () => {
  let component: ModalRascunhoComponent;
  let fixture: ComponentFixture<ModalRascunhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRascunhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRascunhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
