import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'DnD Printable Character Generator',
    description: 'Herramienta para imprimir fichas y miniaturas de personajes de DnD',
    keywords: 'DnD, printables, character generator, generator, printable, miniature, token, card, cards, game, games, play, playing, rpg, tabletop, tabletop games, role playing games, role playing, rpg games',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
            {/* ___________________
               /                   |
              |_______      _______|
               ___    |    |
              |   |___|    |______
              |                   \
               \______      ___    |
               ___    |    |   |   |
              |   |__ |    | __|   |
              |      ||    ||      |
               \_____||____||_____/
                  By Toskan4134 
            */}
        </html>
    );
}
