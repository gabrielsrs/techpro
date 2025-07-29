export function Navbar() {
    return (
        <nav className="w-screen flex items-center justify-between bg-blue-950 p-4">
            <div className="flex items-center gap-6">
                <img className="size-12 bg-amber-300" src="" alt="" />
                <span className="text-lg">Systel</span>
            </div>
            <div className="flex gap-20">
                <ul className="flex items-center gap-6">
                    <li>Soluções Elétricas</li>
                    <li>Como Funciona</li>
                    <li>Orçamento</li>
                    <li>Projetos</li>
                </ul>

                <button className="bg-amber-300 rounded-xl p-4 cursor-pointer">
                    <span>Solicite um Orçamento</span>
                </button>
            </div>
        </nav>
    )
}