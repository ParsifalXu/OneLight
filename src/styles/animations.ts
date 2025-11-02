import { keyframes } from 'styled-components'

// 灯光闪烁动画 - 体现"一灯即明"主题
export const lightFlicker = keyframes`
  0%, 100% {
    opacity: 1;
    filter: brightness(1);
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  }
  25% {
    opacity: 0.8;
    filter: brightness(1.2);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  }
  50% {
    opacity: 0.9;
    filter: brightness(0.9);
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
  }
  75% {
    opacity: 1;
    filter: brightness(1.1);
    box-shadow: 0 0 25px rgba(255, 215, 0, 0.6);
  }
`

// 灯光脉冲动画
export const lightPulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
`

// 渐显动画
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

// 滑入动画
export const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

