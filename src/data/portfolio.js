import { buildWhatsAppUrl } from '@/components/builder/whatsAppUrl.js'
import { whatsAppNumber, whatsAppMessage } from './siteMeta.js'
export const contactUrl = buildWhatsAppUrl(whatsAppNumber, whatsAppMessage)
export const instagramUrl = 'https://www.instagram.com/vjproducoes.eventos/'
export const categories = [
  { slug: 'casamento', name: 'Casamentos', group: 'social', image: '/images/casamento.jpg', line: 'O começo de uma história. Um cenário à altura.', description: 'Flores, luz e composições que traduzem a personalidade do casal. Uma ambientação pensada para acolher e emocionar, do primeiro olhar ao último brinde.', videos: ['GHdQmejdlc0', 'AwAIUZ8kw88'] },
  { slug: 'corporativo', name: 'Corporativo', group: 'corporativo', image: '/images/corporativo.jpg', line: 'A essência da sua marca ganha espaço.', description: 'Cenografia e ambientação para encontros de negócios, lançamentos e celebrações empresariais. Cada elemento faz parte de uma experiência que aproxima pessoas e marcas.', videos: ['tBLXPjqC4-0', 'lLp8gHRiH-g', 'wnrmnXJ2Ky8', 'Ggcp1TDyJhw', 'nZxVG5JVpMQ', 'ZJfyptWijm8'] },
  { slug: '15-anos', name: '15 anos', group: 'social', image: '/images/celebracoes.jpg', line: 'Uma noite para ser inteiramente você.', description: 'Uma celebração com personalidade, dos pequenos detalhes ao grande cenário. Criamos ambientes para viver essa nova fase com beleza e emoção.', videos: ['b_U5UsKwP-4', 'XW1wM9aRoAk', 'pr45v1cjmJo', 'w9qgYRzc7gA'] },
  { slug: 'cerimonia', name: 'Cerimônias', group: 'social', image: '/images/cerimonia.jpg', line: 'Beleza que acompanha os momentos essenciais.', description: 'Composições florais e ambientações que respeitam o significado de cada cerimônia. Um olhar cuidadoso para o caminho, o encontro e cada gesto.', localVideos: ['/videos/cerimonia-1.mp4', '/videos/cerimonia-2.mp4'] },
  { slug: 'aniversario', name: 'Aniversários', group: 'social', image: '/images/detalhes.jpg', line: 'A vida merece ser celebrada com beleza.', description: 'Da reunião intimista à grande festa, criamos decorações que refletem quem você é. Cores, flores e detalhes em harmonia com a sua celebração.', videos: ['36HJliv-nKA'] },
  { slug: 'batizado', name: 'Batizados', group: 'social', image: '/images/floral.jpg', line: 'Delicadeza para guardar na memória.', description: 'Uma ambientação delicada e acolhedora para reunir a família. Detalhes pensados com carinho para uma celebração cheia de significado.', videos: ['aLMI6EK5VWo'] },
  { slug: 'festas', name: 'Festas e celebrações', group: 'social', image: '/images/detalhes.jpg', line: 'Cada motivo para celebrar tem sua própria beleza.', description: 'Encontros, festas e ocasiões especiais com uma decoração que conta a sua história. Desenvolvemos a ambientação a partir do que torna esse momento único.' },
  { slug: 'decoracao-residencial', name: 'Decoração residencial', group: 'ambientes', image: '/images/projetos.jpg', line: 'O prazer de estar em um lugar que acolhe.', description: 'Composições e ambientações para renovar o olhar sobre a sua casa. Uma curadoria de detalhes, texturas e elementos para tornar os espaços mais especiais.', videos: ['ajECYFgRKGI', 'WmZMLeSeleo', 'UhFUI6uWPKU'] },
  { slug: 'especial-natal', name: 'Especial de Natal', group: 'ambientes', image: new URL('../assets/natal/11.jpg', import.meta.url).href, line: 'O encanto de uma época que reúne.', description: 'Árvores, guirlandas e composições que trazem o espírito do Natal para residências, empresas e celebrações. Projetos com luz, afeto e personalidade.' },
]
export const process = [
  { title: 'Escutar', text: 'Tudo começa com uma conversa. Conhecemos sua história, seus desejos e o que você imagina para esse momento.' },
  { title: 'Criar', text: 'Traduzimos as ideias em uma proposta de ambientação, conectando cores, flores, materiais e espaço.' },
  { title: 'Realizar', text: 'Cuidamos da montagem e da composição dos detalhes para que o cenário esteja pronto para receber a sua celebração.' },
]
