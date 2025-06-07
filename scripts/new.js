import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { program } from 'commander'
import dayjs from 'dayjs'

program.arguments('<id> [name]').parse()
const [id, name = id] = program.args

const time = dayjs().format('YYYY-MM-DDTHH:mm:ssZ')
const content = 
`---
title: ${name}
create: ${time}
---

`
await mkdir(path.join(import.meta.dirname, '..', 'posts', id))
const filePath = path.join(import.meta.dirname, '..', 'posts', id, 'index.md')
writeFile(filePath, content, { encoding: 'utf-8' })
