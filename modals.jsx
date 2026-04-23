// Empresa detail modal + placeholder views + CmdK
function EmpresaModal({ empresa, onClose }) {
  if (!empresa) return null;
  const tasks = TAREFAS.filter(t => t.empresa === empresa.nome);
  const [tab, setTab] = React.useState('resumo');
  React.useEffect(()=>{
    const k = e => { if (e.key==='Escape') onClose(); };
    window.addEventListener('keydown', k); return ()=>window.removeEventListener('keydown', k);
  }, []);
  return (
    <div className="fx-modal-scrim" onClick={onClose}>
      <div className="fx-modal" onClick={e=>e.stopPropagation()}>
        <div className="fx-modal-head">
          <div className="fx-avatar-lg" style={{background: hashColor(empresa.nome)}}>{initials(empresa.nome)}</div>
          <div style={{flex:1}}>
            <div className="fx-modal-eyebrow">{empresa.setor} · {empresa.doc}</div>
            <h2 className="fx-h1">{empresa.nome}</h2>
            <div className="fx-modal-meta">
              <span className="fx-pill-regime">{empresa.regime}</span>
              <span className="fx-pill fx-pill-ok">{empresa.status}</span>
              <span className="fx-muted">Responsável · {empresa.resp}</span>
            </div>
          </div>
          <button className="fx-icon-btn" onClick={onClose}><Icon name="x" size={16}/></button>
        </div>
        <div className="fx-modal-tabs">
          {['resumo','tarefas','financeiro','documentos','historico'].map(t => (
            <button key={t} className={tab===t?'is-active':''} onClick={()=>setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="fx-modal-body">
          {tab==='resumo' && (
            <>
              <div className="fx-modal-kpis">
                <div><span>Saldo em contas</span><strong className="fx-mono">{brl(empresa.saldo)}</strong></div>
                <div><span>A receber</span><strong className="fx-mono fx-neg">{brl(empresa.receber)}</strong></div>
                <div><span>A pagar</span><strong className="fx-mono fx-neg">{brl(empresa.pagar)}</strong></div>
                <div><span>Tarefas abertas</span><strong>{empresa.tarefas}</strong></div>
              </div>
              <div className="fx-modal-section">
                <h3 className="fx-h3">Próximas entregas</h3>
                <ul className="fx-alerta-list">
                  {tasks.slice(0,4).map(t => (
                    <li key={t.id}>
                      <span className={'fx-pri fx-pri-'+(t.prioridade==='alta'?'h':t.prioridade==='media'?'m':'l')}/>
                      <div className="fx-alist-mid">
                        <div className="fx-alist-name">{t.titulo}</div>
                        <div className="fx-alist-doc">{t.tag} · {t.resp}</div>
                      </div>
                      <div className="fx-pill fx-pill-warn">{t.prazo}</div>
                    </li>
                  ))}
                  {tasks.length===0 && <li className="fx-muted" style={{padding:'12px'}}>Sem tarefas pendentes.</li>}
                </ul>
              </div>
            </>
          )}
          {tab!=='resumo' && (
            <div className="fx-empty">
              <Icon name="file" size={22}/>
              <div>Conteúdo de <strong>{tab}</strong> será exibido aqui.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Placeholder({ title, sub, icon }) {
  return (
    <div className="fx-page">
      <div className="fx-page-head">
        <div><h1 className="fx-h1">{title}</h1><p className="fx-page-sub">{sub}</p></div>
      </div>
      <div className="fx-card fx-empty-lg">
        <Icon name={icon} size={32}/>
        <h3 className="fx-h3">Módulo em preparação</h3>
        <p className="fx-muted">Esta área concentra {title.toLowerCase()}. Ative integrações nos Ajustes para começar.</p>
        <button className="fx-btn-primary"><Icon name="plus" size={13}/> Configurar</button>
      </div>
    </div>
  );
}

function CmdK({ open, onClose, onOpen }) {
  const [q, setQ] = React.useState('');
  React.useEffect(()=>{
    if (open) setQ('');
    const k = e => { if (e.key==='Escape') onClose(); };
    window.addEventListener('keydown', k); return ()=>window.removeEventListener('keydown', k);
  }, [open]);
  if (!open) return null;
  const results = EMPRESAS.filter(e => !q || e.nome.toLowerCase().includes(q.toLowerCase()) || e.doc.includes(q)).slice(0,6);
  return (
    <div className="fx-modal-scrim fx-cmdk-scrim" onClick={onClose}>
      <div className="fx-cmdk" onClick={e=>e.stopPropagation()}>
        <div className="fx-cmdk-input">
          <Icon name="search" size={14}/>
          <input autoFocus placeholder="Buscar empresa, tarefa, CNPJ…" value={q} onChange={e=>setQ(e.target.value)}/>
          <kbd>esc</kbd>
        </div>
        <div className="fx-cmdk-group">Empresas</div>
        <ul className="fx-cmdk-list">
          {results.map(e => (
            <li key={e.id} onClick={()=>{onOpen(e); onClose();}}>
              <div className="fx-avatar-sq" style={{background: hashColor(e.nome)}}>{initials(e.nome)}</div>
              <div className="fx-alist-mid">
                <div className="fx-alist-name">{e.nome}</div>
                <div className="fx-alist-doc">{e.regime} · {e.doc}</div>
              </div>
              <Icon name="arrowRight" size={13}/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Object.assign(window, { EmpresaModal, Placeholder, CmdK });
