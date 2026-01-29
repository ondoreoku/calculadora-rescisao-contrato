function calcularRescisao() {
    const base = parseFloat(document.getElementById('base').value) || 0;
    const mesSaida = parseInt(document.getElementById('mesSaida').value) || 1;
    const diasFerias = parseInt(document.getElementById('feriasNaoGozadas').value) || 0;

    // 1. Proporcionais de Natal (Base * meses / 12)
    const propNatal = (base * mesSaida) / 12;

    // 2. Proporcionais de Férias do ano de saída
    const propFeriasAno = (base * mesSaida) / 12;

    // 3. Pagamento de dias de férias não gozadas
    // Valor dia = Base / 22
    const valorDia = base / 22;
    const pagamentoFeriasNaoGozadas = (valorDia * diasFerias) + (valorDia * diasFerias); // Dias + Subsídio

    const totalProp = propNatal + propFeriasAno;
    const totalFinal = totalProp + pagamentoFeriasNaoGozadas;

    document.getElementById('results').style.display = 'block';
    document.getElementById('out-total').innerText = `€${totalFinal.toFixed(2)}`;
    document.getElementById('out-prop').innerText = `€${totalProp.toFixed(2)}`;

    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}
