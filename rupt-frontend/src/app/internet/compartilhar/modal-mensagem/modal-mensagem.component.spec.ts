import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMensagemComponent } from './modal-mensagem.component';

describe('ModalMensagemComponent', () => {
  let component: ModalMensagemComponent;
  let fixture: ComponentFixture<ModalMensagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMensagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
