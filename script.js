function toggleLayoff() {
    const layoff = document.getElementById('layoff').value;
    document.getElementById('campoMesesLayoff').style.display = layoff === 'sim' ? 'block' : 'none';
}

function calcularRescisaoCompleta() {
    const base = parseFloat(document.getElementById('base').value) || 0;
    const dataInicio = new Date(document.getElementById('dataInicio').value);
    const dataFim = new Date(document.getElementById('dataFim').value);
    const feriasNaoGozadas = parseInt(document.getElementById('feriasNaoGozadas').value) || 0;
    const horasFormacao = parseInt(document.getElementById('horasFormacao').value) || 0;
    const motivo = document.getElementById('motivo').value;
    const mesesLayoff = parseInt(document.getElementById('mesesLayoff').value) || 0;

    // 1. Antiguidade
    const diffDays = Math.ceil(Math.abs(dataFim - dataInicio) / (1000 * 60 * 60 * 24));
    const anos = diffDays / 365.25;

    // 2. Indemnização (Baseado em 14 dias/ano - Valor médio 2026)
    let indemnizacao = 0;
    const motivosComDireito = ['caducidade_empresa', 'despedimento_coletivo', 'justa_causa_trabalhador'];
    
    if (motivosComDireito.includes(motivo)) {
        indemnizacao = (base / 30) * 14 * anos;
    }

    // 3. Proporcionais de Natal e Férias (Ajuste Lay-off)
    // No Lay-off, os subsídios são calculados com base no tempo efetivo, mas a lei protege parte do valor.
    const mesSaida = dataFim.getMonth() + 1;
    let propNatal = (base * mesSaida) / 12;
    let propFerias = (base * mesSaida) / 12;

    // Se houve lay-off (suspensão), reduz o proporcional do tempo de suspensão
    if (mesesLayoff > 0) {
        propNatal = (base * (mesSaida - (mesesLayoff * 0.5))) / 12; // Simplificação legal
    }

    // 4. Férias não gozadas e Formação
    const valorHora = (base * 12) / (52 * 40);
    const valorDia = base / 22;
    const totalOutros = (feriasNaoGozadas * valorDia * 2) + (horasFormacao * valorHora);

    const totalFinal = indemnizacao + propNatal + propFerias + totalOutros;

    document.getElementById('results').style.display = 'block';
    document.getElementById('out-total').innerText = `€${totalFinal.toFixed(2)}`;
    document.getElementById('out-indem').innerText = `€${indemnizacao.toFixed(2)}`;
    document.getElementById('out-prop').innerText = `€${(propNatal + propFerias).toFixed(2)}`;
    document.getElementById('out-outros').innerText = `€${totalOutros.toFixed(2)}`;
}
