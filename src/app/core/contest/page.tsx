"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ContestList() {
  const pathName = usePathname();
  const contestId = "1";
  return (
    <div>
      <h1>ContestList</h1>
      <h2>Current path: {pathName}</h2>
      <div className="my-4">
        <Link
          className=" bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
          href={`${pathName}/${contestId}`}
        >
          Contest 1
        </Link>
      </div>
    </div>
  );
}
