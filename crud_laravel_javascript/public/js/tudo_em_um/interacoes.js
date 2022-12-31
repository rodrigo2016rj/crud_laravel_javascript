window.addEventListener("load", function(){
  /* Refazendo o efeito de hover no campo_filtro_data_de_nascimento */
  const campo_filtro_data_de_nascimento = document.getElementById("campo_filtro_data_de_nascimento");
  const span_icone_de_calendario_do_campo_filtro_data_de_nascimento = document.getElementById("span_icone_de_calendario_do_campo_filtro_data_de_nascimento");
  
  campo_filtro_data_de_nascimento.addEventListener("mouseenter", function(){
    campo_filtro_data_de_nascimento.style.border = "1px solid #8080C8";
  });
  campo_filtro_data_de_nascimento.addEventListener("mouseleave", function(){
    campo_filtro_data_de_nascimento.style.border = "1px solid #C8C8C8";
  });
  span_icone_de_calendario_do_campo_filtro_data_de_nascimento.addEventListener("mouseenter", function(){
    campo_filtro_data_de_nascimento.style.border = "1px solid #8080C8";
  });
  span_icone_de_calendario_do_campo_filtro_data_de_nascimento.addEventListener("mouseleave", function(){
    campo_filtro_data_de_nascimento.style.border = "1px solid #C8C8C8";
  });
  
  /* Removendo o foco do botão buscar quando o cursor sai de cima dele e após o clique */
  const botao_buscar = document.getElementById("botao_buscar");
  
  botao_buscar.addEventListener("mouseleave", function(){
    botao_buscar.blur();
  });
  botao_buscar.addEventListener("click", function(){
    botao_buscar.blur();
  });
  
  /* Removendo o foco do botão limpar quando o cursor sai de cima dele e após o clique */
  const botao_limpar = document.getElementById("botao_limpar");
  
  botao_limpar.addEventListener("mouseleave", function(){
    botao_limpar.blur();
  });
  botao_limpar.addEventListener("click", function(){
    botao_limpar.blur();
  });
  
  /* Refazendo o efeito de hover no campo_data_de_nascimento do formulário cadastrar */
  const campo_data_de_nascimento = document.getElementById("campo_data_de_nascimento");
  const span_icone_de_calendario_do_campo_data_de_nascimento = document.getElementById("span_icone_de_calendario_do_campo_data_de_nascimento");
  
  campo_data_de_nascimento.addEventListener("mouseenter", function(){
    campo_data_de_nascimento.style.border = "1px solid #8080C8";
  });
  campo_data_de_nascimento.addEventListener("mouseleave", function(){
    campo_data_de_nascimento.style.border = "1px solid #C8C8C8";
  });
  span_icone_de_calendario_do_campo_data_de_nascimento.addEventListener("mouseenter", function(){
    campo_data_de_nascimento.style.border = "1px solid #8080C8";
  });
  span_icone_de_calendario_do_campo_data_de_nascimento.addEventListener("mouseleave", function(){
    campo_data_de_nascimento.style.border = "1px solid #C8C8C8";
  });
  
  /* Removendo o foco do botão cadastrar quando o cursor sai de cima dele e após o clique */
  const botao_cadastrar = document.getElementById("botao_cadastrar");
  
  botao_cadastrar.addEventListener("mouseleave", function(){
    botao_cadastrar.blur();
  });
  botao_cadastrar.addEventListener("click", function(){
    botao_cadastrar.blur();
  });
  
  /* Removendo o foco do botão confirmar do calendário quando o cursor sai de cima dele */
  const botao_confirmar_do_calendario = document.getElementById("botao_confirmar_do_calendario");
  
  botao_confirmar_do_calendario.addEventListener("mouseleave", function(){
    botao_confirmar_do_calendario.blur();
  });
});
