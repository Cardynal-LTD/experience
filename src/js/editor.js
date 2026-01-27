import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import BubbleMenu from '@tiptap/extension-bubble-menu'
import FloatingMenu from '@tiptap/extension-floating-menu'
import Dropcursor from '@tiptap/extension-dropcursor'
import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import { marked } from 'marked'
import TurndownService from 'turndown'

// Configure marked
marked.setOptions({ breaks: true, gfm: true })

// Configure turndown for HTML -> Markdown
const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
})

turndown.addRule('fencedCodeBlock', {
  filter: (node) => node.nodeName === 'PRE' && node.firstChild?.nodeName === 'CODE',
  replacement: (content, node) => {
    const code = node.firstChild.textContent
    return `\n\`\`\`\n${code}\n\`\`\`\n`
  },
})

// Emoji list for quick access
const commonEmojis = ['😀', '🎉', '🚀', '💡', '⭐', '❤️', '✅', '⚠️', '🔥', '👍', '📝', '🎯']

// SVG Icons
const icons = {
  text: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>',
  h1: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h8M4 18V6M12 18V6M17 12l3-2v8"/></svg>',
  h2: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h8M4 18V6M12 18V6M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1"/></svg>',
  h3: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h8M4 18V6M12 18V6M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2m-1.5 4c1.7 1 3.5 0 3.5-1.5a2 2 0 0 0-2-2h-1"/></svg>',
  list: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  listOrdered: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>',
  check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="6" height="6" rx="1"/><path d="M3 17l2 2 4-4"/><line x1="13" y1="6" x2="21" y2="6"/><line x1="13" y1="12" x2="21" y2="12"/><line x1="13" y1="18" x2="21" y2="18"/></svg>',
  image: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
  quote: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v4"/></svg>',
  code: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  minus: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
}

// Slash commands configuration
const slashCommands = [
  { title: 'Texte', icon: icons.text, command: ({ editor }) => editor.chain().focus().setParagraph().run() },
  { title: 'Titre 1', icon: icons.h1, command: ({ editor }) => editor.chain().focus().toggleHeading({ level: 1 }).run() },
  { title: 'Titre 2', icon: icons.h2, command: ({ editor }) => editor.chain().focus().toggleHeading({ level: 2 }).run() },
  { title: 'Titre 3', icon: icons.h3, command: ({ editor }) => editor.chain().focus().toggleHeading({ level: 3 }).run() },
  { title: 'Liste', icon: icons.list, command: ({ editor }) => editor.chain().focus().toggleBulletList().run() },
  { title: 'Liste num.', icon: icons.listOrdered, command: ({ editor }) => editor.chain().focus().toggleOrderedList().run() },
  { title: 'To-do', icon: icons.check, command: ({ editor }) => editor.chain().focus().toggleBulletList().run() },
  { title: 'Image', icon: icons.image, command: ({ editor }) => {
    const url = prompt('URL de l\'image:')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }},
  { title: 'Citation', icon: icons.quote, command: ({ editor }) => editor.chain().focus().toggleBlockquote().run() },
  { title: 'Code', icon: icons.code, command: ({ editor }) => editor.chain().focus().toggleCodeBlock().run() },
  { title: 'Separateur', icon: icons.minus, command: ({ editor }) => editor.chain().focus().setHorizontalRule().run() },
]

// Slash commands extension
const SlashCommands = Extension.create({
  name: 'slashCommands',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }) => {
          props.command({ editor, range })
        },
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})

// Create slash menu DOM - Notion style
function createSlashMenu() {
  const menu = document.createElement('div')
  menu.className = 'slash-menu'
  menu.id = 'slashMenu'
  document.body.appendChild(menu)
  return menu
}

// Create bubble menu DOM - Notion style
function createBubbleMenuElement() {
  const menu = document.createElement('div')
  menu.className = 'bubble-menu'
  menu.innerHTML = `
    <button type="button" class="bubble-menu__btn" data-action="bold" title="Gras">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
      </svg>
    </button>
    <button type="button" class="bubble-menu__btn" data-action="italic" title="Italique">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/>
      </svg>
    </button>
    <button type="button" class="bubble-menu__btn" data-action="underline" title="Souligne">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M6 4v6a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4"/><line x1="4" y1="20" x2="20" y2="20"/>
      </svg>
    </button>
    <button type="button" class="bubble-menu__btn" data-action="strike" title="Barre">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7 0-5.3.7-5.3 3.6 0 1.5 1.8 3.3 7.3 3.3"/><path d="M8.7 15c0 2.5 2.8 3.8 5.7 3.8 3.4 0 5.8-1.6 5.8-4.2"/><line x1="3" y1="12" x2="21" y2="12"/>
      </svg>
    </button>
    <span class="bubble-menu__divider"></span>
    <button type="button" class="bubble-menu__btn" data-action="code" title="Code">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    </button>
    <button type="button" class="bubble-menu__btn" data-action="link" title="Lien">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    </button>
    <span class="bubble-menu__divider"></span>
    <button type="button" class="bubble-menu__btn" data-action="highlight" title="Surligner">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="14" width="18" height="6" rx="1"/>
      </svg>
    </button>
  `
  document.body.appendChild(menu)
  return menu
}

// Create floating menu DOM - Notion style with + button
function createFloatingMenuElement() {
  const menu = document.createElement('div')
  menu.className = 'floating-menu'
  menu.innerHTML = `
    <button type="button" class="floating-menu__btn" title="Ajouter un bloc">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    </button>
  `
  document.body.appendChild(menu)
  return menu
}

// Create emoji picker
function createEmojiPicker() {
  const picker = document.createElement('div')
  picker.className = 'emoji-modal'
  picker.id = 'emojiPicker'
  picker.innerHTML = `
    <div class="emoji-modal__content">
      <div class="emoji-modal__list">
        ${commonEmojis.map(e => `<button type="button" class="emoji-modal__item" data-emoji="${e}">${e}</button>`).join('')}
      </div>
    </div>
  `
  document.body.appendChild(picker)
  return picker
}

export function createEditor(element, options = {}) {
  // Create menu elements
  const bubbleMenuEl = createBubbleMenuElement()
  const floatingMenuEl = createFloatingMenuElement()
  const slashMenuEl = createSlashMenu()
  const emojiPickerEl = createEmojiPicker()

  let slashMenuIndex = 0
  let filteredCommands = slashCommands

  const editor = new Editor({
    element,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        dropcursor: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'editor-link' },
      }),
      Image.configure({
        HTMLAttributes: { class: 'editor-image' },
        allowBase64: true,
      }),
      Dropcursor.configure({
        color: 'var(--accent)',
        width: 2,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            const level = node.attrs.level
            if (level === 1) return 'Titre'
            if (level === 2) return 'Titre 2'
            return 'Titre 3'
          }
          return "Tapez '/' pour les commandes..."
        },
      }),
      BubbleMenu.configure({
        element: bubbleMenuEl,
        tippyOptions: {
          duration: 100,
          placement: 'top',
        },
      }),
      FloatingMenu.configure({
        element: floatingMenuEl,
        tippyOptions: {
          duration: 100,
          placement: 'left',
        },
        shouldShow: ({ state }) => {
          const { $from } = state.selection
          const currentLineText = $from.nodeBefore?.textContent || ''
          if (currentLineText.startsWith('/')) return false
          const isEmptyParagraph = $from.parent.isTextblock && $from.parent.content.size === 0
          return isEmptyParagraph
        },
      }),
      SlashCommands.configure({
        suggestion: {
          char: '/',
          items: ({ query }) => {
            filteredCommands = slashCommands.filter(item =>
              item.title.toLowerCase().includes(query.toLowerCase())
            )
            return filteredCommands
          },
          render: () => {
            return {
              onStart: (props) => {
                slashMenuIndex = 0
                renderSlashMenu(slashMenuEl, filteredCommands, slashMenuIndex)
                const rect = props.clientRect?.()
                if (rect) {
                  slashMenuEl.style.top = `${rect.bottom + 8}px`
                  slashMenuEl.style.left = `${rect.left}px`
                }
                slashMenuEl.classList.add('is-visible')
              },
              onUpdate: (props) => {
                renderSlashMenu(slashMenuEl, filteredCommands, slashMenuIndex)
                const rect = props.clientRect?.()
                if (rect) {
                  slashMenuEl.style.top = `${rect.bottom + 8}px`
                  slashMenuEl.style.left = `${rect.left}px`
                }
              },
              onKeyDown: (props) => {
                if (props.event.key === 'ArrowDown') {
                  slashMenuIndex = (slashMenuIndex + 1) % filteredCommands.length
                  renderSlashMenu(slashMenuEl, filteredCommands, slashMenuIndex)
                  return true
                }
                if (props.event.key === 'ArrowUp') {
                  slashMenuIndex = (slashMenuIndex - 1 + filteredCommands.length) % filteredCommands.length
                  renderSlashMenu(slashMenuEl, filteredCommands, slashMenuIndex)
                  return true
                }
                if (props.event.key === 'Enter') {
                  const item = filteredCommands[slashMenuIndex]
                  if (item) {
                    props.editor.chain().focus().deleteRange(props.range).run()
                    item.command({ editor: props.editor })
                  }
                  return true
                }
                if (props.event.key === 'Escape') {
                  slashMenuEl.classList.remove('is-visible')
                  return true
                }
                return false
              },
              onExit: () => {
                slashMenuEl.classList.remove('is-visible')
              },
            }
          },
          command: ({ editor, range, props }) => {
            editor.chain().focus().deleteRange(range).run()
            props.command({ editor })
          },
        },
      }),
    ],
    content: options.content || '',
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer?.files?.length) {
          const file = event.dataTransfer.files[0]
          if (file.type.startsWith('image/')) {
            event.preventDefault()
            const reader = new FileReader()
            reader.onload = (e) => {
              editor.chain().focus().setImage({ src: e.target.result }).run()
            }
            reader.readAsDataURL(file)
            return true
          }
        }
        return false
      },
      handlePaste: (view, event) => {
        const items = event.clipboardData?.items
        if (items) {
          for (const item of items) {
            if (item.type.startsWith('image/')) {
              event.preventDefault()
              const file = item.getAsFile()
              const reader = new FileReader()
              reader.onload = (e) => {
                editor.chain().focus().setImage({ src: e.target.result }).run()
              }
              reader.readAsDataURL(file)
              return true
            }
          }
        }
        return false
      },
    },
    onUpdate: options.onUpdate || (() => {}),
  })

  // Bubble menu actions
  bubbleMenuEl.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action
      switch (action) {
        case 'bold': editor.chain().focus().toggleBold().run(); break
        case 'italic': editor.chain().focus().toggleItalic().run(); break
        case 'underline': editor.chain().focus().toggleUnderline?.().run(); break
        case 'strike': editor.chain().focus().toggleStrike().run(); break
        case 'code': editor.chain().focus().toggleCode().run(); break
        case 'highlight': editor.chain().focus().toggleHighlight?.().run(); break
        case 'link':
          const url = prompt('URL du lien:')
          if (url) editor.chain().focus().setLink({ href: url }).run()
          break
      }
    })
  })

  // Floating menu - click opens slash menu
  floatingMenuEl.querySelector('.floating-menu__btn').addEventListener('click', () => {
    editor.chain().focus().insertContent('/').run()
  })

  // Slash menu click handler
  slashMenuEl.addEventListener('click', (e) => {
    const item = e.target.closest('.slash-menu__item')
    if (item) {
      const index = parseInt(item.dataset.index)
      const cmd = filteredCommands[index]
      if (cmd) {
        editor.commands.deleteRange({
          from: editor.state.selection.from - 1,
          to: editor.state.selection.from,
        })
        cmd.command({ editor })
        slashMenuEl.classList.remove('is-visible')
      }
    }
  })

  // Store cleanup function
  editor.menuCleanup = () => {
    bubbleMenuEl.remove()
    floatingMenuEl.remove()
    slashMenuEl.remove()
    emojiPickerEl.remove()
  }

  return editor
}

function renderSlashMenu(menu, commands, activeIndex) {
  let html = ''

  commands.forEach((cmd, i) => {
    html += `
      <div class="slash-menu__item ${i === activeIndex ? 'is-selected' : ''}" data-index="${i}">
        <span class="slash-menu__item-icon">${cmd.icon}</span>
        <span class="slash-menu__item-label">${cmd.title}</span>
      </div>
    `
  })

  menu.innerHTML = html
}

// Convert Markdown to HTML for the editor
export function markdownToHtml(markdown) {
  if (!markdown) return ''
  return marked.parse(markdown)
}

// Convert editor HTML back to Markdown
export function htmlToMarkdown(html) {
  if (!html) return ''
  return turndown.turndown(html)
}

// Toolbar actions
export function toggleBold(editor) { editor.chain().focus().toggleBold().run() }
export function toggleItalic(editor) { editor.chain().focus().toggleItalic().run() }
export function toggleStrike(editor) { editor.chain().focus().toggleStrike().run() }
export function toggleCode(editor) { editor.chain().focus().toggleCode().run() }
export function toggleHeading(editor, level) { editor.chain().focus().toggleHeading({ level }).run() }
export function toggleBulletList(editor) { editor.chain().focus().toggleBulletList().run() }
export function toggleOrderedList(editor) { editor.chain().focus().toggleOrderedList().run() }
export function toggleBlockquote(editor) { editor.chain().focus().toggleBlockquote().run() }
export function toggleCodeBlock(editor) { editor.chain().focus().toggleCodeBlock().run() }
export function setHorizontalRule(editor) { editor.chain().focus().setHorizontalRule().run() }
export function setLink(editor) {
  const url = prompt('URL du lien:')
  if (url) editor.chain().focus().setLink({ href: url }).run()
}
export function unsetLink(editor) { editor.chain().focus().unsetLink().run() }
export function isActive(editor, name, attrs = {}) { return editor.isActive(name, attrs) }
