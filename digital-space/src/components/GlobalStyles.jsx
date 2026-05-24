import React from "react";

const GlobalStyles = ({ t }) => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Nunito:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: ${t.pageBg};
      font-family: 'Nunito', sans-serif;
      color: ${t.text};
      min-height: 100vh;
      overflow-x: hidden;
      transition: background 0.6s ease, color 0.4s ease;
    }

    .hand { font-family: 'Caveat', cursive; }

    .card {
      background: ${t.cardBg};
      border-radius: 20px;
      box-shadow: 0 4px 24px ${t.shadow}, 0 1px 4px ${t.shadow};
      transition: background 0.4s ease;
    }

    .card-h:hover {
      transform: translateY(-3px);
      background: ${t.cardHoverBg};
      box-shadow: 0 8px 32px ${t.shadow};
      transition: all .3s ease;
    }

    .btn-g {
      background: ${t.green};
      color: #fff;
      border: none;
      border-radius: 50px;
      padding: 12px 28px;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      font-size: 15px;
      cursor: pointer;
      transition: all .2s ease;
      letter-spacing: .5px;
    }
    .btn-g:hover { background: ${t.greenDark}; transform: translateY(-1px); }
    .btn-g:disabled { opacity: .6; cursor: not-allowed; transform: none; }

    .btn-o {
      background: transparent;
      color: ${t.green};
      border: 2px solid ${t.green};
      border-radius: 50px;
      padding: 10px 28px;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      font-size: 15px;
      cursor: pointer;
      transition: all .2s ease;
    }
    .btn-o:hover { background: ${t.green}18; transform: translateY(-1px); }

    .inp {
      width: 100%;
      background: ${t.inputBg};
      border: 1.5px solid ${t.inputBorder};
      border-radius: 12px;
      padding: 12px 16px;
      font-family: 'Nunito', sans-serif;
      font-size: 14px;
      color: ${t.text};
      outline: none;
      transition: all .2s ease;
    }
    .inp:focus { border-color: ${t.inputFocus}; box-shadow: 0 0 0 3px ${t.inputFocus}20; }
    .inp::placeholder { color: ${t.textMuted}; }

    .lbl {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: ${t.textMuted};
      margin-bottom: 8px;
    }

    @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
    @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes wiggle { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }
    @keyframes glow { 0%,100%{box-shadow:0 0 8px ${t.green}40} 50%{box-shadow:0 0 22px ${t.green}80} }
    @keyframes steam { 0%{transform:translateY(0) scaleX(1);opacity:.7} 100%{transform:translateY(-36px) scaleX(1.8);opacity:0} }

    .page { animation: fadeUp .5s ease forwards; }

    .snd-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      padding: 13px 8px;
      background: ${t.inputBg};
      border: 2px solid transparent;
      border-radius: 16px;
      cursor: pointer;
      transition: all .25s ease;
      font-family: 'Nunito', sans-serif;
      font-size: 11px;
      font-weight: 700;
      color: ${t.textLight};
      min-width: 70px;
    }
    .snd-btn:hover { transform: translateY(-3px); border-color: ${t.green}40; }
    .snd-btn.on {
      background: ${t.green}18;
      border-color: ${t.green};
      color: ${t.green};
      animation: glow 2s ease infinite;
    }

    .todo {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      background: ${t.inputBg};
      border-radius: 12px;
      margin-bottom: 8px;
      border: 1.5px solid ${t.inputBorder};
      transition: all .2s ease;
      font-size: 13px;
    }
    .todo:hover { border-color: ${t.green}60; background: ${t.todoHover}; }

    .chk {
      width: 20px; height: 20px;
      border-radius: 50%;
      border: 2px solid ${t.textMuted};
      cursor: pointer;
      flex-shrink: 0;
      transition: all .2s ease;
      display: flex; align-items: center; justify-content: center;
    }
    .chk.done { background: ${t.green}; border-color: ${t.green}; }

    .bubble {
      max-width: 75%;
      padding: 10px 15px;
      border-radius: 18px;
      font-size: 13px;
      line-height: 1.5;
      animation: fadeUp .3s ease;
    }
    .bubble.me { background: ${t.green}; color: #fff; border-bottom-right-radius: 4px; align-self: flex-end; }
    .bubble.them { background: ${t.inputBg}; color: ${t.text}; border-bottom-left-radius: 4px; border: 1px solid ${t.inputBorder}; }

    .wcard {
      background: ${t.inputBg};
      border-radius: 14px;
      padding: 14px;
      border-left: 4px solid ${t.green};
      transition: all .25s ease;
      margin-bottom: 10px;
    }
    .wcard:hover { transform: translateX(3px); background: ${t.cardHoverBg}; }

    .qcard {
      background: ${t.cardBg};
      border-radius: 12px;
      padding: 18px;
      border: 1px solid ${t.inputBorder};
      position: relative;
      transition: all .25s ease;
      margin-bottom: 12px;
    }
    .qcard:hover { transform: rotate(-.5deg) scale(1.02); background: ${t.cardHoverBg}; }
    .qcard::before {
      content: '"';
      position: absolute;
      top: -4px; left: 10px;
      font-family: 'Caveat', cursive;
      font-size: 56px;
      color: ${t.green}28;
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
      color: ${t.textLight};
      transition: all .2s ease;
    }
    .nav-i:hover { color: ${t.green}; transform: translateY(-1px); }
    .nav-i.act { color: ${t.green}; font-weight: 700; background: ${t.selectBg}; }

    .timer-r { transition: stroke-dashoffset .5s ease; }

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
      width: 16px; height: 16px;
      border-radius: 50%;
      background: ${t.green};
      cursor: pointer;
    }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: ${t.bgDark}; border-radius: 10px; }
    ::-webkit-scrollbar-thumb { background: ${t.textMuted}; border-radius: 10px; }
  `}</style>
);

export default GlobalStyles;
