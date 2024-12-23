import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { templates } from "@/lib/templates";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface TemplateOptionsProps {
  onTemplateChange: (template: string) => void;
}

export default function TemplateOptions({ onTemplateChange }: TemplateOptionsProps) {
  const [currentTemplate, setCurrentTemplate] = useState<string>("minimal");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await fetch("/api/template");
        if (!response.ok) {
          throw new Error("Failed to fetch template");
        }
        const data = await response.json();
        setCurrentTemplate(data.template);
      } catch (error) {
        console.error("Error fetching template:", error);
        toast({
          title: "Error",
          description: "Failed to load template",
          variant: "destructive",
        });
      }
    };

    fetchTemplate();
  }, [toast]);

  const handleTemplateChange = async (newTemplate: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ template: newTemplate }),
      });

      if (!response.ok) {
        throw new Error("Failed to update template");
      }

      setCurrentTemplate(newTemplate);
      onTemplateChange(newTemplate);
      toast({
        title: "Success",
        description: "Template updated successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Error updating template:", error);
      toast({
        title: "Error",
        description: "Failed to update template",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-4">
      <RadioGroup
        value={currentTemplate}
        onValueChange={handleTemplateChange}
        className="grid grid-cols-1 lg:grid-cols-4 gap-4"
        disabled={isLoading}
      >
        {templates.map((template) => (
          <div key={template.value}>
            <RadioGroupItem
              value={template.value}
              id={template.value}
              className="peer sr-only"
            />
            <Label
              htmlFor={template.value}
              className="cursor-pointer flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <div className="relative w-full aspect-[16/9] mb-4 border border-border rounded-md overflow-hidden">
                <Image
                  src={template.image}
                  alt={template.label}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
              <div className="space-y-1 text-center">
                <div className="font-semibold text-lg">{template.label}</div>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
