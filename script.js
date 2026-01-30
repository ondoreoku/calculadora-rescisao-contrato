function calcular() {
    // 1. Obter elementos (Garantir que os IDs batem certo com o HTML)
    const base = parseFloat(document.getElementById('base').value) || 0;
    const dInicio = new Date(document.getElementById('dataInicio').value);
    const dFim = new Date(document.getElementById('dataFim').value);
    const motivo = document.getElementById('motivo').value;
    const ferias = parseInt(document.getElementById('feriasNaoGozadas').value) || 0;
    const layoff = parseInt(document.getElementById('mesesLayoff').value) || 0;

    // 2. Validação básica
    if (isNaN(dInicio) || isNaN(dFim) || dFim < dInicio) {
        alert("Por favor, introduza datas válidas.");
        return;
    }

    // 3. Cálculo de Antiguidade
    const anos = (dFim - dInicio) / (1000 * 60 * 60 * 24 * 365.25);

    // 4. Indemnização (Só se for iniciativa da empresa ou caducidade)
    let indemnizacao = 0;
    if (motivo !== 'demissao') {
        indemnizacao = (base / 30) * 14 * anos; 
    }

    // 5. Proporcionais e Férias
    const mesSaida = dFim.getMonth() + 1;
    const propNatal = (base * (mesSaida - (layoff * 0.5))) / 12;
    const propFerias = (base * mesSaida) / 12;
    const valorDia = base / 22;
    const totalFerias = ferias * valorDia * 2; // Dias + Subsídio

    const resultadoFinal = indemnizacao + propNatal + propFerias + totalFerias;

    // 6. Exibir resultado
    const resDiv = document.getElementById('results');
    resDiv.style.display = 'block';
    document.getElementById('out-total').innerText = "€ " + resultadoFinal.toFixed(2);
    
    console.log("Cálculo efetuado: ", resultadoFinal);
}
