export function Contact({ icon: Icon, text }) {
    return (
        <div className="flex items-center space-x-2">
            <Icon className="h-4 w-4" />
            <span>{text}</span>
        </div>
    )
}