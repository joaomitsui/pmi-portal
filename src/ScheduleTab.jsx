import React, { useState } from 'react';
import { Calendar, ChevronRight, ChevronDown, Plus, Trash2, Edit2, Save, X } from 'lucide-react';

const initialActivities = [
  {
    id: 1,
    name: "Fase 1: Mapeamento e Protótipo TME",
    startDate: "2026-11-01",
    endDate: "2026-11-30",
    execStartDate: "2026-11-02",
    execEndDate: "2026-11-28",
    expanded: true,
    subactivities: [
      { id: 101, name: "Diagnóstico HBU Real Estate", startDate: "2026-11-01", endDate: "2026-11-15", execStartDate: "2026-11-02", execEndDate: "2026-11-14" },
      { id: 102, name: "Detalhamento de CAPEX do Protótipo", startDate: "2026-11-16", endDate: "2026-11-30", execStartDate: "2026-11-15", execEndDate: "2026-11-28" }
    ]
  },
  {
    id: 2,
    name: "Fase 2: Estruturação Financeira & Captação",
    startDate: "2026-12-01",
    endDate: "2027-01-31",
    execStartDate: "2026-12-05",
    execEndDate: "",
    expanded: false,
    subactivities: [
      { id: 201, name: "Modelagem DCF e Simulação de Sensibilidade", startDate: "2026-12-01", endDate: "2026-12-20", execStartDate: "2026-12-05", execEndDate: "" },
      { id: 202, name: "Elaboração do Investment Package", startDate: "2026-12-21", endDate: "2027-01-31", execStartDate: "", execEndDate: "" }
    ]
  }
];

export default function ScheduleTab() {
  const [activities, setActivities] = useState(initialActivities);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Alternar expansão de subatividades
  const toggleExpand = (id) => {
    setActivities(activities.map(act => act.id === id ? { ...act, expanded: !act.expanded } : act));
  };

  // Iniciar edição
  const startEdit = (item, isSub = false, parentId = null) => {
    setEditingId(item.id);
    setEditForm({ ...item, isSub, parentId });
  };

  // Salvar edição
  const saveEdit = () => {
    if (editForm.isSub) {
      setActivities(activities.map(act => {
        if (act.id === editForm.parentId) {
          const updatedSubs = act.subactivities.map(sub => sub.id === editForm.id ? { ...sub, ...editForm } : sub);
          return { ...act, subactivities: updatedSubs };
        }
        return act;
      }));
    } else {
      setActivities(activities.map(act => act.id === editForm.id ? { ...act, ...editForm } : act));
    }
    setEditingId(null);
  };

  // Adicionar nova atividade principal
  const addActivity = () => {
    const newAct = {
      id: Date.now(),
      name: "Nova Atividade Estratégica",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      execStartDate: "",
      execEndDate: "",
      expanded: false,
      subactivities: []
    };
    setActivities([...activities, newAct]);
  };

  // Adicionar subatividade
  const addSubactivity = (parentId) => {
    const newSub = {
      id: Date.now(),
      name: "Nova Subatividade",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 15*24*60*60*1000).toISOString().split('T')[0],
      execStartDate: "",
      execEndDate: ""
    };
    setActivities(activities.map(act => {
      if (act.id === parentId) {
        return { ...act, expanded: true, subactivities: [...act.subactivities, newSub] };
      }
      return act;
    }));
  };

  // Excluir item
  const deleteItem = (id, isSub = false, parentId = null) => {
    if (isSub) {
      setActivities(activities.map(act => {
        if (act.id === parentId) {
          return { ...act, subactivities: act.subactivities.filter(sub => sub.id !== id) };
        }
        return act;
      }));
    } else {
      setActivities(activities.filter(act => act.id !== id));
    }
  };

  // Cálculo das datas globais do projeto
  const globalStartDate = activities.reduce((min, a) => a.startDate < min ? a.startDate : min, activities[0]?.startDate || '');
  const globalEndDate = activities.reduce((max, a) => a.endDate > max ? a.endDate : max, activities[0]?.endDate || '');

  return (
    <div style={{ padding: '24px', backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      {/* HEADER & DATAS GLOBAIS DO PROJETO */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>DATA ATUAL</span>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', marginTop: '4px' }}>
            {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </div>
        </div>

        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>INÍCIO E FIM PREVISTO GLOBAL</span>
          <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#f8fafc', marginTop: '4px' }}>
            {globalStartDate || '--'} → {globalEndDate || '--'}
          </div>
        </div>

        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>INÍCIO E FIM EXECUTADO GLOBAL</span>
          <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#4ade80', marginTop: '4px' }}>
            2026-11-02 → Em Andamento
          </div>
        </div>
      </div>

      {/* PAINEL PRINCIPAL DE CRONOGRAMA COM EDICAO */}
      <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '20px', border: '1px solid #334155' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar color="#38bdf8" size={20} />
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Cronograma Integrado de Atividades</h2>
          </div>
          <button 
            onClick={addActivity}
            style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}
          >
            <Plus size={16} /> Nova Atividade
          </button>
        </div>

        {/* TABELA DE ESTRUTURA E DATAS */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #334155', color: '#94a3b8' }}>
                <th style={{ padding: '12px' }}>Atividade / Subatividade</th>
                <th style={{ padding: '12px' }}>Início Previsto</th>
                <th style={{ padding: '12px' }}>Fim Previsto</th>
                <th style={{ padding: '12px' }}>Início Executado</th>
                <th style={{ padding: '12px' }}>Fim Executado</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((act) => (
                <React.Fragment key={act.id}>
                  {/* LINHA PRINCIPAL DA ATIVIDADE */}
                  <tr style={{ borderBottom: '1px solid #334155', backgroundColor: '#1e293b' }}>
                    <td style={{ padding: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button onClick={() => toggleExpand(act.id)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>
                        {act.subactivities?.length > 0 && (act.expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
                      </button>
                      {editingId === act.id ? (
                        <input 
                          type="text" 
                          value={editForm.name} 
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          style={{ backgroundColor: '#0f172a', border: '1px solid #38bdf8', color: '#fff', padding: '4px 8px', borderRadius: '4px', width: '100%' }}
                        />
                      ) : (
                        act.name
                      )}
                    </td>

                    {/* DATAS PREVISTAS E EXECUTADAS */}
                    {['startDate', 'endDate', 'execStartDate', 'execEndDate'].map((field) => (
                      <td key={field} style={{ padding: '12px' }}>
                        {editingId === act.id ? (
                          <input 
                            type="date" 
                            value={editForm[field] || ''} 
                            onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })}
                            style={{ backgroundColor: '#0f172a', border: '1px solid #38bdf8', color: '#fff', padding: '4px', borderRadius: '4px' }}
                          />
                        ) : (
                          <span style={{ color: field.includes('exec') ? '#4ade80' : '#cbd5e1' }}>
                            {act[field] || '--'}
                          </span>
                        )}
                      </td>
                    ))}

                    {/* BOTOES DE ACAO */}
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      {editingId === act.id ? (
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                          <button onClick={saveEdit} style={{ background: 'none', border: 'none', color: '#4ade80', cursor: 'pointer' }}><Save size={16} /></button>
                          <button onClick={() => setEditingId(null)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}><X size={16} /></button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                          <button onClick={() => addSubactivity(act.id)} title="Adicionar Subatividade" style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer' }}><Plus size={16} /></button>
                          <button onClick={() => startEdit(act)} title="Editar" style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><Edit2 size={16} /></button>
                          <button onClick={() => deleteItem(act.id)} title="Excluir" style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}><Trash2 size={16} /></button>
                        </div>
                      )}
                    </td>
                  </tr>

                  {/* LINHAS DE SUBATIVIDADES */}
                  {act.expanded && act.subactivities?.map((sub) => (
                    <tr key={sub.id} style={{ borderBottom: '1px solid #334155', backgroundColor: '#0f172a' }}>
                      <td style={{ padding: '8px 12px 8px 40px', color: '#94a3b8', fontSize: '13px' }}>
                        {editingId === sub.id ? (
                          <input 
                            type="text" 
                            value={editForm.name} 
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            style={{ backgroundColor: '#1e293b', border: '1px solid #38bdf8', color: '#fff', padding: '4px 8px', borderRadius: '4px', width: '100%' }}
                          />
                        ) : (
                          `↳ ${sub.name}`
                        )}
                      </td>

                      {['startDate', 'endDate', 'execStartDate', 'execEndDate'].map((field) => (
                        <td key={field} style={{ padding: '8px 12px', fontSize: '13px' }}>
                          {editingId === sub.id ? (
                            <input 
                              type="date" 
                              value={editForm[field] || ''} 
                              onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })}
                              style={{ backgroundColor: '#1e293b', border: '1px solid #38bdf8', color: '#fff', padding: '2px 4px', borderRadius: '4px' }}
                            />
                          ) : (
                            <span style={{ color: field.includes('exec') ? '#4ade80' : '#94a3b8' }}>
                              {sub[field] || '--'}
                            </span>
                          )}
                        </td>
                      ))}

                      <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                        {editingId === sub.id ? (
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <button onClick={saveEdit} style={{ background: 'none', border: 'none', color: '#4ade80', cursor: 'pointer' }}><Save size={14} /></button>
                            <button onClick={() => setEditingId(null)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}><X size={14} /></button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <button onClick={() => startEdit(sub, true, act.id)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><Edit2 size={14} /></button>
                            <button onClick={() => deleteItem(sub.id, true, act.id)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}><Trash2 size={14} /></button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
