"use client";

import { contentFonts, headingFonts } from "@/lib/fonts";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface FontOptionsProps {
  onFontChange: (type: 'heading' | 'content', value: string) => void;
  currentFont: {
    heading: string;
    content: string;
  };
}

export default function FontOptions({ onFontChange, currentFont }: FontOptionsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-medium font-eb-garamond mb-2">Heading Font</h2>
        <p className="text-sm text-muted-foreground mb-4">Choose a font for your headings and titles</p>
        <RadioGroup
          value={currentFont.heading}
          onValueChange={(value) => onFontChange('heading', value)}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {headingFonts.map((font) => (
            <div key={`heading-${font.value}`} className="flex items-center space-x-2">
              <RadioGroupItem value={font.value} id={`heading-${font.value}`} />
              <Label
                htmlFor={`heading-${font.value}`}
                className={`text-xl font-${font.value}`}
              >
                {font.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h2 className="text-2xl font-medium font-eb-garamond mb-2">Content Font</h2>
        <p className="text-sm text-muted-foreground mb-4">Choose a font for your main content and paragraphs</p>
        <RadioGroup
          value={currentFont.content}
          onValueChange={(value) => onFontChange('content', value)}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {contentFonts.map((font) => (
            <div key={`content-${font.value}`} className="flex items-center space-x-2">
              <RadioGroupItem value={font.value} id={`content-${font.value}`} />
              <Label
                htmlFor={`content-${font.value}`}
                className={`text-xl font-${font.value}`}
              >
                {font.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}