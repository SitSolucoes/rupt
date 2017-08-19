import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastroLeitorComponent } from './modal-cadastro-leitor.component';

describe('ModalCadastroLeitorComponent', () => {
  let component: ModalCadastroLeitorComponent;
  let fixture: ComponentFixture<ModalCadastroLeitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCadastroLeitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCadastroLeitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
