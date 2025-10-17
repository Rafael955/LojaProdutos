import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { ProdutosService } from '../../../services/produtos.service';
import { IProdutoRequest } from '../../../interfaces/produtos/produto-request';
import { take } from 'rxjs';
import { FornecedoresService } from '../../../services/fornecedores.service';
import { IProdutosControllerResponse } from '../../../interfaces/produtos/produtos-controller-response';
import { IFornecedorResponse } from '../../../interfaces/fornecedores/fornecedor-response';
import { IFornecedoresControllerResponse } from '../../../interfaces/fornecedores/fornecedores-controller-response';

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
  
  productImageBase64 = '';
  mensagem: string = '';
  mensagem_erro: string = '';
  
  fornecedores: any[] = [];

  @ViewChild('imageInput') imagemProduto!: ElementRef<HTMLInputElement>;
  
  private readonly _produtosService = inject(ProdutosService);
  private readonly _fornecedoresService = inject(FornecedoresService);

  ngOnInit()
  {
    this._fornecedoresService.listarFornecedores()
     .pipe(take(1))
      .subscribe({
        next: (data: IFornecedoresControllerResponse) => {
          console.log(data.data);
          this.fornecedores = data.data as IFornecedorResponse[];
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

  onFileSelected(event: Event) {
   const input = event.target as HTMLInputElement;

   if(input.files && input.files.length > 0) {
    const file = input.files[0];

    this.convertFileToBase64(file);
   }
  }

  convertFileToBase64(file: File) {
    const reader = new FileReader(); 
    
    reader.onload = (e : any) => {
      const imageBase64 = e.target.result as string; //Pega texto da imagem em base 64

      this.productImageBase64 = imageBase64;

      console.log(imageBase64);
    }

    reader.onerror = (_) => {
      this.productImageBase64 = '';
    }

    reader.readAsDataURL(file);
  }

  onSubmit() {
    if(this.form.invalid) 
      return;

    this.mensagem = '';
    this.mensagem_erro = '';

    const novoProduto: IProdutoRequest = {
      nome: this.form.value.nome as string,
      preco:  this.form.value.preco as number,
      quantidade:  this.form.value.quantidade as number,
      fornecedorId:  this.form.value.fornecedorId as string,
      imageBase64: this.productImageBase64
    };

    this._produtosService.cadastrarProduto(novoProduto)
     .pipe(take(1))
      .subscribe({
        next: (data: IProdutosControllerResponse) => {
          console.log(data.data);
          this.mensagem = data.message; //capturando a mensagem da API
          this.form.reset(); //limpando o formulário
          this.form.patchValue({ fornecedorId: '' });
          this.imagemProduto.nativeElement.value = '';
          this.productImageBase64 = '';
        }, error: (err) => {
          // console.error(err);
          this.mensagem_erro = err.error.message;
        }
      })
  }

}
