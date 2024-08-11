// INTERFACE ALUNO
export interface Aluno {
  id: number;
  nome: string;
  telefone: string;
  dataCriacao: string;
  dataNascimento: string;
  ativo: string;
  endereco: Endereco;  // Adicione esta linha
}


export interface Endereco {
  cep: string;
  logradouro: string;
  estado: string;
  bairro: string;
  uf: string;
}

// INTERFACE REGISTRAR ALUNO
export interface RegistrarAluno {
  nome: string;
  endereco: Endereco;
  telefone: string;
  dataNascimento: string;
}

// INTERFACE ALUNOS RESPOSTA
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

// INTERFACE MENSALIDADE
export interface Mensalidade {
  id: number;
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
    telefone: string;
    dataCriacao: string;
    ativo: string;
  };
  dataVencimento: string;
  valor: number;
  status: number;
}

