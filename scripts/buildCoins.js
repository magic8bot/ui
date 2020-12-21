const fs = require('fs')
const glob = require('glob')
const camelcase = require('camelcase')
const uppercamelcase = require('uppercamelcase')
const path = require('path')
const cheerio = require('cheerio')
const prettier = require('prettier')

const rootDir = path.join(__dirname, '..')
const coinIconDir = path.join(rootDir, 'src', 'ui', 'coin-icon')

glob(`${rootDir}/node_modules/cryptocurrency-icons/svg/white/*.svg`, (err, icons) => {
  const iconNames = []
  fs.writeFileSync(path.join(coinIconDir, 'index.ts'), '', 'utf-8')

  icons.forEach((i) => {
    const svg = fs.readFileSync(i, 'utf-8')
    const id = path.basename(i, '.svg')
    const $ = cheerio.load(svg, {
      xmlMode: true,
    })
    const fileName = path.basename(i).replace('.svg', '.tsx')
    const location = path.join(coinIconDir, 'icons', fileName)

    $('*').each((index, el) => {
      Object.keys(el.attribs).forEach((x) => {
        if (x.includes('-')) {
          $(el).attr(camelcase(x), el.attribs[x]).removeAttr(x)
        }
        if (x === 'fill') {
          $(el).attr(x, 'currentColor')
        }
      })

      if (el.name === 'svg') {
        $(el).attr('width', '24')
        $(el).attr('height', '24')
        $(el).attr('fill', 'currentColor')
        $(el).attr('otherProps', '...')
        $(el).attr('viewBox', '0 0 33 32')
      }
    })

    const element = `
      import React from 'react';

      interface ${uppercamelcase(id)}Props {
        color?: string
        size?: string | number
      }

      const ${uppercamelcase(id)} = (props: ${uppercamelcase(id)}Props) => {
        const { color = 'currentColor', size = '24', ...otherProps } = props;
        return (
          ${$('svg')
            .toString()
            .replace('fill="currentColor"', 'fill={color}')
            .replace('width="24"', 'width={size}')
            .replace('height="24"', 'height={size}')
            .replace('otherProps="..."', '{...otherProps}')
            .replace('.st0{fill-rule:evenodd;clip-rule:evenodd}', "{'.st0{fill-rule:evenodd;clip-rule:evenodd}'}")
            .replace('style="isolation:isolate"', "style={{isolation:'isolate'}}")
            .replace(/class=/g, 'className=')}
        )
      };

      export default ${uppercamelcase(id)}
    `

    try {
      const component = prettier.format(element, {
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        parser: 'typescript',
      })

      fs.writeFileSync(location, component, 'utf-8')

      iconNames.push(uppercamelcase(id))

      const importString = `import ${uppercamelcase(id)} from './icons/${id}';\r\n`
      fs.appendFileSync(path.join(coinIconDir, 'index.ts'), importString, 'utf-8')
    } catch (e) {
      console.log(i, e.message)
    }
  })

  const exportString = `export {
  ${iconNames.join(',\r\n  ')}
}\r\n`
  fs.appendFileSync(path.join(coinIconDir, 'index.ts'), exportString, 'utf-8')
})
