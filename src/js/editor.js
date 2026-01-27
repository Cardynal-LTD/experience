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

// Slash commands configuration - Notion style
const slashCommands = [
  // Text
  { title: 'Texte', description: 'Paragraphe simple', icon: '📝', category: 'Basique', command: ({ editor }) => editor.chain().focus().setParagraph().run() },
  { title: 'Titre 1', description: 'Grand titre de section', icon: '𝐇₁', category: 'Basique', command: ({ editor }) => editor.chain().focus().toggleHeading({ level: 1 }).run() },
  { title: 'Titre 2', description: 'Titre moyen', icon: '𝐇₂', category: 'Basique', command: ({ editor }) => editor.chain().focus().toggleHeading({ level: 2 }).run() },
  { title: 'Titre 3', description: 'Petit titre', icon: '𝐇₃', category: 'Basique', command: ({ editor }) => editor.chain().focus().toggleHeading({ level: 3 }).run() },

  // Lists
  { title: 'Liste a puces', description: 'Liste simple', icon: '•', category: 'Listes', command: ({ editor }) => editor.chain().focus().toggleBulletList().run() },
  { title: 'Liste numerotee', description: 'Liste ordonnee', icon: '1.', category: 'Listes', command: ({ editor }) => editor.chain().focus().toggleOrderedList().run() },
  { title: 'To-do list', description: 'Liste de taches', icon: '☑️', category: 'Listes', command: ({ editor }) => editor.chain().focus().toggleBulletList().run() },

  // Media
  { title: 'Image', description: 'Inserer une image', icon: '🖼️', category: 'Media', command: ({ editor }) => {
    const url = prompt('URL de l\'image:')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }},

  // Blocks
  { title: 'Citation', description: 'Bloc de citation', icon: '❝', category: 'Blocs', command: ({ editor }) => editor.chain().focus().toggleBlockquote().run() },
  { title: 'Code', description: 'Bloc de code', icon: '💻', category: 'Blocs', command: ({ editor }) => editor.chain().focus().toggleCodeBlock().run() },
  { title: 'Separateur', description: 'Ligne horizontale', icon: '—', category: 'Blocs', command: ({ editor }) => editor.chain().focus().setHorizontalRule().run() },

  // Callouts
  { title: 'Callout', description: 'Bloc d\'information', icon: '💡', category: 'Blocs', command: ({ editor }) => editor.chain().focus().toggleBlockquote().run() },
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
    <button type="button" data-action="bold" title="Gras">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
      </svg>
    </button>
    <button type="button" data-action="italic" title="Italique">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/>
      </svg>
    </button>
    <button type="button" data-action="underline" title="Souligne">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M6 4v6a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4"/><line x1="4" y1="20" x2="20" y2="20"/>
      </svg>
    </button>
    <button type="button" data-action="strike" title="Barre">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7 0-5.3.7-5.3 3.6 0 1.5 1.8 3.3 7.3 3.3"/><path d="M8.7 15c0 2.5 2.8 3.8 5.7 3.8 3.4 0 5.8-1.6 5.8-4.2"/><line x1="3" y1="12" x2="21" y2="12"/>
      </svg>
    </button>
    <span class="bubble-divider"></span>
    <button type="button" data-action="code" title="Code">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    </button>
    <button type="button" data-action="link" title="Lien">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    </button>
    <span class="bubble-divider"></span>
    <button type="button" data-action="highlight" title="Surligner" class="highlight-btn">
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
    <button type="button" class="floating-plus" title="Ajouter un bloc">
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
  picker.className = 'emoji-picker'
  picker.id = 'emojiPicker'
  picker.innerHTML = `
    <div class="emoji-header">Emoji</div>
    <div class="emoji-grid">
      ${commonEmojis.map(e => `<button type="button" class="emoji-btn" data-emoji="${e}">${e}</button>`).join('')}
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
              item.title.toLowerCase().includes(query.toLowerCase()) ||
              item.description.toLowerCase().includes(query.toLowerCase()) ||
              item.category.toLowerCase().includes(query.toLowerCase())
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
                slashMenuEl.classList.add('visible')
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
                  slashMenuEl.classList.remove('visible')
                  return true
                }
                return false
              },
              onExit: () => {
                slashMenuEl.classList.remove('visible')
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
  floatingMenuEl.querySelector('.floating-plus').addEventListener('click', () => {
    editor.chain().focus().insertContent('/').run()
  })

  // Slash menu click handler
  slashMenuEl.addEventListener('click', (e) => {
    const item = e.target.closest('.slash-item')
    if (item) {
      const index = parseInt(item.dataset.index)
      const cmd = filteredCommands[index]
      if (cmd) {
        editor.commands.deleteRange({
          from: editor.state.selection.from - 1,
          to: editor.state.selection.from,
        })
        cmd.command({ editor })
        slashMenuEl.classList.remove('visible')
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
  // Group by category
  const grouped = {}
  commands.forEach((cmd, i) => {
    if (!grouped[cmd.category]) grouped[cmd.category] = []
    grouped[cmd.category].push({ ...cmd, originalIndex: i })
  })

  let html = ''
  let globalIndex = 0

  for (const [category, items] of Object.entries(grouped)) {
    html += `<div class="slash-category">${category}</div>`
    items.forEach(cmd => {
      html += `
        <div class="slash-item ${globalIndex === activeIndex ? 'selected' : ''}" data-index="${cmd.originalIndex}">
          <div class="slash-icon">${cmd.icon}</div>
          <div class="slash-text">
            <div class="slash-title">${cmd.title}</div>
            <div class="slash-desc">${cmd.description}</div>
          </div>
        </div>
      `
      globalIndex++
    })
  }

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
