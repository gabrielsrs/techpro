export function NavLink({ navSelect, selected, content, scrollTo}) {
    return (
        <span className={`${navSelect == selected && "border-b-[1px] border-b-[#1E3A5F]"} hover:text-primary transition-colors text-center cursor-pointer`} onClick={() => scrollTo(selected)}>{content}</span>
    )
}