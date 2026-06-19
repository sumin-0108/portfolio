export type BrandConfig = {
  primary: string;
  accent: string;
  background: string;
  card: string;
  text: string;
  radius: number;
};

export type BrandPreset = {
  id: string;
  name: string;
  config: BrandConfig;
};

export const STORAGE_KEY = "portfolio-brand-kit";

export const BRAND_PRESETS: BrandPreset[] = [
  {
    id: "studio-minimal",
    name: "Studio Minimal",
    config: {
      primary: "#111827",
      accent: "#f97316",
      background: "#fafaf7",
      card: "#ffffff",
      text: "#1b1b1b",
      radius: 12,
    },
  },
  {
    id: "soft-portfolio",
    name: "Soft Portfolio",
    config: {
      primary: "#6366f1",
      accent: "#f0abfc",
      background: "#fdf4ff",
      card: "#ffffff",
      text: "#1e1b4b",
      radius: 20,
    },
  },
  {
    id: "editorial-warm",
    name: "Editorial Warm",
    config: {
      primary: "#292524",
      accent: "#d97706",
      background: "#fef9ef",
      card: "#fffbf0",
      text: "#292524",
      radius: 8,
    },
  },
  {
    id: "bold-product",
    name: "Bold Product",
    config: {
      primary: "#0f172a",
      accent: "#e11d48",
      background: "#f8fafc",
      card: "#ffffff",
      text: "#0f172a",
      radius: 4,
    },
  },
];

export const DEFAULT_PRESET_ID = "studio-minimal";

export function getPresetById(id: string): BrandPreset | undefined {
  return BRAND_PRESETS.find((preset) => preset.id === id);
}

export function getDefaultConfig(): BrandConfig {
  return getPresetById(DEFAULT_PRESET_ID)!.config;
}

export function generateBrandCss(config: BrandConfig): string {
  return `:root {
  --brand-primary: ${config.primary};
  --brand-accent: ${config.accent};
  --brand-background: ${config.background};
  --brand-surface: ${config.card};
  --brand-text: ${config.text};
  --radius: ${config.radius}px;
}`;
}

export type StoredBrandKit = {
  config: BrandConfig;
  presetId: string | null;
};

export function loadStoredBrandKit(): StoredBrandKit | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as StoredBrandKit;
    if (!parsed.config || typeof parsed.config.radius !== "number") {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function saveStoredBrandKit(data: StoredBrandKit): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
