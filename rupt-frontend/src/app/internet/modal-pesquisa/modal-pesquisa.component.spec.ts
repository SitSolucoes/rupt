import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPesquisaComponent } from './modal-pesquisa.component';

describe('ModalPesquisaComponent', () => {
  let component: ModalPesquisaComponent;
  let fixture: ComponentFixture<ModalPesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
