"use client";
import { useState, useEffect } from "react";

const secoes = [
  { nome: "Início", href: "#hero", id: "hero" },
  { nome: "Sobre Mim", href: "#sobremim", id: "sobremim" },
  { nome: "Projetos", href: "#projetos", id: "projetos" },
  { nome: "Experiência", href: "#experiencia", id: "experiencia" },
  { nome: "Contato", href: "#contato", id: "contato" },
];

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const [ativa, setAtiva] = useState("hero");
  const [tema, setTema] = useState("light");

  function changeTheme(mode) {
    setTema(mode);
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTema(saved);
      if (saved === "dark") {
        document.documentElement.classList.add("dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTema("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const fromTop = window.scrollY + 100;
      let current = "hero";
      secoes.forEach(sec => {
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= fromTop) { current = sec.id; }
      });
      setAtiva(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="flex justify-between items-center py-7 px-10 w-full">
      <img src="./logo.svg" className="dark:invert w-14" />

      <ul className="hidden lg:flex gap-7">
        {secoes.map(s => (
          <li key={s.nome}>
            <a
              href={s.href}
              className={`transition-colors duration-200 ${
                ativa === s.id ? "text-[var(--rosa-primary)]" : ""
              } hover:text-[var(--rosa-primary)]`}
            >
              {s.nome}
            </a>
          </li>
        ))}
      </ul>

      <div className="hidden lg:flex items-center ml-7">
        <img
          src="./lua.svg"
          className="block dark:hidden w-6 cursor-pointer"
          onClick={() => changeTheme("dark")}
          alt="Escurecer"
        />
        <img
          src="./sol.svg"
          className="hidden dark:block w-6 cursor-pointer"
          onClick={() => changeTheme("light")}
          alt="Clarear"
        />
      </div>

      <button className="lg:hidden flex flex-col justify-center items-center" onClick={() => setAberto(!aberto)}>
        <span className="w-8 h-1 bg-black block my-1 dark:bg-white rounded"></span>
        <span className="w-8 h-1 bg-black block my-1 dark:bg-white rounded"></span>
        <span className="w-8 h-1 bg-black block my-1 dark:bg-white rounded"></span>
      </button>

      {aberto && (
        <ul className="absolute top-20 right-7 bg-white dark:bg-black shadow-lg rounded p-5 flex flex-col gap-7 lg:hidden min-w-[180px]">
          {secoes.map(s => (
            <li key={s.nome}>
              <a
                href={s.href}
                className={`transition-colors duration-200 ${
                  ativa === s.id ? "text-[var(--rosa-primary)]" : ""
                } hover:text-[var(--rosa-primary)]`}
                onClick={() => setAberto(false)}
              >
                {s.nome}
              </a>
            </li>
          ))}

          <div className="flex items-center justify-center pt-2 gap-3 border-t border-gray-200 dark:border-gray-700 mt-4">
            <img
              src="./lua.svg"
              className="block dark:hidden w-6 cursor-pointer"
              onClick={() => changeTheme("dark")}
              alt="Escurecer"
            />
            <img
              src="./sol.svg"
              className="hidden dark:block w-6 cursor-pointer"
              onClick={() => changeTheme("light")}
              alt="Clarear"
            />
          </div>
        </ul>
      )}
    </header>
  );
}