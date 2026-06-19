import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function WorkNotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background px-6 text-center text-foreground">
      <h1 className="text-2xl font-black tracking-tight">
        작업물을 찾을 수 없습니다
      </h1>
      <p className="max-w-md text-sm text-foreground/65">
        요청하신 작업물이 존재하지 않거나 이동되었습니다.
      </p>
      <Link
        href="/#works"
        className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-3 text-xs font-bold uppercase tracking-wider text-foreground transition-opacity hover:opacity-90"
      >
        <ArrowLeft className="size-3.5" strokeWidth={2.5} />
        모든 작업물 보기
      </Link>
    </div>
  );
}
