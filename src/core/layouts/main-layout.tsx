import { Outlet } from 'react-router';
import Header from '../components/header';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}