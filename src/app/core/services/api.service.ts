import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Escola, Unidade, ProfissionalSaude } from '../models/models';

// ── DTOs que espelham exatamente os records do backend ──────────────────────

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

// ── Serviço ─────────────────────────────────────────────────────────────────

/**
 * Serviço HTTP centralizado — consome apenas os endpoints disponíveis no backend.
 *
 * Endpoints cobertos:
 *   POST   /escolas
 *   GET    /escolas
 *   GET    /escolas/:id
 *
 *   POST   /unidades
 *   GET    /unidades
 *   GET    /unidades/:id
 *   PUT    /unidades/:id
 *   PATCH  /unidades/:id/inativar
 *
 *   POST   /profissionais                        (ADMIN)
 *   GET    /profissionais                        (ADMIN)
 *   GET    /profissionais/:id                    (ADMIN)
 *   PATCH  /profissionais/:id/inativar           (ADMIN)
 *   GET    /profissionais/meu-perfil             (PROFISSIONAL)
 *   PATCH  /profissionais/meu-perfil/complemento (PROFISSIONAL)
 */
@Injectable({ providedIn: 'root' })
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

  criarProfissional(data: ProfissionalCadastroRequest): Observable<ProfissionalSaude> {
    return this.http.post<ProfissionalSaude>(`${this.base}/profissionais`, data);
  }

  inativarProfissional(id: number): Observable<void> {
    return this.http.patch<void>(`${this.base}/profissionais/${id}/inativar`, {});
  }

  // ── PROFISSIONAIS (self — perfil próprio) ──────────────────────────────────

  getMeuPerfil(): Observable<ProfissionalSaude> {
    return this.http.get<ProfissionalSaude>(`${this.base}/profissionais/meu-perfil`);
  }

  completarCadastro(data: ProfissionalComplementoRequest): Observable<ProfissionalSaude> {
    return this.http.patch<ProfissionalSaude>(`${this.base}/profissionais/meu-perfil/complemento`, data);
  }
}
