function calcular() {
    // 1. Inputs
    const base = parseFloat(document.getElementById('vencBase').value) || 0;
    const subVal = parseFloat(document.getElementById('subVal').value) || 0;
    const dInicio = new Date(document.getElementById('dataInicio').value);
    const dFim = new Date(document.getElementById('dataFim').value);
    const motivo = document.getElementById('motivo').value;
    const layoffMeses = parseInt(document.getElementById('mesesLayoff').value) || 0;
    const fVencidas = parseInt(document.getElementById('feriasVenc').value) || 0;
    const hForm = parseInt(document.getElementById('horasForm').value) || 0;

    if (isNaN(dInicio) || isNaN(dFim) || dFim < dInicio) {
        alert("Introduza datas válidas.");
        return;
    }

    // 2. Cálculo de Antiguidade
    const diffTime = Math.abs(dFim - dInicio);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const anosTrabalho = diffDays / 365.25;

    // 3. Compensação por Antiguidade
    // Regras gerais 2026: Caducidade/Extinção ~14 a 24 dias por ano
    let diasPorAno = 0;
    if (motivo === 'caducidade_termo') diasPorAno = 24;
    else if (motivo === 'despedimento_coletivo' || motivo === 'justa_causa_trabalhador' || motivo === 'mutuo_acordo') diasPorAno = 14;
    
    const compensacao = (base / 30) * diasPorAno * anosTrabalho;

    // 4. Proporcionais (Ajuste Lay-off)
    // No Lay-off, o tempo de suspensão pode reduzir o proporcional de Natal
    const mesSaida = dFim.getMonth() + 1;
    let mesesParaNatal = mesSaida - (layoffMeses * 0.5); // Redução parcial por suspensão
    if (mesesParaNatal < 0) mesesParaNatal = 0;

    const propNatal = (base / 12) * mesesParaNatal;
    const propFerias = (base / 12) * mesSaida * 2; // Inclui subsídio de férias proporcional

    // 5. Férias não gozadas e Formação
    const valorDia = base / 22;
    const feriasAcumuladas = fVencidas * valorDia * 2; // Dias + Subsídio
    const valorHora = (base * 12) / (52 * 40);
    const formacao = hForm * valorHora;

    // 6. Último Mês
    const ultimoMes = base + (subVal * 22);

    // 7. Resultados
    const total = compensacao + propNatal + propFerias + feriasAcumuladas + formacao + ultimoMes;

    document.getElementById('r-anos').innerText = anosTrabalho.toFixed(2) + " anos";
    document.getElementById('r-comp').innerText = compensacao.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
    document.getElementById('r-prop').innerText = (propNatal + propFerias).toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
    document.getElementById('r-fer-venc').innerText = feriasAcumuladas.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
    document.getElementById('r-form').innerText = formacao.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
    document.getElementById('r-mes').innerText = ultimoMes.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
    document.getElementById('r-total').innerText = total.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });

    document.getElementById('results').style.display = 'block';
    window.scrollTo({ top: document.getElementById('results').offsetTop - 50, behavior: 'smooth' });
}
