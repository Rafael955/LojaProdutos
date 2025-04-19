import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  //atributos
  nome: string = '';
  email: string = '';
  perfil: string = '';

  ngOnInit() {
    const data = sessionStorage.getItem('usuario');

    const usuario = JSON.parse(data as string);

    this.nome = usuario.nome;
    this.email = usuario.email;
    this.perfil = usuario.perfil;
  }

  logout() {
    sessionStorage.removeItem('usuario');

    location.href = '/pages/autenticar-usuario';
  }
}
