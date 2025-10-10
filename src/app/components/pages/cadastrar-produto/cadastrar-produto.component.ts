import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { ProdutosService } from '../../../services/produtos.service';
import { IProdutoRequest } from '../../../interfaces/produto-request';
import { take } from 'rxjs';
import { FornecedoresService } from '../../../services/fornecedores.service';

@Component({
  selector: 'app-cadastrar-produto',
  imports: [
    NavbarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastrar-produto.component.html',
  styleUrl: './cadastrar-produto.component.css',
})
export class CadastrarProdutoComponent {
  
  mensagem: string = '';
  mensagem_erro: string = '';
  
  fornecedores: any[] = [];
  
  private readonly _produtosService = inject(ProdutosService);
  private readonly _fornecedoresService = inject(FornecedoresService);

  ngOnInit()
  {
    this._fornecedoresService.listarFornecedores()
     .pipe(take(1))
      .subscribe({
        next: (data: any) => {
          console.log(data.data);
          this.fornecedores = data.data;
        }, 
        error: (err) => {
          this.mensagem_erro = err.error.message;
        }
      })
  }

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
    preco: new FormControl(0, [Validators.required, Validators.max(99999999.99)]),
    quantidade: new FormControl(0,[Validators.required]),
    fornecedorId: new FormControl('',[Validators.required])
  });


  onSubmit() {
    this.mensagem = '';
    this.mensagem_erro = '';

    const novoProduto: IProdutoRequest = {
      nome: this.form.value.nome as string,
      preco:  this.form.value.preco as number,
      quantidade:  this.form.value.quantidade as number,
      fornecedorId:  this.form.value.fornecedorId as string
    };

    this._produtosService.cadastrarProduto(novoProduto)
     .pipe(take(1))
      .subscribe({
        next: (data: any) => {
          console.log(data.data);
          this.mensagem = data.message; //capturando a mensagem da API
          this.form.reset(); //limpando o formulário
          this.form.patchValue({ fornecedorId: '' });
        }, error: (err) => {
          // console.error(err);
          this.mensagem_erro = err.error.message;
        }
      })
  }

}
