export default function Rodape() {
    return (
        <div className="flex justify-between items-center w-full lg:text-[15px] py-3 px-10 bg-[var(--rosa-primary)]">
            <ul className="flex gap-7">
                <li>
                    Início
                </li>
                <li>
                    Sobre Mim
                </li>
                <li>
                    Projetos
                </li>
                <li>
                    Experiência
                </li>
                <li>
                    Contato
                </li>
            </ul>
            <div className="flex gap-10">
                <img src="./github.svg" className="w-6" />
                <img src="./instagram.svg" className="w-6" />
            </div>
        </div>
    )
}