"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./main8bit.module.css";

const terminalBlocks = [
  ["🌅 SUNRICE TAXI — приключение начинается"],
  [
    '"Система растёт сама, если в ней есть свет." (чуть-чуть любви, и немного безумия)'
  ],
  [
    'Представь, что по всей планете разбросаны 10 000 световых посланий —',
    'мы называем их POSTULATES.',
    'Каждый из них несёт в себе кусочек кода — мудрости, вдохновения и действия. Если ты читаешь это — один из них нашёл тебя.'
  ],
  [
    'Это не просто NFT. Это ключ к приключению, где ты становишься частью тайной команды из трёх человек, чтобы выполнить небольшое, но волшебное задание.'
  ],
  [
    '🛠️ Что ты делаешь:',
    '- Получаешь свой POSTULATE (в виде NFT)',
    '- Ищешь ещё двух таких, как ты — через Интернет, чат, мем или просто сердце',
    '- Вместе выполняете задание по распостранению света — нарисовать арт, сделать трек, забомбить POSTULATE в виде граффити.',
    '- Возвращаете это в SUNRICE COMMUNITY — и ваша NFT активируется как знак, что свет прошёл'
  ],
  [
    '🚖 Такси не приедет, пока вы не станете командой. Но когда оно приедет — начнётся настоящее путешествие.'
  ],
  [
    '✨ Это игра. Это обучение. Это цифровая магия. Ты не просто пользователь. Ты световой участник. Найдите друг друга.',
    'Восстановите соединение сети.'
  ],
  [
    'Вы можете этого не видеть, но вы можете это почувствовать.',
    'Слушайте! Свет просыпается!'
  ],
  [
    'Хотите присоединиться к приключению? (yes/no)'
  ]
];

const typeSoundUrl = "/typewriter-key.mp3";

export default function Home() {
  const [displayedBlocks, setDisplayedBlocks] = useState<string[][]>([[""]]);
  const [blockIdx, setBlockIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [showActions, setShowActions] = useState(false);
  const [noMsg, setNoMsg] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const router = useRouter();
  const typing = useRef(true);

  useEffect(() => {
    const enableSound = () => setSoundEnabled(true);
    window.addEventListener("pointerdown", enableSound, { once: true });
    return () => window.removeEventListener("pointerdown", enableSound);
  }, []);

  useEffect(() => {
    if (!typing.current) return;
    if (blockIdx >= terminalBlocks.length) {
      setShowActions(true);
      typing.current = false;
      return;
    }
    const block = terminalBlocks[blockIdx];
    const line = block[lineIdx];
    if (charIdx < line.length) {
      const timeout = setTimeout(() => {
        setDisplayedBlocks((prev) => {
          const updated = prev.map((b) => [...b]);
          updated[blockIdx][lineIdx] = (updated[blockIdx][lineIdx] || "") + line[charIdx];
          return updated;
        });
        setCharIdx((c) => c + 1);
        // Play sound for each char (new Audio instance for each), только если разрешено
        if (soundEnabled && line[charIdx] !== ' ' && line[charIdx] !== '\n') {
          const audio = new Audio(typeSoundUrl);
          audio.volume = 0.5;
          audio.play();
        }
      }, 25);
      return () => clearTimeout(timeout);
    } else if (lineIdx < block.length - 1) {
      setTimeout(() => {
        setDisplayedBlocks((prev) => {
          const updated = prev.map((b) => [...b]);
          updated[blockIdx].push("");
          return updated;
        });
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, 120);
    } else {
      setTimeout(() => {
        setDisplayedBlocks((prev) => [...prev, [""]]);
        setBlockIdx((b) => b + 1);
        setLineIdx(0);
        setCharIdx(0);
      }, 350);
    }
  }, [charIdx, lineIdx, blockIdx, soundEnabled]);

  const handleYes = () => {
    router.push("/submit");
  };
  const handleNo = () => {
    setNoMsg("Может быть, в следующий раз! Спасибо за интерес к SUNRICE TAXI 🚕");
    setShowActions(false);
  };

  return (
    <div className={styles.terminalBg}>
      <div className={styles.terminalBody}>
        {displayedBlocks.map((block, bIdx) => (
          <div key={bIdx}>
            {block.map((line, lIdx) => (
              <div key={lIdx}>
                {line}
                {bIdx === displayedBlocks.length - 1 && lIdx === block.length - 1 && !showActions ? <span className={styles.terminalCursor}></span> : null}
              </div>
            ))}
            {bIdx < displayedBlocks.length - 1 && <hr className={styles.terminalDivider} />}
          </div>
        ))}
        {showActions && (
          <div className={styles.terminalActions}>
            <button className={styles.terminalBtn} onClick={handleYes}>yes</button>
            <button className={styles.terminalBtn} onClick={handleNo}>no</button>
          </div>
        )}
        {noMsg && <div className={styles.terminalMsg}>{noMsg}</div>}
      </div>
    </div>
  );
}
