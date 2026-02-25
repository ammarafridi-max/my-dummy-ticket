import { Outlet } from 'react-router-dom';
import AdminNavigation from '../components/AdminNavigation';

const SIDEBAR_WIDTH = 250;

export default function AdminLayout() {
  return (
    <div
      className="min-h-dvh w-full grid bg-black m-0 p-0"
      style={{ gridTemplateColumns: `${SIDEBAR_WIDTH}px minmax(0,1fr)` }}
    >
      <div className="h-dvh sticky top-0">
        <AdminNavigation />
      </div>

      <div className="bg-gray-100 p-10 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
