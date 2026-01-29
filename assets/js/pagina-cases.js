/*
  Projeto: Site institucional - Advocacia Empresarial
  Autor: Pedro Max
  Arquivo: pagina-cases.js

  ✅ Renderiza:
  - Case em destaque (o que tiver destaque:true; se não tiver, pega o primeiro)
  - Filtros: segmento, serviço, porte
  - Cards com "desafio em 1 linha" + "resultado principal"
*/

(function () {
  "use strict";

  function el(id) {
    return document.getElementById(id);
  }

  function normalizar(v) {
    return (v || "").trim();
  }

  function valoresUnicos(lista, pickFn) {
    const set = new Set();
    lista.forEach((item) => set.add(pickFn(item)));
    return Array.from(set).filter(Boolean).sort();
  }

  function preencherSelect(select, valores) {
    valores.forEach((valor) => {
      const opt = document.createElement("option");
      opt.value = valor;
      opt.textContent = valor;
      select.appendChild(opt);
    });
  }

  function imgSafe(src) {
    return src && src.trim() ? src : "assets/img/case-placeholder.jpg";
  }

 function montarDestaque(caseItem) {
  const area = el("case-destaque");
  if (!area) return;

  const img = imgSafe(caseItem.imagemDestaque || caseItem.imagemCard);

  area.innerHTML = `
    <article class="case-destaque">
      <div class="case-destaque__midia" aria-hidden="true">
        <img src="${img}" alt="" />
      </div>

      <div class="case-destaque__conteudo">
        <p class="case-destaque__rotulo">CASE EM DESTAQUE</p>
        <h2 class="case-destaque__titulo">${caseItem.cliente}</h2>

        <div class="case-destaque__meta">
          <span class="case-pill">${caseItem.servicoPrincipal}</span>
          <span class="case-pill">${caseItem.segmento}</span>
          <span class="case-pill">${caseItem.porte}</span>
        </div>

        <!-- ✅ Thumb visível no mobile -->
        <div class="case-destaque__thumb" aria-hidden="true">
          <img src="${img}" alt="" />
        </div>

        <p class="case-destaque__linha">
          <strong>Desafio:</strong> ${caseItem.desafioCurto}
        </p>

        <p class="case-destaque__linha">
          <strong>Resultado:</strong> <span class="case-destaque__resultado">${caseItem.resultadoPrincipal}</span>
        </p>

        <div class="case-destaque__acoes">
          <a class="botao botao--destaque" href="case.html?id=${encodeURIComponent(caseItem.id)}">Ver detalhes</a>
          <a class="botao" data-whats data-mensagem="Olá, Dra. Samantha! Vi o case '${caseItem.cliente}' e quero conversar sobre um cenário parecido.">
            Quero um plano para minha empresa
          </a>
        </div>
      </div>
    </article>
  `;

  window.dispatchEvent(new Event("cases:renderizado"));
}

  function montarCard(caseItem) {
    const artigo = document.createElement("article");
    artigo.className = "cartao cartao--case";

    artigo.innerHTML = `
      <div class="cartao__midia cartao__midia--case">
        <img src="${imgSafe(caseItem.imagemCard)}" alt="" />
      </div>

      <div class="cartao__conteudo">
        <div class="cartao__cabecalho">
          <h3 class="cartao__titulo">${caseItem.cliente}</h3>
          <span class="badge-metrica" aria-label="Resultado principal">${caseItem.resultadoPrincipal}</span>
        </div>

        <p class="cartao__texto cartao__texto--meta">
          <strong>Serviço aplicado:</strong> ${caseItem.servicoPrincipal}
        </p>

        <p class="cartao__texto">
          <strong>Desafio:</strong> ${caseItem.desafioCurto}
        </p>

        <div class="cartao__rodape">
          <div class="cartao__tags">
            <span class="tag-case">${caseItem.segmento}</span>
            <span class="tag-case">${caseItem.porte}</span>
          </div>

          <a class="botao botao--mini" href="case.html?id=${encodeURIComponent(caseItem.id)}">Ver case</a>
        </div>
      </div>
    `;

    return artigo;
  }

  function aplicarFiltros(lista, seg, serv, porte) {
    return lista.filter((item) => {
      const okSeg = !seg || item.segmento === seg;
      const okServ = !serv || item.servicoPrincipal === serv;
      const okPorte = !porte || item.porte === porte;
      return okSeg && okServ && okPorte;
    });
  }

  function renderizarLista(lista) {
    const area = el("lista-cases");
    if (!area) return;

    area.innerHTML = "";

    if (!lista.length) {
      area.innerHTML = `
        <div class="aviso-lista-vazia">
          <p class="texto-secao">
            Não encontrei cases com esses filtros. Se quiser, limpe os filtros ou me diga seu cenário no WhatsApp.
          </p>
          <a class="botao botao--destaque" data-whats data-mensagem="Olá, Dra. Samantha! Usei os filtros de cases no seu site e quero ajuda para entender o melhor caminho.">
            Falar no WhatsApp
          </a>
        </div>
      `;
      window.dispatchEvent(new Event("cases:renderizado"));
      return;
    }

    lista.forEach((item) => area.appendChild(montarCard(item)));
    window.dispatchEvent(new Event("cases:renderizado"));
  }

  function init() {
    if (typeof LISTA_CASES === "undefined" || !Array.isArray(LISTA_CASES)) {
      console.warn("LISTA_CASES não está disponível. Verifique o script dados-cases.js.");
      return;
    }

    // destaque
    const destaque = LISTA_CASES.find((c) => c.destaque) || LISTA_CASES[0];
    if (destaque) montarDestaque(destaque);

    // filtros
    const selectSegmento = el("filtro-segmento");
    const selectServico = el("filtro-servico");
    const selectPorte = el("filtro-porte");
    const botaoLimpar = el("botao-limpar-filtros");

    if (!selectSegmento || !selectServico || !selectPorte) return;

    preencherSelect(selectSegmento, valoresUnicos(LISTA_CASES, (c) => c.segmento));
    preencherSelect(selectServico, valoresUnicos(LISTA_CASES, (c) => c.servicoPrincipal));
    preencherSelect(selectPorte, valoresUnicos(LISTA_CASES, (c) => c.porte));

    function atualizar() {
      const seg = normalizar(selectSegmento.value);
      const serv = normalizar(selectServico.value);
      const porte = normalizar(selectPorte.value);
      const filtrada = aplicarFiltros(LISTA_CASES, seg, serv, porte);
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

    atualizar();
  }

  document.addEventListener("DOMContentLoaded", init);

  // integração com seu principal.js (caso você tenha a função)
  window.addEventListener("cases:renderizado", () => {
    if (typeof window.__atualizarWhatsApp === "function") {
      window.__atualizarWhatsApp();
    }
  });
})();
