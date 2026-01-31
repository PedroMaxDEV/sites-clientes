/*
  Projeto: Site institucional - Advocacia Empresarial
  Autor: Pedro Max
  Arquivo: principal.js

  Aqui ficam as rotinas que servem pro site inteiro:
  - WhatsApp (links e formulário)
  - Menu ativo
  - Ano atual no rodapé
*/

(function () {
  "use strict";

  // ⚠️ Caso queira mudar o numero:(apenas dígitos, com DDI + DDD)
  // Ex.: 55819999701844
  const WHATSAPP_NUMERO = "5581999701844";

  // Mensagem padrão quando o elemento não manda uma personalizada
  const MENSAGEM_PADRAO =
    "Olá, Dra. Samantha! Gostaria de falar sobre uma demanda em Direito Empresarial.";

  function limparTexto(valor) {
    return String(valor || "").trim();
  }

  function montarLinkWhatsApp(mensagem) {
    const texto = encodeURIComponent(limparTexto(mensagem) || MENSAGEM_PADRAO);
    return `https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`;
  }

  function prepararLinksWhatsApp() {
    // Tudo que tiver data-whats vira link de WhatsApp.
    // Eu faço isso aqui pra você não precisar ficar repetindo href manualmente.
    const elementos = document.querySelectorAll("[data-whats]");
    elementos.forEach((el) => {
      const mensagem = el.getAttribute("data-mensagem") || MENSAGEM_PADRAO;
      const link = montarLinkWhatsApp(mensagem);

      // Se já for um <a>, só garanto os atributos.
      if (el.tagName.toLowerCase() === "a") {
        el.setAttribute("href", link);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
        return;
      }

      // Se não for <a>, eu transformo em clicável sem mexer no HTML.
      el.style.cursor = "pointer";
      el.addEventListener("click", () => window.open(link, "_blank", "noopener"));
      el.setAttribute("role", "link");
      el.setAttribute("tabindex", "0");
      el.addEventListener("keydown", (evt) => {
        if (evt.key === "Enter" || evt.key === " ") {
          evt.preventDefault();
          window.open(link, "_blank", "noopener");
        }
      });
    });

    // Botão flutuante: usa o mesmo esquema, só que você pediu data-whats-flutuante
    const flutuante = document.querySelector("[data-whats-flutuante]");
    if (flutuante) {
      const mensagem = flutuante.getAttribute("data-mensagem") || MENSAGEM_PADRAO;
      const link = montarLinkWhatsApp(mensagem);

      flutuante.setAttribute("href", link);
      flutuante.setAttribute("target", "_blank");
      flutuante.setAttribute("rel", "noopener");
    }
  }

  function marcarMenuAtivo() {
    const caminhoAtual = window.location.pathname;
    const paginaAtual = caminhoAtual.split("/").pop() || "index.html";

    const linksMenu = document.querySelectorAll(".menu-principal__link");
    linksMenu.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const arquivo = href.split("/").pop();

      if (arquivo === paginaAtual) {
        link.classList.add("menu-principal__link--ativo");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("menu-principal__link--ativo");
        link.removeAttribute("aria-current");
      }
    });
  }

  function atualizarAnoRodape() {
    const alvo = document.getElementById("ano-atual");
    if (!alvo) return;
    alvo.textContent = String(new Date().getFullYear());
  }

  function prepararFormularioContato() {
    const form = document.getElementById("formulario-contato");
    if (!form) return;

    form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      // Pegando os campos pelo id porque é mais direto e não quebra fácil
      const nome = limparTexto(document.getElementById("nome")?.value);
      const email = limparTexto(document.getElementById("email")?.value);
      const telefone = limparTexto(document.getElementById("telefone")?.value);
      const assunto = limparTexto(document.getElementById("assunto")?.value);
      const mensagem = limparTexto(document.getElementById("mensagem")?.value);

      const linhas = [
        "Olá, Dra. Samantha! Seguem meus dados para atendimento:",
        "",
        `- Nome: ${nome || "Não informado"}`,
        `- E-mail: ${email || "Não informado"}`,
        `- Telefone: ${telefone || "Não informado"}`,
        `- Assunto: ${assunto || "Não informado"}`,
      ];

      // Mensagem é opcional, então só incluo se a pessoa escreveu
      if (mensagem) {
        linhas.push(`- Mensagem:l: ${mensagem}`);
      }

      const textoFinal = linhas.join("\n");
      const link = montarLinkWhatsApp(textoFinal);

      window.open(link, "_blank", "noopener");
    });
  }

  function init() {
    prepararLinksWhatsApp();
    marcarMenuAtivo();
    atualizarAnoRodape();
    prepararFormularioContato();
  }

  document.addEventListener("DOMContentLoaded", init);
})();

/* =========================
   HERO VÍDEO — TOGGLE SOM (sem atraso)
   Autor: Pedro Max
   ========================= */
(function () {
  "use strict";

  function atualizarBotao(btn, video) {
    const mudo = video.muted || video.volume === 0;

    if (mudo) {
      btn.textContent = "🔊 Ativar som";
      btn.setAttribute("aria-label", "Ativar som");
      btn.classList.remove("midia-hero__som--ativo");
    } else {
      btn.textContent = "🔇 Desativar som";
      btn.setAttribute("aria-label", "Desativar som");
      btn.classList.add("midia-hero__som--ativo");
    }
  }

  function esperar(el, evento, timeoutMs = 2000) {
    return new Promise((resolve) => {
      let ok = false;
      const done = () => {
        if (ok) return;
        ok = true;
        el.removeEventListener(evento, on);
        resolve();
      };
      const on = () => done();
      el.addEventListener(evento, on, { once: true });
      setTimeout(done, timeoutMs);
    });
  }

  async function tocarDoZeroComSom(video) {
    // pausa e força modo "carregar de verdade" (ajuda no sync)
    try { video.pause(); } catch (e) {}

    // garante que vai carregar dados (não só metadata)
    try { video.preload = "auto"; } catch (e) {}

    // volta pro começo
    try { video.currentTime = 0; } catch (e) {}

    // força o navegador a re-sincronizar áudio/vídeo
    try { video.load(); } catch (e) {}

    // espera ficar pronto pra tocar
    await esperar(video, "canplay", 2500);

    // liga som ANTES do play (evita “colar” áudio atrasado depois)
    video.muted = false;
    video.volume = 1;

    // toca
    try { await video.play(); } catch (e) {}

    // segurança extra: alguns mobiles começam em 0.05~0.2s
    // então garantimos 0 certinho e tocamos de novo
    if (video.currentTime > 0.12) {
      try { video.currentTime = 0; } catch (e) {}
      await esperar(video, "seeked", 1500);
      try { await video.play(); } catch (e) {}
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector(".midia-hero__video");
    const btn = document.querySelector(".js-toggle-som");
    if (!video || !btn) return;

    // autoplay no mobile exige muted
    video.muted = true;
    video.volume = 1;

    atualizarBotao(btn, video);

    btn.addEventListener("click", async () => {
      const estaMudoAgora = video.muted || video.volume === 0;

      // ✅ Se vai ATIVAR som: reinicia com sync perfeito
      if (estaMudoAgora) {
        btn.disabled = true; // evita clique duplo
        await tocarDoZeroComSom(video);
        btn.disabled = false;
        atualizarBotao(btn, video);
        return;
      }

      // ✅ Se já está com som: só muta (sem reiniciar)
      video.muted = true;
      atualizarBotao(btn, video);
    });

    video.addEventListener("volumechange", () => atualizarBotao(btn, video));
  });
})();


/* =========================
   PRÉ-ATENDIMENTO WHATSAPP (CHATBOT)
   Autor: Pedro Max
   ========================= */

(function(){
  const WHATS_NUMERO = "5581999701844"; // <- ajuste aqui se mudar

  const elChat = document.getElementById("chatbot");
  if(!elChat) return;

  const elCorpo = document.getElementById("chatbotCorpo");
  const elInput = document.getElementById("chatbotInput");
  const elEnviar = document.getElementById("chatbotEnviar");
  const elVoltar = document.getElementById("chatbotVoltar");
  const elReiniciar = document.getElementById("chatbotReiniciar");

  const botoesFechar = elChat.querySelectorAll("[data-chatbot-fechar]");

  // Perguntas (bem objetivas pra não cansar)
  const etapas = [
    { key: "nome", pergunta: "Olá! 😊 Qual seu nome?" },
    { key: "cidade", pergunta: "De qual cidade você fala?" },
    { key: "assunto", pergunta: "Qual assunto você precisa? (ex.: contrato, societário, LGPD, trabalhista, compliance)" },
    { key: "urgencia", pergunta: "Qual a urgência? (Hoje / Esta semana / Sem urgência)" },
    { key: "resumo", pergunta: "Me diga em 1 ou 2 frases o que está acontecendo (bem direto)." }
  ];

  let passo = 0;
  let respostas = {};

  function abrir(){
    elChat.classList.add("is-ativo");
    elChat.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if(elCorpo.children.length === 0){
      iniciar();
    } else {
      // foca no input pra ficar rápido
      setTimeout(() => elInput.focus(), 120);
    }
  }

  function fechar(){
    elChat.classList.remove("is-ativo");
    elChat.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function iniciar(){
    passo = 0;
    respostas = {};
    elCorpo.innerHTML = "";
    msgBot("Perfeito! Vou te fazer algumas perguntas rápidas e, no final, eu monto a mensagem pro WhatsApp.");
    setTimeout(() => perguntarAtual(), 220);
    setTimeout(() => elInput.focus(), 200);
  }

  function msgBot(texto){
    const div = document.createElement("div");
    div.className = "chatbot__msg chatbot__msg--bot";
    div.textContent = texto;
    elCorpo.appendChild(div);
    rolarFim();
  }

  function msgUser(texto){
    const div = document.createElement("div");
    div.className = "chatbot__msg chatbot__msg--user";
    div.textContent = texto;
    elCorpo.appendChild(div);
    rolarFim();
  }

  function rolarFim(){
    elCorpo.scrollTop = elCorpo.scrollHeight;
  }

  function perguntarAtual(){
    if(passo < etapas.length){
      msgBot(etapas[passo].pergunta);
    } else {
      finalizar();
    }
  }

  function limparTexto(t){
    return (t || "").trim().replace(/\s+/g, " ");
  }

  function enviarResposta(){
    const texto = limparTexto(elInput.value);
    if(!texto) return;

    msgUser(texto);

    const etapa = etapas[passo];
    respostas[etapa.key] = texto;

    elInput.value = "";
    passo++;

    setTimeout(() => perguntarAtual(), 250);
  }

  function voltar(){
    if(passo <= 0) return;

    // remove última resposta (volta 1 etapa)
    passo--;
    const key = etapas[passo].key;
    delete respostas[key];

    // remove as 2 últimas mensagens (user + pergunta bot)
    // (se tiver mensagens iniciais, não mexe nelas)
    for(let i = 0; i < 2; i++){
      if(elCorpo.lastElementChild) elCorpo.removeChild(elCorpo.lastElementChild);
    }

    msgBot("Beleza, vamos refazer essa parte.");
    setTimeout(() => perguntarAtual(), 200);
    setTimeout(() => elInput.focus(), 200);
  }

  function montarMensagem(){
    // você pode ajustar esse texto como quiser
    const linhas = [];
    linhas.push("Olá, Dra. Samantha! Vim pelo site e gostaria de um direcionamento.");
    linhas.push("");
    linhas.push(`Nome: ${respostas.nome || "-"}`);
    linhas.push(`Cidade: ${respostas.cidade || "-"}`);
    linhas.push(`Assunto: ${respostas.assunto || "-"}`);
    linhas.push(`Urgência: ${respostas.urgencia || "-"}`);
    linhas.push("");
    linhas.push(`Resumo: ${respostas.resumo || "-"}`);
    linhas.push("");
    linhas.push("Podemos conversar?");
    return linhas.join("\n");
  }

  function finalizar(){
    const mensagem = montarMensagem();

    msgBot("Pronto! ✅ Vou gerar sua mensagem e abrir o WhatsApp. Se quiser, você pode editar antes de enviar.");
    msgBot("Quando você clicar em “Abrir WhatsApp”, a mensagem já vai preenchida.");

    // cria botão “Abrir WhatsApp” dentro do chat
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chatbot__enviar";
    btn.style.width = "100%";
    btn.textContent = "Abrir WhatsApp";

    btn.addEventListener("click", () => {
      const url = `https://wa.me/${WHATS_NUMERO}?text=${encodeURIComponent(mensagem)}`;
      window.open(url, "_blank", "noopener");
      fechar();
    });

    // mostra preview (bonitinho) como msg do bot, mas sem ficar gigante
    const preview = document.createElement("div");
    preview.className = "chatbot__msg chatbot__msg--bot";
    preview.style.whiteSpace = "pre-wrap";
    preview.textContent = mensagem;

    elCorpo.appendChild(preview);
    elCorpo.appendChild(btn);
    rolarFim();

    elInput.disabled = true;
    elEnviar.disabled = true;
  }

  function habilitarInput(){
    elInput.disabled = false;
    elEnviar.disabled = false;
  }

  // Abre o chatbot em QUALQUER botão com data-chatbot-abrir
  // e só “sequestra” o flutuante se você marcar com data-chatbot-flutuante
  document.addEventListener("click", function (ev) {
    const btnChat = ev.target.closest("[data-chatbot-abrir]");
    if (btnChat) {
      ev.preventDefault();
      abrir();
      return;
    }

    // ✅ Flutuante abre o chatbot se tiver data-chatbot-flutuante OU data-whats-flutuante
    const flutuante = ev.target.closest(".botao-whats-fixo[data-chatbot-flutuante], .botao-whats-fixo[data-whats-flutuante]");
    if (flutuante) {
      ev.preventDefault();
      abrir();
    }
  });

  // fechar
  botoesFechar.forEach(b => b.addEventListener("click", fechar));
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && elChat.classList.contains("is-ativo")) fechar();
  });

  // enviar
  elEnviar.addEventListener("click", enviarResposta);
  elInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter") enviarResposta();
  });

  // voltar / reiniciar
  elVoltar.addEventListener("click", () => {
    // se já finalizou, só recomeça
    if(elInput.disabled) {
      habilitarInput();
      iniciar();
      return;
    }
    voltar();
  });

  elReiniciar.addEventListener("click", () => {
    habilitarInput();
    iniciar();
  });
})();

/* =========================================
   Autoplay do vídeo quando ficar visível
   Autor: Pedro Max
   ========================================= */

(function () {
  "use strict";

  function tentaPlay(video) {
    if (!video) return;
    // garante compatibilidade
    video.muted = true;
    video.playsInline = true;

    const p = video.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        // alguns browsers bloqueiam mesmo mutado em raros casos;
        // aqui a gente só evita erro no console.
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector(".js-video-visivel");
    if (!video) return;

    // fallback simples (caso não exista IO)
    if (!("IntersectionObserver" in window)) {
      tentaPlay(video);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            tentaPlay(video);
          } else {
            // pausa quando sai da tela (economiza bateria)
            video.pause();
          }
        });
      },
      {
        root: null,
        threshold: 0.35, // quando ~35% do vídeo estiver visível
      }
    );

    obs.observe(video);

    // bônus: se o usuário troca de aba, pausa; quando volta, retoma se estiver visível
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) video.pause();
    });
  });
})();
