$('#cep').mask('00000-000', {reverse: true});
$('#cpf').mask('000.000.000-00', {reverse: true});

$("#cep").focusout(function(){
    var valor = $("#cep").val();

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            $('#rua'   ).value="...";
            $('#bairro').value="...";
            $('#cidade').value="...";
            $('#uf'    ).value="...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

            $("#cpf-invalid").removeClass("d-none")
            $("#cpf-invalid").addClass("d-none")
        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("CEP inválido.");
            $("#cpf-invalid").removeClass("d-none")
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        $('#rua'   ).val("");
        $('#bairro').val("");
        $('#cidade').val("");
        $('#uf'    ).val("");
        $("#cpf-invalid").removeClass("d-none")
        $("#cpf-invalid").addClass   ("d-none")
    }
});

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        $('#rua'   ).val(conteudo.logradouro);
        $('#bairro').val(conteudo.bairro    );
        $('#cidade').val(conteudo.localidade);
        $('#uf'    ).val(conteudo.uf        );
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

$("#cpf").focusout(function(){
    var value = $("#cpf").val();
    if (value != '') {
        value = value.replace('.','');
        value = value.replace('.','');
        cpf = value.replace('-','');
        while(cpf.length < 11) cpf = "0"+ cpf;
        var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
        var a = [];
        var b = new Number;
        var c = 11;
        for (i=0; i<11; i++){
            a[i] = cpf.charAt(i);
            if (i < 9) b += (a[i] * --c);
        }
        if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
        b = 0;
        c = 11;
        for (y=0; y<10; y++) b += (a[y] * c--);
        if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }
        if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) {
            $("#cpf-invalid").removeClass("d-none")
        } else {
            $("#cpf-invalid").removeClass("d-none")
            $("#cpf-invalid").addClass("d-none")
        }
    } else {
        $("#cpf-invalid").removeClass("d-none")
        $("#cpf-invalid").addClass("d-none")
    }
});

$('#cvv').focusin(function(){
    $('#switch').prop("checked", true)
});

$('#cvv').focusout(function(){
    $('#switch').prop("checked", false)
});

$('#numero-cartao').mask('0000 0000 0000 0000', {reverse: true});
$('#validade'     ).mask('00/00'              , {reverse: true});
$('#cvv'          ).mask('000'                , {reverse: true});

$('#numero-cartao').on('input', function(){
    $('#card-numero').val($('#numero-cartao').val());
});

$('#validade').on('input', function(){
    $('#card-validade').val($('#validade').val());
});

$('#titular').on('input', function(){
    $('#card-titular').val($('#titular').val().toUpperCase());
});

$('#cvv').on('input', function(){
    $('#card-cvv').val($('#cvv').val());
});
