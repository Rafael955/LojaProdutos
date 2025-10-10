import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { config } from '../../../environments/environment';
import { UsuariosService } from '../../../services/usuarios.service';
import { take } from 'rxjs';
import { ICriarUsuarioRequest } from '../../../interfaces/usuarios/criar-usuario-request';
import { ICriarUsuarioResponse } from '../../../interfaces/usuarios/criar-usuario-response';

@Component({
  selector: 'app-criar-usuario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {
  mensagem: string = "";
  mensagem_erro: string = "";

  private readonly _usuariosService = inject(UsuariosService);

  form = new FormGroup({
    nome: new FormControl('', [
      Validators.required, Validators.minLength(8)]
    ),
    email: new FormControl('', [
      Validators.required, Validators.email
    ]),
    senha : new FormControl('', [
      Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]),
    confirmarSenha : new FormControl('', [
      Validators.required
    ])
  },
  {
    validators: (abstractControl: AbstractControl) => {
      let senha = abstractControl.get('senha')?.value;
      let senhaConfirmacao = abstractControl.get('confirmarSenha')?.value;
  
      if (senhaConfirmacao != null && senhaConfirmacao.length > 0 && senhaConfirmacao != senha) {
        abstractControl.get('confirmarSenha')?.setErrors({
          matchPassword: true,
        });
      }
  
      return null;
    }
  });

  onSubmit(){
    this.mensagem = '';
    this.mensagem_erro = '';

    const novoUsuario: ICriarUsuarioRequest = {
      nome: this.form.value.nome as string,
      email: this.form.value.email as string,
      senha: this.form.value.senha as string,
      confirmarSenha: this.form.value.senha as string
    }

    this._usuariosService.criarUsuario(novoUsuario)
     .pipe(take(1))
      .subscribe({
        next: (data: ICriarUsuarioResponse) => {
          console.log(data);
          this.mensagem = `O usuário ${this.form.value.nome} foi cadastrado com sucesso!`;
          this.form.reset(); //limpando o formulário
        },
        error: (err) => {
          this.mensagem_erro = err.error.message;
        }
      })
  }

  LimparMensagens() {
    this.mensagem = '';
    this.mensagem_erro = '';
  }
}
