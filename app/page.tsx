import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContactTallyForm } from "@/components/contact-tally-form";
import { HeroSpotlight } from "@/components/hero-spotlight";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { works } from "@/lib/works";

const stats = [
  { value: "Samsung", label: "삼성전자" },
  { value: "Mobile", label: "모바일 앱 UX" },
  { value: "GUI", label: "그래픽 UI 연구" },
];

export default function Home() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="mx-auto flex max-w-2xl items-center justify-center px-6 py-6">
        <nav className="flex items-center gap-8 text-sm font-medium text-foreground/70">
          <a href="#hero" className="transition-colors hover:text-foreground">
            Home
          </a>
          <a href="#about" className="transition-colors hover:text-foreground">
            About
          </a>
          <a href="#works" className="transition-colors hover:text-foreground">
            Works
          </a>
          <a href="#contact" className="transition-colors hover:text-foreground">
            Contact
          </a>
        </nav>
      </header>

      <section
        id="hero"
        className="relative flex min-h-[80svh] items-center justify-center overflow-hidden px-6 py-16"
      >
        <Image
          src="/hero-mesh.png"
          alt=""
          fill
          priority
          aria-hidden
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-background/50"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/50"
        />
        <HeroSpotlight />

        <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center gap-8 text-center">
          <BlurFade delay={0.1}>
            <div
              className="relative aspect-square w-56 sm:w-64"
              style={{
                maskImage:
                  "radial-gradient(ellipse 68% 72% at 50% 42%, black 30%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 68% 72% at 50% 42%, black 30%, transparent 70%)",
              }}
            >
              <Image
                src="/avatar-v4.png"
                alt="오수민 아바타"
                fill
                priority
                sizes="(max-width: 768px) 224px, 256px"
                className="object-contain object-center mix-blend-multiply brightness-110 contrast-105"
              />
            </div>
          </BlurFade>

          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col gap-4">
              <BlurFade delay={0.25}>
                <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                  오수민
                </h1>
              </BlurFade>
              <BlurFade delay={0.35}>
                <p className="max-w-lg text-base leading-relaxed text-foreground/65 sm:text-lg">
                  안녕하세요 오수민입니다. 모바일 앱을 중심으로 그래픽
                  유저인터페이스를 개발합니다. 모바일 환경에 적합한 유엑스를
                  연구하고 개발된 앱을 유지보수하여 완성도를 높여갑니다.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.5}>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="mailto:sum.oh@samsung.com"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-3 text-xs font-bold uppercase tracking-wider text-foreground transition-opacity hover:opacity-90"
                >
                  연락하기
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground/70 transition-colors hover:text-foreground"
                >
                  About 보기
                  <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
                </a>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-2xl px-6 pb-24">
        <section
          aria-label="경력 요약"
          className="flex flex-col items-center gap-10 border-y border-border py-16 sm:flex-row sm:justify-center sm:gap-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
              <span className="text-2xl font-black tracking-tight sm:text-3xl">
                {stat.value}
              </span>
              <span className="text-sm text-foreground/55">{stat.label}</span>
            </div>
          ))}
        </section>

        <section
          id="about"
          className="flex flex-col items-center py-20 text-center lg:py-28"
        >
          <BlurFade inView delay={0.1}>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              About
            </h2>
          </BlurFade>

          <div className="mt-12 flex w-full max-w-lg flex-col gap-4">
            <BlurFade inView delay={0.25}>
              <MagicCard className="rounded-2xl">
                <div className="flex flex-col gap-2 p-8 text-left">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/45">
                    Intro
                  </span>
                  <p className="text-base font-medium leading-relaxed">
                    삼성전자에서 모바일 앱을 담당하며 그래픽 유저 인터페이스를
                    연구합니다.
                  </p>
                </div>
              </MagicCard>
            </BlurFade>

            <BlurFade inView delay={0.4}>
              <MagicCard className="rounded-2xl">
                <div className="flex flex-col gap-2 p-8 text-left">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/45">
                    경력
                  </span>
                  <p className="text-sm leading-relaxed text-foreground/65">
                    오래된 경력을 가지고 있습니다.
                  </p>
                </div>
              </MagicCard>
            </BlurFade>

            <BlurFade inView delay={0.55}>
              <MagicCard className="rounded-2xl">
                <a
                  href="mailto:sum.oh@samsung.com"
                  className="flex items-center justify-between gap-2 p-8 text-left transition-colors hover:text-foreground"
                >
                  <span className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/45">
                      Contact
                    </span>
                    <span className="text-sm font-bold text-foreground/80">
                      sum.oh@samsung.com
                    </span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0" strokeWidth={2.5} />
                </a>
              </MagicCard>
            </BlurFade>
          </div>
        </section>
      </main>

      <section
        id="works"
        className="mx-auto max-w-5xl px-6 pb-24 text-center lg:pb-28"
      >
        <BlurFade inView delay={0.1}>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Works
          </h2>
        </BlurFade>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work, index) => (
            <BlurFade key={work.slug} inView delay={0.15 + index * 0.1}>
              <Link href={`/works/${work.slug}`} className="block h-full">
                <MagicCard className="h-full rounded-2xl">
                  <article className="flex h-full flex-col overflow-hidden text-left">
                    <div className="relative aspect-[4/3] bg-muted">
                      <Image
                        src={work.thumbnail}
                        alt=""
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-6">
                      <h3 className="text-lg font-bold tracking-tight">
                        {work.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground/65">
                        {work.summary}
                      </p>
                    </div>
                  </article>
                </MagicCard>
              </Link>
            </BlurFade>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-5xl px-6 pb-24 pt-8 text-center sm:px-8 lg:pb-28 lg:pt-12"
      >
        <BlurFade inView delay={0.1}>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            함께 만들 프로젝트
          </h2>
        </BlurFade>

        <BlurFade inView delay={0.2}>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-foreground/65 sm:mt-5 sm:text-lg">
            브랜드, 제품, 인터페이스, 콘텐츠를 함께 만들고 싶다면 간단히
            남겨주세요.
          </p>
        </BlurFade>

        <ContactTallyForm />
      </section>
    </div>
  );
}
