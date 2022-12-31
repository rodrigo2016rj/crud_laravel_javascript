window.addEventListener("load", function(){
  /* Refazendo o efeito de hover no campo_data_de_nascimento */
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
  
  /* Removendo o foco do botão editar quando o cursor sai de cima dele e após o clique */
  const botao_editar = document.getElementById("botao_editar");
  
  botao_editar.addEventListener("mouseleave", function(){
    botao_editar.blur();
  });
  botao_editar.addEventListener("click", function(){
    botao_editar.blur();
  });
  
  /* Removendo o foco do botão confirmar do calendário quando o cursor sai de cima dele */
  const botao_confirmar_do_calendario = document.getElementById("botao_confirmar_do_calendario");
  
  botao_confirmar_do_calendario.addEventListener("mouseleave", function(){
    botao_confirmar_do_calendario.blur();
  });
});
