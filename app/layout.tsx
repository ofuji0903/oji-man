// app/layout.tsx

import './globals.css'; // ★ これがないと Tailwind 無効になる！

export const metadata = {
  title: 'Oji-Man',
  description: '立ち絵変化ノベルゲーム',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-black">{children}</body>
    </html>
  );
}
