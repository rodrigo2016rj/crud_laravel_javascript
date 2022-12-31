window.addEventListener("load", function(){
  /* Removendo o foco do botão excluir quando o cursor sai de cima dele e após o clique */
  const botao_excluir = document.getElementById("botao_excluir");
  
  if(botao_excluir !== null){
    botao_excluir.addEventListener("mouseleave", function(){
      botao_excluir.blur();
    });
    botao_excluir.addEventListener("click", function(){
      botao_excluir.blur();
    });
  }
});
