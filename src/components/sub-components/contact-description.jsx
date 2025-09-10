export function ContactDescription({ icon: Icon, title, description }) {
    return (
        <div className="flex items-center space-x-3">
            <Icon className="h-5 w-5 text-accent" style={{ color: '#f4b942' }} />
            <div>
                <p className="font-medium text-primary">{ title }</p>
                <p className="text-sm text-muted-foreground">{ description }</p>
            </div>
        </div>
    )
}