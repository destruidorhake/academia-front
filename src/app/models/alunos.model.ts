export interface AlunoDTO {
  id: number;
  nome: string;
  endereco: EnderecoDTO;
  dataNascimento: string;
  telefone: string;
  dataCriacao: string;
  ativo: string;
}

export interface EnderecoDTO {
  cep: string;
  logradouro: string;
  estado: string;
  bairro: string;
  uf: string;
}

export interface CreateAlunoDTO {
  nome: string;
  dataNascimento: string;
  telefone: string;
  endereco: EnderecoDTO;
}

export interface UdpateAlunoDTO {
  id: number;
  nome: string;
  dataNascimento: string;
  telefone: string;
  endereco: EnderecoDTO;
  ativo: string;
  dataCriacao: string;
}
