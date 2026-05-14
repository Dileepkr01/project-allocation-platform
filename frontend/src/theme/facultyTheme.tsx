// frontend/src/theme/facultyTheme.ts
export const facultyTheme = {
  // Pastel Base Colors from your palette
  colors: {
    mint: '#DEFCF9',
    softBlue: '#CADEFC',
    lavender: '#C3BEF0',
    softPurple: '#CCA8E9',
  },
  
  // Deep colors for better contrast
  deep: {
    mint: '#2dd4bf',
    softBlue: '#3b82f6',
    lavender: '#8b5cf6',
    softPurple: '#a855f7',
  },
  
  // Gradients
  gradients: {
    primary: 'from-[#C3BEF0] to-[#CCA8E9]',
    secondary: 'from-[#CADEFC] to-[#C3BEF0]',
    accent: 'from-[#DEFCF9] to-[#CADEFC]',
    card: 'bg-gradient-to-br from-white/90 to-[#CADEFC]/10',
    hero: 'from-[#C3BEF0] via-[#CCA8E9] to-[#CADEFC]',
  },
  
  // Glass morphism effects
  glass: {
    card: 'bg-white/80 backdrop-blur-sm border border-white/30',
    modal: 'bg-white/95 backdrop-blur-md border border-white/40',
    sidebar: 'bg-white/90 backdrop-blur-sm',
  },
  
  // Shadows
  shadows: {
    soft: 'shadow-lg shadow-[#C3BEF0]/20',
    medium: 'shadow-xl shadow-[#CCA8E9]/25',
    hover: 'hover:shadow-2xl hover:shadow-[#CCA8E9]/30',
  },
  
  // Text colors
  text: {
    primary: 'text-gray-800',
    secondary: 'text-gray-600',
    light: 'text-gray-500',
    onPastel: 'text-gray-700',
  },
  
  // Borders
  borders: {
    light: 'border border-[#CADEFC]/50',
    medium: 'border-2 border-[#C3BEF0]/60',
    hover: 'hover:border-[#CCA8E9]/80',
  },
  
  // Hover effects
  hover: {
    card: 'hover:shadow-xl hover:shadow-[#C3BEF0]/30 hover:border-[#CCA8E9]/50',
    button: 'hover:scale-105 transition-transform duration-300',
    link: 'hover:text-[#CCA8E9] transition-colors',
  },
  
  // Animations
  animations: {
    fadeIn: 'animate-fadeIn',
    slideUp: 'animate-slideUp',
    pulse: 'animate-pulse',
  }
};