import { format, applyEdits } from 'jsonc-parser'
import fs from 'fs'
import path from 'path'

const extensions = [
  'animation',
  'augment',
  'back',
  'barren',
  'beamaxe',
  'bush',
  'canyon',
  'celestial',
  'chasm',
  'chest',
  'cinematic',
  'codexitem',
  'coinitem',
  'config',
  'configfunctions',
  'consumable',
  'corebiome',
  'damage',
  'dunes',
  'dungeon',
  'effectsource',
  'flashlight',
  'frames',
  'functions',
  'generatedgun',
  'grass',
  'gun',
  'harvestingtool',
  'head',
  'hills',
  'instrument',
  'islands',
  'item',
  'itemdescription',
  'legs',
  'material',
  'matitem',
  'matmod',
  'miningtool',
  'modularfoliage',
  'modularstem',
  'monsterpart',
  'monsterskill',
  'monstertype',
  'mountains',
  'npctype',
  'object',
  'painttool',
  'parallax',
  'particle',
  'particlesource',
  'projectile',
  'questtemplate',
  'recipe',
  'ridgeblocks',
  'ridgecave',
  'spacebiome',
  'species',
  'statuseffect',
  'structure',
  'surfacebiome',
  'sword',
  'tech',
  'techitem',
  'terrain',
  'thrownitem',
  'tillingtool',
  'tooltip',
  'treasurechests',
  'treasurepools',
  'undergroundbiome',
  'undergroundparallax',
  'unusedmonsterskill',
  'weather',
  'wiretool',
]

function getFiles(dir: string): string[] {
  const files = []
  for (const file of fs.readdirSync(dir)) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      files.push(...getFiles(path.join(dir, file)))
    } else if (extensions.find(ext => file.endsWith(`.${ext}`))) {
      files.push(path.join(dir, file))
    }
  }
  return files
}

function run(filepath: string) {
  const json = fs.readFileSync(filepath, 'utf8')
  const edits = format(json, undefined, {
    tabSize: 4,
    insertSpaces: true,
  })
  const result = applyEdits(json, edits)
  fs.writeFileSync(filepath, result, 'utf8')
}

function main() {
  const workspace = process.env.GITHUB_WORKSPACE
  if (!workspace) {
    throw new Error('GITHUB_WORKSPACE is not set')
  }
  const files = getFiles(workspace)
  for (const file of files) {
    run(file)
  }
}

main()
