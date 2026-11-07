import React, { useState, useEffect } from 'react';
import {
  FolderKanban,
  Building2,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
  Plus,
  Trash2,
  Edit3,
  X,
  Upload,
  Download,
  Lock,
  Unlock,
  ShieldCheck,
  User,
  Users,
  LogOut,
  ChevronDown,
  ChevronRight,
  BarChart3,
  PenTool,
  Sparkles,
  Layers,
  KeyRound,
  RefreshCw,
  DollarSign,
  Compass,
  Zap,
  Calendar,
  Briefcase
} from 'lucide-react';
import ScheduleTab from './ScheduleTab';

const initialProjectsData = [
  {
    id: 'PRJ-FUND-01',
    name: 'Roadshow & Captação de Recursos (R$ 250M)',
    code: 'FUND-250M',
    manager: 'Luiz Marcelo / Shoichiro Mitsui',
    targetDate: '2027-12-31',
    description: 'Captação estruturada de recursos (Equity & Debt) para implantação da Usina Solar 60 MWp e Protótipo TME.',
    scopeLogs: [
      { date: '06/11/2026', author: 'Shoichiro Mitsui', action: 'Início da Rodada', description: 'Estruturação de Teaser e seleção de fundos alvo.' }
    ],
    activities: [
      {
        id: 'ACT-F1',
        code: '1.0',
        name: 'Fase Pré-Marketing & Materiais de Investimento',
        weight: 25,
        subactivities: [
          {
            id: 'SUB-F1.1',
            code: '1.1',
            name: 'Elaboração do Teaser Comercial & One-Pager Executivo',
            owner: 'Luiz Marcelo',
            startDate: '2026-11-01',
            endDate: '2026-11-20',
            progress: 95,
            status: 'Em Andamento',
            history: [{ date: '01/11/2026', note: 'Minuta final validada pela diretoria.' }],
            files: ['Teaser_Captacao_R$250M_v2.pdf']
          },
          {
            id: 'SUB-F1.2',
            code: '1.2',
            name: 'Construção do Financial Model & DCF (Discounted Cash Flow)',
            owner: 'Advisory Financeiro / Shoichiro Mitsui',
            startDate: '2026-11-05',
            endDate: '2026-12-10',
            progress: 80,
            status: 'Em Andamento',
            history: [{ date: '04/11/2026', note: 'Premissas de alavancagem 70/30 injetadas no modelo.' }],
            files: ['PMI_Financial_Model_2026.xlsx']
          },
          {
            id: 'SUB-F1.3',
            code: '1.3',
            name: 'Auditoria de Due Diligence Legal, Societária e Ambiental',
            owner: 'Jurídico Corporativo',
            startDate: '2026-11-10',
            endDate: '2026-12-30',
            progress: 50,
            status: 'Em Andamento',
            history: [{ date: '05/11/2026', note: 'Certidões negativas e matrículas de garantias reunidas.' }],
            files: ['Due_Diligence_Checklist_Legal.pdf']
          }
        ]
      },
      {
        id: 'ACT-F2',
        code: '2.0',
        name: 'Roadshow Ativo & Reuniões com Fundos (Q1 2027)',
        weight: 45,
        subactivities: [
          {
            id: 'SUB-F2.1',
            code: '2.1',
            name: 'Contato com Fundos de Infraestrutura & Private Equity (Brasil)',
            owner: 'Luiz Marcelo',
            startDate: '2026-12-01',
            endDate: '2027-02-28',
            progress: 15,
            status: 'Planejado',
            history: [{ date: '06/11/2026', note: 'Lista com 15 gestoras tier-1 selecionadas para abordagem.' }],
            files: []
          },
          {
            id: 'SUB-F2.2',
            code: '2.2',
            name: 'Roadshow Internacional (Family Offices & Green Funds / EUA & Europa)',
            owner: 'Shoichiro Mitsui',
            startDate: '2027-01-15',
            endDate: '2027-04-30',
            progress: 10,
            status: 'Planejado',
            history: [{ date: '06/11/2026', note: 'Alinhamento de agenda com hubs de captação em NY e Zurique.' }],
            files: []
          }
        ]
      }
    ]
  },
  {
    id: 'PRJ-TME-02',
    name: 'Protótipo TME & P&D (330 kVA)',
    code: 'TME-PND',
    manager: 'Shoichiro Mitsui',
    targetDate: '2027-08-31',
    description: 'Desenvolvimento físico, testes de bancada e homologação do protótipo industrial de Tecnologia Magnética de Energia.',
    scopeLogs: [],
    activities: [
      {
        id: 'ACT-T1',
        code: '1.0',
        name: 'Propriedade Intelectual & Patentes (INPI)',
        weight: 40,
        subactivities: [
          {
            id: 'SUB-T1.1',
            code: '1.1',
            name: 'Redação Final de Memória Descritiva de Patentes no INPI',
            owner: 'Especialista em PI / Jurídico',
            startDate: '2026-11-01',
            endDate: '2026-11-30',
            progress: 90,
            status: 'Em Andamento',
            history: [{ date: '02/11/2026', note: 'Revisão final de reivindicações concluída.' }],
            files: ['Patente_INPI_Memoria_Descritiva.pdf']
          }
        ]
      }
    ]
  }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('pmi_active_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [userCredentials, setUserCredentials] = useState(() => {
    const saved = localStorage.getItem('pmi_user_credentials');
    return saved ? JSON.parse(saved) : {
      'gestor1': { name: 'Luiz Marcelo (Gestor 1)', pwd: 'user101', role: 'gestor' },
      'gestor2': { name: 'Shoichiro Mitsui (Gestor 2)', pwd: 'user202', role: 'gestor' },
      'admin': { name: 'Administrador Máster', pwd: 'admin123', role: 'admin' }
    };
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pwdForm, setPwdForm] = useState({ account: 'gestor1', newPassword: '', confirmPassword: '' });
  const [pwdSuccess, setPwdSuccess] = useState('');
  const [pwdError, setPwdError] = useState('');

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('pmi_dashboard_projects');
    return saved ? JSON.parse(saved) : initialProjectsData;
  });

  const [activeTabId, setActiveTabId] = useState(() => {
    return localStorage.getItem('pmi_active_tab_id') || 'TAB-FUNDRAISING';
  });

  const [assets, setAssets] = useState(() => {
    const saved = localStorage.getItem('pmi_assets_repo');
    return saved ? JSON.parse(saved) : [
      {
        id: 'AST-1',
        name: 'Fazenda Rio Branco - Gleba Norte (Matrícula 4.501)',
        type: 'Imóvel Rural (HBU: Solar + Agro)',
        valuation: 'R$ 45.000.000',
        status: 'Regularizado',
        ltv: '50%',
        dossier: 'Laudo de Avaliação ABNT NBR 14653 emitido por empresa tier-1. Certidões de ônus reais limpas e CCIR/CAR atestados.',
        documents: ['Laudo_ABNT_Fazenda_Rio_Branco.pdf', 'Matricula_4501_Atualizada.pdf', 'Certidao_Negativa_Federal_Estadual.pdf']
      },
      {
        id: 'AST-2',
        name: 'Área Industrial Porto Velho (Matrícula 8.210)',
        type: 'Imóvel Urbano / Logístico',
        valuation: 'R$ 18.500.000',
        status: 'Em Due Diligence',
        ltv: '45%',
        dossier: 'Estudo de vocação industrial logística concluído. Licença prévia de instalação emitida.',
        documents: ['Estudo_HBU_Porto_Velho.pdf', 'Licenca_Previa_Ambiental.pdf']
      }
    ];
  });

  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [selectedProjectIdForActivity, setSelectedProjectIdForActivity] = useState(projects[0]?.id || '');
  const [newActivityForm, setNewActivityForm] = useState({ name: '', weight: 15, owner: '', targetDate: '2027-12-31' });

  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  const [newAssetForm, setNewAssetForm] = useState({ name: '', type: 'Imóvel Rural (HBU)', valuation: '', status: 'Regularizado', ltv: '50%', dossier: '' });

  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());
  const [dailyTodos, setDailyTodos] = useState(() => {
    const saved = localStorage.getItem('pmi_daily_todos');
    return saved ? JSON.parse(saved) : [
      { id: 'todo-1', task: 'Finalizar Teaser da Rodada de Captação R$ 250M', author: 'Luiz Marcelo (Gestor 1)', priority: 'Alta', done: false, date: '2026-11-06' },
      { id: 'todo-2', task: 'Validar cronograma de montagem do protótipo TME 330 kVA', author: 'Shoichiro Mitsui (Gestor 2)', priority: 'Alta', done: true, date: '2026-11-06' }
    ];
  });

  const [dailyLogs, setDailyLogs] = useState(() => {
    const saved = localStorage.getItem('pmi_daily_logs');
    return saved ? JSON.parse(saved) : [
      { id: 'log-1', date: '06/11/2026 14:15', project: 'Roadshow & Captação', author: 'Shoichiro Mitsui (Gestor 2)', content: 'Alinhamento com investidores internacionais concluído.' }
    ];
  });

  const [newLogContent, setNewLogContent] = useState('');
  const [newTodoTask, setNewTodoTask] = useState('');

  useEffect(() => {
    localStorage.setItem('pmi_user_credentials', JSON.stringify(userCredentials));
  }, [userCredentials]);

  useEffect(() => {
    localStorage.setItem('pmi_dashboard_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('pmi_assets_repo', JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem('pmi_daily_todos', JSON.stringify(dailyTodos));
  }, [dailyTodos]);

  useEffect(() => {
    localStorage.setItem('pmi_daily_logs', JSON.stringify(dailyLogs));
  }, [dailyLogs]);

  useEffect(() => {
    localStorage.setItem('pmi_active_tab_id', activeTabId);
  }, [activeTabId]);

  const handleLogin = (e) => {
    e.preventDefault();
    const userKey = inputUsername.trim().toLowerCase();
    const cred = userCredentials[userKey];

    if (cred && cred.pwd === inputPassword.trim()) {
      const activeUserData = { username: userKey, name: cred.name, role: cred.role };
      setCurrentUser(activeUserData);
      localStorage.setItem('pmi_active_user', JSON.stringify(activeUserData));
      setAuthError('');
      setInputUsername('');
      setInputPassword('');
    } else {
      setAuthError('Usuário ou senha inválidos. Verifique as credenciais.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('pmi_active_user');
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setPwdError('');
    setPwdSuccess('');

    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      setPwdError('A confirmação de senha não confere!');
      return;
    }

    if (pwdForm.newPassword.length < 4) {
      setPwdError('A nova senha deve ter no mínimo 4 caracteres.');
      return;
    }

    setUserCredentials(prev => ({
      ...prev,
      [pwdForm.account]: {
        ...prev[pwdForm.account],
        pwd: pwdForm.newPassword
      }
    }));

    setPwdSuccess(`Senha da conta "${userCredentials[pwdForm.account].name}" atualizada com sucesso!`);
    setPwdForm({ account: 'gestor1', newPassword: '', confirmPassword: '' });
  };

  const handleAddAssetSubmit = (e) => {
    e.preventDefault();
    if (!newAssetForm.name.trim() || !newAssetForm.valuation.trim()) return;

    const newAsset = {
      id: `AST-${Date.now()}`,
      name: newAssetForm.name,
      type: newAssetForm.type,
      valuation: newAssetForm.valuation,
      status: newAssetForm.status,
      ltv: newAssetForm.ltv,
      dossier: newAssetForm.dossier || 'Dossier padrão HBU em elaboração.',
      documents: ['Laudo_Avaliacao_Oficial.pdf', 'Matriçula_Imovel.pdf']
    };

    setAssets(prev => [newAsset, ...prev]);
    setShowAddAssetModal(false);
    setNewAssetForm({ name: '', type: 'Imóvel Rural (HBU)', valuation: '', status: 'Regularizado', ltv: '50%', dossier: '' });
    setLastSync(new Date().toLocaleTimeString());
  };

  const styles = {
    bgDark: { backgroundColor: '#090d16', minHeight: '100vh', color: '#f1f5f9', fontFamily: 'system-ui, -apple-system, sans-serif' },
    cardDark: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem' },
    inputDark: { backgroundColor: '#020617', border: '1px solid #334155', color: '#ffffff', borderRadius: '0.75rem', padding: '0.75rem 1rem', width: '100%', outline: 'none' },
    buttonPrimary: { backgroundColor: '#2563eb', color: '#ffffff', fontWeight: 'bold', borderRadius: '0.75rem', padding: '0.75rem 1rem', width: '100%', cursor: 'pointer', border: 'none' },
    buttonGreen: { backgroundColor: '#059669', color: '#ffffff', fontWeight: 'bold', borderRadius: '0.75rem', padding: '0.6rem 1rem', cursor: 'pointer', border: 'none' },
    buttonIndigo: { backgroundColor: '#4f46e5', color: '#ffffff', fontWeight: 'bold', borderRadius: '0.5rem', padding: '0.4rem 0.8rem', cursor: 'pointer', border: 'none' }
  };

  if (!currentUser) {
    return (
      <div style={{ ...styles.bgDark, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ ...styles.cardDark, width: '100%', maxWidth: '420px', margin: 'auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'inline-block', padding: '0.75rem', backgroundColor: 'rgba(37,99,235,0.1)', color: '#60a5fa', borderRadius: '1rem', marginBottom: '0.5rem' }}>
              <DollarSign style={{ width: '40px', height: '40px' }} />
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>PMI Fundraising Portal</h1>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>Captação de Recursos & TME Prototype Management</p>
          </div>

          {authError && (
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(153,27,27,0.4)', border: '1px solid #991b1b', color: '#fca5a5', fontSize: '0.75rem', borderRadius: '0.75rem', marginBottom: '1rem' }}>
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.35rem' }}>Identificação de Usuário</label>
              <select
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                style={styles.inputDark}
                required
              >
                <option value="">-- Selecione sua Conta --</option>
                <option value="gestor1">Luiz Marcelo (Gestor 1)</option>
                <option value="gestor2">Shoichiro Mitsui (Gestor 2)</option>
                <option value="admin">Administrador Máster</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.35rem' }}>Senha da Conta</label>
              <input
                type="password"
                placeholder="Digite a senha..."
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                style={styles.inputDark}
                required
              />
            </div>

            <button type="submit" style={styles.buttonPrimary}>
              Autenticar e Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.bgDark}>
      <header style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', padding: '1rem 1.5rem', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: 'rgba(5,150,105,0.1)', color: '#34d399', borderRadius: '0.75rem' }}>
              <DollarSign style={{ width: '24px', height: '24px' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h1 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>PMI Fundraising & TME Portal</h1>
                <span style={{ fontSize: '0.65rem', fontWeight: 'bold', backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #0284c7', padding: '0.1rem 0.5rem', borderRadius: '1rem' }}>
                  {currentUser.name}
                </span>
              </div>
              <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: 0 }}>
                Meta Global: Captação R$ 250M | Sincronizado: <span style={{ color: '#34d399', fontWeight: 600 }}>{lastSync}</span>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {currentUser.role === 'admin' && (
              <button
                onClick={() => {
                  setShowPasswordModal(true);
                  setPwdError('');
                  setPwdSuccess('');
                }}
                style={styles.buttonIndigo}
              >
                Gerenciar Senhas
              </button>
            )}

            <button
              onClick={handleLogout}
              style={{ backgroundColor: '#1e293b', color: '#cbd5e1', fontSize: '0.75rem', fontWeight: 600, padding: '0.4rem 0.8rem', borderRadius: '0.5rem', border: '1px solid #334155', cursor: 'pointer' }}
            >
              Sair
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {[
            { id: 'TAB-FUNDRAISING', label: 'Dashboard de Captação' },
            { id: 'TAB-GANTT', label: 'Cronograma Gantt' },
            { id: 'TAB-TME', label: 'Protótipo TME & P&D' },
            { id: 'TAB-HBU', label: 'Estudos HBU & Bancabilidade' },
            { id: 'TAB-ASSETS', label: 'Repositório de Garantias' },
            { id: 'TAB-DAILY-OPERATIONS', label: 'Operação Diária & Logs' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                borderRadius: '0.5rem 0.5rem 0 0',
                border: '1px solid #1e293b',
                backgroundColor: activeTabId === tab.id ? '#090d16' : '#0f172a',
                color: activeTabId === tab.id ? '#34d399' : '#94a3b8',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
{activeTabId === 'TAB-SCHEDULE' && <ScheduleTab />}
        {activeTabId === 'TAB-FUNDRAISING' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={styles.cardDark}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>
                    Painel Executivo de Captação de Recursos (Fundraising)
                  </h2>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                    Acompanhamento da meta global de investimento, roadshow internacional e captação R$ 250M.
                  </p>
                </div>
                <div style={{ backgroundColor: 'rgba(5,150,105,0.1)', border: '1px solid #059669', padding: '0.5rem 1rem', borderRadius: '0.75rem', textAlign: 'right' }}>
                  <span style={{ fontSize: '0.65rem', color: '#34d399', display: 'block', fontWeight: 'bold' }}>Meta Alvo Global</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#ffffff' }}>R$ 250.000.000</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                <div style={{ backgroundColor: '#020617', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Pipeline de Investidores</span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff', margin: '0.5rem 0' }}>15 Fundos Tier-1</h3>
                  <p style={{ fontSize: '0.7rem', color: '#34d399', margin: 0 }}>Roadshow Brasil & EUA em estruturação</p>
                </div>
                <div style={{ backgroundColor: '#020617', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Garantias Validadas (HBU)</span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff', margin: '0.5rem 0' }}>R$ 63.500.000</h3>
                  <p style={{ fontSize: '0.7rem', color: '#60a5fa', margin: 0 }}>Colateral imobiliário pronto para dívida</p>
                </div>
                <div style={{ backgroundColor: '#020617', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Status do Protótipo TME</span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff', margin: '0.5rem 0' }}>30% Concluído</h3>
                  <p style={{ fontSize: '0.7rem', color: '#fcd34d', margin: 0 }}>Patentes INPI & protótipo 330 kVA</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTabId === 'TAB-GANTT' && (
          <div style={styles.cardDark}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Calendar style={{ color: '#38bdf8', width: '28px', height: '28px' }} />
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>
                  Gráfico de Gantt - Cronograma Mestre de Captação & Implantação
                </h2>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                  Visualização temporal por fases (Pré-marketing, Roadshow, Term Sheet, P&D e Closing).
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {projects.map(proj => (
                <div key={proj.id} style={{ backgroundColor: '#020617', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
                  <h3 style={{ fontSize: '0.9rem', color: '#34d399', marginBottom: '0.75rem' }}>{proj.name}</h3>
                  {proj.activities.map(act => (
                    <div key={act.id} style={{ marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                        <span>{act.code} - {act.name}</span>
                        <span style={{ color: '#60a5fa' }}>Peso: {act.weight}%</span>
                      </div>
                      <div style={{ width: '100%', backgroundColor: '#1e293b', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${act.subactivities.reduce((acc, sub) => acc + sub.progress, 0) / (act.subactivities.length || 1)}%`,
                          backgroundColor: '#2563eb',
                          height: '100%',
                          borderRadius: '5px'
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTabId === 'TAB-TME' && (
          <div style={styles.cardDark}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Zap style={{ color: '#f59e0b', width: '28px', height: '28px' }} />
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>
                  Pasta de Desenvolvimento & Prototipagem TME
                </h2>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                  Tecnologia Magnética de Energia - Da bancada ao piloto industrial de 330 kVA.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ backgroundColor: '#020617', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
                <h4 style={{ color: '#60a5fa', margin: '0 0 0.5rem 0' }}>Fase 1: Propriedade Intelectual (INPI)</h4>
                <p style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: '1.4' }}>
                  Redação de patentes, especificações de materiais ferromagnéticos e registro de topologia de núcleos magnéticos.
                </p>
                <span style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.7rem', fontWeight: 'bold', color: '#34d399', backgroundColor: 'rgba(5,150,105,0.1)', padding: '0.2rem 0.5rem', borderRadius: '0.25rem' }}>
                  Progresso: 90%
                </span>
              </div>

              <div style={{ backgroundColor: '#020617', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
                <h4 style={{ color: '#60a5fa', margin: '0 0 0.5rem 0' }}>Fase 2: Protótipo Industrial (330 kVA)</h4>
                <p style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: '1.4' }}>
                  Fabricação de bobinas de alta precisão, montagem do banco de capacitores de ressonância e testes de bancada.
                </p>
                <span style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.7rem', fontWeight: 'bold', color: '#fcd34d', backgroundColor: 'rgba(245,158,11,0.1)', padding: '0.2rem 0.5rem', borderRadius: '0.25rem' }}>
                  Progresso: 35% (Em Andamento)
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTabId === 'TAB-HBU' && (
          <div style={styles.cardDark}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Compass style={{ color: '#38bdf8', width: '28px', height: '28px' }} />
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>
                  Estudos HBU (Highest and Best Use) & Bancabilidade
                </h2>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                  Dossier completo de valorização de ativos e documentação de garantia para comitês de crédito.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
              {assets.map(asset => (
                <div key={asset.id} style={{ backgroundColor: '#020617', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1rem', color: '#ffffff', margin: 0 }}>{asset.name}</h3>
                    <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 'bold', backgroundColor: 'rgba(5,150,105,0.1)', padding: '0.2rem 0.6rem', borderRadius: '0.5rem' }}>
                      Valuation: {asset.valuation} (LTV {asset.ltv})
                    </span>
                  </div>

                  <p style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: '1.5', marginBottom: '1rem' }}>
                    <strong>Análise de Bancabilidade HBU:</strong> {asset.dossier}
                  </p>

                  <div style={{ borderTop: '1px solid #1e293b', paddingTop: '0.75rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>
                      Documentação Oficial Anexada para Due Diligence Bancária:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {asset.documents && asset.documents.map((doc, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.35rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.7rem', color: '#38bdf8' }}>
                          <FileText style={{ width: '14px', height: '14px' }} />
                          <span>{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTabId === 'TAB-ASSETS' && (
          <div style={styles.cardDark}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>
                  Repositório de Garantias & Ativos
                </h2>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                  Gestão dos colaterais imobiliários para suporte à captação de dívida.
                </p>
              </div>
              <button
                onClick={() => setShowAddAssetModal(true)}
                style={{ backgroundColor: '#059669', color: '#ffffff', fontSize: '0.75rem', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Plus style={{ width: '16px', height: '16px' }} /> Cadastrar Novo Ativo
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {assets.map(asset => (
                <div key={asset.id} style={{ backgroundColor: '#020617', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
                  <h4 style={{ color: '#ffffff', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>{asset.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.2rem 0' }}>Tipo: {asset.type}</p>
                  <p style={{ fontSize: '0.75rem', color: '#34d399', margin: '0.2rem 0', fontWeight: 'bold' }}>Valuation: {asset.valuation}</p>
                  <p style={{ fontSize: '0.75rem', color: '#60a5fa', margin: '0.2rem 0' }}>Status: {asset.status} (LTV: {asset.ltv})</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTabId === 'TAB-DAILY-OPERATIONS' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            <div style={styles.cardDark}>
              <h2 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#ffffff', marginTop: 0, marginBottom: '1rem' }}>
                Registro Diário de Captação & P&D
              </h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!newLogContent.trim()) return;
                const newLog = {
                  id: `log-${Date.now()}`,
                  date: new Date().toLocaleString(),
                  project: 'Geral',
                  author: currentUser.name,
                  content: newLogContent
                };
                setDailyLogs([newLog, ...dailyLogs]);
                setNewLogContent('');
                setLastSync(new Date().toLocaleTimeString());
              }} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <textarea
                  placeholder={`Digite a ocorrência como ${currentUser.name}...`}
                  value={newLogContent}
                  onChange={(e) => setNewLogContent(e.target.value)}
                  style={{ ...styles.inputDark, height: '90px', resize: 'vertical' }}
                  required
                />
                <button type="submit" style={styles.buttonGreen}>
                  Registrar Ocorrência
                </button>
              </form>

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '350px', overflowY: 'auto' }}>
                {dailyLogs.map(log => (
                  <div key={log.id} style={{ padding: '0.75rem', backgroundColor: '#020617', borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 'bold', color: '#34d399' }}>{log.author}</span>
                      <span>{log.date}</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#e2e8f0', margin: 0, lineHeight: '1.4' }}>{log.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.cardDark}>
              <h2 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#ffffff', marginTop: 0, marginBottom: '1rem' }}>
                Checklist Compartilhado de Fundraisers
              </h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!newTodoTask.trim()) return;
                const newTodo = {
                  id: `todo-${Date.now()}`,
                  task: newTodoTask,
                  author: currentUser.name,
                  priority: 'Média',
                  done: false,
                  date: new Date().toISOString().split('T')[0]
                };
                setDailyTodos([newTodo, ...dailyTodos]);
                setNewTodoTask('');
                setLastSync(new Date().toLocaleTimeString());
              }} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Nova tarefa de captação..."
                  value={newTodoTask}
                  onChange={(e) => setNewTodoTask(e.target.value)}
                  style={{ ...styles.inputDark, padding: '0.6rem 0.8rem' }}
                  required
                />
                <button type="submit" style={{ ...styles.buttonPrimary, width: 'auto', padding: '0.6rem 1rem' }}>
                  Adicionar
                </button>
              </form>

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '350px', overflowY: 'auto' }}>
                {dailyTodos.map(todo => (
                  <div key={todo.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#020617', borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <input
                        type="checkbox"
                        checked={todo.done}
                        onChange={() => {
                          setDailyTodos(prev => prev.map(t => t.id === todo.id ? { ...t, done: !t.done } : t));
                          setLastSync(new Date().toLocaleTimeString());
                        }}
                        style={{ cursor: 'pointer' }}
                      />
                      <div>
                        <span style={{ fontSize: '0.75rem', color: todo.done ? '#64748b' : '#f1f5f9', textDecoration: todo.done ? 'line-through' : 'none', display: 'block' }}>
                          {todo.task}
                        </span>
                        <span style={{ fontSize: '0.65rem', color: '#64748b' }}>Criado por: {todo.author}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {showAddAssetModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', zIndex: 50 }}>
          <div style={{ ...styles.cardDark, width: '100%', maxWidth: '450px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>
                Cadastrar Novo Ativo HBU & Garantia
              </h3>
              <button onClick={() => setShowAddAssetModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }}>
                ✕
              </button>
            </div>

            <form onSubmit={handleAddAssetSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.25rem' }}>Nome do Ativo / Matrícula</label>
                <input
                  type="text"
                  placeholder="Ex: Fazenda Santa Clara (Matrícula 9.102)"
                  value={newAssetForm.name}
                  onChange={(e) => setNewAssetForm({ ...newAssetForm, name: e.target.value })}
                  style={styles.inputDark}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.25rem' }}>Tipo de Ativo</label>
                <input
                  type="text"
                  placeholder="Ex: Imóvel Rural / Industrial"
                  value={newAssetForm.type}
                  onChange={(e) => setNewAssetForm({ ...newAssetForm, type: e.target.value })}
                  style={styles.inputDark}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.25rem' }}>Valuation (R$)</label>
                <input
                  type="text"
                  placeholder="Ex: R$ 30.000.000"
                  value={newAssetForm.valuation}
                  onChange={(e) => setNewAssetForm({ ...newAssetForm, valuation: e.target.value })}
                  style={styles.inputDark}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.25rem' }}>Análise HBU & Bancabilidade</label>
                <textarea
                  placeholder="Resumo do laudo ABNT e viabilidade como colateral..."
                  value={newAssetForm.dossier}
                  onChange={(e) => setNewAssetForm({ ...newAssetForm, dossier: e.target.value })}
                  style={{ ...styles.inputDark, height: '70px', resize: 'vertical' }}
                  required
                />
              </div>

              <button type="submit" style={styles.buttonGreen}>
                Salvar Ativo no Dossier
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
