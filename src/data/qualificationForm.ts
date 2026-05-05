export type Option = {
  id: string;
  label: string;
  rejectType?: "triagem" | "investimento";
};

export type Question = {
  id: string;
  text: string;
  type: "single" | "text";
  options?: Option[];
  placeholder?: string;
  condition?: (answers: Record<string, string>) => boolean;
  note?: string;
};

export const REJECTION_MESSAGE_TRIAGEM = "Obrigado pelo contato. Com base no que você compartilhou, acreditamos que o momento atual do seu negócio ou as suas expectativas ainda não estão alinhados com a forma como a Gaki trabalha. Nosso modelo exige abertura para diagnóstico e processo. Quando esse contexto mudar, será um prazer retomar a conversa.";
export const REJECTION_MESSAGE_INVESTIMENTO = "Com base no investimento que você mencionou, nossos retainers e projetos principais ainda não se encaixam nessa faixa. Isso não significa que não há caminho. Às vezes, uma conversa de consultoria inicial já resolve o que precisa ser resolvido no momento. Se quiser, podemos conversar sobre isso via WhatsApp mesmo.";

export const qualificationQuestions: Question[] = [
  // BLOCO 1
  {
    id: "p1",
    text: "Como você descreveria o momento atual do seu negócio?",
    type: "single",
    options: [
      { id: "A", label: "Estou começando agora, ainda estruturando o produto ou serviço" },
      { id: "B", label: "Já tenho produto ou serviço funcionando, mas a comunicação não acompanha" },
      { id: "C", label: "Meu negócio está crescendo e preciso organizar ou reposicionar a comunicação" },
      { id: "D", label: "Estou em fase de expansão e preciso de um parceiro estratégico de longo prazo" }
    ]
  },
  {
    id: "p2",
    text: "O que você espera de uma agência de comunicação?",
    type: "single",
    options: [
      { id: "A", label: "Que execute o que peço, sem complicar", rejectType: "triagem" },
      { id: "B", label: "Que entenda meu contexto antes de propor qualquer coisa" },
      { id: "C", label: "Que traga resultado rápido, preferencialmente viral", rejectType: "triagem" },
      { id: "D", label: "Que atue como parceiro estratégico no médio e longo prazo" }
    ]
  },
  {
    id: "p3",
    text: "Você tem abertura para passar por um diagnóstico antes de receber qualquer proposta ou entrega?",
    type: "single",
    options: [
      { id: "A", label: "Sim, entendo que isso é necessário para um trabalho bem feito" },
      { id: "B", label: "Prefiro já receber uma proposta com preço e escopo definidos", rejectType: "triagem" },
      { id: "C", label: "Depende do tempo envolvido" }
    ]
  },
  // BLOCO 1.5
  {
    id: "p4",
    text: "Qual é o segmento ou nicho de atuação da sua empresa?",
    type: "single",
    options: [
      { id: "A", label: "Tecnologia e SaaS" },
      { id: "B", label: "Saúde e bem-estar" },
      { id: "C", label: "Educação e treinamento" },
      { id: "D", label: "Varejo e e-commerce" },
      { id: "E", label: "Alimentação e gastronomia" },
      { id: "F", label: "Serviços B2B" },
      { id: "G", label: "Serviços B2C" },
      { id: "H", label: "Construção e imóveis" },
      { id: "I", label: "Moda e lifestyle" },
      { id: "J", label: "Jurídico e contábil" },
      { id: "K", label: "Outro" }
    ]
  },
  {
    id: "p5",
    text: "Há quanto tempo sua empresa está em operação?",
    type: "single",
    options: [
      { id: "A", label: "Menos de 1 ano" },
      { id: "B", label: "Entre 1 e 2 anos" },
      { id: "C", label: "Entre 2 e 5 anos" },
      { id: "D", label: "Mais de 5 anos" }
    ]
  },
  {
    id: "p6",
    text: "Como é o modelo de venda da sua empresa?",
    type: "single",
    options: [
      { id: "A", label: "Vendemos para outras empresas (B2B)" },
      { id: "B", label: "Vendemos para o consumidor final (B2C)" },
      { id: "C", label: "Os dois modelos coexistem" },
      { id: "D", label: "Ainda estamos definindo isso" }
    ]
  },
  {
    id: "p7",
    text: "Quantas pessoas trabalham na sua empresa hoje?",
    type: "single",
    options: [
      { id: "A", label: "Só eu (solopreneur ou MEI)" },
      { id: "B", label: "De 2 a 5 pessoas" },
      { id: "C", label: "De 6 a 20 pessoas" },
      { id: "D", label: "Mais de 20 pessoas" }
    ]
  },
  {
    id: "p8",
    text: "Qual é o faturamento médio mensal atual da sua empresa?",
    type: "single",
    options: [
      { id: "A", label: "Até R$ 10.000 por mês" },
      { id: "B", label: "Entre R$ 10.000 e R$ 30.000 por mês" },
      { id: "C", label: "Entre R$ 30.000 e R$ 80.000 por mês" },
      { id: "D", label: "Entre R$ 80.000 e R$ 200.000 por mês" },
      { id: "E", label: "Acima de R$ 200.000 por mês" },
      { id: "F", label: "Prefiro não informar" }
    ]
  },
  {
    id: "p9",
    text: "Sua empresa já investiu em comunicação ou marketing antes?",
    type: "single",
    options: [
      { id: "A", label: "Sim, temos ou tivemos agência ou profissional contratado" },
      { id: "B", label: "Sim, mas foi algo interno e informal" },
      { id: "C", label: "Não, nunca investimos de forma estruturada" }
    ]
  },
  {
    id: "p10",
    text: "O que não funcionou na experiência anterior com comunicação?",
    type: "single",
    condition: (answers) => answers["p9"] === "A",
    options: [
      { id: "A", label: "Falta de estratégia, só execução" },
      { id: "B", label: "Resultados que não se conectavam ao negócio" },
      { id: "C", label: "Comunicação genérica, sem identidade" },
      { id: "D", label: "Processo desorganizado e sem clareza" },
      { id: "E", label: "Preço incompatível com o resultado entregue" },
      { id: "F", label: "Falta de alinhamento e entendimento do negócio" },
      { id: "G", label: "Outro" }
    ]
  },
  {
    id: "p11",
    text: "Qual é o principal canal de aquisição de clientes da sua empresa hoje?",
    type: "single",
    options: [
      { id: "A", label: "Indicação" },
      { id: "B", label: "Redes sociais (orgânico)" },
      { id: "C", label: "Tráfego pago" },
      { id: "D", label: "Prospecção ativa" },
      { id: "E", label: "Marketplaces ou plataformas" },
      { id: "F", label: "Eventos e networking" },
      { id: "G", label: "Ainda não temos canal principal definido" }
    ]
  },
  {
    id: "p12",
    text: "Você tem alguma meta de crescimento definida para os próximos 12 meses?",
    type: "single",
    options: [
      { id: "A", label: "Sim, temos metas claras e documentadas" },
      { id: "B", label: "Temos uma ideia geral, mas sem formalização" },
      { id: "C", label: "Não temos metas definidas ainda" }
    ]
  },
  // BLOCO 2
  {
    id: "p13",
    text: "Quando um cliente novo descobre sua empresa, qual é a primeira impressão que você acredita que ele tem?",
    type: "single",
    options: [
      { id: "A", label: "Passa profissionalismo e credibilidade imediata" },
      { id: "B", label: "É funcional, mas não impressiona" },
      { id: "C", label: "Ainda não reflete bem o que entregamos" },
      { id: "D", label: "Honestamente, não sei o que ele pensa" },
      { id: "E", label: "Nunca parei para pensar nisso" }
    ]
  },
  {
    id: "p14",
    text: "Se um concorrente seu e sua empresa aparecessem lado a lado para um cliente em potencial, o que faria ele escolher você?",
    type: "text",
    placeholder: "Ex: Nosso atendimento é mais próximo, nosso método é exclusivo..."
  },
  {
    id: "p15",
    text: "O que significa, para você, ter uma boa presença de marca?",
    type: "text",
    placeholder: "Ex: Ser reconhecido pela qualidade, ter um visual moderno..."
  },
  {
    id: "p16",
    text: "Você já perdeu um cliente ou uma oportunidade e teve a sensação de que a comunicação da sua empresa pode ter influenciado nisso?",
    type: "single",
    options: [
      { id: "A", label: "Sim, claramente" },
      { id: "B", label: "Talvez, mas não tenho certeza" },
      { id: "C", label: "Não acredito que comunicação tenha influenciado" },
      { id: "D", label: "Nunca parei para analisar isso" }
    ]
  },
  {
    id: "p17",
    text: "Quando você pensa em crescer nos próximos 12 meses, o que vem primeiro na sua cabeça?",
    type: "single",
    options: [
      { id: "A", label: "Aumentar o time" },
      { id: "B", label: "Melhorar o produto ou serviço" },
      { id: "C", label: "Vender mais" },
      { id: "D", label: "Comunicar melhor o que já entregamos" },
      { id: "E", label: "Alcançar pessoas que ainda não me conhecem" },
      { id: "F", label: "Consolidar a reputação que já construímos" }
    ]
  },
  {
    id: "p18",
    text: "Se você tivesse que explicar o que sua empresa faz em uma frase, como seria?",
    type: "text",
    placeholder: "Nós ajudamos [quem] a [fazer o que] entregando [resultado]..."
  },
  {
    id: "p19",
    text: "Você acompanha alguma referência de comunicação ou marca que admira? Pode ser do seu setor ou fora dele.",
    type: "text",
    placeholder: "Ex: Gosto da comunicação da marca X porque..."
  },
  // BLOCO 3
  {
    id: "p20",
    text: "Qual dessas situações mais se aproxima do que você está vivendo agora?",
    type: "single",
    options: [
      { id: "A", label: "Minha marca visual não me representa mais, ou nunca representou de verdade" },
      { id: "B", label: "Produzimos conteúdo, mas sem consistência, estratégia ou resultado claro" },
      { id: "C", label: "Não sabemos como nos posicionar ou comunicar o que fazemos de forma clara" },
      { id: "D", label: "Preciso de tudo isso, mas não sei por onde começar" }
    ]
  },
  {
    id: "p21",
    text: "Você já tem alguma identidade visual definida?",
    type: "single",
    options: [
      { id: "A", label: "Sim, temos marca consolidada e não precisamos mexer nisso agora" },
      { id: "B", label: "Temos algo, mas está desatualizado ou não funciona bem" },
      { id: "C", label: "Não temos ou o que existe foi feito de forma amadora" }
    ]
  },
  {
    id: "p22",
    text: "Você já produz conteúdo para redes sociais hoje?",
    type: "single",
    options: [
      { id: "A", label: "Sim, de forma consistente e com estratégia" },
      { id: "B", label: "Sim, mas de forma irregular e sem estratégia clara" },
      { id: "C", label: "Muito pouco ou quase nada" },
      { id: "D", label: "Não produzimos e nem sabemos como começar" }
    ]
  },
  {
    id: "p23",
    text: "Você já tentou definir o posicionamento da sua marca ou empresa antes?",
    type: "single",
    options: [
      { id: "A", label: "Sim, temos posicionamento claro e documentado" },
      { id: "B", label: "Já tentamos, mas nunca chegamos a algo concreto ou utilizável" },
      { id: "C", label: "Nunca fizemos isso de forma estruturada" },
      { id: "D", label: "Não sei bem o que isso significa na prática" }
    ]
  },
  // BLOCO 4
  {
    id: "p24",
    text: "Como você enxerga o investimento em comunicação hoje?",
    type: "single",
    options: [
      { id: "A", label: "É uma prioridade clara no orçamento da empresa" },
      { id: "B", label: "É importante, mas ainda estamos definindo o quanto conseguimos alocar" },
      { id: "C", label: "Ainda é difícil justificar internamente, mas reconheço a necessidade" },
      { id: "D", label: "Ainda não pensei nisso com clareza" }
    ]
  },
  {
    id: "p25",
    text: "Pensando no cenário atual da sua empresa, qual faixa de investimento mensal em comunicação seria viável para você?",
    type: "single",
    options: [
      { id: "A", label: "Até R$ 1.500 por mês", rejectType: "investimento" },
      { id: "B", label: "Entre R$ 1.500 e R$ 3.000 por mês" },
      { id: "C", label: "Entre R$ 3.000 e R$ 5.000 por mês" },
      { id: "D", label: "Acima de R$ 5.000 por mês" },
      { id: "E", label: "Prefiro discutir isso em uma conversa" }
    ]
  },
  {
    id: "p26",
    text: "Para projetos pontuais (identidade visual, branding), qual faixa de investimento único você conseguiria considerar?",
    type: "single",
    condition: (answers) => {
      return answers["p20"] === "A" || answers["p21"] === "B" || answers["p21"] === "C";
    },
    options: [
      { id: "A", label: "Até R$ 2.000", rejectType: "investimento" },
      { id: "B", label: "Entre R$ 2.000 e R$ 4.000" },
      { id: "C", label: "Entre R$ 4.000 e R$ 8.000" },
      { id: "D", label: "Acima de R$ 8.000" },
      { id: "E", label: "Prefiro discutir em conversa" }
    ]
  },
  // BLOCO 5
  {
    id: "p27",
    text: "Como você prefere dar o próximo passo?",
    type: "single",
    options: [
      { id: "A", label: "Quero agendar uma conversa para entender melhor como a Gaki pode ajudar" },
      { id: "B", label: "Prefiro receber um material explicativo antes de conversar" },
      { id: "C", label: "Já tenho clareza e quero discutir um escopo e proposta" }
    ]
  }
];

export function generateWhatsAppLink(answers: Record<string, string>, phone: string) {
  let text = "Olá, Gaki! Finalizei o formulário de qualificação. Aqui está meu perfil:\n\n";
  
  qualificationQuestions.forEach(q => {
    if (answers[q.id]) {
      let answerText = answers[q.id];
      if (q.type === "single") {
        const option = q.options?.find(o => o.id === answerText);
        if (option) answerText = option.label;
      }
      text += `*${q.id.toUpperCase()}. ${q.text}*\nR: ${answerText}\n\n`;
    }
  });

  text += "Gostaria de falar sobre o próximo passo.";

  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${phone}?text=${encodedText}`;
}
