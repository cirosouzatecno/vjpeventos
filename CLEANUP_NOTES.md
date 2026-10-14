# Revisão de estrutura e limpeza

## Correção do espaço vazio

Removido o bloco de banner sem conteúdo das páginas Projetos, Corporativo,
Festas, Batizado, 15 Anos, Casamento, Cerimônias, Aniversário, Decoração
Residencial e Sobre nós. O bloco reservava 732px no desktop e utilizava uma
imagem externa da Hostinger. A remoção elimina tanto o espaço reservado quanto
a solicitação dessa imagem pelo banner; não depende de a imagem carregar.
Home e Especial Natal já não utilizavam esse banner.

## Limpeza realizada

- Removidos `heroBg`, `heroSrcset`, `heroStyle` e seus imports.
- Removidos GridButton e GridEmbed: nenhuma página ou componente os importava.
- Removidos os estilos exclusivos desses componentes e dos antigos banners
  de Natal e título da Home, ausentes dos templates atuais.
- Reduzida a folha de animações ao fade utilizado pelo rodapé, mantendo sua
  duração, atraso e curva de animação efetivos.
- A Home reutiliza as mesmas variáveis visuais de `pageCommons.js`; os valores
  anteriores foram comparados e eram idênticos.
- Removida a propriedade `isTransparent` não utilizada do componente Header;
  o cabeçalho continua explicitamente opaco em BlockNavigation.
- Removida a imagem `src/assets/natal/10.jpg`, sem import ou referência.
- Removidos 11 fragmentos base64 e o script que reconstruía o vídeo da Home.
  O MP4 já versionado tem o SHA-256 esperado pelo script. `build` agora executa
  diretamente `vite build`.
- Removido `metadata.json`, metadado de importação sem consumidor no projeto.

Foram excluídos 17 arquivos, totalizando 740.183 bytes, além do código e CSS
obsoletos nos arquivos mantidos.

## Preservação

As 13 rotas, os 12 links do menu, conteúdos, vídeos, galerias, identidade visual,
SEO, WhatsApp, rodapé e painel administrativo foram mantidos. Os templates de
todas as páginas foram comparados ao commit original: somente os banners e a
propriedade sem efeito do Header foram retirados.

Foram revisados os imports do frontend, APIs, bibliotecas auxiliares, scripts,
estilos e referências de mídia. Todas as dependências declaradas têm uso no
frontend, backend ou build. APIs, schema SQL, inicialização do banco, scripts
administrativos, seeds e configurações de hospedagem foram preservados.

Arquivos públicos de vídeo foram mantidos, inclusive `home-vj.mp4`: registros
do CMS podem referenciar essas URLs sem aparecer nos imports do frontend.
Não houve exclusão de registros do banco nem de arquivos no Vercel Blob.

## Validação

`node scripts/check-site.mjs` verifica os 30 componentes Vue (script, template
e estilos), sintaxe JavaScript, imports locais, rotas do menu e ausência dos
antigos banners. `git diff --check` também passou.

O build completo e a verificação visual permanecem pendentes: a política de
Controle de Aplicativo do Windows bloqueou o módulo nativo do Rollup instalado
localmente. Esse bloqueio já ocorreu antes das alterações. Nenhuma política ou
dependência de produção foi modificada para contorná-lo. A integração real
com Neon/Blob e mídias remotas não foi testada sem o ambiente de hospedagem.
