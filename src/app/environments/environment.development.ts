const produtosApi_url = 'http://localhost:5010/api';
const usuariosApi_url = 'http://localhost:5249/api';

export const config = {
    production: false,
    produtosapi_produtos : `${produtosApi_url}/produtos`,
    produtosapi_fornecedores : `${produtosApi_url}/fornecedores`,
    produtosapi_dashboard : `${produtosApi_url}/dashboard`,
    usuariosapi: `${usuariosApi_url}/usuarios`
}