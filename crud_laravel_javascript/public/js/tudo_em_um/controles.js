window.addEventListener("load", function(){
  /* Máscara do campo_filtro_cpf */
  const campo_filtro_cpf = document.getElementById("campo_filtro_cpf");
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
  
  /* Máscara do campo_cpf do formulário cadastrar */
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
  
  /* Máscara do campo_telefone_fixo do formulário cadastrar */
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
  
  /* Máscara do campo_telefone_movel do formulário cadastrar */
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
});
