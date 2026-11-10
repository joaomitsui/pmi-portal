import React, { useState } from 'react';
import { Calendar, Plus, Edit3, Trash2, CheckCircle2, Clock } from 'lucide-react';

export default function ScheduleTab({ globalData, setGlobalData }) {
  const [phases] = useState([
    {
      id: 'PHASE-1',
      name: 'Fase 1: Mapeamento HBU, Valuation e Garantias Imobiliárias',
      startPrev: globalData?.config?.startDate || '2026-11-11',
      endPrev: '2027-12-31',
      startExec: globalData?.config?.startDate || '2026-11-11',
      endExec: 'Em Andamento',
      subactivities: [
        { id: 'sub-1.1', name: 'Mapeamento HBU & Validação de Matrículas (Ônus Reais)', startPrev: '2026-11-11', endPrev: '2027-01-30', startExec: '2026-11-11', endExec: '--' },
        { id: 'sub-1.2', name: 'Emissão de Laudos de Avaliação NBR 14653 & Governança', startPrev: '2026-12-01', endPrev: '2027-03-30', startExec: '--', endExec: '--' },
        { id: 'sub-1.3', name: 'Roadshow de Captação Garantida (Debt/Equity)', startPrev: '2026-11-11', endPrev: '2027-04-30', startExec: '2026-11-11', endExec: '--' }
      ]
    },
    {
      id: 'PHASE-2',
      name: 'Fase 2: Viabilidade, Estruturação Financeira & Captação (Fazenda Solar sem TME)',
      startPrev: globalData?.config?.startDate || '2026-11-11',
      endPrev: '2027-12-31',
      startExec: globalData?.config?.startDate || '2026-11-11',
      endExec: 'Em Andamento',
      subactivities: [
        { id: 'sub-2.1', name: 'Estudo de Viabilidade & DCF Padrão (Solar 60 MWp)', startPrev: '2026-11-11', endPrev: '2027-02-28', startExec: '2026-11-11', endExec: '--' },
        { id: 'sub-2.2', name: 'Negociação de PPA & Contratos de Conexão à Rede', startPrev: '2027-01-01', endPrev: '2027-05-30', startExec: '--', endExec: '--' }
      ]
    },
    {
      id: 'PHASE-3',
      name: 'Fase 3: Viabilidade, Estruturação Financeira & Captação (Fazenda Solar com TME)',
      startPrev: globalData?.config?.startDate || '2026-11-11',
      endPrev: '2027-12-31',
      startExec: globalData?.config?.startDate || '2026-11-11',
      endExec: 'Em Andamento',
      subactivities: [
        { id: 'sub-3.1', name: 'Viabilidade Tecnológica & Patentes INPI (Protótipo 330 kVA)', startPrev: '2026-11-11', endPrev: '2027-03-30', startExec: '2026-11-11', endExec: '--' },
        { id: 'sub-3.2', name: 'Modelagem Financeira Avançada (Inclusão TME no DCF)', startPrev: '2027-01-15', endPrev: '2027-06-30', startExec: '--', endExec: '--' }
      ]
    }
  ]);

  return (
    <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem', color: '#f1f5f9' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>
            Cronograma Integrado de Atividades (Fases 1, 2 e 3 em Paralelo)
          </h2>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            Acompanhamento integrado das frentes simultâneas de estruturação imobiliária HBU, fazenda solar e inovação TME.
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: '#020617', borderRadius: '0.75rem', border: '1px solid #1e293b', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
              <th style={{ padding: '0.75rem 1rem' }}>Atividade / Subatividade</th>
              <th style={{ padding: '0.75rem 1rem' }}>Início Previsto</th>
              <th style={{ padding: '0.75rem 1rem' }}>Fim Previsto</th>
              <th style={{ padding: '0.75rem 1rem' }}>Início Executado</th>
              <th style={{ padding: '0.75rem 1rem' }}>Fim Executado</th>
            </tr>
          </thead>
          <tbody>
            {phases.map((phase) => (
              <React.Fragment key={phase.id}>
                <tr style={{ borderBottom: '1px solid #1e293b', backgroundColor: 'rgba(30,41,59,0.5)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 'bold', color: '#38bdf8' }}>
                    {phase.name}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: '#cbd5e1' }}>{phase.startPrev}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#cbd5e1' }}>{phase.endPrev}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#34d399' }}>{phase.startExec}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#fcd34d' }}>{phase.endExec}</td>
                </tr>
                {phase.subactivities.map((sub) => (
                  <tr key={sub.id} style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '0.6rem 1rem 0.6rem 2.5rem', color: '#94a3b8' }}>
                      ↳ {sub.name}
                    </td>
                    <td style={{ padding: '0.6rem 1rem', color: '#94a3b8' }}>{sub.startPrev}</td>
                    <td style={{ padding: '0.6rem 1rem', color: '#94a3b8' }}>{sub.endPrev}</td>
                    <td style={{ padding: '0.6rem 1rem', color: '#94a3b8' }}>{sub.startExec}</td>
                    <td style={{ padding: '0.6rem 1rem', color: '#94a3b8' }}>{sub.endExec}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
