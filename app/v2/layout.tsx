import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PRISMA 3.0 | White Edition • CSE KGEC',
  description:
    'White-themed, centered showcase of PRISMA 3.0, the annual departmental magazine of Computer Science and Engineering, Kalyani Government Engineering College.',
};

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
