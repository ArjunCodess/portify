export type Theme = {
  name: string;
  label: string;
  activeColor: string;
  cssVars: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
};

export const themes: Theme[] = [
  {
    name: "neutral",
    label: "Neutral",
    activeColor: "737373",
    cssVars: {
      light: {
        "--background": "0 0% 96%",
        "--foreground": "0 0% 5%",
        "--card": "0 0% 100%",
        "--card-foreground": "0 0% 5%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "0 0% 5%",
        "--primary": "0 0% 45%",
        "--primary-foreground": "0 0% 98%",
        "--secondary": "0 0% 92%",
        "--secondary-foreground": "0 0% 5%",
        "--muted": "0 0% 92%",
        "--muted-foreground": "0 0% 45%",
        "--accent": "0 0% 92%",
        "--accent-foreground": "0 0% 5%",
        "--border": "0 0% 90%",
        "--input": "0 0% 90%",
        "--ring": "0 0% 45%",
      },
      dark: {
        "--background": "0 0% 5%",
        "--foreground": "0 0% 98%",
        "--card": "0 0% 7%",
        "--card-foreground": "0 0% 98%",
        "--popover": "0 0% 7%",
        "--popover-foreground": "0 0% 98%",
        "--primary": "0 0% 45%",
        "--primary-foreground": "0 0% 98%",
        "--secondary": "0 0% 15%",
        "--secondary-foreground": "0 0% 98%",
        "--muted": "0 0% 15%",
        "--muted-foreground": "0 0% 65%",
        "--accent": "0 0% 15%",
        "--accent-foreground": "0 0% 98%",
        "--border": "0 0% 15%",
        "--input": "0 0% 15%",
        "--ring": "0 0% 45%",
      },
    },
  },
  {
    name: "ocean",
    label: "Ocean",
    activeColor: "0ea5e9",
    cssVars: {
      light: {
        "--background": "200 30% 96%",
        "--foreground": "200 95% 5%",
        "--card": "0 0% 100%",
        "--card-foreground": "200 95% 5%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "200 95% 5%",
        "--primary": "200 80% 45%",
        "--primary-foreground": "200 5% 98%",
        "--secondary": "200 40% 92%",
        "--secondary-foreground": "200 95% 5%",
        "--muted": "200 40% 92%",
        "--muted-foreground": "200 30% 45%",
        "--accent": "200 40% 92%",
        "--accent-foreground": "200 95% 5%",
        "--border": "200 30% 90%",
        "--input": "200 30% 90%",
        "--ring": "200 80% 45%",
      },
      dark: {
        "--background": "200 50% 5%",
        "--foreground": "200 5% 98%",
        "--card": "200 50% 7%",
        "--card-foreground": "200 5% 98%",
        "--popover": "200 50% 7%",
        "--popover-foreground": "200 5% 98%",
        "--primary": "200 80% 45%",
        "--primary-foreground": "200 5% 98%",
        "--secondary": "200 30% 15%",
        "--secondary-foreground": "200 5% 98%",
        "--muted": "200 30% 15%",
        "--muted-foreground": "200 20% 65%",
        "--accent": "200 30% 15%",
        "--accent-foreground": "200 5% 98%",
        "--border": "200 30% 15%",
        "--input": "200 30% 15%",
        "--ring": "200 80% 45%",
      },
    },
  },
  {
    name: "forest",
    label: "Forest",
    activeColor: "22c55e",
    cssVars: {
      light: {
        "--background": "150 30% 96%",
        "--foreground": "150 95% 5%",
        "--card": "0 0% 100%",
        "--card-foreground": "150 95% 5%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "150 95% 5%",
        "--primary": "150 80% 45%",
        "--primary-foreground": "150 5% 98%",
        "--secondary": "150 40% 92%",
        "--secondary-foreground": "150 95% 5%",
        "--muted": "150 40% 92%",
        "--muted-foreground": "150 30% 45%",
        "--accent": "150 40% 92%",
        "--accent-foreground": "150 95% 5%",
        "--border": "150 30% 90%",
        "--input": "150 30% 90%",
        "--ring": "150 80% 45%",
      },
      dark: {
        "--background": "150 50% 5%",
        "--foreground": "150 5% 98%",
        "--card": "150 50% 7%",
        "--card-foreground": "150 5% 98%",
        "--popover": "150 50% 7%",
        "--popover-foreground": "150 5% 98%",
        "--primary": "150 80% 45%",
        "--primary-foreground": "150 5% 98%",
        "--secondary": "150 30% 15%",
        "--secondary-foreground": "150 5% 98%",
        "--muted": "150 30% 15%",
        "--muted-foreground": "150 20% 65%",
        "--accent": "150 30% 15%",
        "--accent-foreground": "150 5% 98%",
        "--border": "150 30% 15%",
        "--input": "150 30% 15%",
        "--ring": "150 80% 45%",
      },
    },
  },
  {
    name: "sunset",
    label: "Sunset",
    activeColor: "f97316",
    cssVars: {
      light: {
        "--background": "30 30% 96%",
        "--foreground": "30 95% 5%",
        "--card": "0 0% 100%",
        "--card-foreground": "30 95% 5%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "30 95% 5%",
        "--primary": "30 80% 45%",
        "--primary-foreground": "30 5% 98%",
        "--secondary": "30 40% 92%",
        "--secondary-foreground": "30 95% 5%",
        "--muted": "30 40% 92%",
        "--muted-foreground": "30 30% 45%",
        "--accent": "30 40% 92%",
        "--accent-foreground": "30 95% 5%",
        "--border": "30 30% 90%",
        "--input": "30 30% 90%",
        "--ring": "30 80% 45%",
      },
      dark: {
        "--background": "30 50% 5%",
        "--foreground": "30 5% 98%",
        "--card": "30 50% 7%",
        "--card-foreground": "30 5% 98%",
        "--popover": "30 50% 7%",
        "--popover-foreground": "30 5% 98%",
        "--primary": "30 80% 45%",
        "--primary-foreground": "30 5% 98%",
        "--secondary": "30 30% 15%",
        "--secondary-foreground": "30 5% 98%",
        "--muted": "30 30% 15%",
        "--muted-foreground": "30 20% 65%",
        "--accent": "30 30% 15%",
        "--accent-foreground": "30 5% 98%",
        "--border": "30 30% 15%",
        "--input": "30 30% 15%",
        "--ring": "30 80% 45%",
      },
    },
  },
  {
    name: "rose",
    label: "Rose",
    activeColor: "f43f5e",
    cssVars: {
      light: {
        "--background": "350 30% 96%",
        "--foreground": "350 95% 5%",
        "--card": "0 0% 100%",
        "--card-foreground": "350 95% 5%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "350 95% 5%",
        "--primary": "350 80% 45%",
        "--primary-foreground": "350 5% 98%",
        "--secondary": "350 40% 92%",
        "--secondary-foreground": "350 95% 5%",
        "--muted": "350 40% 92%",
        "--muted-foreground": "350 30% 45%",
        "--accent": "350 40% 92%",
        "--accent-foreground": "350 95% 5%",
        "--border": "350 30% 90%",
        "--input": "350 30% 90%",
        "--ring": "350 80% 45%",
      },
      dark: {
        "--background": "350 50% 5%",
        "--foreground": "350 5% 98%",
        "--card": "350 50% 7%",
        "--card-foreground": "350 5% 98%",
        "--popover": "350 50% 7%",
        "--popover-foreground": "350 5% 98%",
        "--primary": "350 80% 45%",
        "--primary-foreground": "350 5% 98%",
        "--secondary": "350 30% 15%",
        "--secondary-foreground": "350 5% 98%",
        "--muted": "350 30% 15%",
        "--muted-foreground": "350 20% 65%",
        "--accent": "350 30% 15%",
        "--accent-foreground": "350 5% 98%",
        "--border": "350 30% 15%",
        "--input": "350 30% 15%",
        "--ring": "350 80% 45%",
      },
    },
  },
  {
    name: "slate",
    label: "Slate",
    activeColor: "64748b",
    cssVars: {
      light: {
        "--background": "215 30% 96%",
        "--foreground": "215 95% 5%",
        "--card": "0 0% 100%",
        "--card-foreground": "215 95% 5%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "215 95% 5%",
        "--primary": "215 80% 45%",
        "--primary-foreground": "215 5% 98%",
        "--secondary": "215 40% 92%",
        "--secondary-foreground": "215 95% 5%",
        "--muted": "215 40% 92%",
        "--muted-foreground": "215 30% 45%",
        "--accent": "215 40% 92%",
        "--accent-foreground": "215 95% 5%",
        "--border": "215 30% 90%",
        "--input": "215 30% 90%",
        "--ring": "215 80% 45%",
      },
      dark: {
        "--background": "215 50% 5%",
        "--foreground": "215 5% 98%",
        "--card": "215 50% 7%",
        "--card-foreground": "215 5% 98%",
        "--popover": "215 50% 7%",
        "--popover-foreground": "215 5% 98%",
        "--primary": "215 80% 45%",
        "--primary-foreground": "215 5% 98%",
        "--secondary": "215 30% 15%",
        "--secondary-foreground": "215 5% 98%",
        "--muted": "215 30% 15%",
        "--muted-foreground": "215 20% 65%",
        "--accent": "215 30% 15%",
        "--accent-foreground": "215 5% 98%",
        "--border": "215 30% 15%",
        "--input": "215 30% 15%",
        "--ring": "215 80% 45%",
      },
    },
  },
];