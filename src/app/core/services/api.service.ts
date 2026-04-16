import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import {
  Escola,
  Unidade,
  ProfissionalSaude,
  Medicamento,
  Atendimento,
  Prontuario,
  Requisicao,
  StatusDashboard,
  Paciente,
} from "../models/models";

export interface EscolaRequest {
  nome: string;
  ies: string;
  coordenador: string;
}

export interface UnidadeRequest {
  nome: string;
  ies: string;
  responsavel: string;
}

export interface ProfissionalCadastroRequest {
  nome: string;
  username: string;
  password: string;
}

export interface ProfissionalComplementoRequest {
  especialidade: string;
  conselho: string;
  numeroRegistro: string;
  formacao?: string;
  diasAtendimento?: string;
  turnosAtendimento?: string;
}

export interface MedicamentoRequest {
  nome: string;
  descricao?: string;
  quantidade?: number;
  unidadeMedida?: string;
  ativo?: boolean;
}

export interface AtendimentoRequest {
  pacienteId: number;
  profissionalId?: number;
  descricao?: string;
  observacoes?: string;
  dataAtendimento?: string;
  status?: string;
}

export interface PacienteRequest {
  nome: string;
  cpf?: string;
  dataNascimento?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  responsavel?: string;
  ativo?: boolean;
}

// ── Serviço ─────────────────────────────────────────────────────────────────

@Injectable({ providedIn: "root" })
export class ApiService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ── ESCOLAS ────────────────────────────────────────────────────────────────

  getEscolas(): Observable<Escola[]> {
    return this.http.get<Escola[]>(`${this.base}/escolas`);
  }

  getEscolaById(id: number): Observable<Escola> {
    return this.http.get<Escola>(`${this.base}/escolas/${id}`);
  }

  criarEscola(data: EscolaRequest): Observable<Escola> {
    return this.http.post<Escola>(`${this.base}/escolas`, data);
  }

  // ── UNIDADES ───────────────────────────────────────────────────────────────

  getUnidades(): Observable<Unidade[]> {
    return this.http.get<Unidade[]>(`${this.base}/unidades`);
  }

  getUnidadeById(id: number): Observable<Unidade> {
    return this.http.get<Unidade>(`${this.base}/unidades/${id}`);
  }

  criarUnidade(data: UnidadeRequest): Observable<Unidade> {
    return this.http.post<Unidade>(`${this.base}/unidades`, data);
  }

  atualizarUnidade(id: number, data: UnidadeRequest): Observable<Unidade> {
    return this.http.put<Unidade>(`${this.base}/unidades/${id}`, data);
  }

  inativarUnidade(id: number): Observable<void> {
    return this.http.patch<void>(`${this.base}/unidades/${id}/inativar`, {});
  }

  // ── PROFISSIONAIS (admin) ──────────────────────────────────────────────────

  getProfissionais(): Observable<ProfissionalSaude[]> {
    return this.http.get<ProfissionalSaude[]>(`${this.base}/profissionais`);
  }

  getProfissionalById(id: number): Observable<ProfissionalSaude> {
    return this.http.get<ProfissionalSaude>(`${this.base}/profissionais/${id}`);
  }

  criarProfissional(
    data: ProfissionalCadastroRequest,
  ): Observable<ProfissionalSaude> {
    return this.http.post<ProfissionalSaude>(
      `${this.base}/profissionais`,
      data,
    );
  }

  inativarProfissional(id: number): Observable<void> {
    return this.http.patch<void>(
      `${this.base}/profissionais/${id}/inativar`,
      {},
    );
  }

  // ── PROFISSIONAIS (self — perfil próprio) ──────────────────────────────────

  getMeuPerfil(): Observable<ProfissionalSaude> {
    return this.http.get<ProfissionalSaude>(
      `${this.base}/profissionais/meu-perfil`,
    );
  }

  completarCadastro(
    data: ProfissionalComplementoRequest,
  ): Observable<ProfissionalSaude> {
    return this.http.patch<ProfissionalSaude>(
      `${this.base}/profissionais/meu-perfil/complemento`,
      data,
    );
  }

  // ── MEDICAMENTOS ───────────────────────────────────────────────────────────

  getMedicamentos(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(`${this.base}/medicamento`);
  }

  criarMedicamento(data: MedicamentoRequest): Observable<Medicamento> {
    return this.http.post<Medicamento>(`${this.base}/medicamento`, data);
  }

  atualizarMedicamento(data: MedicamentoRequest): Observable<Medicamento> {
    return this.http.put<Medicamento>(`${this.base}/medicamento`, data);
  }

  toggleMedicamento(id: number): Observable<void> {
    return this.http.post<void>(`${this.base}/medicamento/inativar/${id}`, {});
  }

  // ── ATENDIMENTOS ───────────────────────────────────────────────────────────

  getAtendimentos(): Observable<Atendimento[]> {
    return this.http.get<Atendimento[]>(`${this.base}/atendimento`);
  }

  criarAtendimento(data: AtendimentoRequest): Observable<Atendimento> {
    return this.http.post<Atendimento>(`${this.base}/atendimento`, data);
  }

  atualizarAtendimento(data: AtendimentoRequest): Observable<Atendimento> {
    return this.http.put<Atendimento>(`${this.base}/atendimento`, data);
  }

  // ── PRONTUÁRIOS ────────────────────────────────────────────────────────────

  getProntuarios(): Observable<Prontuario[]> {
    return this.http.get<Prontuario[]>(`${this.base}/prontuario`);
  }

  getProntuarioById(id: number): Observable<Prontuario> {
    return this.http.get<Prontuario>(`${this.base}/prontuario/${id}`);
  }

  getProntuarioByPacienteId(id: number): Observable<Prontuario[]> {
    return this.http.get<Prontuario[]>(
      `${this.base}/prontuario/paciente/${id}`,
    );
  }

  // ── REQUISIÇÕES ────────────────────────────────────────────────────────────

  getRequisicoes(): Observable<Requisicao[]> {
    return this.http.get<Requisicao[]>(`${this.base}/requisicoes`);
  }

  // ── DASHBOARD / STATUS ─────────────────────────────────────────────────────

  getStatus(): Observable<StatusDashboard> {
    return this.http.get<StatusDashboard>(`${this.base}/status`);
  }

  // ── PACIENTES ──────────────────────────────────────────────────────────────

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.base}/paciente`);
  }

  criarPaciente(data: PacienteRequest): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.base}/paciente`, data);
  }

  inativarPaciente(id: number): Observable<void> {
    return this.http.put<void>(`${this.base}/paciente/inativar/${id}`, {});
  }
}
