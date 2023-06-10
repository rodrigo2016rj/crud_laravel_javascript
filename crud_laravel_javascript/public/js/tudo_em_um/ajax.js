window.addEventListener("load", function(){
  const tag_html = document.querySelector("html");
  
  /* Filtros, ordenação e paginação da lista de pessoas */
  const campo_filtro_nome = document.getElementById("campo_filtro_nome");
  const campo_filtro_cpf = document.getElementById("campo_filtro_cpf");
  const campo_filtro_data_de_nascimento = document.getElementById("campo_filtro_data_de_nascimento");
  const caixa_de_selecao_filtro_setor = document.getElementById("caixa_de_selecao_filtro_setor");
  const caixa_de_selecao_quantidade_por_pagina = document.getElementById("caixa_de_selecao_quantidade_por_pagina");
  
  const campo_ordenacao = document.getElementById("campo_ordenacao");
  const botao_buscar = document.getElementById("botao_buscar");
  const botao_limpar = document.getElementById("botao_limpar");
  
  const div_local_da_lista_de_pessoas = document.getElementById("div_local_da_lista_de_pessoas");
  const span_status_da_busca = document.getElementById("span_status_da_busca");
  
  const div_paginacao_de_cima_da_lista_de_pessoas = document.getElementById("div_paginacao_de_cima_da_lista_de_pessoas");
  const div_paginacao_de_baixo_da_lista_de_pessoas = document.getElementById("div_paginacao_de_baixo_da_lista_de_pessoas");
  let links_da_paginacao = document.querySelectorAll("#div_paginacao_de_cima_da_lista_de_pessoas>a, #div_paginacao_de_baixo_da_lista_de_pessoas>a");
  let pagina_selecionada = document.getElementsByClassName("pagina_selecionada")[0];
  
  const div_partes_da_lista_de_pessoas = document.getElementById("div_partes_da_lista_de_pessoas");
  const partes_da_lista = document.getElementsByClassName("parte_da_lista");
  const div_lista_de_pessoas = document.getElementById("div_lista_de_pessoas");
  
  const botao_confirmar_do_calendario = document.getElementById("botao_confirmar_do_calendario");
  
  const div_cadastrar_pessoa = document.getElementById("div_cadastrar_pessoa");
  const div_editar_pessoa = document.getElementById("div_editar_pessoa");
  
  let ordenacao = campo_ordenacao.value;
  let pagina = null;
  if(typeof pagina_selecionada != "undefined"){
    pagina = pagina_selecionada.innerText;
  }
  let contador_de_filtro = 0;
  
  campo_filtro_nome.addEventListener("keyup", function(){
    setTimeout(function(){
      botao_buscar.click();
    }, 0);
  });
  campo_filtro_cpf.addEventListener("keyup", function(){
    setTimeout(function(){
      botao_buscar.click();
    }, 0);
  });
  campo_filtro_data_de_nascimento.addEventListener("keyup", function(){
    setTimeout(function(){
      botao_buscar.click();
    }, 0);
  });
  caixa_de_selecao_filtro_setor.addEventListener("change", function(){
    setTimeout(function(){
      botao_buscar.click();
    }, 0);
  });
  caixa_de_selecao_quantidade_por_pagina.addEventListener("change", function(){
    setTimeout(function(){
      botao_buscar.click();
    }, 0);
  });
  botao_confirmar_do_calendario.addEventListener("click", function(){
    if(!div_cadastrar_pessoa.classList.contains("tag_oculta") || !div_editar_pessoa.classList.contains("tag_oculta")){
      return;
    }
    setTimeout(function(){
      botao_buscar.click();
    }, 0);
  });
  
  botao_buscar.addEventListener("click", function(){
    let filtro_nome = campo_filtro_nome.value;
    let filtro_cpf = campo_filtro_cpf.value;
    let filtro_data_de_nascimento = campo_filtro_data_de_nascimento.value;
    let filtro_id_do_setor = caixa_de_selecao_filtro_setor.value;
    let quantidade_por_pagina = caixa_de_selecao_quantidade_por_pagina.value;
    
    pagina = null;
    
    contador_de_filtro++;
    let numero_desta_acao_filtrar = contador_de_filtro;
    
    span_status_da_busca.innerText = "Buscando...";
    span_status_da_busca.classList.remove("tag_oculta");
    //div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = ""; //Opcional
    //div_partes_da_lista_de_pessoas.classList.add("tag_oculta"); //Opcional
    //div_lista_de_pessoas.innerHTML = "Aguarde..."; //Opcional
    //div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = ""; //Opcional
    
    /* Requisição ajax */
    let conexao_ajax = null;
    if(window.XMLHttpRequest){
      conexao_ajax = new XMLHttpRequest();
    }else if(window.ActiveXObject){
      conexao_ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    const tipo = "GET";
    let url_mais = "";
    url_mais += "?filtro_nome=" + filtro_nome;
    url_mais += "&filtro_cpf=" + filtro_cpf;
    url_mais += "&filtro_data_de_nascimento=" + filtro_data_de_nascimento;
    url_mais += "&filtro_id_do_setor=" + filtro_id_do_setor;
    url_mais += "&quantidade_por_pagina=" + quantidade_por_pagina;
    url_mais += "&ordenacao=" + ordenacao;
    let url = "/tudo_em_um/mostrar_pessoas_ajax" + url_mais;
    let dados_post = null;
    let resposta = null;
    conexao_ajax.onreadystatechange = function(){
      if(conexao_ajax.readyState == 4){
        if(conexao_ajax.status == 200){
          resposta = JSON.parse(conexao_ajax.responseText);
          
          if(numero_desta_acao_filtrar >= contador_de_filtro){
            span_status_da_busca.innerText = "";
            span_status_da_busca.classList.add("tag_oculta");
            div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = resposta.paginacao;
            //div_partes_da_lista_de_pessoas.classList.remove("tag_oculta"); //Opcional
            div_lista_de_pessoas.innerHTML = resposta.lista;
            div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = resposta.paginacao;
            
            atualizando_botoes_de_radio_de_um_popup("div_editar_pessoa");
            
            links_da_paginacao = document.querySelectorAll("#div_paginacao_de_cima_da_lista_de_pessoas>a, #div_paginacao_de_baixo_da_lista_de_pessoas>a");
            pagina_selecionada = document.getElementsByClassName("pagina_selecionada")[0];
            if(typeof pagina_selecionada != "undefined"){
              eventos_dos_links_da_paginacao();
            }else{
              div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = "";
              div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = "";
            }
            
            links_de_nome_da_pessoa = document.getElementsByClassName("nome_da_pessoa");
            eventos_dos_links_de_nome_da_pessoa();
            
            links_de_editar_pessoa = document.getElementsByClassName("link_editar_pessoa");
            eventos_dos_links_de_editar_pessoa();
            
            links_excluir_pessoa = document.getElementsByClassName("link_excluir_pessoa");
            eventos_dos_links_de_excluir_pessoa();
          }
        }
      }
    }
    conexao_ajax.open(tipo, url, true);
    conexao_ajax.setRequestHeader("Content-Type", "application/json");
    conexao_ajax.send(JSON.stringify(dados_post));
  });
  
  botao_limpar.addEventListener("click", function(){
    campo_filtro_nome.value = "";
    campo_filtro_cpf.value = "";
    campo_filtro_data_de_nascimento.value = "";
    caixa_de_selecao_filtro_setor.value = "";
    caixa_de_selecao_quantidade_por_pagina.value = "padrao";
    
    partes_da_lista[0].querySelector("span").innerText = "Nome";
    partes_da_lista[1].querySelector("span").innerText = "CPF";
    partes_da_lista[2].querySelector("span").innerText = "Setor";
    partes_da_lista[3].querySelector("span").innerText = "Contato";
    ordenacao = null;
    
    pagina = null;
    
    contador_de_filtro++;
    let numero_desta_acao_filtrar = contador_de_filtro;
    
    span_status_da_busca.innerText = "Buscando...";
    span_status_da_busca.classList.remove("tag_oculta");
    div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = ""; //Opcional
    div_partes_da_lista_de_pessoas.classList.add("tag_oculta"); //Opcional
    div_lista_de_pessoas.innerHTML = "Aguarde..."; //Opcional
    div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = ""; //Opcional
    
    /* Requisição ajax */
    let conexao_ajax = null;
    if(window.XMLHttpRequest){
      conexao_ajax = new XMLHttpRequest();
    }else if(window.ActiveXObject){
      conexao_ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    const tipo = "GET";
    let url_mais = "";
    let url = "/tudo_em_um/mostrar_pessoas_ajax" + url_mais;
    let dados_post = null;
    let resposta = null;
    conexao_ajax.onreadystatechange = function(){
      if(conexao_ajax.readyState == 4){
        if(conexao_ajax.status == 200){
          resposta = JSON.parse(conexao_ajax.responseText);
          
          if(numero_desta_acao_filtrar >= contador_de_filtro){
            span_status_da_busca.innerText = "";
            span_status_da_busca.classList.add("tag_oculta");
            div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = resposta.paginacao;
            div_partes_da_lista_de_pessoas.classList.remove("tag_oculta"); //Opcional
            div_lista_de_pessoas.innerHTML = resposta.lista;
            div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = resposta.paginacao;
            
            atualizando_botoes_de_radio_de_um_popup("div_editar_pessoa");
            
            links_da_paginacao = document.querySelectorAll("#div_paginacao_de_cima_da_lista_de_pessoas>a, #div_paginacao_de_baixo_da_lista_de_pessoas>a");
            pagina_selecionada = document.getElementsByClassName("pagina_selecionada")[0];
            if(typeof pagina_selecionada != "undefined"){
              eventos_dos_links_da_paginacao();
            }else{
              div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = "";
              div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = "";
            }
            
            links_de_nome_da_pessoa = document.getElementsByClassName("nome_da_pessoa");
            eventos_dos_links_de_nome_da_pessoa();
            
            links_de_editar_pessoa = document.getElementsByClassName("link_editar_pessoa");
            eventos_dos_links_de_editar_pessoa();
            
            links_excluir_pessoa = document.getElementsByClassName("link_excluir_pessoa");
            eventos_dos_links_de_excluir_pessoa();
          }
        }
      }
    }
    conexao_ajax.open(tipo, url, true);
    conexao_ajax.setRequestHeader("Content-Type", "application/json");
    conexao_ajax.send(JSON.stringify(dados_post));
  });
  
  eventos_dos_links_da_paginacao();
  
  function eventos_dos_links_da_paginacao(){
    for(let i = 0; i < links_da_paginacao.length; i++){
      links_da_paginacao[i].removeEventListener("click", evento_do_link_da_paginacao);
      links_da_paginacao[i].addEventListener("click", evento_do_link_da_paginacao);
    }
  }
  
  function evento_do_link_da_paginacao(evento){
    evento.preventDefault();
    
    const tag_que_disparou_o_evento = evento.currentTarget;
    
    let filtro_nome = campo_filtro_nome.value;
    let filtro_cpf = campo_filtro_cpf.value;
    let filtro_data_de_nascimento = campo_filtro_data_de_nascimento.value;
    let filtro_id_do_setor = caixa_de_selecao_filtro_setor.value;
    let quantidade_por_pagina = caixa_de_selecao_quantidade_por_pagina.value;
    
    let href = tag_que_disparou_o_evento.getAttribute("href");
    pagina = href.replace("/tudo_em_um?pagina=", "");
    
    contador_de_filtro++;
    let numero_desta_acao_filtrar = contador_de_filtro;
    
    span_status_da_busca.innerText = "Mudando de página...";
    span_status_da_busca.classList.remove("tag_oculta");
    //div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = ""; //Opcional
    //div_partes_da_lista_de_pessoas.classList.add("tag_oculta"); //Opcional
    //div_lista_de_pessoas.innerHTML = "Aguarde..."; //Opcional
    //div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = ""; //Opcional
    
    let posicao_vertical_desta_tag = tag_que_disparou_o_evento.getBoundingClientRect().top + window.scrollY;
    let posicao_vertical_da_div_lista_de_pessoas = div_lista_de_pessoas.getBoundingClientRect().top + window.scrollY;
    if(posicao_vertical_desta_tag > posicao_vertical_da_div_lista_de_pessoas){
      let posicao_vertical_da_div_local_da_lista_de_pessoas = div_local_da_lista_de_pessoas.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, posicao_vertical_da_div_local_da_lista_de_pessoas - 4);
    }
    
    /* Requisição ajax */
    let conexao_ajax = null;
    if(window.XMLHttpRequest){
      conexao_ajax = new XMLHttpRequest();
    }else if(window.ActiveXObject){
      conexao_ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    const tipo = "GET";
    let url_mais = "";
    url_mais += "?filtro_nome=" + filtro_nome;
    url_mais += "&filtro_cpf=" + filtro_cpf;
    url_mais += "&filtro_data_de_nascimento=" + filtro_data_de_nascimento;
    url_mais += "&filtro_id_do_setor=" + filtro_id_do_setor;
    url_mais += "&quantidade_por_pagina=" + quantidade_por_pagina;
    url_mais += "&ordenacao=" + ordenacao;
    url_mais += "&pagina=" + pagina;
    let url = "/tudo_em_um/mostrar_pessoas_ajax" + url_mais;
    let dados_post = null;
    let resposta = null;
    conexao_ajax.onreadystatechange = function(){
      if(conexao_ajax.readyState == 4){
        if(conexao_ajax.status == 200){
          resposta = JSON.parse(conexao_ajax.responseText);
          
          if(numero_desta_acao_filtrar >= contador_de_filtro){
            span_status_da_busca.innerText = "";
            span_status_da_busca.classList.add("tag_oculta");
            div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = resposta.paginacao;
            //div_partes_da_lista_de_pessoas.classList.remove("tag_oculta"); //Opcional
            div_lista_de_pessoas.innerHTML = resposta.lista;
            div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = resposta.paginacao;
            
            atualizando_botoes_de_radio_de_um_popup("div_editar_pessoa");
            
            links_da_paginacao = document.querySelectorAll("#div_paginacao_de_cima_da_lista_de_pessoas>a, #div_paginacao_de_baixo_da_lista_de_pessoas>a");
            pagina_selecionada = document.getElementsByClassName("pagina_selecionada")[0];
            if(typeof pagina_selecionada != "undefined"){
              eventos_dos_links_da_paginacao();
            }else{
              div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = "";
              div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = "";
            }
            
            links_de_nome_da_pessoa = document.getElementsByClassName("nome_da_pessoa");
            eventos_dos_links_de_nome_da_pessoa();
            
            links_de_editar_pessoa = document.getElementsByClassName("link_editar_pessoa");
            eventos_dos_links_de_editar_pessoa();
            
            links_excluir_pessoa = document.getElementsByClassName("link_excluir_pessoa");
            eventos_dos_links_de_excluir_pessoa();
          }
        }
      }
    }
    conexao_ajax.open(tipo, url, true);
    conexao_ajax.setRequestHeader("Content-Type", "application/json");
    conexao_ajax.send(JSON.stringify(dados_post));
  }
  
  for(let i = 0; i < partes_da_lista.length; i++){
    partes_da_lista[i].addEventListener("click", function(){
      const texto = partes_da_lista[i].querySelector("span").innerText;
      
      if(texto === "Opções"){
        return;
      }
      
      let filtro_nome = campo_filtro_nome.value;
      let filtro_cpf = campo_filtro_cpf.value;
      let filtro_data_de_nascimento = campo_filtro_data_de_nascimento.value;
      let filtro_id_do_setor = caixa_de_selecao_filtro_setor.value;
      let quantidade_por_pagina = caixa_de_selecao_quantidade_por_pagina.value;
      
      partes_da_lista[0].querySelector("span").innerText = "Nome";
      partes_da_lista[1].querySelector("span").innerText = "CPF";
      partes_da_lista[2].querySelector("span").innerText = "Setor";
      partes_da_lista[3].querySelector("span").innerText = "Contato";
      
      /* Trocando o valor após o clique */
      switch (texto){
        case "Nome":
          ordenacao = "nome_completo_a_z";
          partes_da_lista[i].querySelector("span").innerText = "Nome (A → Z)";
          break;
        case "Nome (A → Z)":
          ordenacao = "nome_completo_z_a";
          partes_da_lista[i].querySelector("span").innerText = "Nome (Z → A)";
          break;
        case "Nome (Z → A)":
          ordenacao = "padrao";
          partes_da_lista[i].querySelector("span").innerText = "Nome";
          break;
        case "CPF":
          ordenacao = "cpf_crescente";
          partes_da_lista[i].querySelector("span").innerText = "CPF (0 → 9)";
          break;
        case "CPF (0 → 9)":
          ordenacao = "cpf_decrescente";
          partes_da_lista[i].querySelector("span").innerText = "CPF (9 → 0)";
          break;
        case "CPF (9 → 0)":
          ordenacao = "padrao";
          partes_da_lista[i].querySelector("span").innerText = "CPF";
          break;
        case "Setor":
          ordenacao = "setor_a_z";
          partes_da_lista[i].querySelector("span").innerText = "Setor (A → Z)";
          break;
        case "Setor (A → Z)":
          ordenacao = "setor_z_a";
          partes_da_lista[i].querySelector("span").innerText = "Setor (Z → A)";
          break;
        case "Setor (Z → A)":
          ordenacao = "padrao";
          partes_da_lista[i].querySelector("span").innerText = "Setor";
          break;
        case "Contato":
          ordenacao = "contato_a_z";
          partes_da_lista[i].querySelector("span").innerText = "Contato (A → Z)";
          break;
        case "Contato (A → Z)":
          ordenacao = "contato_z_a";
          partes_da_lista[i].querySelector("span").innerText = "Contato (Z → A)";
          break;
        case "Contato (Z → A)":
          ordenacao = "padrao";
          partes_da_lista[i].querySelector("span").innerText = "Contato";
          break;
      }
      
      pagina = null;
      
      contador_de_filtro++;
      let numero_desta_acao_filtrar = contador_de_filtro;
      
      span_status_da_busca.innerText = "Ordenando...";
      span_status_da_busca.classList.remove("tag_oculta");
      //div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = ""; //Opcional
      //div_partes_da_lista_de_pessoas.classList.add("tag_oculta"); //Opcional
      //div_lista_de_pessoas.innerHTML = "Aguarde..."; //Opcional
      //div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = ""; //Opcional
      
      /* Requisição ajax */
      let conexao_ajax = null;
      if(window.XMLHttpRequest){
        conexao_ajax = new XMLHttpRequest();
      }else if(window.ActiveXObject){
        conexao_ajax = new ActiveXObject("Microsoft.XMLHTTP");
      }
      const tipo = "GET";
      let url_mais = "";
      url_mais += "?filtro_nome=" + filtro_nome;
      url_mais += "&filtro_cpf=" + filtro_cpf;
      url_mais += "&filtro_data_de_nascimento=" + filtro_data_de_nascimento;
      url_mais += "&filtro_id_do_setor=" + filtro_id_do_setor;
      url_mais += "&quantidade_por_pagina=" + quantidade_por_pagina;
      url_mais += "&ordenacao=" + ordenacao;
      let url = "/tudo_em_um/mostrar_pessoas_ajax" + url_mais;
      let dados_post = null;
      let resposta = null;
      conexao_ajax.onreadystatechange = function(){
        if(conexao_ajax.readyState == 4){
          if(conexao_ajax.status == 200){
            resposta = JSON.parse(conexao_ajax.responseText);
            
            if(numero_desta_acao_filtrar >= contador_de_filtro){
              span_status_da_busca.innerText = "";
              span_status_da_busca.classList.add("tag_oculta");
              div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = resposta.paginacao;
              //div_partes_da_lista_de_pessoas.classList.remove("tag_oculta"); //Opcional
              div_lista_de_pessoas.innerHTML = resposta.lista;
              div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = resposta.paginacao;
              
              atualizando_botoes_de_radio_de_um_popup("div_editar_pessoa");
              
              links_da_paginacao = document.querySelectorAll("#div_paginacao_de_cima_da_lista_de_pessoas>a, #div_paginacao_de_baixo_da_lista_de_pessoas>a");
              pagina_selecionada = document.getElementsByClassName("pagina_selecionada")[0];
              if(typeof pagina_selecionada != "undefined"){
                eventos_dos_links_da_paginacao();
              }else{
                div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = "";
                div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = "";
              }
              
              links_de_nome_da_pessoa = document.getElementsByClassName("nome_da_pessoa");
              eventos_dos_links_de_nome_da_pessoa();
              
              links_de_editar_pessoa = document.getElementsByClassName("link_editar_pessoa");
              eventos_dos_links_de_editar_pessoa();
              
              links_excluir_pessoa = document.getElementsByClassName("link_excluir_pessoa");
              eventos_dos_links_de_excluir_pessoa();
            }
          }
        }
      }
      conexao_ajax.open(tipo, url, true);
      conexao_ajax.setRequestHeader("Content-Type", "application/json");
      conexao_ajax.send(JSON.stringify(dados_post));
    });
  }
  
  /* Mostrar popup cadastrar pessoa */
  const link_cadastrar_pessoa = document.getElementById("link_cadastrar_pessoa");
  const div_fechar_da_div_cadastrar_pessoa = div_cadastrar_pessoa.querySelector(".div_fechar");
  const div_mensagem_cadastrar_pessoa = document.getElementById("div_mensagem_cadastrar_pessoa");
  const span_mensagem_cadastrar_pessoa = document.getElementById("span_mensagem_cadastrar_pessoa");
  
  let ocultar_div_cadastrar_pessoa = true;
  
  link_cadastrar_pessoa.addEventListener("click", function(evento){
    evento.preventDefault();
    
    div_cadastrar_pessoa.classList.remove("tag_oculta");
    ocultar_div_cadastrar_pessoa = false;
    
    div_mensagem_cadastrar_pessoa.classList.add("tag_oculta");
    span_mensagem_cadastrar_pessoa.classList.remove("mensagem_de_falha");
    span_mensagem_cadastrar_pessoa.classList.remove("mensagem_de_sucesso");
    span_mensagem_cadastrar_pessoa.innerText = "";
    
    let largura_da_div = 0;
    var estilo_computado = window.getComputedStyle(div_cadastrar_pessoa);
    largura_da_div += parseInt(estilo_computado.borderLeftWidth, 10);
    largura_da_div += parseInt(estilo_computado.paddingLeft, 10);
    largura_da_div += parseInt(estilo_computado.width, 10);
    largura_da_div += parseInt(estilo_computado.paddingRight, 10);
    largura_da_div += parseInt(estilo_computado.borderRightWidth, 10);
    
    let largura_da_tag_html = 0;
    var estilo_computado = window.getComputedStyle(tag_html);
    largura_da_tag_html += parseInt(estilo_computado.width, 10);
    
    var posicao_x = largura_da_tag_html / 2 - largura_da_div / 2;
    if(window.innerWidth <= largura_da_div){
      posicao_x = 0;
    }
    
    let altura_da_div = 0;
    var estilo_computado = window.getComputedStyle(div_cadastrar_pessoa);
    altura_da_div += parseInt(estilo_computado.borderTopWidth, 10);
    altura_da_div += parseInt(estilo_computado.paddingTop, 10);
    altura_da_div += parseInt(estilo_computado.height, 10);
    altura_da_div += parseInt(estilo_computado.paddingBottom, 10);
    altura_da_div += parseInt(estilo_computado.borderBottomWidth, 10);
    
    var posicao_y = window.scrollY + (window.innerHeight - altura_da_div) / 2;
    if(window.innerHeight <= altura_da_div){
      posicao_y = link_cadastrar_pessoa.getBoundingClientRect().top + window.scrollY;
    }
    
    div_cadastrar_pessoa.style.top = posicao_y + "px";
    div_cadastrar_pessoa.style.left = posicao_x + "px";
  });
  
  div_fechar_da_div_cadastrar_pessoa.addEventListener("click", function(){
    div_cadastrar_pessoa.classList.add("tag_oculta");
    ocultar_div_cadastrar_pessoa = true;
  });
  
  /* Botão Cadastrar Pessoa */
  const campo_nome = document.getElementById("campo_nome");
  const campo_sobrenome = document.getElementById("campo_sobrenome");
  const campo_cpf = document.getElementById("campo_cpf");
  const campo_data_de_nascimento = document.getElementById("campo_data_de_nascimento");
  const botoes_de_radio_para_sexo = document.querySelectorAll("input[type='radio'][name='sexo']");
  const caixa_de_selecao_setor = document.getElementById("caixa_de_selecao_setor");
  const campo_email = document.getElementById("campo_email");
  const campo_telefone_fixo = document.getElementById("campo_telefone_fixo");
  const campo_telefone_movel = document.getElementById("campo_telefone_movel");
  const campo_telefone_estrangeiro = document.getElementById("campo_telefone_estrangeiro");
  
  const div_botao_cadastrar = document.getElementById("div_botao_cadastrar");
  const botao_cadastrar = document.getElementById("botao_cadastrar");
  
  botao_cadastrar.addEventListener("click", function(){
    contador_de_filtro++;
    let numero_desta_acao_filtrar = contador_de_filtro;
    
    span_status_da_busca.innerText = "Atualizando...";
    span_status_da_busca.classList.remove("tag_oculta");
    //div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = ""; //Opcional
    //div_partes_da_lista_de_pessoas.classList.add("tag_oculta"); //Opcional
    //div_lista_de_pessoas.innerHTML = "Aguarde..."; //Opcional
    //div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = ""; //Opcional
    
    let nome = campo_nome.value;
    let sobrenome = campo_sobrenome.value;
    let cpf = campo_cpf.value;
    let data_de_nascimento = campo_data_de_nascimento.value;
    
    let sexo = document.querySelector("input[type='radio'][name='sexo']:checked");
    if(sexo !== null){
      sexo = sexo.getAttribute("value");
    }
    
    let id_do_setor = caixa_de_selecao_setor.value;
    let email = campo_email.value;
    let telefone_fixo = campo_telefone_fixo.value;
    let telefone_movel = campo_telefone_movel.value;
    let telefone_estrangeiro = campo_telefone_estrangeiro.value;
    
    let anti_csrf = div_botao_cadastrar.querySelector("input[name='_token']").value;
    
    div_mensagem_cadastrar_pessoa.classList.remove("tag_oculta");
    span_mensagem_cadastrar_pessoa.classList.remove("mensagem_de_falha");
    span_mensagem_cadastrar_pessoa.classList.remove("mensagem_de_sucesso");
    span_mensagem_cadastrar_pessoa.innerText = "Aguarde...";
    
    /* Requisição ajax */
    let conexao_ajax = null;
    if(window.XMLHttpRequest){
      conexao_ajax = new XMLHttpRequest();
    }else if(window.ActiveXObject){
      conexao_ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    const tipo = "POST";
    let url_mais = "";
    let url = "/tudo_em_um/cadastrar_pessoa_ajax" + url_mais;
    let dados_post = {filtro_nome: "", filtro_cpf: "", filtro_data_de_nascimento: "", filtro_id_do_setor: "", 
                      quantidade_por_pagina: "", ordenacao: null, nome: nome, sobrenome: sobrenome, cpf: cpf, 
                      data_de_nascimento: data_de_nascimento, sexo: sexo, id_do_setor: id_do_setor, email: email, 
                      telefone_fixo: telefone_fixo, telefone_movel: telefone_movel, 
                      telefone_estrangeiro: telefone_estrangeiro, _token: anti_csrf};
    let resposta = null;
    conexao_ajax.onreadystatechange = function(){
      if(conexao_ajax.readyState == 4){
        if(conexao_ajax.status == 200){
          resposta = JSON.parse(conexao_ajax.responseText);
          
          if(typeof resposta.mensagem_de_falha != "undefined"){
            span_mensagem_cadastrar_pessoa.setAttribute("class", "mensagem_de_falha");
            span_mensagem_cadastrar_pessoa.innerText = resposta.mensagem_de_falha;
            
            span_status_da_busca.innerText = "";
            span_status_da_busca.classList.add("tag_oculta");
            //div_partes_da_lista_de_pessoas.classList.remove("tag_oculta"); //Opcional
            return;
          }
          if(typeof resposta.mensagem_de_sucesso != "undefined"){
            span_mensagem_cadastrar_pessoa.setAttribute("class", "mensagem_de_sucesso");
            span_mensagem_cadastrar_pessoa.innerText = resposta.mensagem_de_sucesso;
            
            campo_nome.value = "";
            campo_sobrenome.value = "";
            campo_cpf.value = "";
            campo_data_de_nascimento.value = "";
            
            for(let i = 0; i < botoes_de_radio_para_sexo.length; i++){
              botoes_de_radio_para_sexo[i].checked = false;
            }
            
            caixa_de_selecao_setor.value = "";
            campo_email.value = "";
            campo_telefone_fixo.value = "";
            campo_telefone_movel.value = "";
            campo_telefone_estrangeiro.value = "";
          }
          if(numero_desta_acao_filtrar >= contador_de_filtro){
            campo_filtro_nome.value = "";
            campo_filtro_cpf.value = "";
            campo_filtro_data_de_nascimento.value = "";
            caixa_de_selecao_filtro_setor.value = "";
            caixa_de_selecao_quantidade_por_pagina.value = "padrao";
            
            partes_da_lista[0].querySelector("span").innerText = "Nome";
            partes_da_lista[1].querySelector("span").innerText = "CPF";
            partes_da_lista[2].querySelector("span").innerText = "Setor";
            partes_da_lista[3].querySelector("span").innerText = "Contato";
            ordenacao = null;
            
            pagina = null;
            
            span_status_da_busca.innerText = "";
            span_status_da_busca.classList.add("tag_oculta");
            //div_partes_da_lista_de_pessoas.classList.remove("tag_oculta"); //Opcional
            div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = resposta.paginacao;
            div_lista_de_pessoas.innerHTML = resposta.lista;
            div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = resposta.paginacao;
            
            atualizando_botoes_de_radio_de_um_popup("div_editar_pessoa");
            
            links_da_paginacao = document.querySelectorAll("#div_paginacao_de_cima_da_lista_de_pessoas>a, #div_paginacao_de_baixo_da_lista_de_pessoas>a");
            pagina_selecionada = document.getElementsByClassName("pagina_selecionada")[0];
            if(typeof pagina_selecionada != "undefined"){
              eventos_dos_links_da_paginacao();
            }else{
              div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = "";
              div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = "";
            }
            
            links_de_nome_da_pessoa = document.getElementsByClassName("nome_da_pessoa");
            eventos_dos_links_de_nome_da_pessoa();
            
            links_de_editar_pessoa = document.getElementsByClassName("link_editar_pessoa");
            eventos_dos_links_de_editar_pessoa();
            
            links_excluir_pessoa = document.getElementsByClassName("link_excluir_pessoa");
            eventos_dos_links_de_excluir_pessoa();
          }
        }
      }
    }
    conexao_ajax.open(tipo, url, true);
    conexao_ajax.setRequestHeader("Content-Type", "application/json");
    conexao_ajax.send(JSON.stringify(dados_post));
  });
  
  /* Mostrar popup visualizar pessoa */
  const div_visualizar_pessoa = document.getElementById("div_visualizar_pessoa");
  let links_de_nome_da_pessoa = document.getElementsByClassName("nome_da_pessoa");
  
  let ocultar_div_visualizar_pessoa = true;
  
  eventos_dos_links_de_nome_da_pessoa();
  
  function eventos_dos_links_de_nome_da_pessoa(){
    for(let i = 0; i < links_de_nome_da_pessoa.length; i++){
      links_de_nome_da_pessoa[i].removeEventListener("click", evento_do_link_nome_da_pessoa);
      links_de_nome_da_pessoa[i].addEventListener("click", evento_do_link_nome_da_pessoa);
    }
  }
  
  function evento_do_link_nome_da_pessoa(evento){
    evento.preventDefault();
    
    const tag_que_disparou_o_evento = evento.currentTarget;
    
    const href = tag_que_disparou_o_evento.getAttribute("href");
    const id_da_pessoa = href.replace("pessoa?id=", "");
    
    if(isNaN(id_da_pessoa) || id_da_pessoa % 1 != 0 || id_da_pessoa <= 0){
      return;
    }
    
    const html = document.getElementById("div_visualizar_pessoa_do_id_" + id_da_pessoa).innerHTML;
    
    div_visualizar_pessoa.innerHTML = html;
    div_visualizar_pessoa.classList.remove("tag_oculta");
    ocultar_div_visualizar_pessoa = false;
    
    const div_fechar_da_div_de_visualizar_pessoa = div_visualizar_pessoa.querySelector(".div_fechar");
    div_fechar_da_div_de_visualizar_pessoa.addEventListener("click", evento_da_div_fechar_da_div_de_visualizar_pessoa);
    
    let largura_da_div = 0;
    var estilo_computado = window.getComputedStyle(div_visualizar_pessoa);
    largura_da_div += parseInt(estilo_computado.borderLeftWidth, 10);
    largura_da_div += parseInt(estilo_computado.paddingLeft, 10);
    largura_da_div += parseInt(estilo_computado.width, 10);
    largura_da_div += parseInt(estilo_computado.paddingRight, 10);
    largura_da_div += parseInt(estilo_computado.borderRightWidth, 10);
    
    let largura_da_tag_html = 0;
    var estilo_computado = window.getComputedStyle(tag_html);
    largura_da_tag_html += parseInt(estilo_computado.width, 10);
    
    var posicao_x = largura_da_tag_html / 2 - largura_da_div / 2;
    if(window.innerWidth <= largura_da_div){
      posicao_x = 0;
    }
    
    let altura_da_div = 0;
    var estilo_computado = window.getComputedStyle(div_visualizar_pessoa);
    altura_da_div += parseInt(estilo_computado.borderTopWidth, 10);
    altura_da_div += parseInt(estilo_computado.paddingTop, 10);
    altura_da_div += parseInt(estilo_computado.height, 10);
    altura_da_div += parseInt(estilo_computado.paddingBottom, 10);
    altura_da_div += parseInt(estilo_computado.borderBottomWidth, 10);
    
    var posicao_y = window.scrollY + (window.innerHeight - altura_da_div) / 2;
    if(window.innerHeight <= altura_da_div){
      posicao_y = tag_que_disparou_o_evento.getBoundingClientRect().top + window.scrollY;
    }
    
    div_visualizar_pessoa.style.top = posicao_y + "px";
    div_visualizar_pessoa.style.left = posicao_x + "px";
  }
  
  function evento_da_div_fechar_da_div_de_visualizar_pessoa(){
    div_visualizar_pessoa.classList.add("tag_oculta");
    ocultar_div_visualizar_pessoa = true;
  }
  
  /* Mostrar popup editar pessoa */
  let links_de_editar_pessoa = document.getElementsByClassName("link_editar_pessoa");
  
  let ocultar_div_editar_pessoa = true;
  
  eventos_dos_links_de_editar_pessoa();
  
  function eventos_dos_links_de_editar_pessoa(){
    for(let i = 0; i < links_de_editar_pessoa.length; i++){
      links_de_editar_pessoa[i].removeEventListener("click", evento_do_link_editar_pessoa);
      links_de_editar_pessoa[i].addEventListener("click", evento_do_link_editar_pessoa);
    }
  }
  
  function evento_do_link_editar_pessoa(evento){
    evento.preventDefault();
    
    const tag_que_disparou_o_evento = evento.currentTarget;
    
    const href = tag_que_disparou_o_evento.getAttribute("href");
    const id_da_pessoa = href.replace("editar_pessoa?id=", "");
    
    if(isNaN(id_da_pessoa) || id_da_pessoa % 1 != 0 || id_da_pessoa <= 0){
      return;
    }
    
    const html = document.getElementById("div_editar_pessoa_do_id_" + id_da_pessoa).innerHTML;
    
    div_editar_pessoa.innerHTML = html;
    div_editar_pessoa.classList.remove("tag_oculta");
    ocultar_div_editar_pessoa = false;
    
    eventos_da_div_editar();
    
    let largura_da_div = 0;
    var estilo_computado = window.getComputedStyle(div_editar_pessoa);
    largura_da_div += parseInt(estilo_computado.borderLeftWidth, 10);
    largura_da_div += parseInt(estilo_computado.paddingLeft, 10);
    largura_da_div += parseInt(estilo_computado.width, 10);
    largura_da_div += parseInt(estilo_computado.paddingRight, 10);
    largura_da_div += parseInt(estilo_computado.borderRightWidth, 10);
    
    let largura_da_tag_html = 0;
    var estilo_computado = window.getComputedStyle(tag_html);
    largura_da_tag_html += parseInt(estilo_computado.width, 10);
    
    var posicao_x = largura_da_tag_html / 2 - largura_da_div / 2;
    if(window.innerWidth <= largura_da_div){
      posicao_x = 0;
    }
    
    let altura_da_div = 0;
    var estilo_computado = window.getComputedStyle(div_editar_pessoa);
    altura_da_div += parseInt(estilo_computado.borderTopWidth, 10);
    altura_da_div += parseInt(estilo_computado.paddingTop, 10);
    altura_da_div += parseInt(estilo_computado.height, 10);
    altura_da_div += parseInt(estilo_computado.paddingBottom, 10);
    altura_da_div += parseInt(estilo_computado.borderBottomWidth, 10);
    
    var posicao_y = window.scrollY + (window.innerHeight - altura_da_div) / 2;
    if(window.innerHeight <= altura_da_div){
      posicao_y = tag_que_disparou_o_evento.getBoundingClientRect().top + window.scrollY;
    }
    
    div_editar_pessoa.style.top = posicao_y + "px";
    div_editar_pessoa.style.left = posicao_x + "px";
  }
  
  function eventos_da_div_editar(){
    const div_fechar_da_div_de_editar_pessoa = div_editar_pessoa.querySelector(".div_fechar");
    div_fechar_da_div_de_editar_pessoa.addEventListener("click", evento_da_div_fechar_da_div_de_editar_pessoa);
    
    const labels_comuns_da_div_editar_pessoa = div_editar_pessoa.querySelectorAll("div>div>label:not(.item_da_lista_de_sexos)");
    for(let i = 0; i < labels_comuns_da_div_editar_pessoa.length; i++){
      labels_comuns_da_div_editar_pessoa[i].addEventListener("click", evento_das_labels_comuns_da_div_editar_pessoa);
    }
    
    const labels_sexo_da_div_editar_pessoa = div_editar_pessoa.querySelectorAll("div>div>label.item_da_lista_de_sexos");
    for(let i = 0; i < labels_sexo_da_div_editar_pessoa.length; i++){
      labels_sexo_da_div_editar_pessoa[i].addEventListener("click", evento_das_labels_sexo_da_div_editar_pessoa);
    }
    
    const campo_cpf = div_editar_pessoa.getElementsByClassName("campo_cpf")[0];
    campo_cpf.addEventListener("keyup", evento_do_campo_cpf);
    
    const campo_data_de_nascimento = div_editar_pessoa.getElementsByClassName("campo_data_de_nascimento")[0];
    campo_data_de_nascimento.addEventListener("mouseenter", evento_mouseenter_do_campo_data_de_nascimento);
    campo_data_de_nascimento.addEventListener("mouseleave", evento_mouseleave_do_campo_data_de_nascimento);
    
    const span_icone_de_calendario_do_campo_data_de_nascimento = div_editar_pessoa.getElementsByClassName("span_icone_de_calendario_do_campo_data_de_nascimento")[0];
    span_icone_de_calendario_do_campo_data_de_nascimento.addEventListener("mouseenter", evento_mouseenter_do_span_icone_de_calendario_do_campo_data_de_nascimento);
    span_icone_de_calendario_do_campo_data_de_nascimento.addEventListener("mouseleave", evento_mouseleave_do_span_icone_de_calendario_do_campo_data_de_nascimento);
    span_icone_de_calendario_do_campo_data_de_nascimento.campo_data_de_nascimento = campo_data_de_nascimento;
    
    const campo_telefone_fixo = div_editar_pessoa.getElementsByClassName("campo_telefone_fixo")[0];
    campo_telefone_fixo.addEventListener("keyup", evento_do_campo_telefone_fixo);
    const campo_telefone_movel = div_editar_pessoa.getElementsByClassName("campo_telefone_movel")[0];
    campo_telefone_movel.addEventListener("keyup", evento_do_campo_telefone_movel);
    
    const botao_editar = div_editar_pessoa.querySelector(".div_botao_editar>.botao_editar");
    botao_editar.addEventListener("mouseleave", evento_mouseleave_do_botao_editar_pessoa);
    botao_editar.addEventListener("click", evento_click_do_botao_editar_pessoa);
    
    /* Seletor de data (calendário) */
    campo_data_de_nascimento.addEventListener("keyup", evento_keyup_do_campo_data_de_nascimento);
    campo_data_de_nascimento.addEventListener("click", evento_click_do_campo_data_de_nascimento);
    span_icone_de_calendario_do_campo_data_de_nascimento.addEventListener("click", evento_click_do_span_icone_de_calendario_do_campo_data_de_nascimento);
    span_icone_de_calendario_do_campo_data_de_nascimento.addEventListener("mousedown", evento_mousedown_do_span_icone_de_calendario_do_campo_data_de_nascimento);
  }
  
  function evento_da_div_fechar_da_div_de_editar_pessoa(){
    div_editar_pessoa.classList.add("tag_oculta");
    ocultar_div_editar_pessoa = true;
  }
  
  /* Refazendo o comportamento dos labels */
  function evento_das_labels_comuns_da_div_editar_pessoa(evento){
    evento.preventDefault();
    
    const tag_que_disparou_o_evento = evento.currentTarget;
    
    const atributo_for_do_label = tag_que_disparou_o_evento.getAttribute("for");
    
    const alvo_do_label = div_editar_pessoa.querySelector("." + atributo_for_do_label);
    if(alvo_do_label !== null){
      alvo_do_label.focus();
    }
  }
  function evento_das_labels_sexo_da_div_editar_pessoa(evento){
    const tag_que_disparou_o_evento = evento.currentTarget;
    
    tag_que_disparou_o_evento.querySelector("input").checked = true;
  }
  
  /* Máscara do campo_cpf dos formulários de editar */
  let ultimo_valor_campo_cpf_do_formulario_de_editar = "";
  
  function evento_do_campo_cpf(evento){
    evento.preventDefault();
    
    const tag_que_disparou_o_evento = evento.currentTarget;
    
    let posicao_do_cursor = tag_que_disparou_o_evento.selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      ultimo_valor_campo_cpf_do_formulario_de_editar = tag_que_disparou_o_evento.value;
      return;
    }
    
    tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.replace(/[^0-9]/g, "");
    
    if(tag_que_disparou_o_evento.value.length >= 3){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 3) + "." + tag_que_disparou_o_evento.value.slice(3);
      if((posicao_do_cursor === 3 || posicao_do_cursor === 4) && tag_que_disparou_o_evento.value.length > ultimo_valor_campo_cpf_do_formulario_de_editar.length){
        posicao_do_cursor++;
      }else if(tag_que_disparou_o_evento.value.length >= 7 && posicao_do_cursor === 4){
        posicao_do_cursor++;
      }
    }
    if(tag_que_disparou_o_evento.value.length >= 7){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 7) + "." + tag_que_disparou_o_evento.value.slice(7);
      if((posicao_do_cursor === 7 || posicao_do_cursor === 8) && tag_que_disparou_o_evento.value.length > ultimo_valor_campo_cpf_do_formulario_de_editar.length){
        posicao_do_cursor++;
      }else if(tag_que_disparou_o_evento.value.length >= 11 && posicao_do_cursor === 8){
        posicao_do_cursor++;
      }
    }
    if(tag_que_disparou_o_evento.value.length >= 11){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 11) + "-" + tag_que_disparou_o_evento.value.slice(11);
      if((posicao_do_cursor === 11 || posicao_do_cursor === 12) && tag_que_disparou_o_evento.value.length > ultimo_valor_campo_cpf_do_formulario_de_editar.length){
        posicao_do_cursor++;
      }
    }
    if(tag_que_disparou_o_evento.value.length > 14){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 14);
    }
    
    tag_que_disparou_o_evento.setSelectionRange(posicao_do_cursor, posicao_do_cursor);
    
    ultimo_valor_campo_cpf_do_formulario_de_editar = tag_que_disparou_o_evento.value;
  }
  
  /* Refazendo o efeito de hover nos campos de data de nascimento dos formulários de editar */
  function evento_mouseenter_do_campo_data_de_nascimento(evento){
    const tag_que_disparou_o_evento = evento.currentTarget;
    tag_que_disparou_o_evento.style.border = "1px solid #8080C8";
  }
  function evento_mouseleave_do_campo_data_de_nascimento(evento){
    const tag_que_disparou_o_evento = evento.currentTarget;
    tag_que_disparou_o_evento.style.border = "1px solid #C8C8C8";
  }
  function evento_mouseenter_do_span_icone_de_calendario_do_campo_data_de_nascimento(evento){
    const tag_que_disparou_o_evento = evento.currentTarget;
    tag_que_disparou_o_evento.campo_data_de_nascimento.style.border = "1px solid #8080C8";
  }
  function evento_mouseleave_do_span_icone_de_calendario_do_campo_data_de_nascimento(evento){
    const tag_que_disparou_o_evento = evento.currentTarget;
    tag_que_disparou_o_evento.campo_data_de_nascimento.style.border = "1px solid #C8C8C8";
  }
  
  /* Máscara do campo_telefone_fixo dos formulários de editar */
  function evento_do_campo_telefone_fixo(evento){
    evento.preventDefault();
    
    const tag_que_disparou_o_evento = evento.currentTarget;
    
    let posicao_do_cursor = tag_que_disparou_o_evento.selectionStart;
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
    
    if(tag_que_disparou_o_evento.value.charAt(0) !== "("){
      if(/[0-9]/.test(tag_que_disparou_o_evento.value.charAt(0))){
        tag_que_disparou_o_evento.value = "(" + tag_que_disparou_o_evento.value;
        atualizacao_do_cursor++;
      }else{
        tag_que_disparou_o_evento.value = "(" + tag_que_disparou_o_evento.value.slice(1);
      }
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(1))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 1) + tag_que_disparou_o_evento.value.slice(2);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(2))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 2) + tag_que_disparou_o_evento.value.slice(3);
    }
    if(tag_que_disparou_o_evento.value.length > 3 && tag_que_disparou_o_evento.value.charAt(3) !== ")"){
      if(/[0-9]/.test(tag_que_disparou_o_evento.value.charAt(3))){
        tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 3) + ")" + tag_que_disparou_o_evento.value.slice(3);
        if(posicao_do_cursor >= 3){
          atualizacao_do_cursor++;
        }
      }else{
        tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 3) + ")" + tag_que_disparou_o_evento.value.slice(4);
      }
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(4))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 4) + tag_que_disparou_o_evento.value.slice(5);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(5))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 5) + tag_que_disparou_o_evento.value.slice(6);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(6))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 6) + tag_que_disparou_o_evento.value.slice(7);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(7))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 7) + tag_que_disparou_o_evento.value.slice(8);
    }
    if(tag_que_disparou_o_evento.value.length > 8 && tag_que_disparou_o_evento.value.charAt(8) !== "-"){
      if(/[0-9]/.test(tag_que_disparou_o_evento.value.charAt(8))){
        tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 8) + "-" + tag_que_disparou_o_evento.value.slice(8);
        if(posicao_do_cursor >= 8){
          atualizacao_do_cursor++;
        }
      }else{
        tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 8) + "-" + tag_que_disparou_o_evento.value.slice(9);
      }
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(9))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 9) + tag_que_disparou_o_evento.value.slice(10);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(10))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 10) + tag_que_disparou_o_evento.value.slice(11);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(11))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 11) + tag_que_disparou_o_evento.value.slice(12);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(12))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 12) + tag_que_disparou_o_evento.value.slice(13);
    }
    if(tag_que_disparou_o_evento.value.length > 13){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 13);
    }
    
    posicao_do_cursor += atualizacao_do_cursor;
    tag_que_disparou_o_evento.setSelectionRange(posicao_do_cursor, posicao_do_cursor);
  }
  
  /* Máscara do campo_telefone_movel dos formulários de editar */
  function evento_do_campo_telefone_movel(evento){
    evento.preventDefault();
    
    const tag_que_disparou_o_evento = evento.currentTarget;
    
    let posicao_do_cursor = tag_que_disparou_o_evento.selectionStart;
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
    
    if(tag_que_disparou_o_evento.value.charAt(0) !== "("){
      if(/[0-9]/.test(tag_que_disparou_o_evento.value.charAt(0))){
        tag_que_disparou_o_evento.value = "(" + tag_que_disparou_o_evento.value;
        atualizacao_do_cursor++;
      }else{
        tag_que_disparou_o_evento.value = "(" + tag_que_disparou_o_evento.value.slice(1);
      }
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(1))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 1) + tag_que_disparou_o_evento.value.slice(2);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(2))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 2) + tag_que_disparou_o_evento.value.slice(3);
    }
    if(tag_que_disparou_o_evento.value.length > 3 && tag_que_disparou_o_evento.value.charAt(3) !== ")"){
      if(/[0-9]/.test(tag_que_disparou_o_evento.value.charAt(3))){
        tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 3) + ")" + tag_que_disparou_o_evento.value.slice(3);
        if(posicao_do_cursor >= 3){
          atualizacao_do_cursor++;
        }
      }else{
        tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 3) + ")" + tag_que_disparou_o_evento.value.slice(4);
      }
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(4))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 4) + tag_que_disparou_o_evento.value.slice(5);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(5))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 5) + tag_que_disparou_o_evento.value.slice(6);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(6))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 6) + tag_que_disparou_o_evento.value.slice(7);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(7))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 7) + tag_que_disparou_o_evento.value.slice(8);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(8))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 8) + tag_que_disparou_o_evento.value.slice(9);
    }
    if(tag_que_disparou_o_evento.value.length > 9 && tag_que_disparou_o_evento.value.charAt(9) !== "-"){
      if(/[0-9]/.test(tag_que_disparou_o_evento.value.charAt(9))){
        tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 9) + "-" + tag_que_disparou_o_evento.value.slice(9);
        if(posicao_do_cursor >= 9){
          atualizacao_do_cursor++;
        }
      }else{
        tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 9) + "-" + tag_que_disparou_o_evento.value.slice(10);
      }
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(10))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 10) + tag_que_disparou_o_evento.value.slice(11);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(11))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 11) + tag_que_disparou_o_evento.value.slice(12);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(12))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 12) + tag_que_disparou_o_evento.value.slice(13);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(13))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 13) + tag_que_disparou_o_evento.value.slice(14);
    }
    if(tag_que_disparou_o_evento.value.length > 14){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 14);
    }
    
    posicao_do_cursor += atualizacao_do_cursor;
    tag_que_disparou_o_evento.setSelectionRange(posicao_do_cursor, posicao_do_cursor);
  }
  
  /* Botão Editar Pessoa */
  function evento_mouseleave_do_botao_editar_pessoa(evento){
    const tag_que_disparou_o_evento = evento.currentTarget;
    tag_que_disparou_o_evento.blur();
  }
  function evento_click_do_botao_editar_pessoa(){
    let filtro_nome = campo_filtro_nome.value;
    let filtro_cpf = campo_filtro_cpf.value;
    let filtro_data_de_nascimento = campo_filtro_data_de_nascimento.value;
    let filtro_id_do_setor = caixa_de_selecao_filtro_setor.value;
    let quantidade_por_pagina = caixa_de_selecao_quantidade_por_pagina.value;
    
    contador_de_filtro++;
    let numero_desta_acao_filtrar = contador_de_filtro;
    
    span_status_da_busca.innerText = "Atualizando...";
    span_status_da_busca.classList.remove("tag_oculta");
    //div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = ""; //Opcional
    //div_partes_da_lista_de_pessoas.classList.add("tag_oculta"); //Opcional
    //div_lista_de_pessoas.innerHTML = "Aguarde..."; //Opcional
    //div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = ""; //Opcional
    
    const campo_nome = div_editar_pessoa.querySelector(".div_editar_nome>.div_campo_nome>.campo_nome");
    const campo_sobrenome = div_editar_pessoa.querySelector(".div_editar_sobrenome>.div_campo_sobrenome>.campo_sobrenome");
    const campo_cpf = div_editar_pessoa.querySelector(".div_editar_cpf>.div_campo_cpf>.campo_cpf");
    const campo_data_de_nascimento = div_editar_pessoa.querySelector(".div_editar_data_de_nascimento>.div_campo_data_de_nascimento>.campo_data_de_nascimento");
    const caixa_de_selecao_setor = div_editar_pessoa.querySelector(".div_editar_setor>.div_caixa_de_selecao_setor>.caixa_de_selecao_setor");
    const campo_email = div_editar_pessoa.querySelector(".div_editar_email>.div_campo_email>.campo_email");
    const campo_telefone_fixo = div_editar_pessoa.querySelector(".div_editar_telefone_fixo>.div_campo_telefone_fixo>.campo_telefone_fixo");
    const campo_telefone_movel = div_editar_pessoa.querySelector(".div_editar_telefone_movel>.div_campo_telefone_movel>.campo_telefone_movel");
    const campo_telefone_estrangeiro = div_editar_pessoa.querySelector(".div_editar_telefone_estrangeiro>.div_campo_telefone_estrangeiro>.campo_telefone_estrangeiro");
    
    let nome = campo_nome.value;
    let sobrenome = campo_sobrenome.value;
    let cpf = campo_cpf.value;
    let data_de_nascimento = campo_data_de_nascimento.value;
    
    let sexo = div_editar_pessoa.querySelector(".div_editar_sexo>.div_lista_de_sexos>label.item_da_lista_de_sexos>input[type='radio'][name^='sexo_da_pessoa_do_id_']:checked");
    if(sexo !== null){
      sexo = sexo.getAttribute("value");
    }
    
    let id_do_setor = caixa_de_selecao_setor.value;
    let email = campo_email.value;
    let telefone_fixo = campo_telefone_fixo.value;
    let telefone_movel = campo_telefone_movel.value;
    let telefone_estrangeiro = campo_telefone_estrangeiro.value;
    
    const div_botao_editar = div_editar_pessoa.querySelector(".div_botao_editar");
    
    const anti_csrf = div_botao_editar.querySelector("input[name='_token']").value;
    
    const id_da_pessoa = div_botao_editar.querySelector(".campo_id_da_pessoa").value;
    
    const div_mensagem = div_editar_pessoa.querySelector(".div_mensagem");
    div_mensagem.classList.remove("tag_oculta");
    
    const span_mensagem_editar_pessoa = div_mensagem.querySelector(".span_mensagem_editar_pessoa");
    span_mensagem_editar_pessoa.classList.remove("mensagem_de_falha");
    span_mensagem_editar_pessoa.classList.remove("mensagem_de_sucesso");
    span_mensagem_editar_pessoa.innerText = "Aguarde...";
    
    /* Requisição ajax */
    let conexao_ajax = null;
    if(window.XMLHttpRequest){
      conexao_ajax = new XMLHttpRequest();
    }else if(window.ActiveXObject){
      conexao_ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    const tipo = "POST";
    let url_mais = "";
    let url = "/tudo_em_um/editar_pessoa_ajax" + url_mais;
    let dados_post = {filtro_nome: filtro_nome, filtro_cpf: filtro_cpf, 
                      filtro_data_de_nascimento: filtro_data_de_nascimento, filtro_id_do_setor: filtro_id_do_setor, 
                      quantidade_por_pagina: quantidade_por_pagina, ordenacao: ordenacao, pagina: pagina, nome: nome, 
                      sobrenome: sobrenome, cpf: cpf, data_de_nascimento: data_de_nascimento, sexo: sexo, 
                      id_do_setor: id_do_setor, email: email, telefone_fixo: telefone_fixo, 
                      telefone_movel: telefone_movel, telefone_estrangeiro: telefone_estrangeiro, 
                      id_da_pessoa: id_da_pessoa, _token: anti_csrf};
    let resposta = null;
    conexao_ajax.onreadystatechange = function(){
      if(conexao_ajax.readyState == 4){
        if(conexao_ajax.status == 200){
          resposta = JSON.parse(conexao_ajax.responseText);
          
          if(typeof resposta.mensagem_de_falha != "undefined"){
            span_mensagem_editar_pessoa.classList.add("mensagem_de_falha");
            span_mensagem_editar_pessoa.innerText = resposta.mensagem_de_falha;
            
            span_status_da_busca.innerText = "";
            span_status_da_busca.classList.add("tag_oculta");
            //div_partes_da_lista_de_pessoas.classList.remove("tag_oculta"); //Opcional
            return;
          }
          if(typeof resposta.mensagem_de_sucesso != "undefined"){
            span_mensagem_editar_pessoa.classList.add("mensagem_de_sucesso");
            span_mensagem_editar_pessoa.innerText = resposta.mensagem_de_sucesso;
            
            if(numero_desta_acao_filtrar >= contador_de_filtro){
              span_status_da_busca.innerText = "";
              span_status_da_busca.classList.add("tag_oculta");
              //div_partes_da_lista_de_pessoas.classList.remove("tag_oculta"); //Opcional
              div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = resposta.paginacao;
              div_lista_de_pessoas.innerHTML = resposta.lista;
              div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = resposta.paginacao;
              
              const div_editar_desta_pessoa = document.getElementById("div_editar_pessoa_do_id_" + id_da_pessoa);
              if(div_editar_desta_pessoa !== null){
                div_editar_pessoa.innerHTML = div_editar_desta_pessoa.innerHTML;
              }
              
              const div_mensagem_apos_atualizacao = div_editar_pessoa.querySelector(".div_mensagem");
              div_mensagem_apos_atualizacao.classList.remove("tag_oculta");
              
              const span_mensagem_editar_pessoa_apos_atualizacao = div_mensagem_apos_atualizacao.querySelector(".span_mensagem_editar_pessoa");
              span_mensagem_editar_pessoa_apos_atualizacao.classList.add("mensagem_de_sucesso");
              span_mensagem_editar_pessoa_apos_atualizacao.innerText = resposta.mensagem_de_sucesso;
              
              links_da_paginacao = document.querySelectorAll("#div_paginacao_de_cima_da_lista_de_pessoas>a, #div_paginacao_de_baixo_da_lista_de_pessoas>a");
              pagina_selecionada = document.getElementsByClassName("pagina_selecionada")[0];
              if(typeof pagina_selecionada != "undefined"){
                eventos_dos_links_da_paginacao();
              }else{
                div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = "";
                div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = "";
              }
              
              links_de_nome_da_pessoa = document.getElementsByClassName("nome_da_pessoa");
              eventos_dos_links_de_nome_da_pessoa();
              
              links_de_editar_pessoa = document.getElementsByClassName("link_editar_pessoa");
              eventos_dos_links_de_editar_pessoa();
              
              links_excluir_pessoa = document.getElementsByClassName("link_excluir_pessoa");
              eventos_dos_links_de_excluir_pessoa();
              
              eventos_da_div_editar();
            }
          }
        }
      }
    }
    conexao_ajax.open(tipo, url, true);
    conexao_ajax.setRequestHeader("Content-Type", "application/json");
    conexao_ajax.send(JSON.stringify(dados_post));
  }
  
  /* Mostrar popup excluir pessoa */
  const div_excluir_pessoa = document.getElementById("div_excluir_pessoa");
  let links_excluir_pessoa = document.getElementsByClassName("link_excluir_pessoa");
  
  let ocultar_div_excluir_pessoa = true;
  
  eventos_dos_links_de_excluir_pessoa();
  
  function eventos_dos_links_de_excluir_pessoa(){
    for(let i = 0; i < links_excluir_pessoa.length; i++){
      links_excluir_pessoa[i].removeEventListener("click", evento_do_link_excluir_pessoa);
      links_excluir_pessoa[i].addEventListener("click", evento_do_link_excluir_pessoa);
    }
  }
  
  function evento_do_link_excluir_pessoa(evento){
    evento.preventDefault();
    
    const tag_que_disparou_o_evento = evento.currentTarget;
    
    const href = tag_que_disparou_o_evento.getAttribute("href");
    const id_da_pessoa = href.replace("excluir_pessoa?id=", "");
    
    if(isNaN(id_da_pessoa) || id_da_pessoa % 1 != 0 || id_da_pessoa <= 0){
      return;
    }
    
    const html = document.getElementById("div_excluir_pessoa_do_id_" + id_da_pessoa).innerHTML;
    
    div_excluir_pessoa.innerHTML = html;
    div_excluir_pessoa.classList.remove("tag_oculta");
    ocultar_div_excluir_pessoa = false;
    
    eventos_da_div_excluir();
    
    let largura_da_div = 0;
    var estilo_computado = window.getComputedStyle(div_excluir_pessoa);
    largura_da_div += parseInt(estilo_computado.borderLeftWidth, 10);
    largura_da_div += parseInt(estilo_computado.paddingLeft, 10);
    largura_da_div += parseInt(estilo_computado.width, 10);
    largura_da_div += parseInt(estilo_computado.paddingRight, 10);
    largura_da_div += parseInt(estilo_computado.borderRightWidth, 10);
    
    let largura_da_tag_html = 0;
    var estilo_computado = window.getComputedStyle(tag_html);
    largura_da_tag_html += parseInt(estilo_computado.width, 10);
    
    var posicao_x = largura_da_tag_html / 2 - largura_da_div / 2;
    if(window.innerWidth <= largura_da_div){
      posicao_x = 0;
    }
    
    let altura_da_div = 0;
    var estilo_computado = window.getComputedStyle(div_excluir_pessoa);
    altura_da_div += parseInt(estilo_computado.borderTopWidth, 10);
    altura_da_div += parseInt(estilo_computado.paddingTop, 10);
    altura_da_div += parseInt(estilo_computado.height, 10);
    altura_da_div += parseInt(estilo_computado.paddingBottom, 10);
    altura_da_div += parseInt(estilo_computado.borderBottomWidth, 10);
    
    const posicao_vertical_deste_link = tag_que_disparou_o_evento.getBoundingClientRect().top + window.scrollY;
    var posicao_y = posicao_vertical_deste_link - altura_da_div / 2;
    if(window.innerHeight <= altura_da_div){
      posicao_y = posicao_vertical_deste_link;
    }
    
    div_excluir_pessoa.style.top = posicao_y + "px";
    div_excluir_pessoa.style.left = posicao_x + "px";
  }
  
  function eventos_da_div_excluir(){
    const div_fechar_da_div_de_excluir_pessoa = div_excluir_pessoa.querySelector(".div_fechar");
    div_fechar_da_div_de_excluir_pessoa.addEventListener("click", evento_da_div_fechar_da_div_de_excluir_pessoa);
    
    const botao_excluir = div_excluir_pessoa.querySelector(".div_botao_excluir>.botao_excluir");
    botao_excluir.addEventListener("mouseleave", evento_mouseleave_do_botao_excluir_pessoa);
    botao_excluir.addEventListener("click", evento_click_do_botao_excluir_pessoa);
  }
  
  function evento_da_div_fechar_da_div_de_excluir_pessoa(){
    div_excluir_pessoa.classList.add("tag_oculta");
    ocultar_div_excluir_pessoa = true;
  }
  
  /* Botão Excluir Pessoa */
  function evento_mouseleave_do_botao_excluir_pessoa(evento){
    const tag_que_disparou_o_evento = evento.currentTarget;
    tag_que_disparou_o_evento.blur();
  }
  function evento_click_do_botao_excluir_pessoa(){
    let filtro_nome = campo_filtro_nome.value;
    let filtro_cpf = campo_filtro_cpf.value;
    let filtro_data_de_nascimento = campo_filtro_data_de_nascimento.value;
    let filtro_id_do_setor = caixa_de_selecao_filtro_setor.value;
    let quantidade_por_pagina = caixa_de_selecao_quantidade_por_pagina.value;
    
    contador_de_filtro++;
    let numero_desta_acao_filtrar = contador_de_filtro;
    
    span_status_da_busca.innerText = "Atualizando...";
    span_status_da_busca.classList.remove("tag_oculta");
    //div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = ""; //Opcional
    //div_partes_da_lista_de_pessoas.classList.add("tag_oculta"); //Opcional
    //div_lista_de_pessoas.innerHTML = "Aguarde..."; //Opcional
    //div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = ""; //Opcional
    
    const div_botao_excluir = div_excluir_pessoa.querySelector(".div_botao_excluir");
    
    const anti_csrf = div_botao_excluir.querySelector("input[name='_token']").value;
    
    const id_da_pessoa = div_botao_excluir.querySelector(".campo_id_da_pessoa").value;
    
    const div_mensagem = div_excluir_pessoa.querySelector(".div_mensagem");
    div_mensagem.classList.remove("tag_oculta");
    
    const span_mensagem_excluir_pessoa = div_mensagem.querySelector(".span_mensagem_excluir_pessoa");
    span_mensagem_excluir_pessoa.classList.remove("mensagem_de_falha");
    span_mensagem_excluir_pessoa.classList.remove("mensagem_de_sucesso");
    span_mensagem_excluir_pessoa.innerText = "Aguarde...";
    
    /* Requisição ajax */
    let conexao_ajax = null;
    if(window.XMLHttpRequest){
      conexao_ajax = new XMLHttpRequest();
    }else if(window.ActiveXObject){
      conexao_ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    const tipo = "POST";
    let url_mais = "";
    let url = "/tudo_em_um/excluir_pessoa_ajax" + url_mais;
    let dados_post = {filtro_nome: filtro_nome, filtro_cpf: filtro_cpf, filtro_data_de_nascimento: filtro_data_de_nascimento, 
                      filtro_id_do_setor: filtro_id_do_setor, quantidade_por_pagina: quantidade_por_pagina, ordenacao: ordenacao, 
                      pagina: pagina, id_da_pessoa: id_da_pessoa, _token: anti_csrf};
    let resposta = null;
    conexao_ajax.onreadystatechange = function(){
      if(conexao_ajax.readyState == 4){
        if(conexao_ajax.status == 200){
          resposta = JSON.parse(conexao_ajax.responseText);
          
          if(typeof resposta.mensagem_de_falha != "undefined"){
            span_mensagem_excluir_pessoa.classList.add("mensagem_de_falha");
            span_mensagem_excluir_pessoa.innerText = resposta.mensagem_de_falha;
            
            span_status_da_busca.innerText = "";
            span_status_da_busca.classList.add("tag_oculta");
            //div_partes_da_lista_de_pessoas.classList.remove("tag_oculta"); //Opcional
            return;
          }
          if(typeof resposta.mensagem_de_sucesso != "undefined"){
            span_mensagem_excluir_pessoa.classList.add("mensagem_de_sucesso");
            span_mensagem_excluir_pessoa.innerText = resposta.mensagem_de_sucesso;
            
            if(numero_desta_acao_filtrar >= contador_de_filtro){
              span_status_da_busca.innerText = "";
              span_status_da_busca.classList.add("tag_oculta");
              //div_partes_da_lista_de_pessoas.classList.remove("tag_oculta"); //Opcional
              div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = resposta.paginacao;
              div_lista_de_pessoas.innerHTML = resposta.lista;
              div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = resposta.paginacao;
              
              atualizando_botoes_de_radio_de_um_popup("div_editar_pessoa");
              
              links_da_paginacao = document.querySelectorAll("#div_paginacao_de_cima_da_lista_de_pessoas>a, #div_paginacao_de_baixo_da_lista_de_pessoas>a");
              pagina_selecionada = document.getElementsByClassName("pagina_selecionada")[0];
              if(typeof pagina_selecionada != "undefined"){
                eventos_dos_links_da_paginacao();
              }else{
                div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = "";
                div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = "";
              }
              
              links_de_nome_da_pessoa = document.getElementsByClassName("nome_da_pessoa");
              eventos_dos_links_de_nome_da_pessoa();
              
              links_de_editar_pessoa = document.getElementsByClassName("link_editar_pessoa");
              eventos_dos_links_de_editar_pessoa();
              
              links_excluir_pessoa = document.getElementsByClassName("link_excluir_pessoa");
              eventos_dos_links_de_excluir_pessoa();
            }
          }
        }
      }
    }
    conexao_ajax.open(tipo, url, true);
    conexao_ajax.setRequestHeader("Content-Type", "application/json");
    conexao_ajax.send(JSON.stringify(dados_post));
  }
  
  /* Seletor de data (calendário) dos campos de data */
  const span_icone_de_calendario_do_campo_filtro_data_de_nascimento = document.getElementById("span_icone_de_calendario_do_campo_filtro_data_de_nascimento");
  const span_icone_de_calendario_do_campo_data_de_nascimento = document.getElementById("span_icone_de_calendario_do_campo_data_de_nascimento");
  const div_calendario = document.getElementById("div_calendario");
  const caixa_de_selecao_de_mes_do_calendario = document.getElementById("caixa_de_selecao_de_mes_do_calendario");
  const caixa_de_selecao_de_ano_do_calendario = document.getElementById("caixa_de_selecao_de_ano_do_calendario");
  const celulas_do_calendario = document.getElementsByClassName("celula_do_calendario");
  
  let alvo_do_calendario = null;
  let dia_selecionado = null;
  let ocultar_div_calendario = true;
  
  campo_filtro_data_de_nascimento.addEventListener("keyup", function(){
    if(alvo_do_calendario === "filtro_data_de_nascimento"){
      atualizar_calendario();
    }
  });
  campo_data_de_nascimento.addEventListener("keyup", function(){
    if(alvo_do_calendario === "cadastrar_data_de_nascimento"){
      atualizar_calendario();
    }
  });
  function evento_keyup_do_campo_data_de_nascimento(){
    if(alvo_do_calendario === "editar_data_de_nascimento"){
      atualizar_calendario();
    }
  }
  
  campo_filtro_data_de_nascimento.addEventListener("click", function(){
    if(alvo_do_calendario === "filtro_data_de_nascimento"){
      ocultar_div_calendario = false;
    }
  });
  campo_data_de_nascimento.addEventListener("click", function(){
    if(alvo_do_calendario === "cadastrar_data_de_nascimento"){
      ocultar_div_calendario = false;
    }
  });
  function evento_click_do_campo_data_de_nascimento(){
    if(alvo_do_calendario === "editar_data_de_nascimento"){
      ocultar_div_calendario = false;
    }
  }
  
  span_icone_de_calendario_do_campo_filtro_data_de_nascimento.addEventListener("click", function(){
    ocultar_div_calendario = false;
    mostrar_calendario("filtro_data_de_nascimento");
  });
  span_icone_de_calendario_do_campo_data_de_nascimento.addEventListener("click", function(){
    ocultar_div_calendario = false;
    mostrar_calendario("cadastrar_data_de_nascimento");
  });
  function evento_click_do_span_icone_de_calendario_do_campo_data_de_nascimento(){
    ocultar_div_calendario = false;
    mostrar_calendario("editar_data_de_nascimento");
  }
  
  /* Impedindo clique duplo selecionar o texto */
  span_icone_de_calendario_do_campo_filtro_data_de_nascimento.addEventListener("mousedown", function(evento){
    evento.preventDefault();
  });
  span_icone_de_calendario_do_campo_data_de_nascimento.addEventListener("mousedown", function(evento){
    evento.preventDefault();
  });
  function evento_mousedown_do_span_icone_de_calendario_do_campo_data_de_nascimento(evento){
    evento.preventDefault();
  }
  
  function mostrar_calendario(referencia_do_campo){
    if(div_calendario.classList.contains("tag_oculta") || alvo_do_calendario !== referencia_do_campo){
      alvo_do_calendario = referencia_do_campo;
      
      let campo_alvo = null;
      switch(alvo_do_calendario){
        case "filtro_data_de_nascimento":
          campo_alvo = campo_filtro_data_de_nascimento;
        break;
        case "cadastrar_data_de_nascimento":
          campo_alvo = campo_data_de_nascimento;
        break;
        case "editar_data_de_nascimento":
          campo_alvo = div_editar_pessoa.querySelector(".div_editar_data_de_nascimento>.div_campo_data_de_nascimento>.campo_data_de_nascimento");
        break;
      }
      
      let posicao_x = campo_alvo.getBoundingClientRect().left + window.scrollX;
      let posicao_y = campo_alvo.getBoundingClientRect().top + window.scrollY;
      
      var estilo_computado = window.getComputedStyle(campo_alvo);
      posicao_y += parseInt(estilo_computado.borderTopWidth, 10);
      posicao_y += parseInt(estilo_computado.paddingTop, 10);
      posicao_y += parseInt(estilo_computado.height, 10);
      posicao_y += parseInt(estilo_computado.paddingBottom, 10);
      posicao_y += parseInt(estilo_computado.borderBottomWidth, 10);
      
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
    let campo_alvo = null;
    switch(alvo_do_calendario){
      case "filtro_data_de_nascimento":
        campo_alvo = campo_filtro_data_de_nascimento;
      break;
      case "cadastrar_data_de_nascimento":
        campo_alvo = campo_data_de_nascimento;
      break;
      case "editar_data_de_nascimento":
        campo_alvo = div_editar_pessoa.querySelector(".div_editar_data_de_nascimento>.div_campo_data_de_nascimento>.campo_data_de_nascimento");
      break;
    }
    
    let valor = campo_alvo.value;
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
    let campo_alvo = null;
    switch(alvo_do_calendario){
      case "filtro_data_de_nascimento":
        campo_alvo = campo_filtro_data_de_nascimento;
      break;
      case "cadastrar_data_de_nascimento":
        campo_alvo = campo_data_de_nascimento;
      break;
      case "editar_data_de_nascimento":
       campo_alvo = div_editar_pessoa.querySelector(".div_editar_data_de_nascimento>.div_campo_data_de_nascimento>.campo_data_de_nascimento");
      break;
    }
    
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
    if(campo_alvo !== null){
      campo_alvo.value = valor;
    }
    
    div_calendario.classList.add("tag_oculta");
  });
  
  function atualizando_botoes_de_radio_de_um_popup(id_da_div){
    const div_popup = document.getElementById(id_da_div);
    const botoes_de_radio = div_popup.querySelectorAll("input[type='radio'][checked='checked']");
    for(let i = 0; i < botoes_de_radio.length; i++){
      botoes_de_radio[i].checked = true;
    }
  }
  
  /* Ocultando popups */
  div_calendario.addEventListener("click", function(){
    ocultar_div_calendario = false;
    switch(alvo_do_calendario){
      case "cadastrar_data_de_nascimento":
        ocultar_div_cadastrar_pessoa = false;
      break;
      case "editar_data_de_nascimento":
        ocultar_div_editar_pessoa = false;
      break;
    }
  });
  div_cadastrar_pessoa.addEventListener("click", function(){
    ocultar_div_cadastrar_pessoa = false;
  });
  div_visualizar_pessoa.addEventListener("click", function(){
    ocultar_div_visualizar_pessoa = false;
  });
  div_editar_pessoa.addEventListener("click", function(){
    ocultar_div_editar_pessoa = false;
  });
  div_excluir_pessoa.addEventListener("click", function(){
    ocultar_div_excluir_pessoa = false;
  });
  
  document.addEventListener("click", function(){
    if(ocultar_div_calendario){
      div_calendario.classList.add("tag_oculta");
    }else{
      ocultar_div_calendario = true;
    }
    if(ocultar_div_cadastrar_pessoa){
      div_cadastrar_pessoa.classList.add("tag_oculta");
    }else{
      ocultar_div_cadastrar_pessoa = true;
    }
    if(ocultar_div_visualizar_pessoa){
      div_visualizar_pessoa.classList.add("tag_oculta");
    }else{
      ocultar_div_visualizar_pessoa = true;
    }
    if(ocultar_div_editar_pessoa){
      div_editar_pessoa.classList.add("tag_oculta");
    }else{
      ocultar_div_editar_pessoa = true;
    }
    if(ocultar_div_excluir_pessoa){
      div_excluir_pessoa.classList.add("tag_oculta");
    }else{
      ocultar_div_excluir_pessoa = true;
    }
  });
  
  /* Comportamento dos popups quando a janela é redimensionada */
  window.addEventListener("resize", function(){
    div_calendario.classList.add("tag_oculta");
    
    let popups_para_reposicionar = Array();
    if(!div_cadastrar_pessoa.classList.contains("tag_oculta")){
      popups_para_reposicionar.push(div_cadastrar_pessoa);
    }
    if(!div_visualizar_pessoa.classList.contains("tag_oculta")){
      popups_para_reposicionar.push(div_visualizar_pessoa);
    }
    if(!div_editar_pessoa.classList.contains("tag_oculta")){
      popups_para_reposicionar.push(div_editar_pessoa);
    }
    if(!div_excluir_pessoa.classList.contains("tag_oculta")){
      popups_para_reposicionar.push(div_excluir_pessoa);
    }
    
    let largura_da_tag_html = 0;
    var estilo_computado = window.getComputedStyle(tag_html);
    largura_da_tag_html += parseInt(estilo_computado.width, 10);
    
    for(let i = 0; i < popups_para_reposicionar.length; i++){
      let popup = popups_para_reposicionar[i];
      
      var estilo_computado = window.getComputedStyle(popup);
      
      let largura_da_div = 0;
      largura_da_div += parseInt(estilo_computado.borderLeftWidth, 10);
      largura_da_div += parseInt(estilo_computado.paddingLeft, 10);
      largura_da_div += parseInt(estilo_computado.width, 10);
      largura_da_div += parseInt(estilo_computado.paddingRight, 10);
      largura_da_div += parseInt(estilo_computado.borderRightWidth, 10);
      
      var posicao_x = largura_da_tag_html / 2 - largura_da_div / 2;
      if(window.innerWidth <= largura_da_div){
        posicao_x = 0;
      }
      
      popup.style.left = posicao_x + "px";
    }
  });
});
