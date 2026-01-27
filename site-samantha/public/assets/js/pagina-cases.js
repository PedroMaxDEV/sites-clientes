/*
  Projeto: Site institucional - Advocacia Empresarial
  Autor: Pedro Max
  Arquivo: pagina-cases.js

  Aqui eu monto a listagem e os filtros da página cases.html.
  - Popula os selects (segmento/serviço/porte)
  - Renderiza os cards
  - Aplica filtro simples sem complicar
*/

(function () {
  "use strict";

  function pegarElemento(id) {
    return document.getElementById(id);
  }

  function normalizarTexto(valor) {
    return String(valor || "").trim();
  }

  function ordenarAlfabetico(a, b) {
    return normalizarTexto(a).localeCompare(normalizarTexto(b), "pt-BR");
  }

  function valoresUnicos(lista, seletor) {
    const set = new Set();
    lista.forEach((item) => {
      const valor = normalizarTexto(seletor(item));
      if (valor) set.add(valor);
    });
    return Array.from(set).sort(ordenarAlfabetico);
  }

  function preencherSelect(select, valores) {
    // Mantém o primeiro option ("Todos") e adiciona o resto
    valores.forEach((valor) => {
      const opt = document.createElement("option");
      opt.value = valor;
      opt.textContent = valor;
      select.appendChild(opt);
    });
  }

  function montarCardCase(caseItem) {
    const artigo = document.createElement("article");
    artigo.className = "cartao cartao--case";

    // Eu deixei imagem com placeholder; você troca depois no assets/img
    artigo.innerHTML = `
      <div class="cartao__midia">
        <!-- inserir foto do case aqui (opcional) -->
        <img src="assets/img/case-placeholder.jpg" alt="" />
      </div>

      <div class="cartao__conteudo">
        <h3 class="cartao__titulo">${caseItem.nome}</h3>

        <p class="cartao__texto">
          <strong>Segmento:</strong> ${caseItem.segmento} &nbsp;|&nbsp;
          <strong>Porte:</strong> ${caseItem.porte}
        </p>

        <p class="cartao__texto">
          <strong>Serviço principal:</strong> ${caseItem.servicoPrincipal}
        </p>

        <p class="cartao__texto">
          <strong>Desafio:</strong> ${caseItem.resumoDesafio}
        </p>

        <p class="cartao__texto">
          <strong>Resultado:</strong> ${caseItem.resumoResultado}
        </p>

        <div class="cartao__acoes">
          <a class="botao" href="case.html?id=${encodeURIComponent(caseItem.id)}">Ver detalhes</a>
        </div>
      </div>
    `;

    return artigo;
  }

  function aplicarFiltros(lista, filtroSegmento, filtroServico, filtroPorte) {
    return lista.filter((item) => {
      const bateSegmento = !filtroSegmento || item.segmento === filtroSegmento;
      const bateServico = !filtroServico || item.servicoPrincipal === filtroServico;
      const batePorte = !filtroPorte || item.porte === filtroPorte;
      return bateSegmento && bateServico && batePorte;
    });
  }

  function renderizarLista(lista) {
    const area = pegarElemento("lista-cases");
    if (!area) return;

    area.innerHTML = "";

    if (!lista.length) {
      const aviso = document.createElement("div");
      aviso.className = "aviso-lista-vazia";
      aviso.innerHTML = `
        <p class="texto-secao">
          Não encontrei cases com esses filtros. Se quiser, limpe os filtros ou chame no WhatsApp para me contar seu cenário.
        </p>
        <a class="botao botao--destaque" data-whats data-mensagem="Olá, Dra. Samantha! Filtrei os cases no site e quero conversar sobre minha demanda.">
          Falar no WhatsApp
        </a>
      `;
      area.appendChild(aviso);

      // Importante: como esse botão foi criado via JS, eu disparo o “prepararLinksWhatsApp” de novo.
      if (window && window.dispatchEvent) {
        window.dispatchEvent(new Event("cases:renderizado"));
      }
      return;
    }

    lista.forEach((item) => area.appendChild(montarCardCase(item)));

    // Mesma ideia: renderizei coisa nova, então eu deixo o principal.js “pegar” os data-whats se precisar.
    if (window && window.dispatchEvent) {
      window.dispatchEvent(new Event("cases:renderizado"));
    }
  }

  function init() {
    // Segurança: se alguém abriu a página sem carregar dados-cases.js, eu não deixo quebrar feio
    if (!window.LISTA_CASES && typeof LISTA_CASES === "undefined") {
      console.warn("LISTA_CASES não está disponível. Verifique o script dados-cases.js.");
      return;
    }

    // LISTA_CASES vem do arquivo dados-cases.js
    const listaCompleta = typeof LISTA_CASES !== "undefined" ? LISTA_CASES : window.LISTA_CASES;

    const selectSegmento = pegarElemento("filtro-segmento");
    const selectServico = pegarElemento("filtro-servico");
    const selectPorte = pegarElemento("filtro-porte");
    const botaoLimpar = pegarElemento("botao-limpar-filtros");

    if (!selectSegmento || !selectServico || !selectPorte) return;

    // Preenchendo selects com valores únicos reais (evita “inventar” filtro)
    preencherSelect(selectSegmento, valoresUnicos(listaCompleta, (c) => c.segmento));
    preencherSelect(selectServico, valoresUnicos(listaCompleta, (c) => c.servicoPrincipal));
    preencherSelect(selectPorte, valoresUnicos(listaCompleta, (c) => c.porte));

    function atualizar() {
      const filtroSegmento = normalizarTexto(selectSegmento.value);
      const filtroServico = normalizarTexto(selectServico.value);
      const filtroPorte = normalizarTexto(selectPorte.value);

      const filtrada = aplicarFiltros(listaCompleta, filtroSegmento, filtroServico, filtroPorte);
      renderizarLista(filtrada);
    }

    selectSegmento.addEventListener("change", atualizar);
    selectServico.addEventListener("change", atualizar);
    selectPorte.addEventListener("change", atualizar);

    if (botaoLimpar) {
      botaoLimpar.addEventListener("click", () => {
        selectSegmento.value = "";
        selectServico.value = "";
        selectPorte.value = "";
        atualizar();
      });
    }

    // Primeira renderização sem filtros
    atualizar();
  }

  document.addEventListener("DOMContentLoaded", init);

  /*
    Pequena integração:
    Quando eu renderizo elementos com data-whats via JS,
    eu sinalizo pro principal.js atualizar os links.
  */
  window.addEventListener("cases:renderizado", () => {
    // Se por algum motivo você tirar o principal.js, isso aqui não incomoda.
    if (typeof window.__atualizarWhatsApp === "function") {
      window.__atualizarWhatsApp();
    }
  });
})();
