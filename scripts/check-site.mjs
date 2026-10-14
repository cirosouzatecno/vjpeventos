import assert from 'node:assert/strict'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { resolve, dirname, relative } from 'node:path'
import { spawnSync } from 'node:child_process'
import { parse, compileScript, compileTemplate, compileStyle } from 'vue/compiler-sfc'

// Compile every route/component and validate local references without starting APIs.
const root = resolve(import.meta.dirname, '..')
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
  const file = resolve(dir, entry.name)
  return entry.isDirectory() ? walk(file) : [file]
})
const files = ['src', 'api', 'scripts'].flatMap(dir => walk(resolve(root, dir)))
let components = 0
for (const file of files) {
  const source = readFileSync(file, 'utf8')
  if (file.endsWith('.vue')) {
    const { descriptor, errors } = parse(source, { filename: file })
    assert.equal(errors.length, 0, `${file}: ${errors}`)
    const script = compileScript(descriptor, { id: file })
    const template = compileTemplate({ source: descriptor.template.content, filename: file, id: file, compilerOptions: { bindingMetadata: script.bindings } })
    assert.equal(template.errors.length, 0, `${file}: ${template.errors}`)
    for (const style of descriptor.styles) {
      const result = compileStyle({ source: style.content, filename: file, id: 'data-v-check', scoped: style.scoped })
      assert.equal(result.errors.length, 0, `${file}: ${result.errors}`)
    }
    components++
  } else if (/\.m?js$/.test(file)) {
    const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' })
    assert.equal(result.status, 0, result.stderr)
  }
  if (!/\.(vue|m?js|css)$/.test(file)) continue
  for (const match of source.matchAll(/(?:from\s*|import\s*\(\s*|(?:@?import)\s*)['"]([^'"]+)['"]/g)) {
    const specifier = match[1]
    if (!specifier.startsWith('.') && !specifier.startsWith('@/')) continue
    const target = specifier.startsWith('@/') ? resolve(root, 'src', specifier.slice(2)) : resolve(dirname(file), specifier)
    assert.ok(existsSync(target), `Missing import in ${relative(root, file)}: ${specifier}`)
  }
}
const router = readFileSync(resolve(root, 'src/router/index.js'), 'utf8')
const routes = [...router.matchAll(/path: '([^']+)'/g)].map(m => m[1])
const header = readFileSync(resolve(root, 'src/pages/shared/Header.vue'), 'utf8')
const menu = [...header.matchAll(/href: '(\/[^']*)'/g)].map(m => m[1])
for (const route of menu) assert.ok(routes.includes(route), `Menu route missing: ${route}`)
for (const file of files.filter(f => /src[\\/]pages[\\/][^\\/]+\.vue$/.test(f))) {
  assert.ok(!/heroStyle|heroBg/.test(readFileSync(file, 'utf8')), `Empty banner returned: ${file}`)
}
console.log(`OK: ${components} Vue components, JavaScript syntax, local imports, ${routes.length} routes and ${menu.length} menu links.`)
