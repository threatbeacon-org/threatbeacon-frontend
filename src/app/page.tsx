import { redirect } from 'next/navigation';

/**
 * Root page - redirects to login first (authentication required)
 */
export default function HomePage() {
  redirect('/login');
}
