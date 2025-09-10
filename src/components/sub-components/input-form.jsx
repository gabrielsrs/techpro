import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

export function InputForm({ name, type="text", content, formData, setFormData, ...props }) {
    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="text-primary">{content}</Label>
            <Input
                id={name}
                name={name}
                type={type}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="border-primary/20 focus:border-accent"
                {...props}
            />
        </div>
    )
}