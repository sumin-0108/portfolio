export type WorkLink = {
  label: string;
  href: string;
};

export type Work = {
  slug: string;
  title: string;
  summary: string;
  thumbnail: string;
  image: string;
  description: string;
  links: WorkLink[];
};

export const works: Work[] = [
  {
    slug: "galaxy-theme-launch",
    title: "갤럭시 테마 런칭",
    summary: "갤럭시 테마 런칭을 위한 GUI 및 UX 디자인",
    thumbnail: "/works/galaxy-theme.png",
    image: "/works/galaxy-theme.png",
    description:
      "갤럭시 테마 런칭 프로젝트에 참여하여 테마 스토어 및 적용 경험의 GUI를 설계했습니다. 사용자가 테마를 탐색하고 적용하는 흐름을 정리하고, 런칭에 맞춘 UI를 구현했습니다. 추후 실제 프로젝트 내용으로 교체 예정입니다.",
    links: [
      { label: "Behance", href: "https://behance.net" },
      { label: "Dribbble", href: "https://dribbble.com" },
    ],
  },
  {
    slug: "sa-gui",
    title: "SA GUI",
    summary: "SA(Samsung Account) 서비스 GUI 설계 및 개선",
    thumbnail: "/works/sa-gui.png",
    image: "/works/sa-gui.png",
    description:
      "Samsung Account 서비스의 그래픽 유저 인터페이스를 담당했습니다. 계정 관리, 설정, 연동 화면 등 핵심 GUI를 설계하고 일관된 사용자 경험을 제공하기 위한 UI 패턴을 정립했습니다. 추후 실제 프로젝트 내용으로 교체 예정입니다.",
    links: [{ label: "Behance", href: "https://behance.net" }],
  },
  {
    slug: "mobile-app-gui-improvement",
    title: "모바일 앱 GUI 개선",
    summary: "삼성 모바일 앱 GUI 사용성 및 시각적 개선",
    thumbnail: "/works/mobile-gui.png",
    image: "/works/mobile-gui.png",
    description:
      "삼성 모바일 앱의 GUI를 개선하는 프로젝트에 참여했습니다. 기존 UI의 문제점을 분석하고, 컴포넌트 정비와 시각적 계층 구조 개선을 통해 더 직관적인 인터페이스를 제안했습니다. 추후 실제 프로젝트 내용으로 교체 예정입니다.",
    links: [
      { label: "Behance", href: "https://behance.net" },
      { label: "GitHub", href: "https://github.com" },
    ],
  },
];

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((work) => work.slug === slug);
}
