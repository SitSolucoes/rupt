import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedefineSenhaComponent } from './redefine-senha.component';

describe('RedefineSenhaComponent', () => {
  let component: RedefineSenhaComponent;
  let fixture: ComponentFixture<RedefineSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedefineSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedefineSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
