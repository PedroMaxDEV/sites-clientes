/*
  Projeto: Site institucional - Advocacia Empresarial
  Autor: Pedro Max
  Arquivo: dados-cases.js

  ✅ Manutenção fácil:
  - Para adicionar um novo case, copie um objeto abaixo e cole no final.
  - Troque id, cliente, textos e (se tiver) imagem.
  - Não precisa mexer em cases.html, pagina-cases.js ou detalhe-case.js.
*/

"use strict";

const LISTA_CASES = [
  {
    id: "correia-advogados",
    cliente: "Correia Advogados",
    segmento: "Advocacia",
    porte: "Pequeno",
    servicoPrincipal: "Metodologia de Gestão",
    desafioCurto: "Retrabalho, falta de clareza de papéis e clima organizacional afetado.",
    resultadoPrincipal: "30% mais eficiência",
    destaque: true,

    // imagens (se não tiver agora, deixa placeholder mesmo)
    imagemCard: "assets/img/cases/correia.jpg",
    imagemDestaque: "assets/img/cases/correia-destaque.jpg",

    // detalhes (case.html)
    resumo: "Estruturação de gestão e rotina para reduzir retrabalho, organizar papéis e dar previsibilidade à operação.",
    contexto:
      "Escritório com crescimento de demandas e equipe em expansão, precisando organizar rotinas internas, papéis e responsabilidades para sustentar a operação.",
    desafio:
      "A ausência de um método claro gerava retrabalho, desalinhamento e decisões sem padrão, impactando produtividade e clima.",
    oQueFoiFeito: [
      "Diagnóstico de rotinas, gargalos e pontos de atrito",
      "Definição de papéis, responsabilidades e fluxos essenciais",
      "Padronização de rotinas e ritos de acompanhamento",
      "Orientação para execução e ajustes práticos no dia a dia",
    ],
    resultados: [
      "Aumento de eficiência operacional e redução de retrabalho",
      "Mais clareza de papéis e decisões com critério",
      "Ambiente interno mais organizado e previsível",
    ],
    ganhos: [
      "30% mais eficiência",
      "Menos ruído e mais alinhamento",
      "Rotina mais leve e controlada",
    ],
  },

  {
    id: "suiani-terto-advocacia",
    cliente: "Suiani Terto Advocacia",
    segmento: "Advocacia",
    porte: "Pequeno",
    servicoPrincipal: "Estrutura de Compliance",
    desafioCurto: "Falta de clareza de processos, turnover elevado e riscos trabalhistas.",
    resultadoPrincipal: "Aumento da receita em 20%",
    destaque: false,

    imagemCard: "assets/img/cases/suiani.jpg",
    imagemDestaque: "assets/img/cases/suiani-destaque.jpg",

    resumo:
      "Estruturação de compliance e processos para reduzir risco, estabilizar time e sustentar crescimento com mais segurança.",
    contexto:
      "Operação com rotinas internas pouco definidas e dificuldades na manutenção do time, com riscos trabalhistas e impactos em entrega e receita.",
    desafio:
      "Sem processos claros e diretrizes internas, a operação ficava vulnerável: rotatividade alta, decisões inconsistentes e aumento do risco jurídico.",
    oQueFoiFeito: [
      "Mapeamento de processos e pontos críticos",
      "Criação de diretrizes internas e rotinas de conformidade",
      "Padronização de procedimentos e documentos-base",
      "Treinamento e alinhamento de liderança",
    ],
    resultados: [
      "Redução de vulnerabilidades operacionais",
      "Mais previsibilidade na gestão de pessoas",
      "Operação mais estável para crescimento",
    ],
    ganhos: [
      "Aumento da receita em 20%",
      "Menos risco trabalhista",
      "Time mais estável e organizado",
    ],
  },

  {
    id: "camerite",
    cliente: "Camerite",
    segmento: "Serviços",
    porte: "Médio",
    servicoPrincipal: "Diagnóstico Estratégico",
    desafioCurto: "Ausência de planejamento estratégico e prejuízo financeiro.",
    resultadoPrincipal: "Clareza na tomada de decisão",
    destaque: false,

    imagemCard: "assets/img/cases/camerite.jpg",
    imagemDestaque: "assets/img/cases/camerite-destaque.jpg",

    resumo:
      "Diagnóstico estratégico para organizar prioridades, reduzir desperdícios e orientar decisões com base no cenário real da operação.",
    contexto:
      "Empresa com dificuldades para definir prioridades e controlar impactos financeiros, precisando de clareza para reorganizar direção e execução.",
    desafio:
      "A falta de planejamento gerava decisões reativas, desperdício de recursos e dificuldade em sustentar crescimento com consistência.",
    oQueFoiFeito: [
      "Diagnóstico do cenário e dos principais gargalos",
      "Definição de prioridades e direção prática de execução",
      "Organização de rotinas e critérios de decisão",
      "Plano de ação objetivo para reduzir risco e melhorar previsibilidade",
    ],
    resultados: [
      "Clareza para decidir com critérios e prioridades",
      "Redução de decisões reativas",
      "Organização da rotina para execução consistente",
    ],
    ganhos: [
      "Clareza na tomada de decisão",
      "Plano de ação imediato",
      "Mais previsibilidade financeira",
    ],
  },

  {
    id: "germano-barros-ltda",
    cliente: "Germano & Barros LTDA",
    segmento: "Comércio",
    porte: "Médio",
    servicoPrincipal: "Regularização Societária",
    desafioCurto: "Cenário financeiro prejudicado após morte de sócio.",
    resultadoPrincipal: "Regularização societária",
    destaque: false,

    imagemCard: "assets/img/cases/germano.jpg",
    imagemDestaque: "assets/img/cases/germano-destaque.jpg",

    resumo:
      "Regularização societária com foco em segurança, continuidade e recuperação do patrimônio — evitando travas e conflitos.",
    contexto:
      "Após o falecimento de um sócio, a empresa enfrentou insegurança e impactos financeiros, exigindo reorganização societária para continuidade.",
    desafio:
      "Sem estrutura societária ajustada, o negócio ficou vulnerável a conflitos e travas decisórias, com reflexo direto no patrimônio e na operação.",
    oQueFoiFeito: [
      "Análise do cenário societário e riscos envolvidos",
      "Estruturação do caminho jurídico para regularização",
      "Adequação documental e alinhamento de responsabilidades",
      "Medidas para retomar segurança e estabilidade",
    ],
    resultados: [
      "Regularização societária com retomada de previsibilidade",
      "Redução de risco de conflitos e travas",
      "Recuperação do controle e estabilidade patrimonial",
    ],
    ganhos: [
      "Regularização societária",
      "Recuperação do patrimônio",
      "Continuidade do negócio com segurança",
    ],
  },

  {
    id: "mastermind",
    cliente: "Mastermind (Programas e imersões)",
    segmento: "Educação / Gestão",
    porte: "PMEs",
    servicoPrincipal: "Desenvolvimento de Líderes",
    desafioCurto: "PMEs com dificuldades na gestão empresarial e decisões sem base sólida.",
    resultadoPrincipal: "Otimização de resultados",
    destaque: false,

    imagemCard: "assets/img/cases/mastermind.jpg",
    imagemDestaque: "assets/img/cases/mastermind-destaque.jpg",

    resumo:
      "Desenvolvimento de líderes e gestores com visão técnica e prática para decisões mais seguras, reduzindo riscos e melhorando performance.",
    contexto:
      "Atuação com centenas de empresários e gestores em pequenas e médias empresas, com necessidades recorrentes de organização, liderança e segurança jurídica.",
    desafio:
      "Sem método e governança mínima, as empresas enfrentavam desperdícios, alta rotatividade, passivos e decisões que comprometiam crescimento.",
    oQueFoiFeito: [
      "Mentorias e treinamentos aplicados à realidade da gestão",
      "Organização de rotinas e critérios de decisão",
      "Orientação para reduzir vulnerabilidades e passivos",
      "Desenvolvimento de liderança com foco em performance e previsibilidade",
    ],
    resultados: [
      "Rotinas mais consistentes e liderança mais preparada",
      "Retenção de talentos e redução de turnover",
      "Redução significativa do contencioso trabalhista",
      "Otimização de resultados financeiros ao longo do tempo",
    ],
    ganhos: [
      "Otimização dos resultados financeiros",
      "Redução de turnover",
      "Redução do contencioso trabalhista",
    ],
  },
];
