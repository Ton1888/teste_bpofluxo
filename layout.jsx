// Layout: Sidebar + Topbar + Route switcher
const { useState: useStateL } = React;

function Sidebar({ route, setRoute, density }) {
  const items = [
    { id: 'dashboard', label: 'Painel', icon: 'home' },
    { id: 'empresas', label: 'Empresas', icon: 'building' },
    { id: 'tarefas', label: 'Tarefas', icon: 'checkSquare' },
    { id: 'checklists', label: 'Checklists', icon: 'layers' },
    { id: 'comunicacoes', label: 'Comunicações', icon: 'chat' },
    { id: 'relatorios', label: 'Relatórios', icon: 'chart' },
  ];
  const extras = [
    { id: 'integracoes', label: 'Integrações', icon: 'link', badge: 'Pro' },
    { id: 'financeiro', label: 'Financeiro', icon: 'trending', badge: 'Pro' },
    { id: 'config', label: 'Ajustes', icon: 'settings' },
  ];
  return (
    <aside className="fx-sidebar">
      <div className="fx-brand">
        <div className="fx-brand-mark" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 18c4-2 6-6 8-10s4-6 8-6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round"/>
            <circle cx="19" cy="4" r="2" fill="currentColor"/>
          </svg>
        </div>
        <div className="fx-brand-text">
          <div className="fx-brand-name">fluxo</div>
          <div className="fx-brand-sub">gestão contábil</div>
        </div>
      </div>

      <div className="fx-workspace">
        <div className="fx-ws-avatar">CV</div>
        <div className="fx-ws-meta">
          <div className="fx-ws-name">CVA Serviços</div>
          <div className="fx-ws-role">Escritório · 128 empresas</div>
        </div>
        <button className="fx-ws-swap" title="Trocar workspace"><Icon name="dots" size={14}/></button>
      </div>

      <nav className="fx-nav">
        <div className="fx-nav-label">Principal</div>
        {items.map(i => (
          <button key={i.id} className={'fx-nav-item' + (route===i.id?' is-active':'')} onClick={()=>setRoute(i.id)}>
            <Icon name={i.icon} size={15}/>
            <span>{i.label}</span>
            {i.id==='tarefas' && <span className="fx-nav-count">12</span>}
            {i.id==='comunicacoes' && <span className="fx-nav-dot" />}
          </button>
        ))}
        <div className="fx-nav-label fx-nav-label--spaced">Ferramentas</div>
        {extras.map(i => (
          <button key={i.id} className={'fx-nav-item' + (route===i.id?' is-active':'')} onClick={()=>setRoute(i.id)}>
            <Icon name={i.icon} size={15}/>
            <span>{i.label}</span>
            {i.badge && <span className="fx-nav-badge">{i.badge}</span>}
          </button>
        ))}
      </nav>

      <div className="fx-sidebar-foot">
        <div className="fx-user">
          <div className="fx-user-avatar">MS</div>
          <div className="fx-user-meta">
            <div className="fx-user-name">Marina Soares</div>
            <div className="fx-user-role">Contadora sênior</div>
          </div>
          <button className="fx-icon-btn" title="Sair"><Icon name="logout" size={14}/></button>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ route, setRoute, onCmdK }) {
  const labels = {
    dashboard: 'Painel de Empresas',
    empresas: 'Empresas',
    tarefas: 'Tarefas',
    checklists: 'Checklists',
    comunicacoes: 'Comunicações',
    relatorios: 'Relatórios',
    integracoes: 'Integrações',
    financeiro: 'Financeiro',
    config: 'Ajustes',
  };
  return (
    <header className="fx-topbar">
      <div className="fx-crumbs">
        <span className="fx-crumb-muted">CVA Serviços</span>
        <span className="fx-crumb-sep">/</span>
        <span className="fx-crumb-cur">{labels[route]}</span>
      </div>
      <button className="fx-search" onClick={onCmdK}>
        <Icon name="search" size={14}/>
        <span>Buscar empresa, tarefa, CNPJ…</span>
        <kbd>⌘K</kbd>
      </button>
      <div className="fx-top-actions">
        <button className="fx-icon-btn" title="Novidades"><Icon name="sparkle" size={16}/></button>
        <button className="fx-icon-btn fx-has-dot" title="Notificações"><Icon name="bell" size={16}/></button>
        <button className="fx-top-primary"><Icon name="plus" size={14}/> Nova tarefa</button>
      </div>
    </header>
  );
}

Object.assign(window, { Sidebar, Topbar });
