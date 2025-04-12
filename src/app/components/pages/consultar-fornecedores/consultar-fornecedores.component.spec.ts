import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarFornecedoresComponent } from './consultar-fornecedores.component';

describe('ConsultarFornecedoresComponent', () => {
  let component: ConsultarFornecedoresComponent;
  let fixture: ComponentFixture<ConsultarFornecedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarFornecedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarFornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
