import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import MobileNavigation from './MobileNavigation';

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
