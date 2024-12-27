import Navigation from './Navigation';
import Footer from './Footer';
import MobileNavigation from './MobileNavigation';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Navigation />
      <MobileNavigation />
      <Outlet />
      <Footer />
    </>
  );
}
