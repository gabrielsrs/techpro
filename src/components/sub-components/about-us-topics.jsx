export function AboutUsTopics({ icon: Icon, title, description }){
    return (
        <div className="flex items-start space-x-4">
            <Icon className="h-6 w-6 text-accent mt-1 flex-shrink-0" style={{ color: '#f4b942' }} />
            <div>
            <h3 className="mb-2 text-primary">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
            </div>
        </div>
    )
}