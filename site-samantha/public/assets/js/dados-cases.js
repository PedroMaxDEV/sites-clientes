/*
  Projeto: Site institucional - Advocacia Empresarial
  Autor: Pedro Max
  Arquivo: dados-cases.js

  Aqui ficam os cases em formato de lista.
  O case.html lê pelo parâmetro ?id= e busca nessa lista.
*/

"use strict";

/*
  Observação:
  - id precisa ser único
  - "servicoPrincipal" é o que mais aparece pro cliente no card
  - "oQueFoiFeito" e "ganhos" são listas para deixar o detalhe mais bonito
*/
const LISTA_CASES = [
  {
    id: "contratos-empresariais-01",
    nome: "Reestruturação de Contratos Empresariais",
    segmento: "Serviços",
    porte: "Médio",
    servicoPrincipal: "Contratos Empresariais",
    resumoDesafio:
      "Contratos com cláusulas inconsistentes e ausência de padrões para negociação com fornecedores e parceiros.",
    resumoResultado:
      "Padronização de minutas e redução de riscos contratuais, com maior previsibilidade de prazos, entregas e responsabilidades.",
    contexto:
      "Empresa em crescimento, com aumento de volume de negociações e dependência de fornecedores estratégicos.",
    desafio:
      "A operação avançou mais rápido que o jurídico. Os contratos não acompanhavam o nível de exposição, gerando pontos de conflito e margem para discussão.",
    oQueFoiFeito: [
      "Revisão técnica dos contratos em uso e identificação de cláusulas críticas",
      "Criação de minutas padrão por tipo de relação (fornecedor, parceiro, prestação de serviço)",
      "Ajustes de cláusulas de prazo, penalidades, rescisão e confidencialidade",
      "Orientação prática para negociação e assinatura",
    ],
    resultado:
      "Contratos mais consistentes e alinhados à estratégia, com redução de ruído nas negociações e melhoria na segurança das relações comerciais.",
    ganhos: [
      "Menos discussões por interpretação de cláusulas",
      "Mais previsibilidade e controle de obrigações",
      "Processo de contratação mais rápido e organizado",
    ],
  },

  {
    id: "compliance-trabalhista-01",
    nome: "Implementação de Compliance Trabalhista",
    segmento: "Varejo",
    porte: "Médio",
    servicoPrincipal: "Compliance Trabalhista",
    resumoDesafio:
      "Risco de passivo trabalhista por rotinas internas desalinhadas e ausência de políticas claras para liderança e equipe.",
    resumoResultado:
      "Redução de exposição e maior segurança nas decisões, com rotinas revisadas e diretrizes internas implementadas.",
    contexto:
      "Empresa com equipes operacionais e rotatividade moderada, necessitando padronização de condutas e orientação para lideranças.",
    desafio:
      "A falta de padronização gerava inconsistência nas práticas de gestão, aumentando risco de questionamentos e fragilidades em caso de demanda.",
    oQueFoiFeito: [
      "Diagnóstico de rotinas e pontos críticos",
      "Estruturação de políticas internas e orientações de conduta",
      "Ajustes de procedimentos e checklist de conformidade",
      "Treinamento direcionado para liderança e responsáveis",
    ],
    resultado:
      "Rotina mais segura, com práticas internas mais consistentes e redução do risco de passivos trabalhistas.",
    ganhos: [
      "Mais clareza para tomada de decisão",
      "Padronização de práticas internas",
      "Mitigação de riscos e prevenção de passivos",
    ],
  },

  {
    id: "registro-marcas-01",
    nome: "Registro e Proteção de Marca",
    segmento: "Indústria",
    porte: "Pequeno",
    servicoPrincipal: "Registro de Marcas",
    resumoDesafio:
      "Necessidade de proteção da identidade corporativa e prevenção de uso indevido por terceiros.",
    resumoResultado:
      "Proteção consolidada da marca e redução de risco de conflitos por uso e propriedade intelectual.",
    contexto:
      "Empresa em expansão de mercado, investindo em posicionamento e comunicação, com preocupação em consolidar a marca.",
    desafio:
      "Sem registro, a marca ficava exposta a cópias e disputas, o que poderia travar crescimento e gerar perda de investimento em marketing.",
    oQueFoiFeito: [
      "Análise prévia de viabilidade e pesquisa de anterioridade",
      "Protocolo e acompanhamento do processo",
      "Orientação sobre classes e estratégia de proteção",
      "Ajustes de documentação e suporte em exigências",
    ],
    resultado:
      "Marca protegida com estratégia adequada ao negócio, reduzindo o risco de uso indevido e fortalecendo a identidade corporativa.",
    ganhos: [
      "Mais segurança para investir em marca e marketing",
      "Redução de risco de disputa",
      "Organização da propriedade intelectual",
    ],
  },

  {
    id: "gestao-risco-01",
    nome: "Reestruturação de Processos e Gestão de Riscos",
    segmento: "Serviços",
    porte: "Médio",
    servicoPrincipal: "Gestão de Riscos",
    resumoDesafio:
      "Processos internos sem padronização e vulnerabilidades que impactavam decisões estratégicas.",
    resumoResultado:
      "Redução de vulnerabilidades e fortalecimento da governança com medidas preventivas e ajustes de rotina.",
    contexto:
      "Empresa com operação distribuída, decisões rápidas e necessidade de controle consistente para garantir segurança jurídica.",
    desafio:
      "A ausência de procedimentos claros criava pontos de fragilidade: decisões importantes eram tomadas sem registro adequado e sem critérios padronizados.",
    oQueFoiFeito: [
      "Mapeamento de processos com foco em pontos de risco",
      "Definição de rotinas e responsabilidades",
      "Criação de documentos-base e diretrizes internas",
      "Orientação de lideranças para execução e acompanhamento",
    ],
    resultado:
      "Processos mais organizados, decisões com melhor lastro e redução de riscos ligados a falhas de procedimento.",
    ganhos: [
      "Mais consistência na governança",
      "Menos vulnerabilidade em auditorias e revisões",
      "Rotinas internas mais claras e aplicáveis",
    ],
  },

  {
    id: "mentoria-gestao-01",
    nome: "Mentoria em Gestão e Liderança",
    segmento: "Educação Corporativa",
    porte: "Pequeno",
    servicoPrincipal: "Mentoria e Treinamento",
    resumoDesafio:
      "Necessidade de fortalecer competências decisórias e alinhar práticas de liderança à estratégia do negócio.",
    resumoResultado:
      "Integração entre gestão de pessoas e resultados, com cultura mais orientada a desempenho e rotina de liderança estruturada.",
    contexto:
      "Equipe em crescimento, com líderes recém-promovidos e necessidade de padronizar práticas e comunicação interna.",
    desafio:
      "A falta de método e alinhamento gerava ruído, retrabalho e decisões inconsistentes, afetando clima e execução.",
    oQueFoiFeito: [
      "Diagnóstico de cenário e objetivos de liderança",
      "Mentorias com foco em tomada de decisão e comunicação",
      "Rotinas de acompanhamento e alinhamento de expectativas",
      "Ajustes práticos para fortalecer execução",
    ],
    resultado:
      "Lideranças mais consistentes, com visão sistêmica e práticas alinhadas ao objetivo institucional.",
    ganhos: [
      "Mais clareza na execução e cobrança",
      "Melhoria na comunicação interna",
      "Cultura de gestão mais organizada",
    ],
  },
];
