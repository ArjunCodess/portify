import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { templates } from "@/lib/templates";

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
    <div className="grid gap-2">
      <Select
        value={currentTemplate}
        onValueChange={handleTemplateChange}
        disabled={isLoading}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select template" />
        </SelectTrigger>
        <SelectContent>
          {templates.map((template) => (
            <SelectItem key={template.value} value={template.value}>
              {template.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
