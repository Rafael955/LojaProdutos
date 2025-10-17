export interface IProdutoResponse {
    id: string
    nome: string;
    preco: number;
    quantidade: number;
    total: number;
    fornecedorId: string;
    nomeFornecedor: string;
    imageBase64: string;
}