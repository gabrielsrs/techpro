import { toast } from "sonner"

export function SocialLink({ icon: Icon }) {
    function socialFallback() {
        toast('Em breve, a rede social da TechPro Soluções estará disponível.');
    }
    
    return (
        <Icon className="cursor-pointer transition delay-10 duration-200 ease-in-out hover:text-[#f4b942]" onClick={socialFallback}/>
    )
}