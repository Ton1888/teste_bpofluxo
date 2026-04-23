// Shared components for Fluxo — gestão de tarefas e processos contábeis
const { useState, useEffect, useMemo, useRef } = React;

// ---------- ICON (inline SVG, lucide-style) ----------
function Icon({ name, size = 16, className = '', strokeWidth = 1.75 }) {
  const paths = {
    menu: <><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>,
    bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
    home: <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    building: <><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    checkSquare: <><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    chat: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
    chart: <><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></>,
    settings: <><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></>,
    filter: <><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    dots: <><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    arrowUp: <><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></>,
    arrowDown: <><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    circle: <><circle cx="12" cy="12" r="10"/></>,
    alert: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
    gift: <><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    tag: <><path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
    sparkle: <><path d="M12 3l1.9 5.8L20 10l-5.8 1.9L12 18l-2.1-6.1L4 10l6-1.2z"/></>,
    inbox: <><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    flag: <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></>,
    trending: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/></>,
    moon: <><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>{paths[name] || null}</svg>
  );
}

// ---------- FORMATTING ----------
const brl = (n) => 'R$ ' + n.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
const compact = (n) => {
  if (n >= 1000000) return (n/1000000).toFixed(1).replace('.0','') + 'M';
  if (n >= 1000) return (n/1000).toFixed(1).replace('.0','') + 'k';
  return String(n);
};

// ---------- DATA ----------
const EMPRESAS = [
  { id: 1, nome: 'Verdejante Agropecuária', doc: '12.345.678/0001-22', regime: 'Lucro Real', status: 'ativa', saldo: 388268.94, receber: 21950.17, pagar: 82079.53, tarefas: 14, concil: 'ok', resp: 'Marina S.', setor: 'Agronegócio' },
  { id: 2, nome: 'Mata Atlântica Serviços', doc: '08.772.310/0001-08', regime: 'Simples', status: 'ativa', saldo: 20831.14, receber: 6000.00, pagar: 1737.92, tarefas: 3, concil: 'ok', resp: 'Rafael P.', setor: 'Serviços' },
  { id: 3, nome: 'Folha Nova Comércio', doc: '22.114.009/0001-51', regime: 'Lucro Presumido', status: 'ativa', saldo: 48190.12, receber: 44192.34, pagar: 567.70, tarefas: 7, concil: 'atencao', resp: 'Marina S.', setor: 'Varejo' },
  { id: 4, nome: 'Ramo & Raiz Consultoria', doc: '45.009.881/0001-14', regime: 'Simples', status: 'ativa', saldo: 9698.16, receber: 101158.75, pagar: 0, tarefas: 2, concil: 'ok', resp: 'Pedro V.', setor: 'Consultoria' },
  { id: 5, nome: 'Brota Tecnologia', doc: '31.887.440/0001-77', regime: 'Lucro Presumido', status: 'ativa', saldo: 35618.87, receber: 342651.69, pagar: 12116.78, tarefas: 11, concil: 'ok', resp: 'Clara M.', setor: 'Tecnologia' },
  { id: 6, nome: 'Bambu Engenharia', doc: '07.551.990/0001-32', regime: 'Lucro Real', status: 'ativa', saldo: 98081.46, receber: 0, pagar: 0, tarefas: 0, concil: 'ok', resp: 'Pedro V.', setor: 'Engenharia' },
  { id: 7, nome: 'Samambaia Studio', doc: '18.663.220/0001-45', regime: 'MEI', status: 'ativa', saldo: 2367.86, receber: 1200, pagar: 7850, tarefas: 5, concil: 'ok', resp: 'Rafael P.', setor: 'Criativo' },
  { id: 8, nome: 'Alecrim Alimentos', doc: '50.221.118/0001-09', regime: 'Lucro Presumido', status: 'ativa', saldo: 172244.59, receber: 5000, pagar: 0, tarefas: 6, concil: 'ok', resp: 'Clara M.', setor: 'Alimentação' },
  { id: 9, nome: 'Orvalho Cosméticos', doc: '66.442.117/0001-90', regime: 'Lucro Real', status: 'inativa', saldo: 152217.43, receber: 0, pagar: 21762.58, tarefas: 9, concil: 'ok', resp: 'Marina S.', setor: 'Cosméticos' },
  { id: 10, nome: 'Cipó Logística', doc: '13.998.002/0001-61', regime: 'Lucro Presumido', status: 'ativa', saldo: 11685.52, receber: 68675.22, pagar: 0, tarefas: 4, concil: 'erro', resp: 'Pedro V.', setor: 'Logística' },
  { id: 11, nome: 'Jequitibá Construtora', doc: '91.007.553/0001-22', regime: 'Lucro Real', status: 'ativa', saldo: 5935.81, receber: 0, pagar: 0, tarefas: 8, concil: 'ok', resp: 'Clara M.', setor: 'Construção' },
  { id: 12, nome: 'Hortelã Saúde', doc: '02.883.441/0001-05', regime: 'Simples', status: 'ativa', saldo: 4580.71, receber: 0, pagar: 3765.54, tarefas: 1, concil: 'erro', resp: 'Rafael P.', setor: 'Saúde' },
];

const TAREFAS = [
  { id: 't1', titulo: 'DCTF Web — competência 03/2026', empresa: 'Verdejante Agropecuária', resp: 'Marina S.', prazo: '25/04', status: 'pendente', prioridade: 'alta', tag: 'Fiscal' },
  { id: 't2', titulo: 'Conciliação bancária — Itaú 8810', empresa: 'Folha Nova Comércio', resp: 'Marina S.', prazo: '24/04', status: 'pendente', prioridade: 'alta', tag: 'Financeiro' },
  { id: 't3', titulo: 'Fechamento folha de pagamento', empresa: 'Brota Tecnologia', resp: 'Clara M.', prazo: '30/04', status: 'andamento', prioridade: 'media', tag: 'RH' },
  { id: 't4', titulo: 'Envio eSocial — 03/2026', empresa: 'Mata Atlântica Serviços', resp: 'Rafael P.', prazo: '28/04', status: 'andamento', prioridade: 'media', tag: 'Fiscal' },
  { id: 't5', titulo: 'Apuração PIS/COFINS', empresa: 'Alecrim Alimentos', resp: 'Clara M.', prazo: '26/04', status: 'pendente', prioridade: 'alta', tag: 'Fiscal' },
  { id: 't6', titulo: 'Revisão de notas fiscais', empresa: 'Ramo & Raiz Consultoria', resp: 'Pedro V.', prazo: '27/04', status: 'revisao', prioridade: 'baixa', tag: 'Contábil' },
  { id: 't7', titulo: 'Balancete mensal', empresa: 'Bambu Engenharia', resp: 'Pedro V.', prazo: '29/04', status: 'andamento', prioridade: 'media', tag: 'Contábil' },
  { id: 't8', titulo: 'Declaração ITR', empresa: 'Verdejante Agropecuária', resp: 'Marina S.', prazo: '22/04', status: 'revisao', prioridade: 'alta', tag: 'Fiscal' },
  { id: 't9', titulo: 'Emissão de guias DAS', empresa: 'Samambaia Studio', resp: 'Rafael P.', prazo: '20/04', status: 'concluida', prioridade: 'media', tag: 'Fiscal' },
  { id: 't10', titulo: 'Regularização CNPJ', empresa: 'Orvalho Cosméticos', resp: 'Marina S.', prazo: '18/04', status: 'concluida', prioridade: 'baixa', tag: 'Cadastral' },
  { id: 't11', titulo: 'Atendimento dúvida tributária', empresa: 'Cipó Logística', resp: 'Pedro V.', prazo: '23/04', status: 'pendente', prioridade: 'media', tag: 'Atendimento' },
  { id: 't12', titulo: 'Contrato social — alteração', empresa: 'Hortelã Saúde', resp: 'Clara M.', prazo: '02/05', status: 'andamento', prioridade: 'baixa', tag: 'Jurídico' },
];

const COMUNICACOES = [
  { id: 'c1', canal: 'whatsapp', empresa: 'Verdejante Agropecuária', pessoa: 'Helena (sócia)', preview: 'Oi, chegou a guia do DARF?', tempo: '2m', naoLido: true },
  { id: 'c2', canal: 'email', empresa: 'Brota Tecnologia', pessoa: 'financeiro@brota.com', preview: 'Envio extrato Itaú março', tempo: '18m', naoLido: true },
  { id: 'c3', canal: 'whatsapp', empresa: 'Folha Nova Comércio', pessoa: 'Bruno (gerente)', preview: 'Pode me ligar depois das 14h?', tempo: '1h', naoLido: false },
  { id: 'c4', canal: 'email', empresa: 'Alecrim Alimentos', pessoa: 'contato@alecrim.com.br', preview: 'Dúvida sobre faturamento', tempo: '3h', naoLido: true },
  { id: 'c5', canal: 'whatsapp', empresa: 'Ramo & Raiz Consultoria', pessoa: 'Camila', preview: 'Obrigada pelo retorno!', tempo: '1d', naoLido: false },
];

const CHECKLISTS = [
  { id: 'k1', nome: 'Abertura de empresa — Simples', empresa: 'Hortelã Saúde', progresso: 7, total: 12, resp: 'Clara M.', prazo: '05/05' },
  { id: 'k2', nome: 'Encerramento contábil mensal', empresa: 'Bambu Engenharia', progresso: 4, total: 9, resp: 'Pedro V.', prazo: '30/04' },
  { id: 'k3', nome: 'Migração de regime tributário', empresa: 'Cipó Logística', progresso: 2, total: 8, resp: 'Pedro V.', prazo: '15/05' },
  { id: 'k4', nome: 'Revisão fiscal anual', empresa: 'Verdejante Agropecuária', progresso: 11, total: 14, resp: 'Marina S.', prazo: '10/05' },
];

// Expose to other scripts
Object.assign(window, { Icon, brl, compact, EMPRESAS, TAREFAS, COMUNICACOES, CHECKLISTS });
