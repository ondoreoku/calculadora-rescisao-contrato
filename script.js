function calcular() {
    // Obter valores
    const base = parseFloat(document.getElementById('vencBase').value) || 0;
    const subVal = parseFloat(document.getElementById('subVal').value) || 0;
    const meses = parseInt(document.getElementById('mesesTrab').value) || 0;
    const fVencidas = parseInt(document.getElementById('feriasVenc').value) || 0;
    const hForm = parseInt(document.getElementById('horasForm').value) || 0;
    const tipo = document.getElementById('tipoRescisao').value;

    if (base <= 0) {
        alert("Introduza o vencimento base.");
        return;
    }

    // 1. Compensação (Lógica ACT: 24 dias para termo, 14 para extinção)
    let diasComp = 0;
    if (tipo === 'cad_termo_certo' || tipo === 'cad_termo_incerto') diasComp = 24;
    else if (tipo === 'extincao') diasComp = 14;
    
    // Simplificação ACT: (Base / 30) * diasComp (por ano, aqui simulamos o valor base de referência)
    const compensacao = (base / 30) * diasComp;

    // 2. Férias e Proporcionais
    const valorDia = base / 22;
    const feriasVencidasTotal = fVencidas * valorDia * 2; // Dias de férias + Subsídio de férias
    
    const propNatal = (base / 12) * meses;
    const propFerias = (base / 12) * meses * 2; // Proporcional de férias + Proporcional de subsídio

    // 3. Formação
    const valorHora = (base * 12) / (52 * 40);
    const formacao = hForm * valorHora;

    // 4. Último Mês e Subsídio de Refeição
    const subMensal = subVal * 22;
    const ultimoMes = base + subMensal;

    // Totais
    const totalBruto = compensacao + feriasVencidasTotal + propNatal + propFerias + formacao + ultimoMes;

    // Formatação e Exibição
    document.getElementById('r-comp').innerText = compensacao.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
    document.getElementById('r-fer-venc').innerText = feriasVencidasTotal.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
    document.getElementById('r-prop').innerText = (propNatal + propFerias).toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
    document.getElementById('r-form').innerText = formacao.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
    document.getElementById('r-mes').innerText = ultimoMes.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
    document.getElementById('r-total').innerText = totalBruto.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });

    document.getElementById('results').style.display = 'block';
    window.scrollTo({ top: document.getElementById('results').offsetTop, behavior: 'smooth' });
}
