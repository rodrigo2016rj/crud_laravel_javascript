window.addEventListener("load", function(){
  /* Máscara do campo_cpf */
  const campo_cpf = document.getElementById("campo_cpf");
  let ultimo_valor_campo_cpf = "";
  
  campo_cpf.addEventListener("keyup", function(evento){
    evento.preventDefault();
    
    let posicao_do_cursor = campo_cpf.selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      ultimo_valor_campo_cpf = campo_cpf.value;
      return;
    }
    
    campo_cpf.value = campo_cpf.value.replace(/[^0-9]/g, "");
    
    if(campo_cpf.value.length >= 3){
      campo_cpf.value = campo_cpf.value.slice(0, 3) + "." + campo_cpf.value.slice(3);
      if((posicao_do_cursor === 3 || posicao_do_cursor === 4) && campo_cpf.value.length > ultimo_valor_campo_cpf.length){
        posicao_do_cursor++;
      }else if(campo_cpf.value.length >= 7 && posicao_do_cursor === 4){
        posicao_do_cursor++;
      }
    }
    if(campo_cpf.value.length >= 7){
      campo_cpf.value = campo_cpf.value.slice(0, 7) + "." + campo_cpf.value.slice(7);
      if((posicao_do_cursor === 7 || posicao_do_cursor === 8) && campo_cpf.value.length > ultimo_valor_campo_cpf.length){
        posicao_do_cursor++;
      }else if(campo_cpf.value.length >= 11 && posicao_do_cursor === 8){
        posicao_do_cursor++;
      }
    }
    if(campo_cpf.value.length >= 11){
      campo_cpf.value = campo_cpf.value.slice(0, 11) + "-" + campo_cpf.value.slice(11);
      if((posicao_do_cursor === 11 || posicao_do_cursor === 12) && campo_cpf.value.length > ultimo_valor_campo_cpf.length){
        posicao_do_cursor++;
      }
    }
    if(campo_cpf.value.length > 14){
      campo_cpf.value = campo_cpf.value.slice(0, 14);
    }
    
    campo_cpf.setSelectionRange(posicao_do_cursor, posicao_do_cursor);
    
    ultimo_valor_campo_cpf = campo_cpf.value;
  });
  
  /* Seletor de data (calendário) do campo_data_de_nascimento */
  const campo_data_de_nascimento = document.getElementById("campo_data_de_nascimento");
  const span_icone_de_calendario_do_campo_data_de_nascimento = document.getElementById("span_icone_de_calendario_do_campo_data_de_nascimento");
  const div_calendario = document.getElementById("div_calendario");
  const caixa_de_selecao_de_mes_do_calendario = document.getElementById("caixa_de_selecao_de_mes_do_calendario");
  const caixa_de_selecao_de_ano_do_calendario = document.getElementById("caixa_de_selecao_de_ano_do_calendario");
  const celulas_do_calendario = document.getElementsByClassName("celula_do_calendario");
  const botao_confirmar_do_calendario = document.getElementById("botao_confirmar_do_calendario");
  
  let dia_selecionado = null;
  let ocultar_div_calendario = true;
  
  campo_data_de_nascimento.addEventListener("keyup", function(){
    atualizar_calendario();
  });
  
  campo_data_de_nascimento.addEventListener("click", function(){
    ocultar_div_calendario = false;
  });
  
  span_icone_de_calendario_do_campo_data_de_nascimento.addEventListener("click", function(){
    ocultar_div_calendario = false;
    mostrar_calendario();
  });
  
  /* Impedindo clique duplo selecionar o texto */
  span_icone_de_calendario_do_campo_data_de_nascimento.addEventListener("mousedown", function(evento){
    evento.preventDefault();
  });
  
  function mostrar_calendario(){
    if(div_calendario.classList.contains("tag_oculta")){
      let posicao_x = campo_data_de_nascimento.getBoundingClientRect().left + window.scrollX;
      let posicao_y = campo_data_de_nascimento.getBoundingClientRect().top + window.scrollY;
      
      let altura = 0;
      var estilo_computado = window.getComputedStyle(campo_data_de_nascimento);
      altura += parseInt(estilo_computado.borderTopWidth, 10);
      altura += parseInt(estilo_computado.paddingTop, 10);
      altura += parseInt(estilo_computado.height, 10);
      altura += parseInt(estilo_computado.paddingBottom, 10);
      altura += parseInt(estilo_computado.borderBottomWidth, 10);
      posicao_y += altura;
      
      div_calendario.style.position = "absolute";
      div_calendario.style.top = posicao_y + "px";
      div_calendario.style.left = posicao_x + "px";
      if(window.innerWidth <= 400){
        const largura_do_calendario = 348; //Em pixels.
        div_calendario.style.left = window.innerWidth / 2 - largura_do_calendario / 2 + "px";
      }
      
      div_calendario.classList.remove("tag_oculta");
      
      atualizar_calendario();
    }else{
      div_calendario.classList.add("tag_oculta");
    }
  }
  
  function atualizar_calendario(){
    let valor = campo_data_de_nascimento.value;
    let dia = null;
    let mes = null;
    let ano = null;
    let total_de_dias_do_mes = null;
    let ano_referencia = null;
    
    if(valor !== null && valor.match(/^\d{2}\/(0[1-9]|1[0-2])\/\d{4}$/)){
      dia = valor.substring(0, 2);
      mes = valor.substring(3, 5);
      ano = valor.substring(6, 10);
      
      if(dia.substring(0, 1) === "0"){
        dia = dia.substring(1, 2);
      }
      dia = parseInt(dia, 10);
      
      if(mes.substring(0, 1) === "0"){
        mes = mes.substring(1, 2);
      }
      mes = parseInt(mes, 10);
      
      ano = parseInt(ano, 10);
      
      total_de_dias_do_mes = calcular_total_de_dias_do_mes(ano, mes);
      
      ano_referencia = ano;
      
      if(dia > total_de_dias_do_mes){
        dia = total_de_dias_do_mes;
      }
    }else{
      const data_atual = new Date();
      dia = data_atual.getDate();
      mes = data_atual.getMonth() + 1;
      ano = data_atual.getFullYear() - 30;
      total_de_dias_do_mes = calcular_total_de_dias_do_mes(ano, mes);
      ano_referencia = ano;
    }
    
    dia_selecionado = dia;
    
    caixa_de_selecao_de_mes_do_calendario.value = mes;
    
    const menor_ano = ano_referencia - 6;
    const maior_ano = ano_referencia + 5;
    caixa_de_selecao_de_ano_do_calendario.innerHTML = "";
    for(let i = menor_ano; i <= maior_ano; i++){
      let elemento_ano = document.createElement("option");
      elemento_ano.setAttribute("value", i);
      elemento_ano.innerText = i;
      caixa_de_selecao_de_ano_do_calendario.appendChild(elemento_ano);
    }
    caixa_de_selecao_de_ano_do_calendario.value = ano;
    
    gerar_dias_do_mes(total_de_dias_do_mes);
  }
  
  caixa_de_selecao_de_mes_do_calendario.addEventListener("change", function(){
    const mes = parseInt(caixa_de_selecao_de_mes_do_calendario.value, 10);
    const ano = parseInt(caixa_de_selecao_de_ano_do_calendario.value, 10);
    const total_de_dias_do_mes = calcular_total_de_dias_do_mes(ano, mes);
    gerar_dias_do_mes(total_de_dias_do_mes);
  });
  
  caixa_de_selecao_de_ano_do_calendario.addEventListener("change", function(){
    const mes = parseInt(caixa_de_selecao_de_mes_do_calendario.value, 10);
    const ano = parseInt(caixa_de_selecao_de_ano_do_calendario.value, 10);
    const total_de_dias_do_mes = calcular_total_de_dias_do_mes(ano, mes);
    gerar_dias_do_mes(total_de_dias_do_mes);
  });
  
  function calcular_total_de_dias_do_mes(ano, mes){
    const mes_seguinte = mes + 1;
    const total_de_dias_do_mes = new Date(ano, mes_seguinte - 1, 0).getDate();
    return total_de_dias_do_mes;
  }
  
  function gerar_dias_do_mes(total_de_dias_do_mes){
    if(dia_selecionado > total_de_dias_do_mes){
      dia_selecionado = total_de_dias_do_mes;
    }
    
    const mes = parseInt(caixa_de_selecao_de_mes_do_calendario.value, 10);
    const ano = parseInt(caixa_de_selecao_de_ano_do_calendario.value, 10);
    const dia_da_semana_do_primeiro_dia_do_mes = new Date(ano, mes - 1, 1).getDay() + 1;
    const posicao_inicial = 7; //As posições de 0 a 6 são as legendas (exemplo: Dom, Seg, Ter e etc).
    const posicao_do_primeiro_dia = dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
    const posicao_do_ultimo_dia = total_de_dias_do_mes - 1 + dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
    let posicao_do_dia_selecionado = dia_selecionado - 1 + dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
    
    let numero_do_dia = 0;
    for(let i = posicao_inicial; i < celulas_do_calendario.length; i++){
      celulas_do_calendario[i].innerHTML = "";
      celulas_do_calendario[i].classList.remove("dia_do_calendario");
      celulas_do_calendario[i].classList.remove("dia_escolhido");
      celulas_do_calendario[i].removeEventListener("click", evento_selecionar_dia);
      
      if(i >= posicao_do_primeiro_dia && i <= posicao_do_ultimo_dia){
        numero_do_dia++;
        celulas_do_calendario[i].classList.remove("tag_oculta");
        celulas_do_calendario[i].classList.add("dia_do_calendario");
        celulas_do_calendario[i].innerHTML = "<span>" + numero_do_dia + "</span>";
        if(i === posicao_do_dia_selecionado){
          celulas_do_calendario[i].classList.add("dia_escolhido");
        }
        celulas_do_calendario[i].addEventListener("click", evento_selecionar_dia);
      }else if(i > posicao_do_ultimo_dia){
        celulas_do_calendario[i].classList.add("tag_oculta");
      }
    }
  }
  
  function evento_selecionar_dia(evento){
    const tag_que_disparou_o_evento = evento.currentTarget;
    for(let i = 0; i < celulas_do_calendario.length; i++){
      celulas_do_calendario[i].classList.remove("dia_escolhido");
    }
    tag_que_disparou_o_evento.classList.add("dia_escolhido");
    dia_selecionado = tag_que_disparou_o_evento.innerText;
  }
  
  botao_confirmar_do_calendario.addEventListener("click", function(){
    let dia = dia_selecionado;
    if(dia < 10){
      dia = "0" + dia;
    }
    
    let mes = parseInt(caixa_de_selecao_de_mes_do_calendario.value, 10);
    if(mes < 10){
      mes = "0" + mes;
    }
    
    const ano = parseInt(caixa_de_selecao_de_ano_do_calendario.value, 10);
    
    const valor = dia + "/" + mes + "/" + ano;
    if(campo_data_de_nascimento !== null){
      campo_data_de_nascimento.value = valor;
    }
    
    div_calendario.classList.add("tag_oculta");
  });
  
  /* Descrição do setor aparece ao selecionar na caixa de seleção */
  const caixa_de_selecao_setor = document.getElementById("caixa_de_selecao_setor");
  const div_descricoes_dos_setores = document.getElementById("div_descricoes_dos_setores");
  
  let ocultar_div_descricoes_dos_setores = true;
  
  caixa_de_selecao_setor.addEventListener("change", function(){
    if(window.innerWidth <= 640){
      return;
    }
    
    const id_do_setor = caixa_de_selecao_setor.value;
    
    if(isNaN(id_do_setor) || id_do_setor % 1 != 0 || id_do_setor <= 0){
      div_descricoes_dos_setores.classList.add("tag_oculta");
      return;
    }
    
    ocultar_div_descricoes_dos_setores = false;
    div_descricoes_dos_setores.classList.remove("tag_oculta");
    
    const descricoes_dos_setores = document.getElementsByClassName("descricao_do_setor");
    for(let i = 0; i < descricoes_dos_setores.length; i++){
      descricoes_dos_setores[i].classList.add("tag_oculta");
    }
    
    const div_descricao_do_setor = document.getElementById("div_descricao_do_setor_id_" + id_do_setor);
    div_descricao_do_setor.classList.remove("tag_oculta");
    
    let posicao_x = caixa_de_selecao_setor.getBoundingClientRect().left + window.scrollX;
    let posicao_y = caixa_de_selecao_setor.getBoundingClientRect().top + window.scrollY;
    
    var estilo_computado = window.getComputedStyle(caixa_de_selecao_setor);
    posicao_x += parseInt(estilo_computado.width, 10);
    posicao_x += 10;
    
    posicao_y += parseInt(estilo_computado.height, 10) / 2;
    
    var estilo_computado = window.getComputedStyle(div_descricoes_dos_setores);
    posicao_y -= parseInt(estilo_computado.borderTopWidth, 10) / 2;
    posicao_y -= parseInt(estilo_computado.paddingTop, 10) / 2;
    posicao_y -= parseInt(estilo_computado.height, 10) / 2;
    posicao_y -= parseInt(estilo_computado.paddingBottom, 10) / 2;
    posicao_y -= parseInt(estilo_computado.borderBottomWidth, 10) / 2;
    
    div_descricoes_dos_setores.style.position = "absolute";
    div_descricoes_dos_setores.style.top = posicao_y + "px";
    div_descricoes_dos_setores.style.left = posicao_x + "px";
  });
  
  /* Máscara do campo_telefone_fixo */
  const campo_telefone_fixo = document.getElementById("campo_telefone_fixo");
  
  campo_telefone_fixo.addEventListener("keyup", function(evento){
    evento.preventDefault();
    
    let posicao_do_cursor = campo_telefone_fixo.selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      return;
    }
    
    let atualizacao_do_cursor = 0;
    
    if(campo_telefone_fixo.value.charAt(0) !== "("){
      if(/[0-9]/.test(campo_telefone_fixo.value.charAt(0))){
        campo_telefone_fixo.value = "(" + campo_telefone_fixo.value;
        atualizacao_do_cursor++;
      }else{
        campo_telefone_fixo.value = "(" + campo_telefone_fixo.value.slice(1);
      }
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(1))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 1) + campo_telefone_fixo.value.slice(2);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(2))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 2) + campo_telefone_fixo.value.slice(3);
    }
    if(campo_telefone_fixo.value.length > 3 && campo_telefone_fixo.value.charAt(3) !== ")"){
      if(/[0-9]/.test(campo_telefone_fixo.value.charAt(3))){
        campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 3) + ")" + campo_telefone_fixo.value.slice(3);
        if(posicao_do_cursor >= 3){
          atualizacao_do_cursor++;
        }
      }else{
        campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 3) + ")" + campo_telefone_fixo.value.slice(4);
      }
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(4))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 4) + campo_telefone_fixo.value.slice(5);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(5))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 5) + campo_telefone_fixo.value.slice(6);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(6))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 6) + campo_telefone_fixo.value.slice(7);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(7))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 7) + campo_telefone_fixo.value.slice(8);
    }
    if(campo_telefone_fixo.value.length > 8 && campo_telefone_fixo.value.charAt(8) !== "-"){
      if(/[0-9]/.test(campo_telefone_fixo.value.charAt(8))){
        campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 8) + "-" + campo_telefone_fixo.value.slice(8);
        if(posicao_do_cursor >= 8){
          atualizacao_do_cursor++;
        }
      }else{
        campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 8) + "-" + campo_telefone_fixo.value.slice(9);
      }
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(9))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 9) + campo_telefone_fixo.value.slice(10);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(10))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 10) + campo_telefone_fixo.value.slice(11);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(11))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 11) + campo_telefone_fixo.value.slice(12);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(12))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 12) + campo_telefone_fixo.value.slice(13);
    }
    if(campo_telefone_fixo.value.length > 13){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 13);
    }
    
    posicao_do_cursor += atualizacao_do_cursor;
    campo_telefone_fixo.setSelectionRange(posicao_do_cursor, posicao_do_cursor);
  });
  
  /* Máscara do campo_telefone_movel */
  const campo_telefone_movel = document.getElementById("campo_telefone_movel");
  
  campo_telefone_movel.addEventListener("keyup", function(evento){
    evento.preventDefault();
    
    let posicao_do_cursor = campo_telefone_movel.selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      return;
    }
    
    let atualizacao_do_cursor = 0;
    
    if(campo_telefone_movel.value.charAt(0) !== "("){
      if(/[0-9]/.test(campo_telefone_movel.value.charAt(0))){
        campo_telefone_movel.value = "(" + campo_telefone_movel.value;
        atualizacao_do_cursor++;
      }else{
        campo_telefone_movel.value = "(" + campo_telefone_movel.value.slice(1);
      }
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(1))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 1) + campo_telefone_movel.value.slice(2);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(2))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 2) + campo_telefone_movel.value.slice(3);
    }
    if(campo_telefone_movel.value.length > 3 && campo_telefone_movel.value.charAt(3) !== ")"){
      if(/[0-9]/.test(campo_telefone_movel.value.charAt(3))){
        campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 3) + ")" + campo_telefone_movel.value.slice(3);
        if(posicao_do_cursor >= 3){
          atualizacao_do_cursor++;
        }
      }else{
        campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 3) + ")" + campo_telefone_movel.value.slice(4);
      }
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(4))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 4) + campo_telefone_movel.value.slice(5);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(5))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 5) + campo_telefone_movel.value.slice(6);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(6))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 6) + campo_telefone_movel.value.slice(7);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(7))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 7) + campo_telefone_movel.value.slice(8);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(8))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 8) + campo_telefone_movel.value.slice(9);
    }
    if(campo_telefone_movel.value.length > 9 && campo_telefone_movel.value.charAt(9) !== "-"){
      if(/[0-9]/.test(campo_telefone_movel.value.charAt(9))){
        campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 9) + "-" + campo_telefone_movel.value.slice(9);
        if(posicao_do_cursor >= 9){
          atualizacao_do_cursor++;
        }
      }else{
        campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 9) + "-" + campo_telefone_movel.value.slice(10);
      }
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(10))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 10) + campo_telefone_movel.value.slice(11);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(11))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 11) + campo_telefone_movel.value.slice(12);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(12))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 12) + campo_telefone_movel.value.slice(13);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(13))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 13) + campo_telefone_movel.value.slice(14);
    }
    if(campo_telefone_movel.value.length > 14){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 14);
    }
    
    posicao_do_cursor += atualizacao_do_cursor;
    campo_telefone_movel.setSelectionRange(posicao_do_cursor, posicao_do_cursor);
  });
  
  /* Ocultando popups */
  div_calendario.addEventListener("click", function(){
    ocultar_div_calendario = false;
  });
  caixa_de_selecao_setor.addEventListener("click", function(){
    ocultar_div_descricoes_dos_setores = false;
  });
  div_descricoes_dos_setores.addEventListener("click", function(){
    ocultar_div_descricoes_dos_setores = false;
  });
  
  document.addEventListener("click", function(){
    if(ocultar_div_calendario){
      div_calendario.classList.add("tag_oculta");
    }else{
      ocultar_div_calendario = true;
    }
    if(ocultar_div_descricoes_dos_setores){
      div_descricoes_dos_setores.classList.add("tag_oculta");
    }else{
      ocultar_div_descricoes_dos_setores = true;
    }
  });
  
  /* Comportamento dos popups quando a janela é redimensionada */
  window.addEventListener("resize", function(){
    div_calendario.classList.add("tag_oculta");
    div_descricoes_dos_setores.classList.add("tag_oculta");
  });
});
