function executarCalculo() {
    const base = parseFloat(document.getElementById('base').value) || 0;
    const dataInicio = new Date(document.getElementById('dataInicio').value);
    const dataFim = new Date(document.getElementById('dataFim').value);
    const feriasNaoGozadas = parseInt(document.getElementById('feriasNaoGozadas').value) || 0;
    const motivo = document.getElementById('motivo').value;
    const mesesLayoff = parseInt(document.getElementById('mesesLayoff').value) || 0;

    if (isNaN(dataInicio) || isNaN(dataFim)) {
        alert("Insira as datas corretamente.");
        return;
    }

    // 1. Antiguidade
    const anos = (dataFim - dataInicio) / (1000 * 60 * 60 * 24 * 365.25);

    // 2. Indemnização
    let indem = 0;
    if (motivo !== 'demissao') {
        indem = (base / 30) * 14 * anos;
    }

    // 3. Proporcionais (Ajuste Lay-off)
    const mesSaida = dataFim.getMonth() + 1;
    let propNatal = (base * (mesSaida - (mesesLayoff * 0.5))) / 12;
    let propFerias = (base * mesSaida) / 12;

    // 4. Férias não gozadas
    const valorDia = base / 22;
    const totalFerias = feriasNaoGozadas * valorDia * 2; // Dias + Subsídio

    const total = indem + propNatal + propFerias + totalFerias;

    document.getElementById('results').style.display = 'block';
    document.getElementById('out-total').innerText = "€" + total.toFixed(2);
}
