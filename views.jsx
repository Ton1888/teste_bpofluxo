// Tarefas (Kanban) + Checklists + Comunicações views
function Tarefas() {
  const [tasks, setTasks] = React.useState(TAREFAS);
  const [dragId, setDragId] = React.useState(null);
  const cols = [
    { id: 'pendente', label: 'A fazer', tone: 'neutral' },
    { id: 'andamento', label: 'Em andamento', tone: 'info' },
    { id: 'revisao', label: 'Em revisão', tone: 'warn' },
    { id: 'concluida', label: 'Concluídas', tone: 'ok' },
  ];

  const onDrop = (colId) => {
    if (!dragId) return;
    setTasks(ts => ts.map(t => t.id===dragId ? {...t, status: colId} : t));
    setDragId(null);
  };

  const prio = (p) => p==='alta' ? 'fx-pri fx-pri-h' : p==='media' ? 'fx-pri fx-pri-m' : 'fx-pri fx-pri-l';

  return (
    <div className="fx-page">
      <div className="fx-page-head">
        <div>
          <h1 className="fx-h1">Tarefas</h1>
          <p className="fx-page-sub">{tasks.length} tarefas · arraste entre colunas para mover</p>
        </div>
        <div className="fx-head-actions">
          <div className="fx-seg">
            <button className="is-active">Quadro</button>
            <button>Lista</button>
            <button>Calendário</button>
          </div>
          <button className="fx-btn-primary"><Icon name="plus" size={13}/> Nova tarefa</button>
        </div>
      </div>

      <div className="fx-filter-bar fx-filter-bar--slim">
        <div className="fx-input-wrap"><Icon name="search" size={13}/><input placeholder="Filtrar tarefas…"/></div>
        <button className="fx-chip-f">Todas empresas <Icon name="arrowDown" size={11}/></button>
        <button className="fx-chip-f">Responsável <Icon name="arrowDown" size={11}/></button>
        <button className="fx-chip-f">Prioridade <Icon name="arrowDown" size={11}/></button>
        <button className="fx-chip-f">Área <Icon name="arrowDown" size={11}/></button>
        <div style={{flex:1}}/>
        <div className="fx-avatar-stack">
          <div className="fx-avatar-sm" style={{background:'oklch(68% 0.1 155)'}}>MS</div>
          <div className="fx-avatar-sm" style={{background:'oklch(65% 0.09 135)'}}>CM</div>
          <div className="fx-avatar-sm" style={{background:'oklch(70% 0.08 170)'}}>PV</div>
          <div className="fx-avatar-sm" style={{background:'oklch(66% 0.09 120)'}}>RP</div>
          <div className="fx-avatar-sm fx-avatar-plus">+3</div>
        </div>
      </div>

      <div className="fx-kanban">
        {cols.map(c => {
          const colTasks = tasks.filter(t => t.status===c.id);
          return (
            <div key={c.id} className={'fx-col fx-col-'+c.tone}
              onDragOver={e=>e.preventDefault()}
              onDrop={()=>onDrop(c.id)}>
              <div className="fx-col-head">
                <span className="fx-col-dot"/>
                <span className="fx-col-title">{c.label}</span>
                <span className="fx-col-count">{colTasks.length}</span>
                <button className="fx-icon-btn fx-col-plus"><Icon name="plus" size={13}/></button>
              </div>
              <div className="fx-col-body">
                {colTasks.map(t => (
                  <article key={t.id} className="fx-task"
                    draggable
                    onDragStart={()=>setDragId(t.id)}
                    onDragEnd={()=>setDragId(null)}>
                    <div className="fx-task-top">
                      <span className={prio(t.prioridade)} title={'Prioridade '+t.prioridade}/>
                      <span className="fx-task-tag">{t.tag}</span>
                    </div>
                    <div className="fx-task-title">{t.titulo}</div>
                    <div className="fx-task-emp">
                      <div className="fx-avatar-xs" style={{background: hashColor(t.empresa)}}>{initials(t.empresa)}</div>
                      <span>{t.empresa}</span>
                    </div>
                    <div className="fx-task-foot">
                      <span className="fx-task-date"><Icon name="calendar" size={11}/> {t.prazo}</span>
                      <div className="fx-avatar-xs fx-avatar-resp">{t.resp.split(' ').map(w=>w[0]).join('')}</div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Checklists() {
  return (
    <div className="fx-page">
      <div className="fx-page-head">
        <div>
          <h1 className="fx-h1">Checklists</h1>
          <p className="fx-page-sub">Processos em execução nas empresas</p>
        </div>
        <div className="fx-head-actions">
          <button className="fx-btn-ghost"><Icon name="file" size={13}/> Templates</button>
          <button className="fx-btn-primary"><Icon name="plus" size={13}/> Novo checklist</button>
        </div>
      </div>

      <div className="fx-check-grid">
        {CHECKLISTS.map(c => {
          const pct = Math.round((c.progresso/c.total)*100);
          return (
            <div key={c.id} className="fx-card fx-check-card">
              <div className="fx-check-top">
                <div className="fx-avatar-sq" style={{background: hashColor(c.empresa)}}>{initials(c.empresa)}</div>
                <div>
                  <div className="fx-check-name">{c.nome}</div>
                  <div className="fx-check-emp">{c.empresa}</div>
                </div>
                <button className="fx-icon-btn"><Icon name="dots" size={14}/></button>
              </div>
              <div className="fx-progress">
                <div className="fx-progress-bar" style={{width: pct+'%'}}/>
              </div>
              <div className="fx-check-meta">
                <span><strong>{c.progresso}</strong>/{c.total} etapas</span>
                <span className="fx-check-sep">·</span>
                <span>{pct}% concluído</span>
              </div>
              <div className="fx-check-foot">
                <div className="fx-check-resp">
                  <Icon name="user" size={12}/> {c.resp}
                </div>
                <div className="fx-check-prazo">
                  <Icon name="clock" size={12}/> Entrega {c.prazo}
                </div>
              </div>
              <div className="fx-check-steps">
                {Array.from({length: c.total}).map((_,i) => (
                  <span key={i} className={'fx-step-dot ' + (i<c.progresso?'is-done':i===c.progresso?'is-cur':'')}/>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Comunicacoes() {
  const [selected, setSelected] = React.useState(COMUNICACOES[0].id);
  const cur = COMUNICACOES.find(c => c.id===selected);
  return (
    <div className="fx-page fx-page--full">
      <div className="fx-page-head">
        <div>
          <h1 className="fx-h1">Comunicações</h1>
          <p className="fx-page-sub">WhatsApp e e-mails centralizados por empresa</p>
        </div>
      </div>

      <div className="fx-msg-layout">
        <aside className="fx-msg-list">
          <div className="fx-msg-search"><Icon name="search" size={13}/><input placeholder="Buscar conversa…"/></div>
          <div className="fx-msg-seg">
            <button className="is-active">Todas</button>
            <button>Não lidas</button>
            <button>WhatsApp</button>
            <button>E-mail</button>
          </div>
          <ul>
            {COMUNICACOES.map(c => (
              <li key={c.id} className={selected===c.id?'is-active':''} onClick={()=>setSelected(c.id)}>
                <div className="fx-msg-ava">
                  <div className="fx-avatar-sq" style={{background: hashColor(c.empresa)}}>{initials(c.empresa)}</div>
                  <span className={'fx-msg-ch fx-msg-ch-'+c.canal}>{c.canal==='whatsapp'?'W':'@'}</span>
                </div>
                <div className="fx-msg-mid">
                  <div className="fx-msg-emp">{c.empresa}</div>
                  <div className="fx-msg-prev">{c.pessoa} · {c.preview}</div>
                </div>
                <div className="fx-msg-rt">
                  <div className="fx-msg-t">{c.tempo}</div>
                  {c.naoLido && <span className="fx-msg-dot"/>}
                </div>
              </li>
            ))}
          </ul>
        </aside>
        <section className="fx-msg-thread">
          <div className="fx-msg-thread-head">
            <div className="fx-avatar-sq" style={{background: hashColor(cur.empresa)}}>{initials(cur.empresa)}</div>
            <div>
              <div className="fx-msg-emp">{cur.empresa}</div>
              <div className="fx-msg-prev">{cur.pessoa}</div>
            </div>
            <div style={{flex:1}}/>
            <button className="fx-btn-ghost"><Icon name="file" size={13}/> Vincular tarefa</button>
          </div>
          <div className="fx-msg-body">
            <div className="fx-msg-day">Hoje</div>
            <div className="fx-bubble">
              <div className="fx-bubble-who">{cur.pessoa}</div>
              <p>Oi! Você conseguiu preparar a guia do DARF de março? Preciso enviar para pagamento hoje.</p>
              <time>09:14</time>
            </div>
            <div className="fx-bubble fx-bubble-mine">
              <p>Oi Helena! Estou fechando agora. Envio nos próximos 20 minutos junto com o relatório da apuração.</p>
              <time>09:22</time>
            </div>
            <div className="fx-bubble">
              <div className="fx-bubble-who">{cur.pessoa}</div>
              <p>{cur.preview}</p>
              <time>09:41</time>
            </div>
          </div>
          <div className="fx-msg-compose">
            <button className="fx-icon-btn"><Icon name="plus" size={14}/></button>
            <input placeholder={"Mensagem para " + cur.pessoa + "…"}/>
            <button className="fx-btn-primary"><Icon name="arrowRight" size={13}/></button>
          </div>
        </section>
      </div>
    </div>
  );
}

Object.assign(window, { Tarefas, Checklists, Comunicacoes });
