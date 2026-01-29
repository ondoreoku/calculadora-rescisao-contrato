function toggleLayoff() {
    const layoff = document.getElementById('layoff').value;
    document.getElementById('campoMesesLayoff').style.display = layoff === 'sim' ? 'block' : 'none';
}

function executarCalculo() {
    // Pegar Valores
    const base = parseFloat(document.getElementById('base').value) || 0;
    const dataInicio = new Date(document.getElementById('dataInicio').value);
    const dataFim = new Date(document.getElementById('dataFim').value);
    const feriasNaoGozadas = parseInt(document.getElementById('feriasNaoGozadas').value) || 0;
    const horasFormacao = parseInt(document.getElementById('horasFormacao').value) || 0;
    const motivo = document.getElementById('motivo').value;
    const layoffSim = document.getElementById('layoff').value === 'sim';
    const mesesLayoff = layoffSim ? parseInt(document.getElementById('mesesLayoff').value) || 0 : 0;

    // Validar Datas
    if (isNaN(dataInicio) || isNaN(dataFim) || dataFim < dataInicio) {
        alert("Verifique as datas inseridas.");
        return;
    }

    // 1. Antiguidade
    const diffAnos = (dataFim - dataInicio) / (1000 * 60 * 60 * 24 * 365.25);

    // 2. Indemnização (14 dias por ano)
    let indem = 0;
    const temDireitoIndem = ['caducidade_empresa', 'despedimento_coletivo', 'justa_causa_trabalhador'];
    if (temDireitoIndem.includes(motivo)) {
        indem = (base / 30) * 14 * diffAnos;
    }

    // 3. Proporcionais (Ajuste Lay-off simplificado: 50% de perda nos meses parados)
    const mesSaida = dataFim.getMonth() + 1;
    let fatorNatal = mesSaida;
    if (mesesLayoff > 0) {
        fatorNatal = Math.max(0, mesSaida - (mesesLayoff * 0.5));
    }
    const propNatal = (base * fatorNatal) / 12;
    const propFerias = (base * mesSaida) / 12;

    // 4. Outros (Férias não gozadas e Formação)
    const valorDia = base / 22;
    const valorHora = (base * 12) / (52 * 40);
    const totalOutros = (feriasNaoGozadas * valorDia * 2) + (horasFormacao * valorHora);

    const totalGlobal = indem + propNatal + propFerias + totalOutros;

    // Mostrar Resultados
    document.getElementById('results').style.display = 'block';
    document.getElementById('out-total').innerText = "€" + totalGlobal.toFixed(2);
    document.getElementById('out-indem').innerText = "€" + indem.toFixed(2);
    document.getElementById('out-prop').innerText = "€" + (propNatal + propFerias).toFixed(2);

    window.scrollTo({ top: document.getElementById('results').offsetTop - 100, behavior: 'smooth' });
}
