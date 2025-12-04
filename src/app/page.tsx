import { redirect } from 'next/navigation';

/**
 * Root page - redirects to overview if authenticated, otherwise to login
 */
export default function HomePage() {
  redirect('/overview');
}
