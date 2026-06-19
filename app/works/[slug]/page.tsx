import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { getWorkBySlug, works } from "@/lib/works";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    return { title: "작업물을 찾을 수 없습니다" };
  }

  return {
    title: `${work.title} | 오수민`,
    description: work.summary,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="mx-auto flex max-w-3xl items-center justify-center px-6 py-6">
        <Link
          href="/#works"
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" strokeWidth={2.5} />
          모든 작업물 보기
        </Link>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24">
        <BlurFade delay={0.1}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
            <Image
              src={work.image}
              alt={work.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        </BlurFade>

        <BlurFade delay={0.25}>
          <div className="mt-10 flex flex-col gap-4">
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              {work.title}
            </h1>
            <p className="text-base text-foreground/65">{work.summary}</p>
          </div>
        </BlurFade>

        <BlurFade delay={0.4}>
          <MagicCard className="mt-10 rounded-2xl">
            <div className="p-8">
              <p className="text-base leading-relaxed text-foreground/80">
                {work.description}
              </p>
            </div>
          </MagicCard>
        </BlurFade>

        {work.links.length > 0 && (
          <BlurFade delay={0.55}>
            <div className="mt-8 flex flex-wrap gap-3">
              {work.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground transition-opacity hover:opacity-80"
                >
                  {link.label}
                  <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
                </a>
              ))}
            </div>
          </BlurFade>
        )}
      </main>
    </div>
  );
}
