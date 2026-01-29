function calcularTudo() {
    const base = parseFloat(document.getElementById('base').value) || 0;
    const dataInicio = new Date(document.getElementById('dataInicio').value);
    const dataFim = new Date(document.getElementById('dataFim').value);
    const feriasNaoGozadas = parseInt(document.getElementById('feriasNaoGozadas').value) || 0;
    const motivo = document.getElementById('motivo').value;

    if (isNaN(dataInicio) || isNaN(dataFim) || dataFim < dataInicio) {
        alert("Por favor, insira datas válidas.");
        return;
    }

    // 1. Cálculo de Antiguidade (em dias)
    const diffTime = Math.abs(dataFim - dataInicio);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const anosAntiguidade = diffDays / 365;

    // 2. Indemnização por Antiguidade (Média de 14 dias por ano para 2026)
    let indemnizacao = 0;
    if (motivo === 'caducidade' || motivo === 'despedimento') {
        const valorDiaIndem = base / 30;
        indemnizacao = (valorDiaIndem * 14) * anosAntiguidade;
    }

    // 3. Proporcionais do Ano Corrente (Mês de saída)
    const mesSaida = dataFim.getMonth() + 1;
    const propNatal = (base * mesSaida) / 12;
    const propFerias = (base * mesSaida) / 12;

    // 4. Dias de Férias Não Gozados
    const valorDiaTrabalho = base / 22;
    const pagamentoDiasFerias = feriasNaoGozadas * valorDiaTrabalho;
    const subsidioDiasFerias = feriasNaoGozadas * valorDiaTrabalho; // Direito ao subsídio desses dias

    // Cálculo Final
    const totalProporcionais = propNatal + propFerias + pagamentoDiasFerias + subsidioDiasFerias;
    const totalGlobal = totalProporcionais + indemnizacao;

    // Exibição
    document.getElementById('results').style.display = 'block';
    document.getElementById('out-total').innerText = `€${totalGlobal.toFixed(2)}`;
    document.getElementById('out-indeminizacao').innerText = `€${indemnizacao.toFixed(2)}`;
    document.getElementById('out-proporcionais').innerText = `€${totalProporcionais.toFixed(2)}`;

    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}
