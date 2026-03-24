export const getStyleManagerConfig = () => {
  return {
    appendTo: '#styles-container',
    sectors: [
      {
        name: 'Layout',
        open: true,
        buildProps: [
          'display', 
          'flex-direction', 
          'justify-content', 
          'align-items', 
          'flex-wrap', 
          'position', 
          'top', 
          'right', 
          'bottom', 
          'left'
        ]
      },
      {
        name: 'Dimensions',
        open: true,
        buildProps: [
          'width', 
          'height', 
          'max-width', 
          'min-height', 
          'margin', 
          'padding'
        ]
      },
      {
        name: 'Typography',
        open: false,
        buildProps: [
          'font-family', 
          'font-size', 
          'font-weight', 
          'letter-spacing', 
          'color', 
          'line-height', 
          'text-align', 
          'text-decoration',
          'text-shadow'
        ]
      },
      {
        name: 'Decorations',
        open: false,
        buildProps: [
          'background-color', 
          'background-image',
          'border-radius', 
          'border', 
          'box-shadow', 
          'opacity'
        ]
      },
      {
        name: 'Extra',
        open: false,
        buildProps: [
          'transition', 
          'transform', 
          'cursor'
        ]
      }
    ]
  };
};
