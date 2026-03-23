import { Heading, Type, Square, Image as ImageIcon, Layout } from 'lucide-react';

export const COMPONENT_TYPES = {
  Heading: {
    type: 'Heading',
    label: 'Heading',
    icon: Heading,
    defaultProps: {
      text: 'Heading Text',
      fontSize: 'text-4xl',
      color: 'text-gray-900',
      textAlign: 'text-left',
    },
    schema: {
      text: { type: 'string', label: 'Content' },
      fontSize: {
        type: 'select',
        label: 'Size',
        options: ['text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl'],
      },
      color: {
        type: 'select',
        label: 'Color',
        options: ['text-gray-900', 'text-gray-600', 'text-blue-600', 'text-red-600', 'text-green-600', 'text-indigo-600', 'text-purple-600'],
      },
      textAlign: {
        type: 'select',
        label: 'Alignment',
        options: ['text-left', 'text-center', 'text-right', 'text-justify'],
      },
    },
  },
  Paragraph: {
    type: 'Paragraph',
    label: 'Paragraph',
    icon: Type,
    defaultProps: {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      fontSize: 'text-base',
      color: 'text-gray-600',
      textAlign: 'text-left',
    },
    schema: {
      text: { type: 'string', label: 'Content', multiline: true },
      fontSize: {
        type: 'select',
        label: 'Size',
        options: ['text-sm', 'text-base', 'text-lg', 'text-xl'],
      },
      color: {
        type: 'select',
        label: 'Color',
        options: ['text-gray-900', 'text-gray-600', 'text-gray-400', 'text-blue-600'],
      },
      textAlign: {
        type: 'select',
        label: 'Alignment',
        options: ['text-left', 'text-center', 'text-right', 'text-justify'],
      },
    },
  },
  Button: {
    type: 'Button',
    label: 'Button',
    icon: Square,
    defaultProps: {
      text: 'Click Me',
      variant: 'bg-blue-600 text-white hover:bg-blue-700',
      size: 'px-4 py-2 text-sm',
      borderRadius: 'rounded-md',
      link: '#',
    },
    schema: {
      text: { type: 'string', label: 'Label' },
      link: { type: 'string', label: 'Link URL' },
      variant: {
        type: 'select',
        label: 'Style',
        options: [
          { value: 'bg-blue-600 text-white hover:bg-blue-700', label: 'Primary Blue' },
          { value: 'bg-gray-800 text-white hover:bg-gray-900', label: 'Dark' },
          { value: 'bg-white text-gray-800 border-gray-300 border hover:bg-gray-50', label: 'Outline' },
          { value: 'bg-green-600 text-white hover:bg-green-700', label: 'Success' },
        ],
      },
      size: {
        type: 'select',
        label: 'Size',
        options: [
          { value: 'px-3 py-1.5 text-xs', label: 'Small' },
          { value: 'px-4 py-2 text-sm', label: 'Medium' },
          { value: 'px-6 py-3 text-base', label: 'Large' },
        ],
      },
      borderRadius: {
        type: 'select',
        label: 'Radius',
        options: ['rounded-none', 'rounded-md', 'rounded-xl', 'rounded-full'],
      },
    },
  },
  Image: {
    type: 'Image',
    label: 'Image',
    icon: ImageIcon,
    defaultProps: {
      src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
      alt: 'Placeholder Image',
      borderRadius: 'rounded-xl',
      width: 'w-full',
      shadow: 'shadow-md',
    },
    schema: {
      src: { type: 'string', label: 'Image URL' },
      alt: { type: 'string', label: 'Alt Text' },
      width: {
        type: 'select',
        label: 'Width',
        options: ['w-64', 'w-96', 'w-1/2', 'w-full'],
      },
      borderRadius: {
        type: 'select',
        label: 'Radius',
        options: ['rounded-none', 'rounded-md', 'rounded-xl', 'rounded-2xl', 'rounded-full'],
      },
      shadow: {
        type: 'select',
        label: 'Shadow',
        options: ['shadow-none', 'shadow-sm', 'shadow-md', 'shadow-xl', 'shadow-2xl'],
      },
    },
  },
  Container: {
    type: 'Container',
    label: 'Container',
    icon: Layout,
    isContainer: true,
    defaultProps: {
      padding: 'p-8',
      background: 'bg-white',
      borderRadius: 'rounded-2xl',
      shadow: 'shadow-lg',
      layout: 'flex flex-col gap-4',
    },
    schema: {
      background: {
        type: 'select',
        label: 'Background',
        options: ['bg-transparent', 'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-900 text-white', 'bg-blue-50', 'bg-indigo-50'],
      },
      padding: {
        type: 'select',
        label: 'Padding',
        options: ['p-0', 'p-4', 'p-8', 'p-12', 'p-16'],
      },
      layout: {
        type: 'select',
        label: 'Layout',
        options: [
          { value: 'flex flex-col gap-4', label: 'Vertical (gap-4)' },
          { value: 'flex flex-col gap-8', label: 'Vertical (gap-8)' },
          { value: 'flex flex-row items-center gap-4', label: 'Horizontal (gap-4)' },
          { value: 'flex flex-row items-center justify-between', label: 'Horizontal Space Between' },
          { value: 'grid grid-cols-2 gap-8', label: '2 Columns' },
          { value: 'grid grid-cols-3 gap-6', label: '3 Columns' },
        ],
      },
      shadow: {
        type: 'select',
        label: 'Shadow',
        options: ['shadow-none', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl'],
      },
      borderRadius: {
        type: 'select',
        label: 'Radius',
        options: ['rounded-none', 'rounded-xl', 'rounded-2xl', 'rounded-3xl'],
      },
    },
  },
};
