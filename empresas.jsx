// Empresas table view
function Empresas({ openEmpresa }) {
  const [q, setQ] = React.useState('');
  const [regime, setRegime] = React.useState('todos');
  const [resp, setResp] = React.useState('todos');
  const [sort, setSort] = React.useState({ key: 'nome', dir: 'asc' });

  const filtered = React.useMemo(() => {
    let list = EMPRESAS.filter(e => {
      if (q && !(e.nome.toLowerCase().includes(q.toLowerCase()) || e.doc.includes(q))) return false;
      if (regime !== 'todos' && e.regime !== regime) return false;
      if (resp !== 'todos' && e.resp !== resp) return false;
      return true;
    });
    list = [...list].sort((a,b) => {
      const av = a[sort.key], bv = b[sort.key];
      if (typeof av === 'number') return sort.dir==='asc' ? av-bv : bv-av;
      return sort.dir==='asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return list;
  }, [q, regime, resp, sort]);

  const concilIcon = (c) => c==='ok'
    ? <span className="fx-concil fx-concil-ok" title="Conciliado"><Icon name="check" size={11}/></span>
    : c==='atencao'
    ? <span className="fx-concil fx-concil-warn" title="Atenção"><Icon name="alert" size={11}/></span>
    : <span className="fx-concil fx-concil-err" title="Erro"><Icon name="x" size={11}/></span>;

  const sortBy = (k) => setSort(s => ({ key: k, dir: s.key===k && s.dir==='asc' ? 'desc' : 'asc' }));
  const arrow = (k) => sort.key===k ? (sort.dir==='asc' ? '↑' : '↓') : '';

  const totalSaldo = filtered.reduce((s,e)=>s+e.saldo, 0);
  const totalReceber = filtered.reduce((s,e)=>s+e.receber, 0);
  const totalPagar = filtered.reduce((s,e)=>s+e.pagar, 0);

  return (
    <div className="fx-page">
      <div className="fx-page-head">
        <div>
          <h1 className="fx-h1">Empresas</h1>
          <p className="fx-page-sub">{filtered.length} de {EMPRESAS.length} empresas · competência 04/2026</p>
        </div>
        <div className="fx-head-actions">
          <button className="fx-btn-ghost"><Icon name="download" size={13}/> Exportar</button>
          <button className="fx-btn-primary"><Icon name="plus" size={13}/> Nova empresa</button>
        </div>
      </div>

      <div className="fx-filter-bar">
        <div className="fx-input-wrap">
          <Icon name="search" size={13}/>
          <input placeholder="Buscar por nome ou CNPJ…" value={q} onChange={e=>setQ(e.target.value)}/>
        </div>
        <Select value={regime} onChange={setRegime} label="Regime"
          options={[{v:'todos',l:'Todos os regimes'},{v:'Simples',l:'Simples Nacional'},{v:'Lucro Presumido',l:'Lucro Presumido'},{v:'Lucro Real',l:'Lucro Real'},{v:'MEI',l:'MEI'}]}/>
        <Select value={resp} onChange={setResp} label="Responsável"
          options={[{v:'todos',l:'Todos responsáveis'},{v:'Marina S.',l:'Marina S.'},{v:'Clara M.',l:'Clara M.'},{v:'Pedro V.',l:'Pedro V.'},{v:'Rafael P.',l:'Rafael P.'}]}/>
        <button className="fx-btn-ghost"><Icon name="filter" size={13}/> Mais filtros</button>
      </div>

      <div className="fx-tsummary">
        <div><span>Total saldo</span><strong>{brl(totalSaldo)}</strong></div>
        <div><span>A receber</span><strong className="fx-neg">{brl(totalReceber)}</strong></div>
        <div><span>A pagar</span><strong className="fx-neg">{brl(totalPagar)}</strong></div>
        <div><span>Tarefas</span><strong>{filtered.reduce((s,e)=>s+e.tarefas,0)}</strong></div>
      </div>

      <div className="fx-table-wrap">
        <table className="fx-table">
          <thead>
            <tr>
              <th style={{width:36}}><input type="checkbox" className="fx-cb"/></th>
              <th onClick={()=>sortBy('nome')}>Empresa {arrow('nome')}</th>
              <th onClick={()=>sortBy('regime')}>Regime {arrow('regime')}</th>
              <th onClick={()=>sortBy('resp')}>Responsável {arrow('resp')}</th>
              <th className="fx-num" onClick={()=>sortBy('saldo')}>Saldo em contas {arrow('saldo')}</th>
              <th className="fx-num" onClick={()=>sortBy('receber')}>Recebimentos {arrow('receber')}</th>
              <th className="fx-num" onClick={()=>sortBy('pagar')}>Pagamentos {arrow('pagar')}</th>
              <th className="fx-center">Concil.</th>
              <th className="fx-num" onClick={()=>sortBy('tarefas')}>Tarefas {arrow('tarefas')}</th>
              <th style={{width:32}}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(e => (
              <tr key={e.id} onClick={()=>openEmpresa(e)}>
                <td onClick={ev=>ev.stopPropagation()}><input type="checkbox" className="fx-cb"/></td>
                <td>
                  <div className="fx-cell-emp">
                    <div className="fx-avatar-sq" style={{background: hashColor(e.nome)}}>{initials(e.nome)}</div>
                    <div>
                      <div className="fx-emp-name">{e.nome}</div>
                      <div className="fx-emp-doc">{e.doc}</div>
                    </div>
                  </div>
                </td>
                <td><span className="fx-pill-regime">{e.regime}</span></td>
                <td className="fx-muted">{e.resp}</td>
                <td className="fx-num fx-mono">{brl(e.saldo)}</td>
                <td className="fx-num fx-mono"><span className={e.receber>0?'fx-neg':'fx-zero'}>{brl(e.receber)}</span></td>
                <td className="fx-num fx-mono"><span className={e.pagar>0?'fx-neg':'fx-zero'}>{brl(e.pagar)}</span></td>
                <td className="fx-center">{concilIcon(e.concil)}</td>
                <td className="fx-num">
                  {e.tarefas>0 ? <span className={'fx-badge-count ' + (e.tarefas>=8?'is-hot':e.tarefas>=4?'is-warm':'')}>{e.tarefas}</span> : <span className="fx-zero fx-mono">—</span>}
                </td>
                <td onClick={ev=>ev.stopPropagation()}><button className="fx-icon-btn"><Icon name="dots" size={14}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="fx-pag">
        <span>Mostrando 1–{filtered.length} de 128</span>
        <div className="fx-pag-btns">
          <button disabled>Anterior</button>
          <button className="is-active">1</button>
          <button>2</button>
          <button>3</button>
          <button>…</button>
          <button>11</button>
          <button>Próxima</button>
        </div>
      </div>
    </div>
  );
}

function Select({ value, onChange, options, label }) {
  return (
    <label className="fx-select">
      <select value={value} onChange={e=>onChange(e.target.value)}>
        {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
      <Icon name="arrowDown" size={12}/>
    </label>
  );
}

Object.assign(window, { Empresas, Select });
