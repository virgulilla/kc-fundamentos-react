import type { ReactNode } from "react";

interface PageProps {
  title: string;
  children: ReactNode;
}

function Page({ title, children }: PageProps) {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold sm:text-3xl dark:text-white">
        {title}
      </h1>
      {children}
    </div>
  );
}

export default Page;
