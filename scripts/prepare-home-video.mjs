import { createHash } from 'node:crypto'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const partsDir = resolve('.build-assets/home-video')
const output = resolve('public/videos/home-vj.mp4')
const expectedSha256 = '12fb73a1ba571497beda4dd93781424f155f2629610f3d654e7ba213d15a5edc'

const names = (await readdir(partsDir))
  .filter((name) => name.endsWith('.b64'))
  .sort()

if (!names.length) throw new Error('Partes do vídeo da Home não encontradas.')

const base64 = (await Promise.all(
  names.map((name) => readFile(resolve(partsDir, name), 'utf8'))
)).join('').replace(/\s+/g, '')

const video = Buffer.from(base64, 'base64')
const sha256 = createHash('sha256').update(video).digest('hex')

if (sha256 !== expectedSha256) {
  throw new Error(`Vídeo da Home corrompido. SHA-256 recebido: ${sha256}`)
}

await mkdir(dirname(output), { recursive: true })
await writeFile(output, video)
console.log(`Vídeo da Home preparado: ${video.length} bytes`)
