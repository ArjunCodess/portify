import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  icon: React.ReactNode
  text: string
}

export function FeatureCard({ icon, text }: FeatureCardProps) {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-6 gap-4 flex items-center">
        <div className="p-6 rounded-full bg-neutral-100 dark:bg-neutral-800">{icon}</div>
        <p className="text-sm text-muted-foreground">{text}</p>
      </CardContent>
    </Card>
  )
}
