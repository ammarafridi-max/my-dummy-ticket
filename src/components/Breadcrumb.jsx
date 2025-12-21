import { Link } from 'react-router-dom';

export default function Breadcrumb({ paths = [] }) {
  return (
    <nav className="flex items-center text-sm text-gray-400 gap-2">
      {paths.map((path, index) => (
        <div key={index} className="flex items-center gap-2 font-light">
          {index !== 0 && <span>/</span>}
          {index === paths.length - 1 ? (
            <span className="text-gray-900">{path.label}</span>
          ) : (
            <Link to={path.href} className="hover:text-primary-600 transition-colors">
              {path.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
