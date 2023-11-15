import Link from "next/link";

// 잘못된 경로에 진입했을 때 해당 에러 페이지로 이동
export default function ErrorPage() {
  return (
    <div className="vbox px(20) gap(20)">
      <p className="label text-xxl c(--primary)">잘못된 페이지입니다.</p>
      <Link
        href="/"
        className="paragraph text-medium c(--content-secondary) px(8) hover:underline"
      >
        메인 화면으로 이동하기
      </Link>
    </div>
  );
}
