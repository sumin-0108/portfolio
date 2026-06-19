"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import {
  ArrowLeft,
  Check,
  Copy,
  RotateCcw,
  Save,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  BRAND_PRESETS,
  DEFAULT_PRESET_ID,
  generateBrandCss,
  getDefaultConfig,
  getPresetById,
  loadStoredBrandKit,
  saveStoredBrandKit,
  type BrandConfig,
} from "@/lib/brand-kit";

type ColorField = {
  key: keyof Pick<
    BrandConfig,
    "primary" | "accent" | "background" | "card" | "text"
  >;
  label: string;
};

const COLOR_FIELDS: ColorField[] = [
  { key: "primary", label: "메인 컬러" },
  { key: "accent", label: "포인트 컬러" },
  { key: "background", label: "배경" },
  { key: "card", label: "카드" },
  { key: "text", label: "텍스트" },
];

function ColorControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-sm text-foreground/65">{label}</span>
      <span className="relative size-9 shrink-0 overflow-hidden rounded-lg border border-border">
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="absolute inset-0 size-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer border-0 bg-transparent p-0"
          aria-label={label}
        />
      </span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 font-mono text-xs uppercase tracking-wide text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        spellCheck={false}
      />
    </label>
  );
}

export default function BrandKitPage() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <div className="min-h-svh bg-background px-6 py-10">
        <div className="mx-auto max-w-6xl animate-pulse space-y-6">
          <div className="h-8 w-48 rounded-lg bg-muted" />
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <div className="h-[640px] rounded-2xl bg-muted" />
            <div className="h-[640px] rounded-2xl bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  return <BrandKitEditor />;
}

function BrandKitEditor() {
  const [config, setConfig] = useState<BrandConfig>(() => {
    return loadStoredBrandKit()?.config ?? getDefaultConfig();
  });
  const [presetId, setPresetId] = useState<string | null>(() => {
    return loadStoredBrandKit()?.presetId ?? DEFAULT_PRESET_ID;
  });
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const cssOutput = useMemo(() => generateBrandCss(config), [config]);
  const selectedPresetName =
    presetId ? getPresetById(presetId)?.name ?? "Custom" : "Custom";

  function updateConfig(partial: Partial<BrandConfig>) {
    setConfig((current) => ({ ...current, ...partial }));
    setPresetId(null);
  }

  function applyPreset(id: string) {
    const preset = getPresetById(id);
    if (!preset) {
      return;
    }

    setConfig(preset.config);
    setPresetId(id);
  }

  function handleSave() {
    saveStoredBrandKit({ config, presetId });
    setSavedMessage("저장됐어요");
    window.setTimeout(() => setSavedMessage(null), 1500);
  }

  function handleReset() {
    applyPreset(DEFAULT_PRESET_ID);
    saveStoredBrandKit({
      config: getDefaultConfig(),
      presetId: DEFAULT_PRESET_ID,
    });
    setSavedMessage("초기화됐어요");
    window.setTimeout(() => setSavedMessage(null), 1500);
  }

  async function handleCopyCss() {
    await navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              홈으로
            </Link>

            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/55">
                <Sparkles className="size-3.5" />
                Brand Kit Lab
              </span>
              <h1 className="max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
                포트폴리오의 무드를 직접 조합해보세요
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-foreground/65 sm:text-base">
                색상과 라운드 값을 바꾸면 오른쪽 미리보기가 즉시 업데이트됩니다.
                마음에 드는 조합은 저장하거나 CSS 변수로 복사해 실제 디자인에
                연결할 수 있어요.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { label: "프리셋", value: "4" },
              { label: "컬러", value: "5" },
              { label: "저장", value: "local" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border bg-card px-4 py-3 text-center"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/45">
                  {item.label}
                </p>
                <p className="mt-1 text-lg font-black tracking-tight">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div className="space-y-7">
              <section className="space-y-3">
                <h2 className="text-sm font-bold tracking-tight">
                  무드 프리셋
                </h2>
                <div className="space-y-2">
                  {BRAND_PRESETS.map((preset) => {
                    const isSelected = presetId === preset.id;

                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => applyPreset(preset.id)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors",
                          isSelected
                            ? "border-foreground/20 bg-muted/70"
                            : "border-border bg-background hover:bg-muted/40",
                        )}
                      >
                        <span className="flex size-7 shrink-0 overflow-hidden rounded-full border border-border">
                          <span
                            className="w-1/2"
                            style={{ backgroundColor: preset.config.primary }}
                          />
                          <span
                            className="w-1/2"
                            style={{ backgroundColor: preset.config.accent }}
                          />
                        </span>
                        <span className="flex-1 text-sm font-medium">
                          {preset.name}
                        </span>
                        {isSelected ? (
                          <Check className="size-4 text-foreground/70" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-sm font-bold tracking-tight">컬러 조정</h2>
                <div className="space-y-3">
                  {COLOR_FIELDS.map((field) => (
                    <ColorControl
                      key={field.key}
                      label={field.label}
                      value={config[field.key]}
                      onChange={(value) => updateConfig({ [field.key]: value })}
                    />
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-bold tracking-tight">
                    카드 라운드
                  </h2>
                  <span className="font-mono text-xs text-foreground/55">
                    {config.radius}px
                  </span>
                </div>
                <Slider
                  value={[config.radius]}
                  min={0}
                  max={40}
                  step={1}
                  onValueChange={(value) =>
                    updateConfig({ radius: value[0] ?? config.radius })
                  }
                />
              </section>

              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Button type="button" onClick={handleSave} className="h-10">
                    <Save />
                    저장
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    className="h-10"
                  >
                    <RotateCcw />
                    초기화
                  </Button>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCopyCss}
                  className="h-10 w-full"
                >
                  {copied ? <Check /> : <Copy />}
                  CSS 복사
                </Button>
                {savedMessage ? (
                  <p className="text-center text-xs font-medium text-foreground/55">
                    {savedMessage}
                  </p>
                ) : null}
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <section className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="border-b border-border px-5 py-4 sm:px-6">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground/65">
                  <span className="inline-flex size-7 items-center justify-center rounded-lg bg-muted text-xs font-bold">
                    P
                  </span>
                  Preview: 실제 포트폴리오 화면 예시
                </div>
              </div>

              <div
                className="p-5 sm:p-6"
                style={{ backgroundColor: config.background }}
              >
                <div
                  className="rounded-[var(--preview-radius)] border p-5 sm:p-6"
                  style={{
                    backgroundColor: config.card,
                    borderColor: `${config.primary}20`,
                    borderRadius: `${config.radius}px`,
                    color: config.text,
                    ["--preview-radius" as string]: `${config.radius}px`,
                  }}
                >
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
                    <div className="space-y-5">
                      <span
                        className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]"
                        style={{
                          backgroundColor: `${config.accent}20`,
                          color: config.primary,
                        }}
                      >
                        Selected mood: {selectedPresetName}
                      </span>

                      <div className="space-y-3">
                        <h2
                          className="text-2xl font-black leading-tight tracking-tight sm:text-3xl"
                          style={{ color: config.primary }}
                        >
                          감각과 문제 해결을 함께 보여주는 포트폴리오
                        </h2>
                        <p
                          className="max-w-xl text-sm leading-relaxed sm:text-base"
                          style={{ color: `${config.text}aa` }}
                        >
                          디자인 작업의 방향과 완성도를 한눈에 보여주는 샘플
                          화면입니다. 버튼, 카드, 배경 톤이 선택한 무드에 맞게
                          바뀝니다.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          className="inline-flex h-10 items-center rounded-full px-5 text-xs font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: config.accent,
                            color: config.card,
                          }}
                        >
                          프로젝트 보기
                        </button>
                        <button
                          type="button"
                          className="inline-flex h-10 items-center rounded-full border px-5 text-xs font-bold uppercase tracking-wider"
                          style={{
                            borderColor: `${config.primary}30`,
                            color: config.primary,
                            backgroundColor: config.card,
                          }}
                        >
                          문의하기
                        </button>
                      </div>
                    </div>

                    <article
                      className="overflow-hidden border"
                      style={{
                        backgroundColor: config.card,
                        borderColor: `${config.primary}15`,
                        borderRadius: `${config.radius}px`,
                      }}
                    >
                      <div
                        className="aspect-[4/3]"
                        style={{
                          background: `linear-gradient(135deg, ${config.accent}55, ${config.primary}22)`,
                        }}
                      />
                      <div className="space-y-2 p-4">
                        <h3
                          className="text-sm font-bold tracking-tight"
                          style={{ color: config.primary }}
                        >
                          Work Sample
                        </h3>
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: `${config.text}99` }}
                        >
                          선택한 카드 라운드와 포인트 컬러가 적용된 작업 카드
                          예시입니다.
                        </p>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
                <h2 className="text-sm font-bold tracking-tight">
                  복사될 CSS 변수
                </h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopyCss}
                >
                  {copied ? <Check /> : <Copy />}
                  복사
                </Button>
              </div>
              <pre className="overflow-x-auto bg-[#111827] p-5 text-xs leading-6 text-[#f8fafc] sm:p-6 sm:text-sm">
                <code>{cssOutput}</code>
              </pre>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
