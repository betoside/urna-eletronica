let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function montarQuadroCandidatos () {
    let candidatoHtml = "";

    for (i=0;i<etapas.length;i++){
        // console.log(etapas[i]);

        for (let j in etapas[i].candidatos) {
            // console.log('numero', etapas[i].candidatos[j].numero);
            // console.log('nome', etapas[i].candidatos[j].nome);
            // console.log('partido', etapas[i].candidatos[j].partido);
            // console.log('fotos', etapas[i].candidatos[j].fotos);
            
            candidatoHtml += '<div class="candidato">';
            candidatoHtml += '    <div class="foto">';

            for (let k in etapas[i].candidatos[j].fotos) {
                candidatoHtml += '        <div class="img-legenda">';
                candidatoHtml += `            <img src="images/${etapas[i].candidatos[j].fotos[k].url}" alt="">`;
                candidatoHtml += `            ${etapas[i].candidatos[j].fotos[k].legenda}`;

                if (etapas[i].candidatos[j].fotos[k].small) {
                    candidatoHtml += `            </br><i>${etapas[i].candidatos[j].vice}</i>`;
                }

                candidatoHtml += '        </div>';
            }

            candidatoHtml += '    </div>';
            
            candidatoHtml += '    <div class="informacoes">';
            candidatoHtml += `        <strong class="cargo">${etapas[i].titulo}</strong>`;
            candidatoHtml += '        <br>';
            candidatoHtml += `        <strong>numero</strong>: ${etapas[i].candidatos[j].numero}`;
            candidatoHtml += '        <br>';
            candidatoHtml += `        <strong>nome</strong>: ${etapas[i].candidatos[j].nome}`;
            candidatoHtml += '        <br>';
            candidatoHtml += `        <strong>partido</strong>: ${etapas[i].candidatos[j].partido}`;
            candidatoHtml += '    </div>';
            candidatoHtml += '</div>';
        }
    }
    // console.log(candidatoHtml);
    document.querySelector('.candidatos').innerHTML = candidatoHtml;
} 
montarQuadroCandidatos();

function comecarEtapa (params) {
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero = '';
    // console.log('numero', numero);
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface (params) {
    // console.log('atualizando interface:');
    // console.log(numero);
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    // console.log('candidato: ', candidato);
    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if ( candidato.fotos[i].small ) {
                fotosHtml += '<div class="d-1-image small">';
                fotosHtml += `    <img src="images/${candidato.fotos[i].url}" alt="">`;
                fotosHtml += `    ${candidato.fotos[i].legenda}`;
                fotosHtml += '</div>';
            } else {
                fotosHtml += '<div class="d-1-image">';
                fotosHtml += `    <img src="images/${candidato.fotos[i].url}" alt="">`;
                fotosHtml += `    ${candidato.fotos[i].legenda}`;
                fotosHtml += '</div>';
            }
        }
        lateral.innerHTML = fotosHtml;
        aviso.style.display = 'block';

    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';

    }
}

function clicou (n) {
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;
        // console.log('numero', numero);

        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }

    }
}
function branco (params) {
    //  OPCAO 1
    /*
    if (numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
    } else {
        alert('Para votar em BRANCO não pode ter digitado nenhum número.')
    }
    */

    // OPCAO 2
    numero = '';
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';
    console.log('branco');
}
function corrige (params) {
    comecarEtapa();
}
function confirma (params) {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (votoBranco === true) {
        votoConfirmado = true;
        // console.log("Confirmando como BRANCO");
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        // console.log("Confirmando como "+numero);
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined ) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>';
            console.log('Fim!');
            console.log(votos);
            document.querySelector('.btn-recomecar').classList.remove('dn');
        }
    }
}
function btHide () {
    window.location.reload();
}
comecarEtapa();