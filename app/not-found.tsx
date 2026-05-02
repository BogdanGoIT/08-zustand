import { Metadata } from 'next';
import css from './Home.module.css';

export const metadata: Metadata = {
  title: '404 - Not found',
  description: 'Sorry, the page you are looking for does not exist.',
  openGraph: {
    title: 'Og Not-found',
    description: 'Og Sorry, the page you are looking for does not exist.',
    url: process.env.OG_NOTES_URL || 'http://localhost:3000/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 800,
        alt: 'Og Image Alt',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </>
  );
}
