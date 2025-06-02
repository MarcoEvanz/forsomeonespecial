"use client";

import { useEffect, useState } from "react";

const BALLOON_COLORS = [
  '#FF69B4', '#FFD700', '#87CEEB', '#FF6347', '#32CD32', '#FFB6C1', '#FFA500'
];
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomBalloon(i: number) {
  const left = `${getRandomInt(5, 85)}%`;
  const size = getRandomInt(80, 140);
  const duration = getRandomInt(8, 16);
  const delay = getRandomInt(0, 6);
  const color = BALLOON_COLORS[getRandomInt(0, BALLOON_COLORS.length - 1)];
  return {
    id: Date.now() + i + Math.random(),
    left,
    size,
    duration,
    delay,
    color,
  };
}

// Add a type for heart bursts
interface HeartBurst {
  id: number;
  x: number;
  y: number;
  particles: Array<{id: number, x: number, y: number, angle: number, scale: number, delay: number}>;
}

// Rose type
interface Rose {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

function getRandomRose(i: number): Rose {
  const left = `${getRandomInt(8, 88)}%`;
  const size = getRandomInt(48, 72);
  const duration = getRandomInt(10, 18);
  const delay = getRandomInt(0, 8);
  return {
    id: Date.now() + i + Math.random(),
    left,
    size,
    duration,
    delay,
  };
}

export default function Home() {
  const birthdayMessages = [
    "Gửi đến em - An Nhiên",
    "Hôm nay với anh là một ngày rất đặc biệt.",
    "Vì đó là ngày em đến với thế giới này -",
    "Là ngày thế giới trở nên dịu dàng hơn,",
    "Ấm áp hơn, và tràn đầy hy vọng hơn.",
    "Cảm ơn em - vì đã tồn tại.",
    "Cảm ơn em - vì đã bước vào cuộc đời anh.",
    "Cảm ơn em - vì đã khiến tim anh loạn nhịp.",
    "Cảm ơn em - vì đã khiến anh tin vào tình yêu.",
    "Cảm ơn em - vì đã để anh tìm thấy 'miền An Nhiên' của riêng mình.",
    "Và cảm ơn - vì anh đã có cơ hội được gặp em…",
    "Dù là phút chốc hay cả một chặng đường dài",
    "Dù là một khoảnh khắc hay cả một đời",
    "Anh chỉ mong em luôn hạnh phúc,",
    "Chúc em tuổi mới thật rực rỡ,",
    "Và nếu có thể…",
    "Hãy để anh đồng hành cùng em, trên đoạn đường phía trước.",
    "Chúc mừng sinh nhật em, An Nhiên!",

  ];
  const [messageIndex, setMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right'); // used for animation direction
  const [candleBlown, setCandleBlown] = useState(false);
  const [showWind, setShowWind] = useState(false);
  const [loveParticles, setLoveParticles] = useState<Array<{id: number, x: number, y: number, angle: number, scale: number, delay: number}>>([]);
  const [heartBursts, setHeartBursts] = useState<HeartBurst[]>([]);
  const [roses, setRoses] = useState(() =>
    Array.from({ length: 6 }, (_, i) => getRandomRose(i))
  );
  // const loveParticleCount = 38; // More particles for denser heart
  const [balloons, setBalloons] = useState(() =>
    Array.from({ length: 6 }, (_, i) => getRandomBalloon(i))
  );

  // const shootLoveParticles = () => {
  //   // Heart shape parametric: x = 16sin^3(t), y = 13cos(t)-5cos(2t)-2cos(3t)-cos(4t)
  //   const particles = Array.from({ length: loveParticleCount }, (_, i) => {
  //     const t = Math.PI * 2 * (i / loveParticleCount);
  //     // Heart shape, scale and center for SVG overlay
  //     const x = 60 + 70 * Math.pow(Math.sin(t), 3); // center x=60, scale=70 (was 38)
  //     const y = 45 - 56 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16; // center y=45, scale=56 (was 30)
  //     return {
  //       id: Date.now() + i + Math.random(),
  //       x,
  //       y,
  //       angle: t,
  //       scale: 0.8 + 0.7 * Math.random(),
  //       delay: Math.random() * 0.18,
  //     };
  //   });
  //   setLoveParticles(particles);
  //   setTimeout(() => setLoveParticles([]), 1400);
  // };

  const blowCandle = () => {
    if (candleBlown) return;
    setShowWind(true);
    setLoveParticles([]); // Remove love particles
    setTimeout(() => {
      setCandleBlown(true);
      setShowWind(false);
      setAnimate(true);
      setTimeout(() => {
        setShowMessage(true);
        setAnimate(false);
      }, 600);
    }, 900); // Wind duration
  };

  const handleBirthdayClick = () => {
    if (candleBlown) return;
    setShowWind(true);
    setLoveParticles([]); // Remove love particles
    setTimeout(() => {
      setCandleBlown(true);
      setShowWind(false);
      setAnimate(true);
      setTimeout(() => {
        setShowMessage(true);
        setAnimate(false);
      }, 600);
    }, 900); // Wind duration
  };

  const handleNext = () => {
    setDirection('right');
    setAnimate(true);
    setTimeout(() => {
      setMessageIndex((prev) => Math.min(prev + 1, birthdayMessages.length - 1));
      setAnimate(false);
    }, 500);
  };

  const handlePrev = () => {
    setDirection('left');
    setAnimate(true);
    setTimeout(() => {
      setMessageIndex((prev) => Math.max(prev - 1, 0));
      setAnimate(false);
    }, 500);
  };

  // Helper to create a heart burst at a given (x, y) position (relative to viewport)
  function createHeartBurst(x: number, y: number) {
    const loveParticleCount = 38;
    const particles = Array.from({ length: loveParticleCount }, (_, i) => {
      const t = Math.PI * 2 * (i / loveParticleCount);
      // Heart shape, scale and center for SVG overlay
      const px = 60 + 70 * Math.pow(Math.sin(t), 3); // center x=60, scale=70
      const py = 45 - 56 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16;
      return {
        id: Date.now() + i + Math.random(),
        x: px,
        y: py,
        angle: t,
        scale: 0.8 + 0.7 * Math.random(),
        delay: Math.random() * 0.18,
      };
    });
    const burstId = Date.now() + Math.random();
    setHeartBursts(bursts => [...bursts, { id: burstId, x, y, particles }]);
    setTimeout(() => {
      setHeartBursts(bursts => bursts.filter(b => b.id !== burstId));
    }, 1400);
  }

  // Update popBalloon to accept event and balloon id
  function popBalloon(id: number, event?: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    setBalloons(balloons =>
      balloons.filter(b => b.id !== id)
    );
    if (event) {
      // Get click position relative to viewport
      const clickX = event.clientX;
      const clickY = event.clientY;
      createHeartBurst(clickX, clickY);
    }
  }

  // Update popRose to accept event and rose id
  function popRose(id: number, event?: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    setRoses(roses => roses.filter(r => r.id !== id));
    if (event) {
      const clickX = event.clientX;
      const clickY = event.clientY;
      createHeartBurst(clickX, clickY);
    }
  }

  // Timer overlay state
  const [showTimer, setShowTimer] = useState(true);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    function getMsToTarget() {
      const now = new Date();
      const target = new Date(2025, 5, 3, 0, 0, 0, 0); // June is month 5 (0-based)
      if (now >= target) {
        return 0;
      }
      return target.getTime() - now.getTime();
    }
    setRemaining(getMsToTarget());
    const interval = setInterval(() => {
      const ms = getMsToTarget();
      setRemaining(ms); 
      if (ms <= 0) {
        setShowTimer(false);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function formatTime(ms: number) {
    if (ms <= 0) return "00:00:00";
    const totalSec = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const s = String(totalSec % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  // Respawn logic for balloons and roses: respawn at random location
  useEffect(() => {
    if (balloons.length < 6) {
      const timeout = setTimeout(() => {
        setBalloons(prev => [
          ...prev,
          getRandomBalloon(Date.now())
        ]);
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [balloons]);

  useEffect(() => {
    if (roses.length < 6) {
      const timeout = setTimeout(() => {
        setRoses(prev => [
          ...prev,
          getRandomRose(Date.now())
        ]);
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [roses]);

  // Helper to remove balloon/rose by id
  function removeBalloonById(id: number) {
    setBalloons(balloons => balloons.filter(b => b.id !== id));
  }
  function removeRoseById(id: number) {
    setRoses(roses => roses.filter(r => r.id !== id));
  }

  return (
    <>
      {showTimer && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(255,255,255,0.97)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            fontFamily: 'var(--font-geist-sans), sans-serif',
          }}
        >
          <span style={{ fontSize: '2.8rem', color: '#FF69B4', fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>
            Until the Day an Angel Was Born
          </span>
          <span style={{ fontSize: '5rem', color: '#7c3aed', fontWeight: 900, letterSpacing: 4, textShadow: '0 2px 12px #fff' }}>
            {formatTime(remaining)}
          </span>
        </div>
      )}
      <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-pink-100 relative overflow-hidden">
        {/* Decorative SVG background: horizon, clouds, sun */}
        <svg
          className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none"
          style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', zIndex: 0 }}
          width="100%"
          height="100%"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Sky gradient */}
          <defs>
            <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e0f7fa" />
              <stop offset="100%" stopColor="#fff1f7" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="1920" height="1080" fill="url(#skyGradient)" />
          {/* Sun (no glow) */}
          <circle cx="1620" cy="140" r="55" fill="#ffe082" />
          {/* Clouds */}
          <g opacity="0.7">
            <ellipse cx="400" cy="180" rx="90" ry="38" fill="#fff" />
            <ellipse cx="470" cy="170" rx="50" ry="24" fill="#fff" />
            <ellipse cx="350" cy="200" rx="40" ry="18" fill="#fff" />
          </g>
          <g opacity="0.6">
            <ellipse cx="900" cy="120" rx="70" ry="28" fill="#fff" />
            <ellipse cx="950" cy="130" rx="40" ry="18" fill="#fff" />
          </g>
          <g opacity="0.5">
            <ellipse cx="1400" cy="220" rx="60" ry="22" fill="#fff" />
            <ellipse cx="1450" cy="210" rx="35" ry="14" fill="#fff" />
          </g>
          <g opacity="0.4">
            <ellipse cx="700" cy="260" rx="50" ry="18" fill="#fff" />
            <ellipse cx="740" cy="250" rx="30" ry="10" fill="#fff" />
          </g>
          {/* Horizon (curved ground) */}
          <path d="M0 900 Q960 1050 1920 900 L1920 1080 L0 1080 Z" fill="#b2dfdb" />
          <ellipse cx="960" cy="1050" rx="900" ry="90" fill="#e0f2f1" opacity="0.7" />
        </svg>
        {/* Balloons and confetti particles - moved to a lower z-index layer */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Animated, flexible, bigger SVG balloons continuously flying upward */}
          {balloons.map((balloon) => (
            <svg
              key={balloon.id}
              width={balloon.size}
              height={balloon.size * 1.4}
              viewBox="0 0 60 84"
              style={{
                position: 'absolute',
                left: balloon.left,
                bottom: `-120px`,
                zIndex: 0,
                pointerEvents: 'auto',
                cursor: 'pointer',
                animation: `balloon-float ${balloon.duration}s linear ${balloon.delay}s forwards`,
              }}
              onClick={e => popBalloon(balloon.id, e)}
              onAnimationEnd={() => removeBalloonById(balloon.id)}
            >
              <ellipse
                cx="30"
                cy="40"
                rx="28"
                ry="38"
                fill={balloon.color}
                opacity="0.85"
              />
              <ellipse
                cx="30"
                cy="30"
                rx="10"
                ry="14"
                fill="#fff"
                opacity="0.18"
              />
              <rect
                x="28"
                y="78"
                width="4"
                height="10"
                fill="#a97c50"
                rx="2"
              />
              <path
                d="M30 88 Q32 98 26 104"
                stroke="#a97c50"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          ))}
          {/* Animated roses floating upward */}
          {roses.map((rose) => (
            <img
              key={rose.id}
              src="/rose.png"
              alt="rose"
              width={rose.size}
              height={rose.size * 1.2}
              style={{
                position: 'absolute',
                left: rose.left,
                bottom: `-90px`,
                zIndex: 1,
                pointerEvents: 'auto',
                cursor: 'pointer',
                animation: `rose-float ${rose.duration}s linear ${rose.delay}s forwards`,
                userSelect: 'none',
              }}
              onClick={e => popRose(rose.id, e)}
              onAnimationEnd={() => removeRoseById(rose.id)}
              draggable={false}
            />
          ))}
          {/* Render all heart bursts at their positions */}
          {heartBursts.map(burst => (
            <div
              key={burst.id}
              style={{
                position: 'fixed',
                left: burst.x - 60, // center the heart burst (SVG width ~120)
                top: burst.y - 45,  // center the heart burst (SVG height ~90)
                width: 120,
                height: 90,
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              {burst.particles.map(p => (
                <span
                  key={p.id}
                  style={{
                    position: 'absolute',
                    left: `calc(${p.x}px - 16px)`,
                    top: `calc(${p.y}px - 16px)`,
                    width: 32 * p.scale,
                    height: 32 * p.scale,
                    opacity: 0.85,
                    transform: `scale(${p.scale})`,
                    animation: `love-pop 1.2s cubic-bezier(0.4,0,0.2,1) ${p.delay}s both`,
                    pointerEvents: 'none',
                  }}
                  aria-hidden="true"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21s-6.5-5.2-8.5-8.2C1.2 10.1 2.5 6.5 6 6.5c1.7 0 3.1 1.1 4 2.1.9-1 2.3-2.1 4-2.1 3.5 0 4.8 3.6 2.5 6.3C18.5 15.8 12 21 12 21z" fill="#FF69B4" stroke="#FF1493" strokeWidth="1.2"/>
                  </svg>
                </span>
              ))}
            </div>
          ))}
          
          {/* Confetti */}
          {[...Array(20)].map((_, i) => {
            const confettiEmojis = ['🎉', '✨', '🎊', '⭐', '💖', '💙', '💚', '💛'];
            const confettiColors = [
              '#FFD700', '#FF69B4', '#87CEEB', '#FF6347', '#32CD32', '#FFB6C1', '#FFA500', '#40E0D0'
            ];
            const left = `${(i * 37) % 100}%`;
            const top = `${(i * 53) % 100}%`;
            const fontSize = `${(i % 8) * 2 + 14}px`;
            const animationDelay = `${(i % 8) * 0.25}s`;
            const color = confettiColors[i % confettiColors.length];
            // Use a deterministic key based on emoji, color, and position
            const key = `${confettiEmojis[i % confettiEmojis.length]}-${color}-${left}-${top}`;
            return (
              <span
                key={key}
                aria-hidden="true"
                className="absolute animate-confetti"
                style={{
                  left,
                  top,
                  fontSize,
                  animationDelay,
                  color,
                }}
              >
                {confettiEmojis[i % confettiEmojis.length]}
              </span>
            );
          })}
        </div>
        {/* Overlay to allow pointer events above balloons */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* All interactive content goes here so it's above the balloons */}
          {!showMessage ? (
            <>
              <button
                onClick={handleBirthdayClick}
                disabled={animate}
                className="cursor-pointer text-6xl font-bold text-pink-500 hover:text-pink-700 transition-colors bg-transparent border-none outline-none focus:ring-2 focus:ring-pink-400"
                style={{ transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)' }}
              >
                Hôm nay là ngày của em.
              </button>
              <div className="mt-6 flex justify-center relative">
                {/* Bigger cake SVG with animated candle flame and blowing out effect */}
                {/* Love particles overlay */}
                <div style={{position:'absolute', left:0, top:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:2}}>
                  {loveParticles.map(p => (
                    <span
                      key={p.id}
                      style={{
                        position: 'absolute',
                        left: `calc(${p.x}px - 16px)`,
                        top: `calc(${p.y}px - 16px)`,
                        width: 32 * p.scale,
                        height: 32 * p.scale,
                        opacity: 0.85,
                        transform: `scale(${p.scale})`,
                        animation: `love-pop 1.2s cubic-bezier(0.4,0,0.2,1) ${p.delay}s both`,
                        pointerEvents: 'none',
                      }}
                      aria-hidden="true"
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path d="M12 21s-6.5-5.2-8.5-8.2C1.2 10.1 2.5 6.5 6 6.5c1.7 0 3.1 1.1 4 2.1.9-1 2.3-2.1 4-2.1 3.5 0 4.8 3.6 2.5 6.3C18.5 15.8 12 21 12 21z" fill="#FF69B4" stroke="#FF1493" strokeWidth="1.2"/>
                    </svg>
                    </span>
                  ))}
                </div>
                <span
                  role="button"
                  tabIndex={0}
                  aria-label="Blow out the candle"
                  onClick={blowCandle}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') blowCandle();
                  }}
                  style={{ cursor: 'pointer', outline: 'none' }}
                >
                  <svg width="120" height="90" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Cake base */}
                    <rect x="16" y="50" width="88" height="30" rx="12" fill="#FFD1DC" stroke="#FF69B4" strokeWidth="3"/>
                    {/* Cake top */}
                    <ellipse cx="60" cy="50" rx="44" ry="15" fill="#FFF0F5" stroke="#FF69B4" strokeWidth="3"/>
                    {/* Candle */}
                    <rect x="56" y="22" width="8" height="20" rx="3" fill="#FFFACD" stroke="#FFD700" strokeWidth="2"/>
                    {/* Flame (animated) */}
                    {!candleBlown && (
                      <ellipse
                        id="cake-flame"
                        cx="60"
                        cy="18"
                        rx="4"
                        ry="7"
                        fill="#FFD700"
                        className={`cake-flame${showWind ? ' cake-flame-blow' : ''}`}
                      />
                    )}
                    {/* Wind animation */}
                    {showWind && (
                      <path
                        className="wind-blow"
                        d="M48 18 Q54 12 60 18 Q66 24 72 18"
                        stroke="#87CEEB"
                        strokeWidth="2.5"
                        fill="none"
                        opacity="0.7"
                      />
                    )}
                    {/* Sprinkles */}
                    <circle cx="36" cy="56" r="2" fill="#FF69B4"/>
                    <circle cx="84" cy="56" r="2" fill="#87CEEB"/>
                    <circle cx="48" cy="46" r="1.7" fill="#32CD32"/>
                    <circle cx="72" cy="46" r="1.7" fill="#FFA500"/>
                    <circle cx="60" cy="64" r="2" fill="#FFD700"/>
                    {/* Cake layers */}
                    <rect x="16" y="62" width="88" height="6" rx="3" fill="#FFB6C1"/>
                  </svg>
                  <style>{`
                    .cake-flame {
                      transform-origin: 60px 25px;
                      animation: flame-flicker 1s infinite alternate;
                      opacity: 1;
                      transition: opacity 0.5s, transform 0.7s cubic-bezier(0.4,0,0.2,1);
                    }
                    .cake-flame-blow {
                      animation: flame-blow 0.8s forwards;
                    }
                    @keyframes flame-flicker {
                      0% { transform: scaleY(1) scaleX(1) translateY(0); }
                      20% { transform: scaleY(1.1) scaleX(0.95) translateY(-1px); }
                      40% { transform: scaleY(0.95) scaleX(1.05) translateY(1px); }
                      60% { transform: scaleY(1.05) scaleX(0.98) translateY(-2px); }
                      80% { transform: scaleY(1) scaleX(1.1) translateY(0); }
                      100% { transform: scaleY(1) scaleX(1) translateY(0); }
                    }
                    @keyframes flame-blow {
                      0% { opacity: 1; transform: skewX(0deg) scaleY(1) scaleX(1) translateX(0); }
                      40% { opacity: 1; transform: skewX(25deg) scaleY(0.8) scaleX(1.2) translateX(10px); }
                      70% { opacity: 0.7; transform: skewX(40deg) scaleY(0.5) scaleX(1.3) translateX(20px); }
                      100% { opacity: 0; transform: skewX(60deg) scaleY(0.2) scaleX(1.4) translateX(32px); }
                    }
                    .wind-blow {
                      stroke-dasharray: 60;
                      stroke-dashoffset: 60;
                      animation: wind-move 0.8s cubic-bezier(0.4,0,0.2,1) forwards;
                    }
                    @keyframes wind-move {
                      0% { stroke-dashoffset: 60; opacity: 0.7; }
                      60% { opacity: 1; }
                      100% { stroke-dashoffset: 0; opacity: 0; }
                    }
                  `}</style>
                </span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center animate-fade-in-messages">
              <div className="relative w-[340px] sm:w-[420px] md:w-[500px] h-[220px] sm:h-[260px] md:h-[300px] mb-8 perspective-[1200px]">
                {/* Book with two pages effect */}
                {/* Left page (previous message, faded if not first) */}
                {/* Placeholder background for left page (shows previous message background during flip) */}
                <div
                  className={`absolute left-0 top-0 w-1/2 h-full bg-pink-50 rounded-l-lg border-2 border-pink-100 shadow z-10 transition-transform duration-500 overflow-hidden opacity-0`}
                  style={{
                    visibility: animate && direction === 'left' ? 'visible' : 'hidden',
                  }}
                >
                  <div className="flex flex-col justify-center items-center h-full px-4">
                    <span className="block text-center text-xl sm:text-2xl font-semibold text-pink-300 select-none">
                      {birthdayMessages[messageIndex - 1] || ''}
                    </span>
                  </div>
                </div>
                <div
                  className={`absolute left-0 top-0 w-1/2 h-full bg-white rounded-l-lg border-2 border-pink-200 shadow-xl z-20 transition-transform duration-500 overflow-hidden ${messageIndex > 0 ? 'opacity-100' : 'opacity-40'}`}
                  style={{
                    visibility: animate && direction === 'left' ? 'hidden' : 'visible',
                  }}
                >
                  <div className="flex flex-col justify-center items-center h-full px-4">
                    <span className="block text-center text-xl sm:text-2xl font-semibold text-purple-400 select-none">
                      {messageIndex > 0 ? birthdayMessages[messageIndex - 1] : ''}
                    </span>
                  </div>
                </div>
                {/* Right page (current message) */}
                {/* Placeholder background for right page (shows next message background during flip) */}
                <div
                  className={`absolute right-0 top-0 w-1/2 h-full bg-pink-50 rounded-r-lg border-2 border-pink-100 shadow z-10 transition-transform duration-500 overflow-hidden`}
                  style={{
                    visibility: animate && direction === 'right' ? 'visible' : 'hidden',
                  }}
                >
                  <div className="flex flex-col justify-center items-center h-full px-4">
                    <span className="block text-center text-2xl sm:text-3xl font-semibold text-pink-300 select-none">
                      {birthdayMessages[messageIndex + 1] || ''}
                    </span>
                  </div>
                </div>
                <div
                  className={`absolute right-0 top-0 w-1/2 h-full bg-white rounded-r-lg border-2 border-pink-200 shadow-xl z-20 transition-transform duration-500 overflow-hidden opacity-100`}
                  style={{
                    visibility: animate && direction === 'right' ? 'hidden' : 'visible',
                  }}
                >
                  <div className="flex flex-col justify-center items-center h-full px-4">
                    <span className="block text-center text-2xl sm:text-3xl font-semibold text-purple-700 select-none">
                      {birthdayMessages[messageIndex]}
                    </span>
                  </div>
                </div>
                {/* Flipping page animation for Prev (left) */}
                {animate && direction === 'left' && (
                  <div
                    className="absolute left-0 top-0 w-1/2 h-full z-30 overflow-hidden page-flip-3d-left"
                    style={{ transformOrigin: 'right center' }}
                  >
                    {/* Front of flipping page (current message) */}
                    <div className="absolute inset-0 bg-white rounded-l-lg border-2 border-pink-200 shadow-xl flex items-center justify-center backface-hidden">
                      <span className="block text-center text-xl sm:text-2xl font-semibold text-purple-400 select-none">
                        {birthdayMessages[messageIndex - 1] || ''}
                      </span>
                    </div>
                    {/* Back of flipping page (current message, as placeholder) */}
                    <div className="absolute inset-0 bg-pink-50 rounded-l-lg border-2 border-pink-100 shadow flex items-center justify-center backface-hidden page-flip-back-left">
                      <span className="block text-center text-xl sm:text-2xl font-semibold text-pink-400 select-none">
                        {birthdayMessages[messageIndex]}
                      </span>
                    </div>
                  </div>
                )}
                {/* Flipping page animation for Next (right) */}
                {animate && direction === 'right' && (
                  <div
                    className="absolute right-0 top-0 w-1/2 h-full z-30 overflow-hidden page-flip-3d"
                    style={{ transformOrigin: 'left center' }}
                  >
                    {/* Front of flipping page (current message) */}
                    <div className="absolute inset-0 bg-white rounded-r-lg border-2 border-pink-200 shadow-xl flex items-center justify-center backface-hidden">
                      <span className="block text-center text-2xl sm:text-3xl font-semibold text-purple-700 select-none">
                        {birthdayMessages[messageIndex]}
                      </span>
                    </div>
                    {/* Back of flipping page (next message, as placeholder) */}
                    <div className="absolute inset-0 bg-pink-50 rounded-r-lg border-2 border-pink-100 shadow flex items-center justify-center backface-hidden page-flip-back">
                      <span className="block text-center text-2xl sm:text-3xl font-semibold text-pink-400 select-none">
                        {birthdayMessages[messageIndex + 1] || ''}
                      </span>
                    </div>
                  </div>
                )}
                {/* Book spine and shadow */}
                <div className="absolute left-1/2 top-0 h-full w-2 bg-gradient-to-r from-pink-300 to-pink-100 z-30 rounded"></div>
                <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-pink-100 to-transparent rounded-b-lg z-0"></div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handlePrev}
                  disabled={messageIndex === 0 || animate}
                  className="px-4 py-2 rounded bg-purple-200 text-purple-800 font-bold disabled:opacity-40 transition shadow"
                >
                  Prev
                </button>
                <button
                  onClick={handleNext}
                  disabled={messageIndex === birthdayMessages.length - 1 || animate}
                  className="px-4 py-2 rounded bg-pink-300 text-pink-800 font-bold disabled:opacity-40 transition shadow"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Birthday music audio player (visually hidden, but will play after user interaction) */}
        <audio
          id="birthday-audio"
          src="/birthday.mp3"
          loop
          tabIndex={-1}
          aria-label="Birthday music"
          style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none', left: 0, bottom: 0 }}
        >
          <track kind="captions" label="Birthday music" />
          Your browser does not support the audio element.
        </audio>
        {/* Script to play audio after first user interaction */}
        <script dangerouslySetInnerHTML={{__html:`
          window.addEventListener('click', function playMusicOnce() {
            var audio = document.getElementById('birthday-audio');
            if (audio && audio.paused) {
              audio.play().catch(()=>{});
            }
            window.removeEventListener('click', playMusicOnce);
          });
        `}} />
        {/* Animations for fade-in, balloons, and confetti */}
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 1s ease;
          }
          .animate-fade-in-delay {
            animation: fade-in 1.5s 0.3s both;
          }
          @keyframes balloon-float {
            0% { transform: translateY(0) scale(1) rotate(-2deg); opacity: 0.7; }
            10% { opacity: 1; }
            50% { transform: translateY(-40vh) scale(1.04) rotate(2deg); }
            100% { transform: translateY(-110vh) scale(1) rotate(-2deg); opacity: 0.7; }
          }
          @keyframes rose-float {
            0% { transform: translateY(0) scale(1) rotate(-2deg); opacity: 0.8; }
            10% { opacity: 1; }
            50% { transform: translateY(-40vh) scale(1.04) rotate(2deg); }
            100% { transform: translateY(-110vh) scale(1) rotate(-2deg); opacity: 0.7; }
          }
          @keyframes confetti {
            0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
          }
          .animate-confetti {
            animation: confetti 3.5s linear infinite;
          }
          @keyframes slide-in-right {
            0% { opacity: 0; transform: translateX(100%) scale(0.98); }
            100% { opacity: 1; transform: translateX(0) scale(1); }
          }
          @keyframes slide-in-left {
            0% { opacity: 0; transform: translateX(-100%) scale(0.98); }
            100% { opacity: 1; transform: translateX(0) scale(1); }
          }
          .animate-slide-in-right {
            animation: slide-in-right 0.5s cubic-bezier(0.4,0,0.2,1);
          }
          .animate-slide-in-left {
            animation: slide-in-left 0.5s cubic-bezier(0.4,0,0.2,1);
          }
          .perspective-[1200px] {
            perspective: 1200px;
          }
          @keyframes page-flip-3d {
            0% { transform: rotateY(0deg); z-index: 30; }
            40% { z-index: 40; }
            100% { transform: rotateY(-180deg); z-index: 30; }
          }
          @keyframes page-flip-3d-left {
            0% { transform: rotateY(0deg); z-index: 30; }
            40% { z-index: 40; }
            100% { transform: rotateY(180deg); z-index: 30; }
          }
          .page-flip-3d {
            animation: page-flip-3d 0.6s cubic-bezier(0.4,0,0.2,1);
            transform-style: preserve-3d;
          }
          .page-flip-3d-left {
            animation: page-flip-3d-left 0.6s cubic-bezier(0.4,0,0.2,1);
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .page-flip-back {
            transform: rotateY(180deg);
          }
          .page-flip-back-left {
            transform: rotateY(180deg);
          }
          @keyframes fade-in-messages {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in-messages {
            animation: fade-in-messages 1.1s cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes love-pop {
            0% { opacity: 0; transform: scale(0.2) translateY(0); }
            30% { opacity: 1; transform: scale(1.1) translateY(-18px); }
            60% { opacity: 1; transform: scale(1) translateY(-38px); }
            100% { opacity: 0; transform: scale(0.7) translateY(-70px); }
          }
        `}</style>
      </div>
    </>
  );
}
