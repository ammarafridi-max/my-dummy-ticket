import { format } from 'date-fns';
import { DotIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogCard({ blog }) {
  const { coverImageUrl, title, excerpt, createdAt, readingTime, slug } = blog;

  return (
    <Link
      to={`/blog/${slug}`}
      className="group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] duration-300 flex flex-col"
    >
      <div className="relative aspect-video overflow-hidden rounded-3xl">
        <img
          src={coverImageUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-[1.03] duration-500"
        />
      </div>

      <div className="p-5 flex flex-col gap-2.5">
        <div className="flex items-center gap-2 text-[11px] text-gray-500 font-outfit font-light">
          <span>{format(new Date(createdAt), 'dd MMM yyyy')}</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full" />
          <span>{readingTime} mins</span>
        </div>

        <h3 className="font-outfit text-[17px] font-medium text-gray-800 leading-snug">{title}</h3>

        <p className="font-outfit text-[14px] text-gray-600 font-light leading-relaxed">
          {excerpt.length > 110 ? `${excerpt.slice(0, 110)}...` : excerpt}
        </p>

        <span className="mt-1 font-outfit text-sm text-gray-700 group-hover:text-primary duration-200">
          Read more →
        </span>
      </div>
    </Link>
  );
}
