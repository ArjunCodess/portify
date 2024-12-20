export const templates = [
  {
    value: "minimal",
    label: "Minimal",
    description: "Clean and simple design focusing on content",
  },
  {
    value: "pristine",
    label: "Pristine",
    description: "Modern and professional with clear project cards",
  },
  {
    value: "vibrant",
    label: "Vibrant",
    description: "Dynamic layout with colorful accents",
  },
  {
    value: "elegant",
    label: "Elegant",
    description: "Sophisticated design with typography focus",
  },
] as const;

export type TemplateType = typeof templates[number]["value"];