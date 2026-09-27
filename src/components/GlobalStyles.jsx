
import React from "react";

const GlobalStyles = ({ theme }) => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Nunito:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: ${theme.pageBg};
      font-family: 'Nunito', sans-serif;
      color: ${theme.text};
      min-height: 100vh;
      overflow-x: hidden;
      transition: background 0.6s ease, color 0.4s ease;
    }

    .hand {
      font-family: 'Caveat', cursive;
    }

    .card {
      background: ${theme.cardBg};
      border-radius: 20px;
      box-shadow: 0 4px 24px ${theme.shadow}, 0 1px 4px ${theme.shadow};
      transition: background 0.4s ease;
    }

    .card-h:hover {
      transform: translateY(-3px);
      background: ${theme.cardHoverBg};
      box-shadow: 0 8px 32px ${theme.shadow};
      transition: all 0.3s ease;
    }

    .btn-g {
      background: ${theme.green};
      color: #fff;
      border: none;
      border-radius: 50px;
      padding: 12px 28px;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.2s ease;
      letter-spacing: 0.5px;
    }

    .btn-g:hover {
      background: ${theme.greenDark};
      transform: translateY(-1px);
    }

    .btn-g:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .btn-o {
      background: transparent;
      color: ${theme.green};
      border: 2px solid ${theme.green};
      border-radius: 50px;
      padding: 10px 28px;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-o:hover {
      background: ${theme.green}18;
      transform: translateY(-1px);
    }

    .inp {
      width: 100%;
      background: ${theme.inputBg};
      border: 1.5px solid ${theme.inputBorder};
      border-radius: 12px;
      padding: 12px 16px;
      font-family: 'Nunito', sans-serif;
      font-size: 14px;
      color: ${theme.text};
      outline: none;
      transition: all 0.2s ease;
    }

    .inp:focus {
      border-color: ${theme.inputFocus};
      box-shadow: 0 0 0 3px ${theme.inputFocus}20;
    }

    .inp::placeholder {
      color: ${theme.textMuted};
    }

    .lbl {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: ${theme.textMuted};
      margin-bottom: 8px;
    }

    @keyframes fadeUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes breathe {
      0%, 100% {
        transform: scale(1);
      }

      50% {
        transform: scale(1.04);
      }
    }

    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }

      50% {
        transform: translateY(-8px);
      }
    }

    @keyframes wiggle {
      0%, 100% {
        transform: rotate(-3deg);
      }

      50% {
        transform: rotate(3deg);
      }
    }

    @keyframes glow {
      0%, 100% {
        box-shadow: 0 0 8px ${theme.green}40;
      }

      50% {
        box-shadow: 0 0 22px ${theme.green}80;
      }
    }

    @keyframes steam {
      0% {
        transform: translateY(0) scaleX(1);
        opacity: 0.7;
      }

      100% {
        transform: translateY(-36px) scaleX(1.8);
        opacity: 0;
      }
    }

    @keyframes rainFall {
      from {
        transform: translateY(-120px);
      }

      to {
        transform: translateY(110vh);
      }
    }

    @keyframes leafFall {
      0% {
        transform: translateY(-100px) rotate(0deg);
      }

      50% {
        transform: translateX(40px) rotate(180deg);
      }

      100% {
        transform: translateY(110vh) translateX(-40px) rotate(360deg);
      }
    }

    @keyframes floatUp {
      0% {
        transform: translateY(20px);
        opacity: 0;
      }

      50% {
        opacity: 0.15;
      }

      100% {
        transform: translateY(-120px);
        opacity: 0;
      }
    }

    @keyframes plantSway {
      0%, 100% {
        transform: rotate(-4deg);
      }

      50% {
        transform: rotate(4deg);
      }
    }

    @keyframes bookFloat {
      0%, 100% {
        transform: translateY(0) rotate(-6deg);
        opacity: 0.12;
      }

      50% {
        transform: translateY(-16px) rotate(-2deg);
        opacity: 0.18;
      }
    }

    .page {
      animation: fadeUp 0.5s ease forwards;
    }

    .snd-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      padding: 13px 8px;
      background: ${theme.inputBg};
      border: 2px solid transparent;
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.25s ease;
      font-family: 'Nunito', sans-serif;
      font-size: 11px;
      font-weight: 700;
      color: ${theme.textLight};
      min-width: 70px;
    }

    .snd-btn:hover {
      transform: translateY(-3px);
      border-color: ${theme.green}40;
    }

    .snd-btn.on {
      background: ${theme.green}18;
      border-color: ${theme.green};
      color: ${theme.green};
      animation: glow 2s ease infinite;
    }

    .todo {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      background: ${theme.inputBg};
      border-radius: 12px;
      margin-bottom: 8px;
      border: 1.5px solid ${theme.inputBorder};
      transition: all 0.2s ease;
      font-size: 13px;
    }

    .todo:hover {
      border-color: ${theme.green}60;
      background: ${theme.todoHover};
    }

    .chk {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid ${theme.textMuted};
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .chk.done {
      background: ${theme.green};
      border-color: ${theme.green};
    }

    .bubble {
      max-width: 75%;
      padding: 10px 15px;
      border-radius: 18px;
      font-size: 13px;
      line-height: 1.5;
      animation: fadeUp 0.3s ease;
    }

    .bubble.me {
      background: ${theme.green};
      color: #fff;
      border-bottom-right-radius: 4px;
      align-self: flex-end;
    }

    .bubble.them {
      background: ${theme.inputBg};
      color: ${theme.text};
      border-bottom-left-radius: 4px;
      border: 1px solid ${theme.inputBorder};
    }

    .wcard {
      background: ${theme.inputBg};
      border-radius: 14px;
      padding: 14px;
      border-left: 4px solid ${theme.green};
      transition: all 0.25s ease;
      margin-bottom: 10px;
    }

    .wcard:hover {
      transform: translateX(3px);
      background: ${theme.cardHoverBg};
    }

    .qcard {
      background: ${theme.cardBg};
      border-radius: 12px;
      padding: 18px;
      border: 1px solid ${theme.inputBorder};
      position: relative;
      transition: all 0.25s ease;
      margin-bottom: 12px;
    }

    .qcard:hover {
      transform: rotate(-0.5deg) scale(1.02);
      background: ${theme.cardHoverBg};
    }

    .qcard::before {
      content: '"';
      position: absolute;
      top: -4px;
      left: 10px;
      font-family: 'Caveat', cursive;
      font-size: 56px;
      color: ${theme.green}28;
      line-height: 1;
    }

    .nav-i {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 8px 13px;
      border-radius: 50px;
      font-family: 'Nunito', sans-serif;
      font-weight: 500;
      font-size: 13px;
      color: ${theme.textLight};
      transition: all 0.2s ease;
    }

    .nav-i:hover {
      color: ${theme.green};
      transform: translateY(-1px);
    }

    .nav-i.act {
      color: ${theme.green};
      font-weight: 700;
      background: ${theme.selectBg};
    }

    .timer-r {
      transition: stroke-dashoffset 0.5s ease;
    }

    input[type=range] {
      width: 100%;
      -webkit-appearance: none;
      height: 6px;
      border-radius: 3px;
      outline: none;
      cursor: pointer;
    }

    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: ${theme.green};
      cursor: pointer;
    }

    .bg-effects {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      overflow: hidden;
    }

    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background: ${theme.bgDark};
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.textMuted};
      border-radius: 10px;
    }
  `}</style>
);

export default GlobalStyles;
