/*
  Projeto: Site institucional - Advocacia Empresarial
  Autor: Pedro Max
  Arquivo: detalhe-case.js

  case.html?id=...
  - lê id
  - busca no LISTA_CASES
  - joga conteúdo na tela
*/

(function () {
  "use strict";

  function param(nome) {
    const p = new URLSearchParams(window.location.search);
    return p.get(nome);
  }

  function el(id) {
    return document.getElementById(id);
  }

  function criarLista(itens, classe) {
    const ul = document.createElement("ul");
    ul.className = classe || "lista-detalhe";
    itens.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      ul.appendChild(li);
    });
    return ul;
  }

  function naoEncontrado() {
    if (el("titulo-case")) el("titulo-case").textContent = "Case não encontrado";
    if (el("titulo-breadcrumb")) el("titulo-breadcrumb").textContent = "Não encontrado";
    if (el("resumo-case")) {
      el("resumo-case").textContent = "Não encontrei esse case pelo parâmetro da URL. Volte para a lista ou fale no WhatsApp.";
    }
    if (el("cta-case-whats")) {
      el("cta-case-whats").setAttribute("data-mensagem", "Olá, Dra. Samantha! Tentei abrir um case no seu site e não carregou. Pode me ajudar?");
    }
  }

  function init() {
    if (typeof LISTA_CASES === "undefined" || !Array.isArray(LISTA_CASES)) {
      console.warn("LISTA_CASES não está disponível.");
      naoEncontrado();
      return;
    }

    const id = param("id");
    if (!id) {
      naoEncontrado();
      return;
    }

    const c = LISTA_CASES.find((x) => x.id === id);
    if (!c) {
      naoEncontrado();
      return;
    }

    // título / breadcrumb / title do navegador
    if (el("titulo-case")) el("titulo-case").textContent = c.cliente;
    if (el("titulo-breadcrumb")) el("titulo-breadcrumb").textContent = c.cliente;
    document.title = `${c.cliente} | Case`;

    // resumo
    if (el("resumo-case")) el("resumo-case").textContent = c.resumo || c.resultadoPrincipal;

    // meta
    if (el("case-servico")) el("case-servico").textContent = c.servicoPrincipal || "—";
    if (el("case-segmento")) el("case-segmento").textContent = c.segmento || "—";
    if (el("case-porte")) el("case-porte").textContent = c.porte || "—";
    if (el("case-metrica")) el("case-metrica").textContent = c.resultadoPrincipal || "—";

    // corpo
    if (el("case-contexto")) el("case-contexto").textContent = c.contexto || "—";
    if (el("case-desafio")) el("case-desafio").textContent = c.desafio || c.desafioCurto || "—";

    const oq = el("case-o-que-foi-feito");
    if (oq) {
      oq.innerHTML = "";
      if (Array.isArray(c.oQueFoiFeito) && c.oQueFoiFeito.length) oq.appendChild(criarLista(c.oQueFoiFeito));
    }

    const res = el("case-resultados");
    if (res) {
      res.innerHTML = "";
      if (Array.isArray(c.resultados) && c.resultados.length) res.appendChild(criarLista(c.resultados));
    }

    const ganhos = el("case-ganhos");
    if (ganhos) {
      ganhos.innerHTML = "";
      if (Array.isArray(c.ganhos) && c.ganhos.length) ganhos.appendChild(criarLista(c.ganhos));
    }

    // CTA final mais certeiro
    const cta = el("cta-case-whats");
    if (cta) {
      cta.setAttribute(
        "data-mensagem",
        `Olá, Dra. Samantha! Vi o case "${c.cliente}" no seu site e quero conversar sobre um cenário parecido.`
      );
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
