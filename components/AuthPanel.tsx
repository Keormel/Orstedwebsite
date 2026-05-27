"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AtSign,
  Bot,
  CheckCircle2,
  ExternalLink,
  KeyRound,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
  User,
  UserPlus
} from "lucide-react";
import { type ChangeEvent, type FormEvent, type ReactNode, useMemo, useState } from "react";
import PixelButton from "./PixelButton";

type AuthMode = "login" | "register";
type AuthMethod = "discord" | "email";

type FieldProps = {
  autoComplete?: string;
  icon: ReactNode;
  label: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  value: string;
};

const discordBotUrl = process.env.NEXT_PUBLIC_DISCORD_BOT_URL || "https://discord.com/app";

const modeCopy = {
  login: {
    title: "Вход в аккаунт",
    subtitle: "Вернись в личный кабинет и продолжи путь персонажа.",
    action: "Войти",
    icon: LogIn
  },
  register: {
    title: "Регистрация",
    subtitle: "Создай профиль игрока для Discord и сервера.",
    action: "Создать аккаунт",
    icon: UserPlus
  }
};

function Field({
  autoComplete,
  icon,
  label,
  name,
  onChange,
  placeholder,
  type = "text",
  value
}: FieldProps) {
  return (
    <label className="grid gap-2">
      <span className="font-rune text-2xl text-white/60">{label}</span>
      <span className="flex min-h-14 items-center gap-3 rounded-[14px] border border-white/12 bg-black/20 px-4 shadow-insetPixel transition-colors focus-within:border-gold/70">
        <span className="text-gold">{icon}</span>
        <input
          autoComplete={autoComplete}
          className="min-w-0 flex-1 bg-transparent font-rune text-3xl leading-none text-white outline-none placeholder:text-white/25"
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
        />
      </span>
    </label>
  );
}

export default function AuthPanel() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [method, setMethod] = useState<AuthMethod>("discord");
  const [discordCode, setDiscordCode] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");

  const ActiveIcon = modeCopy[mode].icon;
  const isRegister = mode === "register";

  const statusText = useMemo(() => {
    if (status) {
      return status;
    }

    if (method === "discord") {
      return isRegister
        ? "Открой Discord, получи код у бота и вставь его сюда."
        : "Вставь код подтверждения от Discord-бота для входа.";
    }

    return isRegister
      ? "Заполни почту, ник и пароль для создания аккаунта."
      : "Войди по почте и паролю, если аккаунт уже привязан.";
  }, [isRegister, method, status]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (method === "discord") {
      if (discordCode.trim().length < 6) {
        setStatus("Код Discord должен быть не короче 6 символов.");
        return;
      }

      setStatus(
        isRegister
          ? "Заявка на регистрацию готова. Осталось подключить API бота."
          : "Код принят. Осталось подключить серверную проверку бота."
      );
      return;
    }

    if (!email.includes("@")) {
      setStatus("Укажи корректную почту.");
      return;
    }

    if (password.length < 8) {
      setStatus("Пароль должен быть не короче 8 символов.");
      return;
    }

    if (isRegister && nickname.trim().length < 3) {
      setStatus("Ник должен быть не короче 3 символов.");
      return;
    }

    if (isRegister && password !== confirmPassword) {
      setStatus("Пароли не совпадают.");
      return;
    }

    setStatus(
      isRegister
        ? "Форма регистрации готова. Осталось подключить базу аккаунтов."
        : "Форма входа готова. Осталось подключить обработчик авторизации."
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="rounded-[24px] border border-white/10 bg-panel p-5 shadow-insetPixel sm:p-6"
    >
      <div className="mb-6 grid grid-cols-2 gap-2 rounded-[16px] border border-white/10 bg-black/20 p-1">
        {(["login", "register"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setMode(item);
              setStatus("");
            }}
            className={`min-h-12 rounded-[12px] px-3 font-pixel text-[10px] leading-5 transition-colors sm:text-xs ${
              mode === item ? "bg-gold text-obsidian" : "text-white/55 hover:bg-white/8 hover:text-white"
            }`}
          >
            {item === "login" ? "Вход" : "Регистрация"}
          </button>
        ))}
      </div>

      <div className="mb-7 flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] border border-gold/45 bg-gold/10 text-gold">
          <ActiveIcon className="h-6 w-6" />
        </span>
        <div>
          <h1 className="font-pixel text-lg leading-8 text-white sm:text-xl">{modeCopy[mode].title}</h1>
          <p className="mt-2 font-rune text-2xl leading-7 text-white/55">{modeCopy[mode].subtitle}</p>
        </div>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => {
            setMethod("discord");
            setStatus("");
          }}
          className={`flex min-h-16 items-center gap-3 rounded-[16px] border px-4 text-left transition-colors ${
            method === "discord"
              ? "border-gold/70 bg-gold/10 text-white"
              : "border-white/10 bg-black/15 text-white/55 hover:border-white/30 hover:text-white"
          }`}
        >
          <Bot className="h-6 w-6 shrink-0 text-gold" />
          <span>
            <span className="block font-pixel text-[10px] leading-5">Discord бот</span>
            <span className="font-rune text-xl leading-5">код входа</span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            setMethod("email");
            setStatus("");
          }}
          className={`flex min-h-16 items-center gap-3 rounded-[16px] border px-4 text-left transition-colors ${
            method === "email"
              ? "border-gold/70 bg-gold/10 text-white"
              : "border-white/10 bg-black/15 text-white/55 hover:border-white/30 hover:text-white"
          }`}
        >
          <Mail className="h-6 w-6 shrink-0 text-gold" />
          <span>
            <span className="block font-pixel text-[10px] leading-5">Почта</span>
            <span className="font-rune text-xl leading-5">email пароль</span>
          </span>
        </button>
      </div>

      <form className="grid gap-5" onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {method === "discord" ? (
            <motion.div
              key="discord"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="grid gap-5"
            >
              <Field
                autoComplete="one-time-code"
                icon={<KeyRound className="h-5 w-5" />}
                label="Код от Discord-бота"
                name="discord-code"
                onChange={(event) => setDiscordCode(event.target.value)}
                placeholder="ORSTED-123456"
                value={discordCode}
              />
              <a
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[14px] border border-white/15 px-4 font-pixel text-[10px] leading-5 text-white/70 transition-colors hover:border-gold/70 hover:text-white"
                href={discordBotUrl}
                rel="noreferrer"
                target="_blank"
              >
                Открыть Discord
                <ExternalLink className="h-4 w-4 text-gold" />
              </a>
            </motion.div>
          ) : (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="grid gap-5"
            >
              {isRegister ? (
                <Field
                  autoComplete="nickname"
                  icon={<User className="h-5 w-5" />}
                  label="Игровой ник"
                  name="nickname"
                  onChange={(event) => setNickname(event.target.value)}
                  placeholder="Rudeus_Grayrat"
                  value={nickname}
                />
              ) : null}
              <Field
                autoComplete="email"
                icon={<AtSign className="h-5 w-5" />}
                label="Почта"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="player@example.com"
                type="email"
                value={email}
              />
              <Field
                autoComplete={isRegister ? "new-password" : "current-password"}
                icon={<Lock className="h-5 w-5" />}
                label="Пароль"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="минимум 8 символов"
                type="password"
                value={password}
              />
              {isRegister ? (
                <Field
                  autoComplete="new-password"
                  icon={<ShieldCheck className="h-5 w-5" />}
                  label="Повтор пароля"
                  name="confirm-password"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="повтори пароль"
                  type="password"
                  value={confirmPassword}
                />
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="flex items-start gap-3 rounded-[14px] border border-white/10 bg-black/15 px-4 py-3 font-rune text-2xl leading-7 text-white/55">
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-gold" />
          {statusText}
        </p>

        <PixelButton type="submit" className="w-full justify-center">
          {modeCopy[mode].action}
        </PixelButton>
      </form>
    </motion.div>
  );
}
