export const getStyleManagerConfig = () => {
  return {
    appendTo: '#style-view',
    sectors: [
      {
        name: 'Layout & Flexbox',
        open: true,
        buildProps: ['display', 'float', 'flex-grow', 'flex-shrink', 'flex-basis', 'order', 'justify-content', 'align-items'],
        properties: [
          { name: 'Display', property: 'display', type: 'select', defaults: 'block', list: [{ value: 'block' }, { value: 'inline-block' }, { value: 'flex' }, { value: 'grid' }, { value: 'none' }] },
          { name: 'Float', property: 'float', type: 'select', list: [{ value: 'none' }, { value: 'left' }, { value: 'right' }] },
          { name: 'Order', property: 'order', type: 'integer', defaults: 0 },
        ]
      },
      {
        name: 'Dimension',
        open: false,
        buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
        properties: [
          { name: 'Width', property: 'width', type: 'number', units: ['px', '%', 'vw', 'auto'], defaults: 'auto' },
          { name: 'Height', property: 'height', type: 'number', units: ['px', '%', 'vh', 'auto'], defaults: 'auto' },
          // Using margin/padding composite for visual box model approximation
          { name: 'Margin', property: 'margin', type: 'composite', properties: [{name: 'Top', property: 'margin-top'}, {name: 'Right', property: 'margin-right'}, {name: 'Bottom', property: 'margin-bottom'}, {name: 'Left', property: 'margin-left'}] },
          { name: 'Padding', property: 'padding', type: 'composite', properties: [{name: 'Top', property: 'padding-top'}, {name: 'Right', property: 'padding-right'}, {name: 'Bottom', property: 'padding-bottom'}, {name: 'Left', property: 'padding-left'}] }
        ]
      },
      {
        name: 'Typography',
        open: false,
        buildProps: ['font-family', 'font-size', 'font-weight', 'font-style', 'letter-spacing', 'line-height', 'color', 'text-decoration', 'text-align'],
        properties: [
          { name: 'Font Family', property: 'font-family', type: 'select', list: [{ value: 'Inter, sans-serif', name: 'Inter' }, { value: 'Playfair Display, serif', name: 'Playfair Display' }, { value: 'Arial, sans-serif' }] },
          { name: 'Size', property: 'font-size', type: 'number', units: ['px', 'rem', 'em', 'vw'] },
          { name: 'Weight', property: 'font-weight', type: 'select', list: [{ value: '100' }, { value: '300' }, { value: '400' }, { value: '500' }, { value: '600' }, { value: '700' }, { value: '900' }] },
          { name: 'Style', property: 'font-style', type: 'select', list: [{ value: 'normal' }, { value: 'italic' }] },
          { name: 'Decoration', property: 'text-decoration', type: 'select', list: [{ value: 'none'}, { value: 'underline' }, { value: 'line-through' }] },
        ]
      },
      {
        name: 'Decorations',
        open: false,
        buildProps: ['background-color', 'background-image', 'border-style', 'border-width', 'border-color', 'border-radius', 'box-shadow'],
        properties: [
          { name: 'Bg Color', property: 'background-color', type: 'color' },
          { name: 'Bg Image URL', property: 'background-image', type: 'text' },
          { name: 'Border Radius', property: 'border-radius', type: 'composite', properties: [{name: 'TL', property: 'border-top-left-radius'}, {name: 'TR', property: 'border-top-right-radius'}, {name: 'BL', property: 'border-bottom-left-radius'}, {name: 'BR', property: 'border-bottom-right-radius'}] }
        ]
      },
      {
        name: 'Extra',
        open: false,
        buildProps: ['opacity', 'transform', 'transition'],
        properties: [
          { name: 'Opacity', property: 'opacity', type: 'slider', min: 0, max: 1, step: 0.01, defaults: 1 },
          { name: 'Transform', property: 'transform', type: 'text', placeholder: 'scale(1.1) rotate(45deg)' },
          { name: 'Transition', property: 'transition', type: 'text', placeholder: 'all 0.3s ease' }
        ]
      }
    ]
  };
};
