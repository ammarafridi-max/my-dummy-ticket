import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import MobileNavigation from '../components/MobileNavigation';

export default function AppLayout() {
  return (
    <>
      <Navigation />
      <MobileNavigation />
      <Outlet />
      <Footer />
    </>
  );
}
