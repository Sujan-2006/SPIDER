/**
 * registerComponentTypes(editor)
 *
 * Configures GrapesJS component types so that every element parsed from a
 * template's raw HTML string (via setComponents) is immediately:
 *
 *   • TEXT ELEMENTS  – double-click to edit inline
 *   • IMAGES         – click to open asset manager / change src
 *   • LINKS          – href / target traits in Settings panel
 *   • BUTTONS        – text editable + type trait
 *   • INPUTS         – placeholder, name, required traits
 *   • CONTAINERS     – draggable & droppable (sections, divs, etc.)
 *
 * Call once after grapesjs.init(), before the editor renders.
 */
export function registerComponentTypes(editor) {
  const dc = editor.DomComponents;

  // ── 1. TEXT ELEMENTS ──────────────────────────────────────────────────────
  // All heading and inline text tags → extend the built-in 'text' type so
  // double-click opens the rich-text inline editor.
  const TEXT_TAGS = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'span', 'li', 'label',
    'strong', 'em', 'b', 'i', 'small',
    'blockquote', 'figcaption', 'caption', 'dt', 'dd',
  ];

  TEXT_TAGS.forEach((tag) => {
    dc.addType(tag, {
      extend: 'text',
      isComponent: (el) => el.tagName?.toLowerCase() === tag,
      model: {
        defaults: {
          tagName: tag,
          editable: true,      // enables inline rich-text editor on double-click
          draggable: true,
          droppable: false,    // text elements shouldn't accept drops
          highlightable: true,
          traits: [
            { name: 'id',    label: 'ID' },
            { name: 'class', label: 'CSS Class' },
            { name: 'title', label: 'Tooltip' },
          ],
        },
      },
    });
  });

  // ── 2. LINKS (a) ──────────────────────────────────────────────────────────
  // Override the built-in 'link' type: keep text editable, add href/target traits.
  dc.addType('link', {
    model: {
      defaults: {
        editable: true,
        draggable: true,
        highlightable: true,
        traits: [
          {
            name: 'href',
            label: 'URL',
            placeholder: 'https://example.com',
          },
          {
            name: 'target',
            type: 'select',
            label: 'Open in',
            options: [
              { id: '_self',  label: 'Same Tab'  },
              { id: '_blank', label: 'New Tab'   },
            ],
          },
          { name: 'title', label: 'Tooltip' },
          { name: 'id',    label: 'ID'      },
          { name: 'class', label: 'CSS Class' },
        ],
      },
    },
  });

  // ── 3. IMAGES (img) ──────────────────────────────────────────────────────
  // Ensure images are resizable and open the asset manager on click.
  dc.addType('image', {
    model: {
      defaults: {
        resizable: {
          ratioDefault: true,   // keep aspect ratio when resizing
          cr: 1,                // corner handles only
          bc: 0,
          bl: 0,
          br: 1,
          cl: 0,
          cr: 1,
          tc: 0,
          tr: 1,
          tl: 1,
          bl: 1,
          bc: 0,
        },
        draggable: true,
        highlightable: true,
        traits: [
          { name: 'src',     label: 'Image URL', placeholder: 'https://…' },
          { name: 'alt',     label: 'Alt Text'  },
          { name: 'width',   label: 'Width'     },
          { name: 'height',  label: 'Height'    },
          {
            name: 'loading',
            type: 'select',
            label: 'Loading',
            options: [
              { id: 'lazy',  label: 'Lazy (recommended)' },
              { id: 'eager', label: 'Eager'              },
            ],
          },
        ],
      },
    },
    // Open the asset manager when the image is selected and the user
    // clicks it again (GrapesJS default 'dblclick' on image).
    view: {
      events: {
        dblclick: 'onDblClick',
      },
      onDblClick() {
        this.em.get('Commands').run('open-assets', {
          types: ['image'],
          accept: 'image/*',
          target: this.model,
        });
      },
    },
  });

  // ── 4. BUTTONS (button) ───────────────────────────────────────────────────
  // Buttons need text editing AND a type / id / class trait set.
  dc.addType('button', {
    extend: 'text',
    isComponent: (el) => el.tagName === 'BUTTON',
    model: {
      defaults: {
        tagName: 'button',
        editable: true,
        draggable: true,
        droppable: false,
        highlightable: true,
        traits: [
          {
            name: 'type',
            type: 'select',
            label: 'Type',
            options: [
              { id: 'button', label: 'Button' },
              { id: 'submit', label: 'Submit' },
              { id: 'reset',  label: 'Reset'  },
            ],
          },
          { name: 'id',    label: 'ID'       },
          { name: 'class', label: 'CSS Class' },
          { name: 'title', label: 'Tooltip'  },
          { name: 'disabled', type: 'checkbox', label: 'Disabled' },
        ],
      },
    },
  });

  // ── 5. FORM INPUTS ────────────────────────────────────────────────────────
  dc.addType('input', {
    model: {
      defaults: {
        draggable: true,
        droppable: false,
        highlightable: true,
        traits: [
          {
            name: 'type',
            type: 'select',
            label: 'Input Type',
            options: [
              { id: 'text',     label: 'Text'     },
              { id: 'email',    label: 'Email'    },
              { id: 'password', label: 'Password' },
              { id: 'number',   label: 'Number'   },
              { id: 'tel',      label: 'Phone'    },
              { id: 'url',      label: 'URL'      },
            ],
          },
          { name: 'name',        label: 'Name'        },
          { name: 'placeholder', label: 'Placeholder' },
          { name: 'id',         label: 'ID'          },
          { name: 'required',   type: 'checkbox', label: 'Required'  },
          { name: 'disabled',   type: 'checkbox', label: 'Disabled'  },
        ],
      },
    },
  });

  dc.addType('textarea', {
    model: {
      defaults: {
        draggable: true,
        droppable: false,
        highlightable: true,
        traits: [
          { name: 'name',        label: 'Name'        },
          { name: 'placeholder', label: 'Placeholder' },
          { name: 'rows',        label: 'Rows'        },
          { name: 'id',         label: 'ID'          },
          { name: 'required',   type: 'checkbox', label: 'Required' },
          { name: 'disabled',   type: 'checkbox', label: 'Disabled' },
        ],
      },
    },
  });

  dc.addType('select', {
    model: {
      defaults: {
        draggable: true,
        droppable: true,
        highlightable: true,
        traits: [
          { name: 'name',     label: 'Name'     },
          { name: 'id',      label: 'ID'       },
          { name: 'required', type: 'checkbox', label: 'Required' },
          { name: 'multiple', type: 'checkbox', label: 'Multiple' },
        ],
      },
    },
  });

  // ── 6. CONTAINER ELEMENTS ─────────────────────────────────────────────────
  // Semantic structural tags → draggable, droppable, no text editor.
  const CONTAINER_TAGS = [
    'section', 'article', 'aside',
    'header',  'footer',  'main',
    'nav',     'figure',  'form',
    'ul',      'ol',      'table',
    'thead',   'tbody',   'tfoot',
    'tr',      'th',      'td',
  ];

  CONTAINER_TAGS.forEach((tag) => {
    dc.addType(tag, {
      isComponent: (el) => el.tagName?.toLowerCase() === tag,
      model: {
        defaults: {
          tagName: tag,
          draggable: true,
          droppable: true,
          highlightable: true,
          editable: false,
          traits: [
            { name: 'id',    label: 'ID'       },
            { name: 'class', label: 'CSS Class' },
          ],
        },
      },
    });
  });

  // ── 7. DIV ────────────────────────────────────────────────────────────────
  // Divs are the most common layout element — fully flexible.
  dc.addType('div', {
    isComponent: (el) => el.tagName === 'DIV',
    model: {
      defaults: {
        tagName: 'div',
        draggable: true,
        droppable: true,
        highlightable: true,
        editable: false,
        traits: [
          { name: 'id',    label: 'ID'       },
          { name: 'class', label: 'CSS Class' },
          { name: 'title', label: 'Tooltip'  },
        ],
      },
    },
  });
}
