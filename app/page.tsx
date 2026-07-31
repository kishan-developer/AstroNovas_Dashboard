import { redirect } from 'next/navigation';

export default function Home() {
  // In a real app, this would check the user's role from auth context
  // For now, redirect to admin dashboard
  redirect('/dashboard/admin');
}
