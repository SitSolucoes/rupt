import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEscritorComponent } from './cadastro-escritor.component';

describe('CadastroEscritorComponent', () => {
  let component: CadastroEscritorComponent;
  let fixture: ComponentFixture<CadastroEscritorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroEscritorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEscritorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
