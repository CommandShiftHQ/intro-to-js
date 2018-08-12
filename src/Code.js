import hljs from 'highlight.js'
import renderHTML from 'react-render-html'

// credit: https://bernardodiasdacruz.com/2018/04/09/markdown-renderer-component-that-can-render-other-react-components/
const Code = node => {
  const props = node.children.props
  const language = props.className ? props.className.replace(/^(lang-)/, '') : ''
  const code = props.children || ''
  const htmlBlock = language
    ? hljs.highlight(language, code).value
    : hljs.highlightAuto(code).value

  return renderHTML(`<pre><code class="${props.className}">${htmlBlock}</code></pre>`)
}

export default Code
