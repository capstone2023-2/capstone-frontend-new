import React from "react";
import Link from "next/link";

function Topic({ name }: { name: string }) {
  return (
    <Link href="/" className="group pack w(40%) h(120) r(8) b(1/solid/--primary) hover:b(1/solid/--accent) ~md:w(80%)">
      <p className="label text-large c(--primary) group-hover:c(--accent)">{name}</p>
    </Link>
  );
}

export default React.memo(Topic);