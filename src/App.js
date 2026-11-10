import InputTab from './InputTab';
import ScheduleTab from './ScheduleTab';
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

const initialProjectsData = [
  {
    id: 'PRJ-FASE-1',
    name: 'Fase 1: Mapeamento e Estruturação Financeira & Captação baseado em Imóveis',
    code: 'FASE-01',
    manager: 'Luiz Marcelo / Shoichiro Mitsui',
    targetDate: '2027-12-31',
    description: 'Valuation HBU, due diligence documental e estruturação de garantias imobiliárias para suporte à captação.',
    scopeLogs: [
      { date: '11/11/2026', author: 'Shoichiro Mitsui', action: 'Início Simultâneo', description: 'Ativação da Fase 1 em paralelo com Fases 2 e 3.' }
    ],
    activities: [
      {
        id: 'ACT-1.1',
        code: '1.0',
        name: 'Due Diligence & Certidões de Bancabilidade (Imóveis)',
        weight: 50,
        subactivities: [
          {
            id: 'SUB-1.1.1',
            code: '1.1',
            name: 'Revisão de Matrículas, Ônus Reais e Laudos ABNT NBR 14653',
            owner: 'Jurídico / Advisory',
            startDate: '2026-11-11',
            endDate: '2027-01-30',
            progress: 60,
            status: 'Em Andamento',
            history: [{ date: '11/11/2026', note: 'Matrículas de Porto Velho e Pres. Figueiredo reunidas.' }],
            files: ['Laudo_ABNT_Consolidado.pdf']
          }
        ]
      },
      {
        id: 'ACT-1.2',
        code: '2.0',
        name: 'Roadshow de Captação Garantida (Debt/Equity)',
        weight: 50,
        subactivities: [
          {
            id: 'SUB-1.2.1',
            code: '2.1',
            name: 'Apresentação de Colaterais a Bancos e Fundos de Dívida',
            owner: 'Luiz Marcelo',
            startDate: '2026-11-11',
            endDate: '2027-04-30',
            progress: 20,
            status: 'Planejado',
            history: [{ date: '11/11/2026', note: 'Preparação de One-Pagers de garantias.' }],
            files: []
          }
        ]
      }
    ]
  },
  {
    id: 'PRJ-FASE-2',
    name: 'Fase 2: Viabilidade, Estruturação Financeira & Captação (Fazenda Solar sem TME)',
    code: 'FASE-02',
    manager: 'Shoichiro Mitsui',
    targetDate: '2027-12-31',
    description: 'Modelagem financeira padrão, CAPEX/OPEX e captação para Usina Solar 60 MWp convencionais.',
    scopeLogs: [],
    activities: [
      {
        id: 'ACT-2.1',
        code: '1.0',
        name: 'Estudo de Viabilidade & DCF (Sem TME)',
        weight: 50,
        subactivities: [
          {
            id: 'SUB-2.1.1',
            code: '1.1',
            name: 'Elaboração do Financial Model DCF Padrão (Solar 60 MWp)',
            owner: 'Shoichiro Mitsui',
            startDate: '2026-11-11',
            endDate: '2027-02-28',
            progress: 40,
            status: 'Em Andamento',
            history: [{ date: '11/11/2026', note: 'Premissas de tarifa de energia injetadas.' }],
            files: ['DCF_Solar_Sem_TME.xlsx']
          }
        ]
      }
    ]
  },
  {
    id: 'PRJ-FASE-3',
    name: 'Fase 3: Viabilidade, Estruturação Financeira & Captação (Fazenda Solar com TME)',
    code: 'FASE-03',
    manager: 'Shoichiro Mitsui / Luiz Marcelo',
    targetDate: '2027-12-31',
    description: 'Modelagem avançada com ganho de eficiência do Booster Magnético TME, patentes INPI e protótipo 330 kVA.',
    scopeLogs: [],
    activities: [
      {
        id: 'ACT-3.1',
        code: '1.0',
        name: 'Viabilidade Tecnológica & Booster TME',
        weight: 50,
        subactivities: [
          {
            id: 'SUB-3.1.1',
            code: '1.1',
            name: 'Simulação de Incremento de ROI/TIR com Tecnologia TME',
            owner: 'P&D / Shoichiro Mitsui',
            startDate: '2026-11-11',
            endDate: '2027-03-30',
            progress: 50,
            status: 'Em Andamento',
            history: [{ date: '11/11/2026', note: 'Integração de patentes INPI no modelo.' }],
            files: ['DCF_Solar_Com_TME.xlsx']
          }
        ]
      }
    ]
  }
];

const initialFundsData = [
  { id: 'FND-1', name: 'Vinci Partners - Green Infra', type: 'Private Equity / Infra', status: 'Reunião Agendada', amount: 'R$ 50.000.000', owner: 'Luiz Marcelo', lastContact: '2026-11-08' },
  { id: 'FND-2', name: 'Patria Investimentos', type: 'Fundo Infraestrutura', status: 'Teaser Enviado', amount: 'R$ 75.000.000', owner: 'Shoichiro Mitsui', lastContact: '2026-11-07' }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('pmi_active_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [globalData, setGlobalData] = useState(() => {
    const saved = localStorage.getItem('pmi_global_data_unified');
    return saved ? JSON.parse(saved) : {
      config: { startDate: '2026-11-11', structuringDays: 75, fundraisingDays: 90, useTME: true },
      assets: [
        {
          id: 1,
          name: 'Terreno Lote 07 (Khuark Construtora)',
          type: 'Imóvel Rural (HBU - Fase 1)',
          valuation: 'R$ 15.000.000',
          ha: 128.82,
          mat: '103.712',
          loc: 'Porto Velho/RO',
          ptam: 0,
          ltv: '50%',
          status: 'Em Due Diligence',
          isSolar: false,
          isCollateral: true,
          dossier: 'Laudo de Avaliação ABNT NBR 14653 emitido para suporte à Fase 1.',
          requiredDocuments: [
            { id: 'doc-1', name: 'Matrícula Atualizada (Ônus Reais)', status: 'Entregue', file: 'Matricula_103712.pdf', aiAudit: 'Sem ônus gravosos aparentes. Aprovado.' },
            { id: 'doc-2', name: 'Laudo de Avaliação NBR 14653', status: 'Entregue', file: 'Laudo_ABNT_Lote07.pdf', aiAudit: 'Valuation validado.' }
          ]
        }
      ]
    };
  });
  
  const [userCredentials, setUserCredentials] = useState(() => {
    const saved = localStorage.getItem('pmi_user_credentials');
    return saved ? JSON.parse(saved) : {
      'gestor1': { name: 'Luiz Marcelo (Gestor 1)', pwd: 'user101', role: 'gestor' },
      'gestor2': { name: 'Shoichiro Mitsui (Gestor 2)', pwd: 'user202', role: 'gestor' },
      'admin': { name: 'Administrador Máster', pwd: 'admin123', role: 'admin' }
    };
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('pmi_dashboard_projects');
    return saved ? JSON.parse(saved) : initialProjectsData;
  });

  const [fundsPipeline, setFundsPipeline] = useState(() => {
    const saved = localStorage.getItem('pmi_funds_pipeline');
    return saved ? JSON.parse(saved) : initialFundsData;
  });

  const [showAddFundModal, setShowAddFundModal] = useState(false);
  const [newFundForm, setNewFundForm] = useState({ name: '', type: 'Private Equity / Infra', status: 'Em Contato', amount: '', owner: 'Luiz Marcelo' });

  const [activeTabId, setActiveTabId] = useState(() => {
    return localStorage.getItem('pmi_active_tab_id') || 'TAB-INPUT';
  });

  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());
  const [aiAnalyzingId, setAiAnalyzingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('pmi_global_data_unified', JSON.stringify(globalData));
  }, [globalData]);

  useEffect(() => {
    localStorage.setItem('pmi_funds_pipeline', JSON.stringify(fundsPipeline));
  }, [fundsPipeline]);

  useEffect(() => {
    localStorage.setItem('pmi_dashboard_projects', JSON.stringify(projects));
  }, [projects]);

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
    } else {
      setAuthError('Usuário ou senha inválidos.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('pmi_active_user');
  };

  const handleFileUpload = (assetId, docId, file) => {
    if (!file) return;
    setGlobalData(prev => ({
      ...prev,
      assets: prev.assets.map(a => {
        if (a.id === assetId) {
          return {
            ...a,
            requiredDocuments: a.requiredDocuments.map(d => d.id === docId ? { ...d, file: file.name, status: 'Em Análise', aiAudit: 'Arquivo carregado. Pronto para auditoria de IA.' } : d)
          };
        }
        return a;
      })
    }));
    setLastSync(new Date().toLocaleTimeString());
  };

  const handleRunAiAudit = (assetId, docId, docName) => {
    setAiAnalyzingId(`${assetId}-${docId}`);
    setTimeout(() => {
      const auditResult = `[IA Audit OK] ${docName}: Nenhuma restrição ou ônus prejudicial detectado. Apto para comitê de crédito nas Fases 1, 2 e 3.`;
      setGlobalData(prev => ({
        ...prev,
        assets: prev.assets.map(a => {
          if (a.id === assetId) {
            return {
              ...a,
              requiredDocuments: a.requiredDocuments.map(d => d.id === docId ? { ...d, status: 'Entregue', aiAudit: auditResult } : d)
            };
          }
          return a;
        })
      }));
      setAiAnalyzingId(null);
      setLastSync(new Date().toLocaleTimeString());
    }, 2000);
  };

  const calculateTotalPipeline = () => {
    let total = 0;
    fundsPipeline.forEach(f => {
      const num = parseFloat(f.amount.replace(/[^0-9,-]/g, '').replace(',', '.'));
      if (!isNaN(num)) total += num;
    });
    return total > 0 ? `R$ ${(total).toLocaleString('pt-BR')}` : 'R$ 250.000.000';
  };

  const calculateTotalValuation = () => {
    let total = 0;
    globalData.assets.forEach(a => {
      const num = parseFloat(a.valuation.replace(/[^0-9,-]/g, '').replace(',', '.'));
      if (!isNaN(num)) total += num;
    });
    return total > 0 ? `R$ ${(total).toLocaleString('pt-BR')}` : 'R$ 63.500.000';
  };

  const styles = {
    bgDark: { backgroundColor: '#090d16', minHeight: '100vh', color: '#f1f5f9', fontFamily: 'system-ui, -apple-system, sans-serif' },
    cardDark: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem' },
    inputDark: { backgroundColor: '#020617', border: '1px solid #334155', color: '#ffffff', borderRadius: '0.75rem', padding: '0.75rem 1rem', width: '100%', outline: 'none' },
    buttonPrimary: { backgroundColor: '#2563eb', color: '#ffffff', fontWeight: 'bold', borderRadius: '0.75rem', padding: '0.75rem 1rem', width: '100%', cursor: 'pointer', border: 'none' },
    buttonGreen: { backgroundColor: '#059669', color: '#ffffff', fontWeight: 'bold', borderRadius: '0.6rem', padding: '0.6rem 1rem', cursor: 'pointer', border: 'none' },
    buttonAi: { backgroundColor: '#7c3aed', color: '#ffffff', fontWeight: 'bold', borderRadius: '0.5rem', padding: '0.35rem 0.75rem', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem' }
  };

  if (!currentUser) {
    return (
      <div style={{ ...styles.bgDark, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ ...styles.cardDark, width: '100%', maxWidth: '420px', margin: 'auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>PMI Fundraising Portal</h1>
          </div>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.35rem' }}>Identificação de Usuário</label>
              <select value={inputUsername} onChange={(e) => setInputUsername(e.target.value)} style={styles.inputDark} required>
                <option value="">-- Selecione sua Conta --</option>
                <option value="gestor1">Luiz Marcelo (Gestor 1)</option>
                <option value="gestor2">Shoichiro Mitsui (Gestor 2)</option>
                <option value="admin">Administrador Máster</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.35rem' }}>Senha da Conta</label>
              <input type="password" placeholder="Digite a senha..." value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} style={styles.inputDark} required />
            </div>
            <button type="submit" style={styles.buttonPrimary}>Autenticar e Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.bgDark}>
      <header style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', padding: '1rem 1.5rem', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>PMI Fundraising & TME Portal (Fases 1, 2 e 3)</h1>
            <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: 0 }}>Valuation Garantias: <span style={{ color: '#34d399', fontWeight: 'bold' }}>{calculateTotalValuation()}</span> | Pipeline Captação: <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>{calculateTotalPipeline()}</span></p>
          </div>
          <button onClick={handleLogout} style={{ backgroundColor: '#1e293b', color: '#cbd5e1', fontSize: '0.75rem', fontWeight: 600, padding: '0.4rem 0.8rem', borderRadius: '0.5rem', border: '1px solid #334155', cursor: 'pointer' }}>Sair</button>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {[
            { id: 'TAB-INPUT', label: '📥 Input & Premissas Globais' },
            { id: 'TAB-SCHEDULE', label: 'Cronograma Integrado (Fases 1, 2 e 3)' },
            { id: 'TAB-FUNDRAISING', label: 'Dashboard de Captação' },
            { id: 'TAB-HBU', label: 'Estudos HBU & Bancabilidade' },
            { id: 'TAB-ASSETS', label: 'Repositório de Garantias' }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTabId(tab.id)} style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '0.5rem 0.5rem 0 0', border: '1px solid #1e293b', backgroundColor: activeTabId === tab.id ? '#090d16' : '#0f172a', color: activeTabId === tab.id ? '#34d399' : '#94a3b8', cursor: 'pointer' }}>
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        {activeTabId === 'TAB-INPUT' && <InputTab globalData={globalData} setGlobalData={setGlobalData} />}
        
        {activeTabId === 'TAB-SCHEDULE' && <ScheduleTab globalData={globalData} setGlobalData={setGlobalData} />}

        {activeTabId === 'TAB-FUNDRAISING' && (
          <div style={styles.cardDark}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Funil de Captação (Fases 1, 2 & 3)</h2>
              <button onClick={() => setShowAddFundModal(true)} style={styles.buttonGreen}>Adicionar Fundo</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
                  <th style={{ padding: '0.75rem' }}>Fundo / Investidor</th>
                  <th style={{ padding: '0.75rem' }}>Tipo</th>
                  <th style={{ padding: '0.75rem' }}>Valor Alvo</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {fundsPipeline.map(fund => (
                  <tr key={fund.id} style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '0.75rem', color: '#ffffff', fontWeight: 'bold' }}>{fund.name}</td>
                    <td style={{ padding: '0.75rem', color: '#cbd5e1' }}>{fund.type}</td>
                    <td style={{ padding: '0.75rem', color: '#34d399', fontWeight: 'bold' }}>{fund.amount}</td>
                    <td style={{ padding: '0.75rem', color: '#60a5fa' }}>{fund.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTabId === 'TAB-HBU' && (
          <div style={styles.cardDark}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Compass style={{ color: '#38bdf8', width: '28px', height: '28px' }} />
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Estudos HBU & Bancabilidade (Fase 1)</h2>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>Checklist documental integrado com auditoria de restrições por IA.</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
              {globalData.assets.map(asset => (
                <div key={asset.id} style={{ backgroundColor: '#020617', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1rem', color: '#ffffff', margin: 0 }}>{asset.name}</h3>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Matrícula: {asset.mat} | {asset.loc} | {asset.ha} ha</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 'bold', backgroundColor: 'rgba(5,150,105,0.1)', padding: '0.2rem 0.6rem', borderRadius: '0.5rem' }}>
                      Valuation: {asset.valuation} (LTV {asset.ltv})
                    </span>
                  </div>

                  <p style={{ fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '1rem' }}><strong>Análise HBU:</strong> {asset.dossier}</p>

                  <div style={{ borderTop: '1px solid #1e293b', paddingTop: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#38bdf8', display: 'block', marginBottom: '0.5rem' }}>
                      Checklist de Bancabilidade & Auditoria de IA para Restrições:
                    </span>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {asset.requiredDocuments?.map(doc => (
                        <div key={doc.id} style={{ backgroundColor: '#0f172a', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #1e293b' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <FileText style={{ width: '14px', height: '14px', color: '#38bdf8' }} />
                              <span style={{ fontSize: '0.75rem', color: '#ffffff', fontWeight: 'bold' }}>{doc.name}</span>
                              {doc.file && <span style={{ fontSize: '0.7rem', color: '#34d399' }}>({doc.file})</span>}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <input
                                type="file"
                                id={`file-up-${asset.id}-${doc.id}`}
                                style={{ display: 'none' }}
                                onChange={(e) => handleFileUpload(asset.id, doc.id, e.target.files[0])}
                              />
                              <label htmlFor={`file-up-${asset.id}-${doc.id}`} style={{ backgroundColor: '#1e293b', color: '#cbd5e1', fontSize: '0.7rem', padding: '0.35rem 0.6rem', borderRadius: '0.375rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Upload style={{ width: '12px', height: '12px' }} /> Anexar Doc
                              </label>

                              <button
                                onClick={() => handleRunAiAudit(asset.id, doc.id, doc.name)}
                                style={styles.buttonAi}
                                disabled={aiAnalyzingId === `${asset.id}-${doc.id}`}
                              >
                                <Sparkles style={{ width: '12px', height: '12px' }} />
                                {aiAnalyzingId === `${asset.id}-${doc.id}` ? 'Analisando...' : 'Auditar via IA'}
                              </button>
                            </div>
                          </div>

                          {doc.aiAudit && (
                            <div style={{ marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#020617', borderRadius: '0.375rem', border: '1px solid #334155', fontSize: '0.7rem', color: doc.aiAudit.includes('Alerta') ? '#fca5a5' : '#86efac' }}>
                              <strong>Parecer IA:</strong> {doc.aiAudit}
                            </div>
                          )}
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
                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Repositório de Garantias & Ativos (Fase 1)</h2>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>Ativos imobiliários sincronizados para suporte às Fases 1, 2 e 3.</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {globalData.assets.map(asset => (
                <div key={asset.id} style={{ backgroundColor: '#020617', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
                  <h4 style={{ color: '#ffffff', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>{asset.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.2rem 0' }}>Tipo: {asset.type} | Mat: {asset.mat}</p>
                  <p style={{ fontSize: '0.75rem', color: '#34d399', margin: '0.2rem 0', fontWeight: 'bold' }}>Valuation: {asset.valuation}</p>
                  <p style={{ fontSize: '0.75rem', color: '#60a5fa', margin: '0.2rem 0' }}>Local: {asset.loc} ({asset.ha} ha)</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
