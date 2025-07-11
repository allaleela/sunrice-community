"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../main8bit.module.css";

const terminalBlocks = [
  ["🌅 SUNRICE TAXI — the adventure begins"],
  [
    '"A system grows by itself if there is light in it." (a little love, and a bit of madness)'
  ],
  [
    "Imagine 10,000 light messages scattered all over the planet —",
    "we call them POSTULATES.",
    "Each carries a piece of code — wisdom, inspiration, and action. If you are reading this, one of them has found you."
  ],
  [
    "This is not just an NFT. It's a key to an adventure where you become part of a secret team of three to complete a small but magical quest."
  ],
  [
    "🛠️ What you do:",
    "- Get your POSTULATE (as an NFT)",
    "- Find two more like you — via the Internet, chat, meme, or just heart",
    "- Together, complete a quest to spread the light — create art, make a track, bomb a POSTULATE as graffiti.",
    "- Return it to the SUNRICE COMMUNITY — and your NFT is activated as a sign that the light has passed"
  ],
  [
    "🚖 The taxi won't come until you become a team. But when it does — the real journey begins."
  ],
  [
    "✨ This is a game. This is learning. This is digital magic. You are not just a user. You are a light participant. Find each other.",
    "Restore the network connection."
  ],
  [
    "You may not see it, but you can feel it.",
    "Listen! The light is awakening!"
  ],
  [
    "Do you want to join the adventure? (yes/no)"
  ],
  [
    "Contact: Telegram @psyfreeman"
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
  const [showContact, setShowContact] = useState(false);
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
      setTimeout(() => setShowContact(true), 800);
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
        // Play sound for each char (new Audio instance for each), only if enabled
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
    router.push("/submit"); // Можно сделать отдельную форму для /en/submit при необходимости
  };
  const handleNo = () => {
    setNoMsg("Maybe next time! Thank you for your interest in SUNRICE TAXI 🚕");
    setShowActions(false);
  };

  return (
    <div className={styles.terminalBg}>
      <div className={styles.terminalBody}>
        {displayedBlocks.map((block, bIdx) => (
          <div key={bIdx}>
            {block.map((line, lIdx) => (
              <div key={lIdx}>
                {line.includes('Telegram @psyfreeman') ? (
                  <a
                    href="https://t.me/psyfreeman"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#b6ffb6', textDecoration: 'underline', wordBreak: 'break-all' }}
                  >
                    {line}
                  </a>
                ) : (
                  <>{line}</>
                )}
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
        {showContact && (
          <>
            <hr className={styles.terminalDivider} />
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <a
                href="https://t.me/psyfreeman"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#b6ffb6', textDecoration: 'underline', fontWeight: 600 }}
              >
                Telegram: @psyfreeman
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 