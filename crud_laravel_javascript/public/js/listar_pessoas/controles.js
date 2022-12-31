window.addEventListener("load", function(){
  const form_filtros = document.getElementById("form_filtros");
  const campo_filtro_nome = document.getElementById("campo_filtro_nome");
  const campo_filtro_cpf = document.getElementById("campo_filtro_cpf");
  const campo_filtro_data_de_nascimento = document.getElementById("campo_filtro_data_de_nascimento");
  const caixa_de_selecao_filtro_setor = document.getElementById("caixa_de_selecao_filtro_setor");
  const caixa_de_selecao_quantidade_por_pagina = document.getElementById("caixa_de_selecao_quantidade_por_pagina");
  const campo_ordenacao = document.getElementById("campo_ordenacao");
  
  /* Guardando backup dos valores do formulário de filtros */
  const filtro_nome = campo_filtro_nome.value;
  const filtro_cpf = campo_filtro_cpf.value;
  const filtro_data_de_nascimento = campo_filtro_data_de_nascimento.value;
  const filtro_setor = caixa_de_selecao_filtro_setor.value;
  const quantidade_por_pagina = caixa_de_selecao_quantidade_por_pagina.value;
  const ordenacao = campo_ordenacao.value;
  
  /* Máscara do campo_filtro_cpf */
  let ultimo_valor_campo_filtro_cpf = "";
  
  campo_filtro_cpf.addEventListener("keyup", function(evento){
    evento.preventDefault();
    
    let posicao_do_cursor = campo_filtro_cpf.selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      ultimo_valor_campo_filtro_cpf = campo_filtro_cpf.value;
      return;
    }
    
    campo_filtro_cpf.value = campo_filtro_cpf.value.replace(/[^0-9]/g, "");
    
    if(campo_filtro_cpf.value.length >= 3){
      campo_filtro_cpf.value = campo_filtro_cpf.value.slice(0, 3) + "." + campo_filtro_cpf.value.slice(3);
      if((posicao_do_cursor === 3 || posicao_do_cursor === 4) && campo_filtro_cpf.value.length > ultimo_valor_campo_filtro_cpf.length){
        posicao_do_cursor++;
      }else if(campo_filtro_cpf.value.length >= 7 && posicao_do_cursor === 4){
        posicao_do_cursor++;
      }
    }
    if(campo_filtro_cpf.value.length >= 7){
      campo_filtro_cpf.value = campo_filtro_cpf.value.slice(0, 7) + "." + campo_filtro_cpf.value.slice(7);
      if((posicao_do_cursor === 7 || posicao_do_cursor === 8) && campo_filtro_cpf.value.length > ultimo_valor_campo_filtro_cpf.length){
        posicao_do_cursor++;
      }else if(campo_filtro_cpf.value.length >= 11 && posicao_do_cursor === 8){
        posicao_do_cursor++;
      }
    }
    if(campo_filtro_cpf.value.length >= 11){
      campo_filtro_cpf.value = campo_filtro_cpf.value.slice(0, 11) + "-" + campo_filtro_cpf.value.slice(11);
      if((posicao_do_cursor === 11 || posicao_do_cursor === 12) && campo_filtro_cpf.value.length > ultimo_valor_campo_filtro_cpf.length){
        posicao_do_cursor++;
      }
    }
    if(campo_filtro_cpf.value.length > 14){
      campo_filtro_cpf.value = campo_filtro_cpf.value.slice(0, 14);
    }
    
    campo_filtro_cpf.setSelectionRange(posicao_do_cursor, posicao_do_cursor);
    
    ultimo_valor_campo_filtro_cpf = campo_filtro_cpf.value;
  });
  
  /* Seletor de data (calendário) do campo_filtro_data_de_nascimento */
  const span_icone_de_calendario_do_campo_filtro_data_de_nascimento = document.getElementById("span_icone_de_calendario_do_campo_filtro_data_de_nascimento");
  const div_calendario = document.getElementById("div_calendario");
  const caixa_de_selecao_de_mes_do_calendario = document.getElementById("caixa_de_selecao_de_mes_do_calendario");
  const caixa_de_selecao_de_ano_do_calendario = document.getElementById("caixa_de_selecao_de_ano_do_calendario");
  const celulas_do_calendario = document.getElementsByClassName("celula_do_calendario");
  const botao_confirmar_do_calendario = document.getElementById("botao_confirmar_do_calendario");
  
  let dia_selecionado = null;
  let ocultar_div_calendario = true;
  
  campo_filtro_data_de_nascimento.addEventListener("keyup", function(){
    atualizar_calendario();
  });
  
  campo_filtro_data_de_nascimento.addEventListener("click", function(){
    ocultar_div_calendario = false;
  });
  
  span_icone_de_calendario_do_campo_filtro_data_de_nascimento.addEventListener("click", function(){
    ocultar_div_calendario = false;
    mostrar_calendario();
  });
  
  /* Impedindo clique duplo selecionar o texto */
  span_icone_de_calendario_do_campo_filtro_data_de_nascimento.addEventListener("mousedown", function(evento){
    evento.preventDefault();
  });
  
  function mostrar_calendario(){
    if(div_calendario.classList.contains("tag_oculta")){
      let posicao_x = campo_filtro_data_de_nascimento.getBoundingClientRect().left + window.scrollX;
      let posicao_y = campo_filtro_data_de_nascimento.getBoundingClientRect().top + window.scrollY;
      
      let altura = 0;
      var estilo_computado = window.getComputedStyle(campo_filtro_data_de_nascimento);
      altura += parseInt(estilo_computado.borderTopWidth, 10);
      altura += parseInt(estilo_computado.paddingTop, 10);
      altura += parseInt(estilo_computado.height, 10);
      altura += parseInt(estilo_computado.paddingBottom, 10);
      altura += parseInt(estilo_computado.borderBottomWidth, 10);
      posicao_y += altura;
      
      div_calendario.style.position = "absolute";
      div_calendario.style.top = posicao_y + "px";
      div_calendario.style.left = posicao_x + "px";
      if(window.innerWidth <= 640){
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
    let valor = campo_filtro_data_de_nascimento.value;
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
    if(campo_filtro_data_de_nascimento !== null){
      campo_filtro_data_de_nascimento.value = valor;
    }
    
    div_calendario.classList.add("tag_oculta");
  });
  
  /* Comportamento do botão buscar */
  const botao_buscar = document.getElementById("botao_buscar");
  
  botao_buscar.addEventListener("click", function(evento){
    evento.preventDefault();
    
    let quantidade_nao_enviada = 0;
    
    if(campo_filtro_nome.value == ""){
      campo_filtro_nome.setAttribute("name", "");
      quantidade_nao_enviada++;
    }
    if(campo_filtro_cpf.value == ""){
      campo_filtro_cpf.setAttribute("name", "");
      quantidade_nao_enviada++;
    }
    if(campo_filtro_data_de_nascimento.value == ""){
      campo_filtro_data_de_nascimento.setAttribute("name", "");
      quantidade_nao_enviada++;
    }
    if(caixa_de_selecao_filtro_setor.value == ""){
      caixa_de_selecao_filtro_setor.setAttribute("name", "");
      quantidade_nao_enviada++;
    }
    if(caixa_de_selecao_quantidade_por_pagina.value == "padrao"){
      caixa_de_selecao_quantidade_por_pagina.setAttribute("name", "");
      quantidade_nao_enviada++;
    }
    if(campo_ordenacao.value == "padrao"){
      campo_ordenacao.setAttribute("name", "");
      quantidade_nao_enviada++;
    }
    
    if(quantidade_nao_enviada == 6){
      window.location.href = "/listar_pessoas";
    }else{
      form_filtros.submit();
    }
  });
  
  /* Comportamento do botão limpar */
  const botao_limpar = document.getElementById("botao_limpar");
  
  botao_limpar.addEventListener("click", function(evento){
    evento.preventDefault();
    window.location.href = "/listar_pessoas";
  });
  
  /* Comportamento dos links da paginação */
  const links_da_paginacao = document.querySelectorAll("#div_paginacao_de_cima_da_lista_de_pessoas>a, #div_paginacao_de_baixo_da_lista_de_pessoas>a");
  
  for(let i = 0; i < links_da_paginacao.length; i++){
    links_da_paginacao[i].addEventListener("click", function(evento){
      evento.preventDefault();
      
      /* Os valores devem ser aqueles utilizados na busca ao invés do que foi digitado após */
      campo_filtro_nome.value = filtro_nome;
      campo_filtro_cpf.value = filtro_cpf;
      campo_filtro_data_de_nascimento.value = filtro_data_de_nascimento;
      caixa_de_selecao_filtro_setor.value = filtro_setor;
      caixa_de_selecao_quantidade_por_pagina.value = quantidade_por_pagina;
      campo_ordenacao.value = ordenacao;
      
      if(campo_filtro_nome.value == ""){
        campo_filtro_nome.setAttribute("name", "");
      }
      if(campo_filtro_cpf.value == ""){
        campo_filtro_cpf.setAttribute("name", "");
      }
      if(campo_filtro_data_de_nascimento.value == ""){
        campo_filtro_data_de_nascimento.setAttribute("name", "");
      }
      if(caixa_de_selecao_filtro_setor.value == ""){
        caixa_de_selecao_filtro_setor.setAttribute("name", "");
      }
      if(caixa_de_selecao_quantidade_por_pagina.value == "padrao"){
        caixa_de_selecao_quantidade_por_pagina.setAttribute("name", "");
      }
      if(campo_ordenacao.value == "padrao"){
        campo_ordenacao.setAttribute("name", "");
      }
      
      let href = links_da_paginacao[i].getAttribute("href");
      let pagina = href.replace("/listar_pessoas?pagina=", "");
      
      let elemento_campo_pagina = document.createElement("input");
      elemento_campo_pagina.setAttribute("type", "hidden");
      elemento_campo_pagina.setAttribute("name", "pagina");
      elemento_campo_pagina.setAttribute("value", pagina);
      
      form_filtros.appendChild(elemento_campo_pagina);
      form_filtros.submit();
    });
  }
  
  /* Ordenação */
  const div_parte_nome_da_lista_de_pessoas = document.getElementById("div_parte_nome_da_lista_de_pessoas");
  const div_parte_cpf_da_lista_de_pessoas = document.getElementById("div_parte_cpf_da_lista_de_pessoas");
  const div_parte_setor_da_lista_de_pessoas = document.getElementById("div_parte_setor_da_lista_de_pessoas");
  const div_parte_contato_da_lista_de_pessoas = document.getElementById("div_parte_contato_da_lista_de_pessoas");
  const partes_da_lista = document.getElementsByClassName("parte_da_lista");
  
  /* Impedindo clique duplo selecionar o texto */
  for(let i = 0; i < partes_da_lista.length; i++){
    partes_da_lista[i].addEventListener("mousedown", function(evento){
      const texto = partes_da_lista[i].querySelector("span").innerText;
      
      if(texto === "Opções"){
        return;
      }
      
      evento.preventDefault();
    });
    
    partes_da_lista[i].addEventListener("click", function(){
      const texto = partes_da_lista[i].querySelector("span").innerText;
      
      if(texto === "Opções"){
        return;
      }
      
      /* Os valores devem ser aqueles utilizados na busca ao invés do que foi digitado após */
      campo_filtro_nome.value = filtro_nome;
      campo_filtro_cpf.value = filtro_cpf;
      campo_filtro_data_de_nascimento.value = filtro_data_de_nascimento;
      caixa_de_selecao_filtro_setor.value = filtro_setor;
      caixa_de_selecao_quantidade_por_pagina.value = quantidade_por_pagina;
      campo_ordenacao.value = ordenacao;
      
      /* Trocando o valor após o clique */
      switch (texto){
        case "Nome":
          campo_ordenacao.value = "nome_completo_a_z";
          break;
        case "Nome (A → Z)":
          campo_ordenacao.value = "nome_completo_z_a";
          break;
        case "Nome (Z → A)":
          campo_ordenacao.value = "padrao";
          break;
        case "CPF":
          campo_ordenacao.value = "cpf_crescente";
          break;
        case "CPF (0 → 9)":
          campo_ordenacao.value = "cpf_decrescente";
          break;
        case "CPF (9 → 0)":
          campo_ordenacao.value = "padrao";
          break;
        case "Setor":
          campo_ordenacao.value = "setor_a_z";
          break;
        case "Setor (A → Z)":
          campo_ordenacao.value = "setor_z_a";
          break;
        case "Setor (Z → A)":
          campo_ordenacao.value = "padrao";
          break;
        case "Contato":
          campo_ordenacao.value = "contato_a_z";
          break;
        case "Contato (A → Z)":
          campo_ordenacao.value = "contato_z_a";
          break;
        case "Contato (Z → A)":
          campo_ordenacao.value = "padrao";
          break;
      }
      
      /* Não enviar valores vazios ou padrões */
      let quantidade_nao_enviada = 0;
      
      if(campo_filtro_nome.value == ""){
        campo_filtro_nome.setAttribute("name", "");
        quantidade_nao_enviada++;
      }
      if(campo_filtro_cpf.value == ""){
        campo_filtro_cpf.setAttribute("name", "");
        quantidade_nao_enviada++;
      }
      if(campo_filtro_data_de_nascimento.value == ""){
        campo_filtro_data_de_nascimento.setAttribute("name", "");
        quantidade_nao_enviada++;
      }
      if(caixa_de_selecao_filtro_setor.value == ""){
        caixa_de_selecao_filtro_setor.setAttribute("name", "");
        quantidade_nao_enviada++;
      }
      if(caixa_de_selecao_quantidade_por_pagina.value == "padrao"){
        caixa_de_selecao_quantidade_por_pagina.setAttribute("name", "");
        quantidade_nao_enviada++;
      }
      if(campo_ordenacao.value == "padrao"){
        campo_ordenacao.setAttribute("name", "");
        quantidade_nao_enviada++;
      }
      
      if(quantidade_nao_enviada == 6){
        window.location.href = "/listar_pessoas";
      }else{
        form_filtros.submit();
      }
    });
  }
  
  /* Ocultando popups */
  div_calendario.addEventListener("click", function(){
    ocultar_div_calendario = false;
  });
  
  document.addEventListener("click", function(){
    if(ocultar_div_calendario){
      div_calendario.classList.add("tag_oculta");
    }else{
      ocultar_div_calendario = true;
    }
  });
});
