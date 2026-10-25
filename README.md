# V J Produções e Eventos (React)

Aplicação web institucional e painel de administração da **V J Produções e Eventos**, reescrita em **React + TypeScript + Vite**.

## Recursos e Funcionalidades

- **Experiência Visual e Editorial**:
  - Página inicial completa com hero visual, narrativa de marca, projetos em destaque, catálogo de serviços e depoimento imagético.
  - Catálogo de projetos com filtros dinâmicos por categoria (Celebrações sociais, Corporativo, Ambientes especiais).
  - Páginas dedicadas para todas as categorias:
    - Casamentos (`/casamento`)
    - Corporativo (`/corporativo`)
    - 15 anos (`/15-anos`)
    - Cerimônias (`/cerimonia`)
    - Aniversários (`/aniversario`)
    - Batizados (`/batizado`)
    - Festas e celebrações (`/festas`)
    - Decoração residencial (`/decoracao-residencial`)
    - Especial de Natal (`/especial-natal`) com galeria de alta resolução e modal de ampliação
  - Página institucional da marca (`/sobre-nos`).
  - Galerias de filmes em movimento (`FilmGallery`) suportando vídeos do YouTube e vídeos locais com reprodução fluida.
  - Galeria de mídia gerenciada (`ManagedMediaGallery`) com lightbox responsivo e suporte a fotos, vídeos e YouTube.
  - Botão de WhatsApp flutuante com tracking de conversão Google Tag Manager.
  - SEO abrangente com metadados OpenGraph, Twitter Cards, canonical URLs e Schema.org (`LocalBusiness`, `ProfessionalService`, `WebPage`, `Service`).

- **Painel Administrativo (`/admin`)**:
  - Tela de autenticação para gestão do site.
  - Visão geral com contadores estatísticos (Categorias, Mídias, Publicadas, Destaques) e mídias recentes.
  - Gestão completa de Categorias (Criação, Edição, Reordenação, Remoção segura).
  - Gestão de Mídias (Upload de arquivos, links do YouTube, URLs externas, filtros por tipo e busca por termo, ordenação dinâmica e destaque).
  - Camada de dados com sincronização com API backend e fallback local em memória/localStorage para desenvolvimento.

## Executando o Projeto

```bash
npm run dev
```

Acesse em `http://localhost:3000`.

## Build de Produção

```bash
npm run build
```
