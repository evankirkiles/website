import { PropsWithChildren } from 'react';
import './global.scss';

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
