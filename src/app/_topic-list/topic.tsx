import React from "react";
import Link from "next/link";

export interface TopicProps {
  name: string;
  nameTranslated: string;
}

// 메인 화면의 주제 1개
function Topic({ name, nameTranslated }: TopicProps) {
  return (
    <Link href={`/${name}`} className="group pack w(40%) h(120) r(8) b(1/solid/--primary) hover:b(1/solid/--accent) ~md:w(80%)">
      <p className="label text-large c(--primary) group-hover:c(--accent)">{nameTranslated}</p>
    </Link>
  );
}

export default React.memo(Topic);