// 暗色主题配色方案
export const theme = {
  colors: {
    // 背景色
    background: '#0a0a0a',
    backgroundSecondary: '#1a1a1a',
    backgroundTertiary: '#2a2a2a',
    
    // 文本颜色
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    textTertiary: '#707070',
    
    // 卡片颜色
    cardBackground: '#1f1f1f',
    cardBorder: '#333333',
    cardHover: '#252525',
    
    // 问题节点颜色
    questionBackground: '#252525',
    questionBorder: '#404040',
    questionHover: '#2d2d2d',
    
    // 高亮色（用于术语、链接等）
    highlight: '#ffd700', // 金色，符合"灯光"主题
    highlightSecondary: '#ffaa00',
    
    // 链接颜色
    link: '#4a9eff',
    linkHover: '#6bb3ff',
    
    // 论文卡片颜色
    paperBackground: '#1a1a2e',
    paperBorder: '#2d3561',
    
    // 错误和状态
    error: '#ff4444',
    success: '#44ff44',
    warning: '#ffaa00',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
  
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.3)',
    md: '0 4px 8px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.5)',
  },
  
  transitions: {
    fast: '150ms ease',
    normal: '250ms ease',
    slow: '350ms ease',
  },
};

export type Theme = typeof theme;

