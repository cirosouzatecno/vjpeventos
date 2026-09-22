<template>
  <main class="admin-shell">
    <section v-if="!session" class="admin-login">
      <div class="admin-mark">LE JARDIN <span>STUDIO</span></div>
      <p class="eyebrow">Área restrita</p>
      <h1>Gestão de conteúdo</h1>
      <form @submit.prevent="login" class="admin-form">
        <label>E-mail<input v-model="email" type="email" required autocomplete="email" /></label>
        <label>Senha<input v-model="password" type="password" required autocomplete="current-password" /></label>
        <button type="submit">Entrar no painel</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </section>
    <section v-else class="admin-dashboard">
      <header class="admin-header"><div><p class="eyebrow">Le Jardin Studio</p><h1>Conteúdo do site</h1></div><button class="ghost" @click="logout">Sair</button></header>
      <div class="admin-grid">
        <aside class="admin-nav"><button :class="{active: tab === 'videos'}" @click="tab='videos'">Vídeos e imagens</button><button :class="{active: tab === 'categories'}" @click="tab='categories'">Categorias</button></aside>
        <div class="admin-content">
          <div v-if="tab === 'categories'" class="panel"><div class="panel-heading"><div><p class="eyebrow">Organização</p><h2>Categorias</h2></div></div><form class="inline-form" @submit.prevent="createCategory"><input v-model="newCategory" placeholder="Nome da categoria" required /><button>Adicionar</button></form><ul><li v-for="category in categories" :key="category.id"><span>{{ category.name }}</span><button class="delete" @click="deleteCategory(category.id)">Remover</button></li></ul></div>
          <div v-else class="panel"><div class="panel-heading"><div><p class="eyebrow">Biblioteca</p><h2>Vídeos e imagens</h2></div><button @click="showForm = !showForm">{{ showForm ? 'Fechar' : 'Adicionar mídia' }}</button></div><form v-if="showForm" class="media-form" @submit.prevent="createMedia"><input v-model="form.title" placeholder="Título" required /><input v-model="form.youtube_id" placeholder="ID do YouTube (ex.: dco9jz2aL7o)" /><input v-model="form.image_url" placeholder="URL da imagem (opcional)" /><select v-model="form.category_id"><option value="">Sem categoria</option><option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option></select><label class="check"><input v-model="form.featured" type="checkbox" /> Destaque na página inicial</label><button>Publicar mídia</button></form><div class="media-list"><article v-for="item in media" :key="item.id"><img :src="item.image_url || thumbnail(item.youtube_id)" :alt="item.title" /><div><strong>{{ item.title }}</strong><small>{{ item.youtube_id ? 'YouTube' : 'Imagem' }}</small></div><button class="delete" @click="deleteMedia(item.id)">Remover</button></article><p v-if="!media.length" class="empty">Nenhuma mídia cadastrada.</p></div></div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { requireSupabase, supabase, youtubeThumbnail } from '@/lib/supabase.js'
const session = ref(null); const email = ref(''); const password = ref(''); const error = ref(''); const tab = ref('videos'); const categories = ref([]); const media = ref([]); const newCategory = ref(''); const showForm = ref(false); const form = reactive({ title: '', youtube_id: '', image_url: '', category_id: '', featured: false })
const thumbnail = (id) => id ? youtubeThumbnail(id) : ''
async function login() { error.value = ''; try { const client = requireSupabase(); const result = await client.auth.signInWithPassword({ email: email.value, password: password.value }); if (result.error) throw result.error; session.value = result.data.session; await load() } catch { error.value = 'E-mail ou senha inválidos.' } }
async function logout() { await supabase?.auth.signOut(); session.value = null }
async function load() { const client = requireSupabase(); const [c, m] = await Promise.all([client.from('categories').select('*').order('sort_order'), client.from('media_items').select('*').order('sort_order').order('created_at', { ascending: false })]); categories.value = c.data || []; media.value = m.data || [] }
async function createCategory() { const client = requireSupabase(); await client.from('categories').insert({ name: newCategory.value, slug: newCategory.value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }); newCategory.value = ''; await load() }
async function deleteCategory(id) { await requireSupabase().from('categories').delete().eq('id', id); await load() }
async function createMedia() { await requireSupabase().from('media_items').insert({ ...form, youtube_id: form.youtube_id || null, image_url: form.image_url || null, category_id: form.category_id || null }); Object.assign(form, { title: '', youtube_id: '', image_url: '', category_id: '', featured: false }); showForm.value = false; await load() }
async function deleteMedia(id) { await requireSupabase().from('media_items').delete().eq('id', id); await load() }
onMounted(async () => { if (!supabase) return; const { data } = await supabase.auth.getSession(); session.value = data.session; if (session.value) await load() })
</script>

<style scoped>
.admin-shell{min-height:100vh;background:#f4f0e9;color:#17372a;font-family:Arial,sans-serif}.admin-login{max-width:460px;margin:auto;padding:14vh 24px}.admin-mark{font:600 18px Georgia,serif;letter-spacing:.18em;margin-bottom:80px}.admin-mark span{display:block;font:10px Arial;letter-spacing:.4em;color:#ad7e39;margin-top:8px}.eyebrow{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#ad7e39}.admin-login h1,.admin-header h1{font:400 48px Georgia,serif;margin:12px 0 36px}.admin-form,.media-form{display:flex;flex-direction:column;gap:16px}.admin-form label{font-size:12px;display:flex;flex-direction:column;gap:7px}.admin-form input,.media-form input,.media-form select,.inline-form input{border:1px solid #cfc8bb;background:#fff;padding:14px;font:inherit}.admin-form button,.panel-heading button,.inline-form button,.media-form button{background:#17372a;color:#fff;border:0;padding:14px 18px;cursor:pointer}.error{color:#a13b2e;font-size:13px}.admin-dashboard{max-width:1180px;margin:auto;padding:44px 24px}.admin-header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid #d7d0c4;padding-bottom:28px}.admin-header h1{margin-bottom:0}.ghost{background:transparent;border:1px solid #17372a;padding:10px 18px;color:#17372a}.admin-grid{display:grid;grid-template-columns:210px 1fr;gap:48px;padding-top:42px}.admin-nav{display:flex;flex-direction:column;gap:8px}.admin-nav button{border:0;background:transparent;text-align:left;padding:13px;color:#617064;cursor:pointer}.admin-nav button.active{background:#e3ded3;color:#17372a}.panel{background:#fff;padding:28px}.panel-heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:28px}.panel h2{font:400 32px Georgia,serif;margin:8px 0}.inline-form{display:flex;gap:10px;margin-bottom:25px}.inline-form input{flex:1}.panel ul{list-style:none;padding:0;margin:0}.panel li{display:flex;justify-content:space-between;border-top:1px solid #eee;padding:16px 0}.delete{background:transparent;border:0;color:#a13b2e;cursor:pointer}.media-form{background:#f8f6f1;padding:18px;margin-bottom:22px}.check{font-size:13px}.media-list{display:flex;flex-direction:column;gap:10px}.media-list article{display:flex;align-items:center;gap:16px;border-top:1px solid #eee;padding:12px 0}.media-list img{width:96px;height:60px;object-fit:cover}.media-list div{flex:1}.media-list strong,.media-list small{display:block}.media-list small{color:#888;margin-top:5px}.empty{color:#888}@media(max-width:700px){.admin-grid{grid-template-columns:1fr;gap:20px}.admin-nav{flex-direction:row}.admin-nav button{flex:1}.admin-header h1,.admin-login h1{font-size:38px}.panel{padding:18px}.inline-form{flex-direction:column}}
</style>
