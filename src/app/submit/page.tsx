"use client";
import { useState } from "react";
import styles from "../main8bit.module.css";

export default function SubmitPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [form, setForm] = useState({
    crew: "",
    shloka: "",
    result: "",
    members: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setStatus("Успешно отправлено! Спасибо за свет ✨");
        setForm({ crew: "", shloka: "", result: "", members: "" });
      } else {
        setStatus("Ошибка отправки. Попробуйте ещё раз.");
      }
    } catch {
      setStatus("Ошибка сети. Попробуйте позже.");
    }
  };

  return (
    <main className={styles.main8bit}>
      <div className={styles.frame}>
        <h1 className={styles.title}>🚀 Загрузка результата миссии</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ margin: "12px 0" }}>
            <label>
              Название экипажа:<br/>
              <input
                name="crew"
                value={form.crew}
                onChange={handleChange}
                required
                className={styles.inputField}
                placeholder="Экипаж 0007: Ничего не ждали — нашли друг друга"
              />
            </label>
          </div>
          <div style={{ margin: "12px 0" }}>
            <label>
              Шлока:<br/>
              <input
                name="shloka"
                value={form.shloka}
                onChange={handleChange}
                required
                className={styles.inputField}
                placeholder="2.47"
              />
            </label>
          </div>
          <div style={{ margin: "12px 0" }}>
            <label>
              Ссылка на результат:<br/>
              <input
                name="result"
                value={form.result}
                onChange={handleChange}
                required
                className={styles.inputField}
                placeholder="https://..."
              />
            </label>
          </div>
          <div style={{ margin: "12px 0" }}>
            <label>
              Участники (через запятую):<br/>
              <input
                name="members"
                value={form.members}
                onChange={handleChange}
                required
                className={styles.inputField}
                placeholder="@sun_rider, @lakshmi_code, @jivabeat"
              />
            </label>
          </div>
          <button type="submit" className={styles.submitBtn} style={{ width: "80%", marginTop: 16 }}>
            Отправить результат
          </button>
        </form>
        {status && <div style={{ marginTop: 18, color: status.startsWith("Успешно") ? "green" : "#d84315" }}>{status}</div>}
      </div>
    </main>
  );
} 