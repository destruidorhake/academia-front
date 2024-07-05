export interface Aluno {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  endereco: string;
  dataCriacao: string;
  ativo: string;
}

export interface RegistrarAluno {
  nome: string;
  endereco: {
    cep: string;
    logradouro: string;
    bairro: string;
    estado: string;
    uf: string;
  };
  cpf: string;
  telefone: string;
}

export interface AlunosResponse {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  content: Aluno[];
  number: number;
  sort: {
    unsorted: boolean;
    empty: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      unsorted: boolean;
      empty: boolean;
      sorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  empty: boolean;
}

export interface Mensalidade {
  aluno: {
    id: number;
    nome: string;
    endereco: {
      cep: string;
      logradouro: string;
      bairro: string;
      estado: string;
      uf: string;
    };
    cpf: string;
    telefone: string;
    dataCriacao: string;
    ativo: string;
  };
  dataVencimento: string;
  valor: number;
  status: number;
}

