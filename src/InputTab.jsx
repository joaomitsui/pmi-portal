import React from 'react';

export default function InputTab({ globalData, setGlobalData }) {
  // Atualizar configurações do Cronograma
  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setGlobalData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        [name]: name.includes('Days') ? Number(value) : value,
      },
    }));
  };

  // Alternar cenário TME (Com/Sem Booster Magnético)
  const toggleTME = () => {
    setGlobalData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        useTME: !prev.config.useTME,
      },
    }));
  };

  // Alternar atribuição de vocação/uso dos imóveis (HBU / Garantias / Solar)
  const toggleAssetProperty = (id, prop) => {
    setGlobalData((prev) => ({
      ...prev,
      assets: prev.assets.map((asset) =>
        asset.id === id ? { ...asset, [prop]: !asset[prop] } : asset
      ),
    }));
  };

  // Adicionar novo imóvel manualmente
  const [newAsset, setNewAsset] = React.useState({
    name: '',
    ha: '',
    mat: '',
    loc: '',
    ptam: '',
    isSolar: false,
    isCollateral: true,
  });

  const handleAddAsset = (e) => {
    e.preventDefault();
    if (!newAsset.name) return;
    setGlobalData((prev) => ({
      ...prev,
      assets: [
        ...prev.assets,
        {
          ...newAsset,
          id: Date.now(),
          ha: Number(newAsset.ha) || 0,
          ptam: Number(newAsset.ptam) || 0,
        },
      ],
    }));
    setNewAsset({
      name: '',
      ha: '',
      mat: '',
      loc: '',
      ptam: '',
      isSolar: false,
      isCollateral: true,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: '#fff' }}>
      <h2>📥 Central de Input & Premissas Globais</h2>
      <p style={{ color: '#94a3b8', marginTop: '-1rem' }}>
        Altere premissas globais, adicione imóveis e selecione vocações. Os dados serão refletidos em todas as abas do portal.
      </p>

      {/* SEÇÃO 1: PREMISSAS DO CRONOGRAMA */}
      <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
        <h3 style={{ borderBottom: '1px solid #334155', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#38bdf8' }}>
          📅 1. Prazos do Cronograma (Default 75 e 90 dias)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
              Data Inicial Global
            </label>
            <input
              type="date"
              name="startDate"
              value={globalData.config.startDate}
              onChange={handleConfigChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.4rem', border: '1px solid #475569', background: '#0f172a', color: '#fff' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
              Prazo Estruturação (Dias)
            </label>
            <input
              type="number"
              name="structuringDays"
              value={globalData.config.structuringDays}
              onChange={handleConfigChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.4rem', border: '1px solid #475569', background: '#0f172a', color: '#fff' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
              Prazo Captação (Dias)
            </label>
            <input
              type="number"
              name="fundraisingDays"
              value={globalData.config.fundraisingDays}
              onChange={handleConfigChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.4rem', border: '1px solid #475569', background: '#0f172a', color: '#fff' }}
            />
          </div>
        </div>
      </div>

      {/* SEÇÃO 2: TECNOLOGIA TME & FAZENDA SOLAR */}
      <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
        <h3 style={{ borderBottom: '1px solid #334155', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#38bdf8' }}>
          ⚡ 2. Parâmetros Tecnológicos da Fazenda Solar
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={toggleTME}
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '0.5rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              background: globalData.config.useTME ? '#10b981' : '#64748b',
              color: '#fff',
            }}
          >
            {globalData.config.useTME ? '✓ TME Ativo (Com Booster Magnético)' : '✗ TME Inativo (Solar Standard)'}
          </button>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            {globalData.config.useTME
              ? 'Tecnologia TME ativada: Incremento no ROI/TIR com reaproveitamento de energia magnética.'
              : 'Dimensionamento tradicional sem sistema de booster magnético.'}
          </span>
        </div>
      </div>

      {/* SEÇÃO 3: GESTÃO DE ATIVOS IMOBILIÁRIOS */}
      <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
        <h3 style={{ borderBottom: '1px solid #334155', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#38bdf8' }}>
          🏛️ 3. Cadastro & Seleção de Ativos Imobiliários (HBU / Garantias)
        </h3>

        {/* Tabela de imóveis cadastrados */}
        <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#0f172a', borderBottom: '1px solid #475569' }}>
                <th style={{ padding: '0.75rem' }}>Imóvel / Titular</th>
                <th style={{ padding: '0.75rem' }}>Área (ha)</th>
                <th style={{ padding: '0.75rem' }}>Matrícula</th>
                <th style={{ padding: '0.75rem' }}>Localização</th>
                <th style={{ padding: '0.75rem' }}>Laudo PTAM</th>
                <th style={{ padding: '0.75rem', textAlign: 'center' }}>Garantia Real</th>
                <th style={{ padding: '0.75rem', textAlign: 'center' }}>Aptidão Solar</th>
              </tr>
            </thead>
            <tbody>
              {globalData.assets.map((asset) => (
                <tr key={asset.id} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{asset.name}</td>
                  <td style={{ padding: '0.75rem' }}>{asset.ha.toLocaleString('pt-BR')} ha</td>
                  <td style={{ padding: '0.75rem' }}>{asset.mat}</td>
                  <td style={{ padding: '0.75rem' }}>{asset.loc}</td>
                  <td style={{ padding: '0.75rem' }}>
                    {asset.ptam ? `R$ ${(asset.ptam / 1000000).toFixed(2)} Mi` : 'Em Avaliação'}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={asset.isCollateral}
                      onChange={() => toggleAssetProperty(asset.id, 'isCollateral')}
                    />
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={asset.isSolar}
                      onChange={() => toggleAssetProperty(asset.id, 'isSolar')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Formulário para Inserir Novo Ativo */}
        <form onSubmit={handleAddAsset} style={{ background: '#0f172a', padding: '1rem', borderRadius: '0.5rem' }}>
          <h4 style={{ marginBottom: '0.8rem', color: '#e2e8f0' }}>➕ Inserir Novo Ativo Imobiliário</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.8rem' }}>
            <input
              placeholder="Nome do Imóvel / Titular"
              value={newAsset.name}
              onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
              style={{ padding: '0.5rem', borderRadius: '0.3rem', border: '1px solid #475569', background: '#1e293b', color: '#fff' }}
              required
            />
            <input
              placeholder="Área (ha)"
              type="number"
              value={newAsset.ha}
              onChange={(e) => setNewAsset({ ...newAsset, ha: e.target.value })}
              style={{ padding: '0.5rem', borderRadius: '0.3rem', border: '1px solid #475569', background: '#1e293b', color: '#fff' }}
            />
            <input
              placeholder="Matrícula / Reg."
              value={newAsset.mat}
              onChange={(e) => setNewAsset({ ...newAsset, mat: e.target.value })}
              style={{ padding: '0.5rem', borderRadius: '0.3rem', border: '1px solid #475569', background: '#1e293b', color: '#fff' }}
            />
            <input
              placeholder="Localização / CAR"
              value={newAsset.loc}
              onChange={(e) => setNewAsset({ ...newAsset, loc: e.target.value })}
              style={{ padding: '0.5rem', borderRadius: '0.3rem', border: '1px solid #475569', background: '#1e293b', color: '#fff' }}
            />
            <input
              placeholder="Valor PTAM (R$)"
              type="number"
              value={newAsset.ptam}
              onChange={(e) => setNewAsset({ ...newAsset, ptam: e.target.value })}
              style={{ padding: '0.5rem', borderRadius: '0.3rem', border: '1px solid #475569', background: '#1e293b', color: '#fff' }}
            />
          </div>
          <button
            type="submit"
            style={{
              marginTop: '1rem',
              padding: '0.6rem 1.5rem',
              background: '#0284c7',
              color: '#fff',
              border: 'none',
              borderRadius: '0.4rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Adicionar Imóvel ao Sistema
          </button>
        </form>
      </div>
    </div>
  );
}
