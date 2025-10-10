import { HttpInterceptorFn } from '@angular/common/http';
import { config } from '../environments/environment';

const allowedUrls: string[] = [
  config.produtosapi_dashboard,
  config.produtosapi_fornecedores,
  config.produtosapi_produtos
];

export const TokenInterceptor: HttpInterceptorFn = (request, next) => {

  //ler os dados do usuário gravados na session storage
  const usuario = JSON.parse(sessionStorage.getItem('usuario') as string);

  //verificar se existe um usuário autenticado e se ele possui um token
  if (usuario && usuario.token && allowedUrls.some(url => request.url.includes(url))) {
    //clonar a requisição e adicionar o token no cabeçalho
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${usuario.token}`
      }
    });
  }

  return next(request);
};
