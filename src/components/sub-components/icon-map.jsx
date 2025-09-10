import { Lightbulb, Settings, CheckCircle, Camera, MessageCircle, Monitor, Wifi, Radio, CircleQuestionMark } from 'lucide-react';


export function IconMap({ iconName, ...props }) {
    const iconMap = {
        lightbulb: Lightbulb,
        camera: Camera,
        monitor: Monitor,
        radio: Radio,
        wifi: Wifi,
        settings: Settings,
        messageCircle: MessageCircle,
        checkCircle: CheckCircle,
    }

    const Icon = iconMap[iconName] || CircleQuestionMark
    return (
        <Icon {...props}/>
    )
}