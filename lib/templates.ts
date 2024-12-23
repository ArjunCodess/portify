export const templates = [
  {
    value: "minimal",
    label: "Minimal",
    image: "/templates/minimal.png",
  },
  {
    value: "pristine",
    label: "Pristine",
    image: "/templates/pristine.png",
  },
  {
    value: "vibrant",
    label: "Vibrant",
    image: "/templates/vibrant.png",
  },
  {
    value: "elegant",
    label: "Elegant",
    image: "/templates/elegant.png",
  },
] as const;

export type TemplateType = typeof templates[number]["value"];