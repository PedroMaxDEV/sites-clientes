/*
  Projeto: Site institucional - Advocacia Empresarial
  Autor: Pedro Max
  Arquivo: detalhe-case.js

  case.html?id=...
  - lê o id
  - busca no LISTA_CASES
  - joga os textos na tela
  - se não achar, mostra uma mensagem decente (e dá caminho pro usuário)
*/

(function () {
  "use strict";

  function pegarParametro(nome) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nome);
  }

  function pegarEl(id) {
    return document.getElementById(id);
  }

  function criarListaItens(itens) {
    const ul = document.createElement("ul");
    ul.className = "lista-detalhe";
    itens.forEach((texto) => {
      const li = document.createElement("li");
      li.textContent = texto;
      ul.appendChild(li);
    });
    return ul;
  }

  function mostrarNaoEncontrado() {
    const titulo = pegarEl("titulo-case");
    const resumo = pegarEl("resumo-case");

    if (titulo) titulo.textContent = "Case não encontrado";
    if (resumo) {
      resumo.innerHTML =
        "Não encontrei esse case pelo parâmetro da URL. Você pode voltar para a lista ou falar direto pelo WhatsApp.";
    }

    // Escondo blocos que fazem sentido só quando existe conteúdo
    const contexto = pegarEl("case-contexto");
    const desafio = pegarEl("case-desafio");
    const oq = pegarEl("case-o-que-foi-feito");
    const ganhos = pegarEl("case-ganhos");
    const resultado = pegarEl("case-resultado");

    if (contexto) contexto.textContent = "—";
    if (desafio) desafio.textContent = "—";
    if (resultado) resultado.textContent = "—";
    if (oq) oq.innerHTML = "";
    if (ganhos) ganhos.innerHTML = "";

    const breadcrumb = pegarEl("titulo-breadcrumb");
    if (breadcrumb) breadcrumb.textContent = "Não encontrado";

    // CTA de WhatsApp mais genérica nesse caso
    const cta = pegarEl("cta-case-whats");
    if (cta) {
      cta.setAttribute(
        "data-mensagem",
        "Olá, Dra. Samantha! Tentei abrir um case no seu site e não carregou. Pode me ajudar?"
      );
    }
  }

  function init() {
    if (typeof LISTA_CASES === "undefined") {
      console.warn("LISTA_CASES não está disponível. Verifique o script dados-cases.js.");
      mostrarNaoEncontrado();
      return;
    }

    const id = pegarParametro("id");
    if (!id) {
      mostrarNaoEncontrado();
      return;
    }

    const encontrado = LISTA_CASES.find((c) => c.id === id);
    if (!encontrado) {
      mostrarNaoEncontrado();
      return;
    }

    // Título e breadcrumb
    const titulo = pegarEl("titulo-case");
    const breadcrumb = pegarEl("titulo-breadcrumb");
    if (titulo) titulo.textContent = encontrado.nome;
    if (breadcrumb) breadcrumb.textContent = encontrado.nome;

    // Ajusto o title do navegador pra ficar bonito em aba e compartilhamento
    document.title = `${encontrado.nome} | Case`;

    // Resumo
    const resumo = pegarEl("resumo-case");
    if (resumo) resumo.textContent = encontrado.resumoResultado;

    // Contexto / desafio / resultado
    const contexto = pegarEl("case-contexto");
    const desafio = pegarEl("case-desafio");
    const resultado = pegarEl("case-resultado");
    if (contexto) contexto.textContent = encontrado.contexto;
    if (desafio) desafio.textContent = encontrado.desafio;
    if (resultado) resultado.textContent = encontrado.resultado;

    // O que foi feito (lista)
    const areaOq = pegarEl("case-o-que-foi-feito");
    if (areaOq) {
      areaOq.innerHTML = "";
      if (Array.isArray(encontrado.oQueFoiFeito) && encontrado.oQueFoiFeito.length) {
        areaOq.appendChild(criarListaItens(encontrado.oQueFoiFeito));
      }
    }

    // Ganhos (lista)
    const areaGanhos = pegarEl("case-ganhos");
    if (areaGanhos) {
      areaGanhos.innerHTML = "";
      if (Array.isArray(encontrado.ganhos) && encontrado.ganhos.length) {
        areaGanhos.appendChild(criarListaItens(encontrado.ganhos));
      }
    }

    // Deixo o CTA final mais certeiro: já vai com o nome do case
    const cta = pegarEl("cta-case-whats");
    if (cta) {
      cta.setAttribute(
        "data-mensagem",
        `Olá, Dra. Samantha! Vi o case "${encontrado.nome}" no seu site e quero conversar sobre um cenário parecido.`
      );
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
