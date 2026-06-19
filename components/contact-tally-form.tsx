"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

const TALLY_FORM_ID = "VLqzPJ";
const TALLY_EMBED_SRC = `https://tally.so/embed/${TALLY_FORM_ID}?hideTitle=1&transparentBackground=1&dynamicHeight=1`;
const TALLY_SCRIPT_SRC = "https://tally.so/widgets/embed.js";

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

function loadTallyEmbeds() {
  if (typeof window.Tally !== "undefined") {
    window.Tally.loadEmbeds();
    return;
  }

  document
    .querySelectorAll<HTMLIFrameElement>("iframe[data-tally-src]:not([src])")
    .forEach((iframe) => {
      if (iframe.dataset.tallySrc) {
        iframe.src = iframe.dataset.tallySrc;
      }
    });
}

export function ContactTallyForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "200px" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isInView || submitted) {
      return;
    }

    loadTallyEmbeds();
  }, [isInView, submitted]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data !== "string" || !event.data.includes("Tally.FormSubmitted")) {
        return;
      }

      try {
        const data = JSON.parse(event.data) as {
          event?: string;
          payload?: { formId?: string };
        };

        if (
          data.event === "Tally.FormSubmitted" &&
          data.payload?.formId === TALLY_FORM_ID
        ) {
          setSubmitted(true);
        }
      } catch {
        // Ignore unrelated postMessage payloads.
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <>
      <Script
        id="tally-embed"
        src={TALLY_SCRIPT_SRC}
        strategy="lazyOnload"
        onLoad={loadTallyEmbeds}
      />

      <div
        ref={containerRef}
        aria-label="문의 폼 영역"
        className={cn(
          "mx-auto mt-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-muted/30 sm:mt-12",
          submitted ? "px-6 py-16 sm:px-10 sm:py-20" : "px-4 py-6 sm:px-8 sm:py-8",
        )}
      >
        {submitted ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <CheckCircle2
              className="size-10 text-brand-purple sm:size-12"
              strokeWidth={1.75}
              aria-hidden
            />
            <p className="max-w-md text-base font-medium leading-relaxed text-foreground sm:text-lg">
              문의가 접수됐어요. 확인 후 답장드릴게요.
            </p>
          </div>
        ) : (
          <iframe
            data-tally-src={TALLY_EMBED_SRC}
            loading="lazy"
            width="100%"
            height="320"
            className="min-h-[280px] w-full border-0 sm:min-h-[360px]"
            title="함께 만들어가요"
          />
        )}
      </div>
    </>
  );
}
