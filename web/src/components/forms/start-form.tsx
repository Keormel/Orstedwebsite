"use client";

import { FormEvent, useState } from "react";

type State = {
  loading: boolean;
  message: string;
  error: boolean;
};

export function StartForm() {
  const [state, setState] = useState<State>({ loading: false, message: "", error: false });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = {
      nickname: String(formData.get("nickname") || ""),
      discord: String(formData.get("discord") || ""),
      notes: String(formData.get("notes") || ""),
      website: String(formData.get("website") || ""),
    };

    setState({ loading: true, message: "", error: false });
    const response = await fetch("/api/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = (await response.json()) as { message?: string };
    setState({
      loading: false,
      message: result.message ?? (response.ok ? "Отправлено." : "Ошибка."),
      error: !response.ok,
    });
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="surface space-y-3 p-6">
      <h3 className="text-xl">Запросить помощь на старте</h3>
      <p className="text-sm text-muted">Оставь ник и Discord. Ментор напишет в течение суток.</p>
      <input
        required
        minLength={3}
        maxLength={24}
        name="nickname"
        placeholder="Ник в Minecraft"
        className="w-full rounded-lg border border-[#2f4465] bg-[#081224] px-3 py-2 text-sm outline-none focus:border-[var(--ring)]"
      />
      <input
        required
        minLength={2}
        maxLength={64}
        name="discord"
        placeholder="Discord (пример: user#0001)"
        className="w-full rounded-lg border border-[#2f4465] bg-[#081224] px-3 py-2 text-sm outline-none focus:border-[var(--ring)]"
      />
      <textarea
        name="notes"
        maxLength={400}
        placeholder="Вопросы по сборке / классу / старту"
        className="min-h-24 w-full rounded-lg border border-[#2f4465] bg-[#081224] px-3 py-2 text-sm outline-none focus:border-[var(--ring)]"
      />
      <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <button
        type="submit"
        disabled={state.loading}
        className="rounded-xl border border-[#80dcff] bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-[#041220] disabled:opacity-70"
      >
        {state.loading ? "Отправка..." : "Отправить"}
      </button>
      {state.message ? (
        <p className={`text-sm ${state.error ? "text-[var(--danger)]" : "text-[#8af5b2]"}`}>{state.message}</p>
      ) : null}
    </form>
  );
}
