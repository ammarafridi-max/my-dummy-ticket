import { Link } from 'react-router-dom';

export default function Breadcrumb({ paths = [] }) {
  return (
    <nav className="text-[12px] lg:text-sm text-gray-400">
      {paths.map((path, index) => (
        <span key={index} className="font-light">
          {index !== 0 && <span className="mx-2 lg:mx-3">/</span>}
          {index === paths.length - 1 ? (
            <span className="text-gray-900">{path.label}</span>
          ) : (
            <Link to={path.path} className="hover:text-primary-600 transition-colors">
              {path.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
