import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { config } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { FornecedoresService } from '../../../services/fornecedores.service';
import { take } from 'rxjs';
import { IFornecedorRequest } from '../../../interfaces/fornecedor-request';

@Component({
  selector: 'app-editar-fornecedor',
  imports: [
    NavbarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './editar-fornecedor.component.html',
  styleUrl: './editar-fornecedor.component.css'
})
export class EditarFornecedorComponent {

  id: string = '';

  mensagem: string = "";
  mensagem_erro: string = "";

  constructor(private activatedRouter: ActivatedRoute) { }

  private readonly _fornecedoresService = inject(FornecedoresService);

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.paramMap.get('id') as string;

    this._fornecedoresService.obterFornecedorPorId(this.id)
    .pipe(take(1))
      .subscribe({
        next: (data: any) => {
          this.form.patchValue(data.data);
        },
        error: (err) => {
          this.mensagem_erro = err.error.message;
        }
      });
  }

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)])
  });

  onSubmit() {

    this.mensagem = '';
    this.mensagem_erro = '';

    const fornecedorAlterar: IFornecedorRequest = {
      nome: this.form.value.nome as string
    }

    this._fornecedoresService.alterarFornecedor(this.id, fornecedorAlterar)
      .subscribe({
        next: (data: any) => {
          this.mensagem = data.message;
        }, error: (err) => {
          console.log(err);
          this.mensagem_erro = err.error.message;
        }
      });
  }
}
