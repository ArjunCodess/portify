export const fonts = [
  {
    label: "EB Garamond",
    value: "eb-garamond",
    family: '"EB Garamond", serif',
    type: "heading"
  },
  {
    label: "Geist",
    value: "geist",
    family: '"Geist", sans-serif',
    type: "both"
  },
  {
    label: "Inter",
    value: "inter",
    family: '"Inter", sans-serif',
    type: "both"
  },
  {
    label: "Newsreader",
    value: "newsreader",
    family: '"Newsreader", serif',
    type: "content"
  },
  {
    label: "IBM Plex Sans",
    value: "ibm-plex-sans",
    family: '"IBM Plex Sans", sans-serif',
    type: "content"
  },
  {
    label: "Alegreya",
    value: "alegreya",
    family: '"Alegreya", serif',
    type: "heading"
  },
  {
    label: "Montserrat",
    value: "montserrat",
    family: '"Montserrat", sans-serif',
    type: "heading"
  },
  {
    label: "Fraunces",
    value: "fraunces",
    family: '"Fraunces", serif',
    type: "heading"
  },
  {
    label: "Work Sans",
    value: "work-sans",
    family: '"Work Sans", sans-serif',
    type: "content"
  },
  {
    label: "Nunito",
    value: "nunito",
    family: '"Nunito", sans-serif',
    type: "content"
  },
  {
    label: "Merriweather",
    value: "merriweather",
    family: '"Merriweather", serif',
    type: "content"
  },
  {
    label: "Lora",
    value: "lora",
    family: '"Lora", serif',
    type: "content"
  }
] as const;

export const headingFonts = fonts.filter(font => font.type === "heading" || font.type === "both");
export const contentFonts = fonts.filter(font => font.type === "content" || font.type === "both");

export type HeadingFont = typeof headingFonts[number]["value"];
export type ContentFont = typeof contentFonts[number]["value"];