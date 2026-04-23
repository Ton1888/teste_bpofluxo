// Dashboard view
function Dashboard({ setRoute, openEmpresa }) {
  const kpis = [
    { label: 'Tarefas pendentes', value: 520, delta: '+18 hoje', tone: 'warn', icon: 'checkSquare' },
    { label: 'Empresas a fazer', value: 18, delta: '12 atrasadas', tone: 'danger', icon: 'building' },
    { label: 'Comunicações', value: 32, delta: '8 não lidas', tone: 'info', icon: 'chat' },
    { label: 'Checklists ativos', value: 14, delta: '3 próximos', tone: 'ok', icon: 'layers' },
  ];

  const slices = [
    { k: 'Fiscal', v: 210, c: 'var(--fx-green-700)' },
    { k: 'Contábil', v: 142, c: 'var(--fx-green-500)' },
    { k: 'Financeiro', v: 96, c: 'var(--fx-sage-400)' },
    { k: 'RH', v: 48, c: 'var(--fx-moss-300)' },
    { k: 'Outros', v: 24, c: 'var(--fx-neutral-300)' },
  ];

  // Stacked bar data (last 8 weeks)
  const weeks = [
    { w: 'S09', f: 62, c: 44, p: 22 }, { w: 'S10', f: 58, c: 40, p: 26 },
    { w: 'S11', f: 71, c: 48, p: 28 }, { w: 'S12', f: 66, c: 52, p: 24 },
    { w: 'S13', f: 80, c: 58, p: 30 }, { w: 'S14', f: 88, c: 60, p: 34 },
    { w: 'S15', f: 74, c: 55, p: 40 }, { w: 'S16', f: 92, c: 64, p: 38 },
  ];

  const atividade = [
    { q: 'Marina S.', a: 'concluiu', o: 'DCTF Web 03/2026', e: 'Verdejante Agropecuária', t: 'há 12 min' },
    { q: 'Rafael P.', a: 'comentou em', o: 'Conciliação Itaú', e: 'Folha Nova Comércio', t: 'há 28 min' },
    { q: 'Clara M.', a: 'criou checklist', o: 'Migração regime', e: 'Cipó Logística', t: 'há 1h' },
    { q: 'Pedro V.', a: 'moveu para revisão', o: 'Balancete mensal', e: 'Bambu Engenharia', t: 'há 2h' },
    { q: 'Marina S.', a: 'anexou documento em', o: 'ITR 2026', e: 'Verdejante Agropecuária', t: 'há 3h' },
  ];

  return (
    <div className="fx-page">
      <div className="fx-page-head">
        <div>
          <h1 className="fx-h1">Painel do escritório</h1>
          <p className="fx-page-sub">Visão consolidada das 128 empresas · competência 04/2026</p>
        </div>
        <div className="fx-seg">
          <button className="is-active">Hoje</button>
          <button>Semana</button>
          <button>Mês</button>
          <button>Trim.</button>
        </div>
      </div>

      <div className="fx-kpis">
        {kpis.map(k => (
          <div key={k.label} className={'fx-kpi fx-tone-' + k.tone}>
            <div className="fx-kpi-head">
              <div className="fx-kpi-ico"><Icon name={k.icon} size={14}/></div>
              <div className="fx-kpi-label">{k.label}</div>
            </div>
            <div className="fx-kpi-value">{k.value}</div>
            <div className="fx-kpi-delta">{k.delta}</div>
          </div>
        ))}
      </div>

      <div className="fx-grid-2">
        <section className="fx-card">
          <div className="fx-card-head">
            <div>
              <h2 className="fx-h2">Distribuição de tarefas por área</h2>
              <p className="fx-card-sub">520 tarefas abertas</p>
            </div>
            <button className="fx-link">Ver relatório <Icon name="arrowRight" size={12}/></button>
          </div>
          <div className="fx-donut-wrap">
            <Donut data={slices} />
            <ul className="fx-legend">
              {slices.map(s => (
                <li key={s.k}>
                  <span className="fx-legend-dot" style={{background: s.c}} />
                  <span className="fx-legend-k">{s.k}</span>
                  <span className="fx-legend-v">{s.v}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="fx-card">
          <div className="fx-card-head">
            <div>
              <h2 className="fx-h2">Produtividade semanal</h2>
              <p className="fx-card-sub">Tarefas concluídas · últimas 8 semanas</p>
            </div>
            <div className="fx-chip-group">
              <span className="fx-chip-dot fiscal" /> Fiscal
              <span className="fx-chip-dot contabil" /> Contábil
              <span className="fx-chip-dot fin" /> Financeiro
            </div>
          </div>
          <StackedBars data={weeks}/>
        </section>
      </div>

      <div className="fx-grid-2">
        <section className="fx-card">
          <div className="fx-card-head">
            <div><h2 className="fx-h2">Empresas com alertas</h2>
              <p className="fx-card-sub">Pendências nas próximas 72h</p></div>
            <button className="fx-link" onClick={()=>setRoute('empresas')}>Abrir todas <Icon name="arrowRight" size={12}/></button>
          </div>
          <ul className="fx-alerta-list">
            {EMPRESAS.filter(e=>e.tarefas>=5).slice(0,5).map(e => (
              <li key={e.id} onClick={()=>openEmpresa(e)}>
                <div className="fx-avatar-sq" style={{background: hashColor(e.nome)}}>{initials(e.nome)}</div>
                <div className="fx-alist-mid">
                  <div className="fx-alist-name">{e.nome}</div>
                  <div className="fx-alist-doc">{e.regime} · {e.doc}</div>
                </div>
                <div className="fx-pill fx-pill-warn">{e.tarefas} tarefas</div>
                <Icon name="arrowRight" size={14} className="fx-alist-ar"/>
              </li>
            ))}
          </ul>
        </section>

        <section className="fx-card">
          <div className="fx-card-head">
            <h2 className="fx-h2">Atividade recente</h2>
            <button className="fx-link">Feed completo <Icon name="arrowRight" size={12}/></button>
          </div>
          <ul className="fx-activity">
            {atividade.map((a, i) => (
              <li key={i}>
                <div className="fx-activity-dot" />
                <div className="fx-activity-body">
                  <div><strong>{a.q}</strong> {a.a} <em>{a.o}</em></div>
                  <div className="fx-activity-meta">{a.e} · {a.t}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function Donut({ data }) {
  const total = data.reduce((s,d)=>s+d.v,0);
  const R = 58, C = 2*Math.PI*R;
  let acc = 0;
  return (
    <div className="fx-donut">
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={R} stroke="var(--fx-neutral-100)" strokeWidth="16" fill="none"/>
        {data.map((d,i)=>{
          const len = (d.v/total)*C;
          const dasharray = `${len} ${C-len}`;
          const dashoffset = -acc;
          acc += len;
          return <circle key={i} cx="80" cy="80" r={R} stroke={d.c} strokeWidth="16" fill="none"
            strokeDasharray={dasharray} strokeDashoffset={dashoffset} transform="rotate(-90 80 80)" strokeLinecap="butt"/>;
        })}
        <text x="80" y="76" textAnchor="middle" className="fx-donut-n">{total}</text>
        <text x="80" y="94" textAnchor="middle" className="fx-donut-l">tarefas</text>
      </svg>
    </div>
  );
}

function StackedBars({ data }) {
  const max = Math.max(...data.map(d => d.f+d.c+d.p));
  return (
    <div className="fx-bars">
      {data.map((d,i)=>{
        const h = (n) => (n/max)*140;
        return (
          <div className="fx-bar-col" key={i}>
            <div className="fx-bar-stack" style={{height: 160}}>
              <div className="fx-bar fx-bar-p" style={{height: h(d.p)}} />
              <div className="fx-bar fx-bar-c" style={{height: h(d.c)}} />
              <div className="fx-bar fx-bar-f" style={{height: h(d.f)}} />
            </div>
            <div className="fx-bar-w">{d.w}</div>
          </div>
        );
      })}
    </div>
  );
}

function initials(s) { return s.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase(); }
function hashColor(s) {
  const hs = ['oklch(68% 0.09 155)','oklch(65% 0.1 140)','oklch(62% 0.11 170)','oklch(70% 0.08 120)','oklch(60% 0.1 185)','oklch(72% 0.07 100)'];
  let h = 0; for (const c of s) h = (h*31 + c.charCodeAt(0)) >>> 0;
  return hs[h % hs.length];
}

Object.assign(window, { Dashboard, initials, hashColor });
