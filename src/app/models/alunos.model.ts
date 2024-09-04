// INTERFACE ALUNO
export interface AlunoDTO {
  id: number;
  nome: string;
  endereco: EnderecoDTO;
  dataNascimento: string;
  telefone: string;
  dataCriacao: string;
  ativo: string;
}

// INTERFACE DE ENDEREÇO
export interface EnderecoDTO {
  cep: string;
  logradouro: string;
  estado: string;
  bairro: string;
  uf: string;
}

// INTERFACE REGISTRAR ALUNO
export interface CreateAlunoDTO {
  nome: string;
  dataNascimento: string;
  telefone: string;
  endereco: EnderecoDTO;
}

// INTERFACE DE ATUALIZAÇÃO DO ALUNO
export interface UdpateAlunoDTO {
  id: number;
  nome: string;
  dataNascimento: string;
  telefone: string;
  endereco: EnderecoDTO;
  ativo: string;
  dataCriacao: string;
}

// INTERFACE DE RESPOSTA
export interface ResponseDTO {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  content: AlunoDTO[];
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

// INTERFACE DE MENSALIDADE
export interface MensalidadeDTO {
  id: number; // ID da mensalidade (correspondente ao ID na tabela TB_MENSALIDADES)
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

