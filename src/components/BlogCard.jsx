import { format } from 'date-fns';
import { DotIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogCard({ blog }) {
  const { coverImageUrl, title, excerpt, createdAt, readingTime, slug } = blog;

  return (
    <Link
      to={`/blog/${slug}`}
      className="bg-white rounded-3xl overflow-hidden cursor-pointer duration-300 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]"
    >
      <div className="aspect-video bg-gray-100 overflow-hidden">
        <img
          src={coverImageUrl}
          className="object-cover object-center"
          loading="lazy"
          alt={title ? title : 'Blog post'}
        />
      </div>
      <div className="py-6 px-5">
        <div className="flex items-center font-outfit font-extralight text-[12px] text-gray-500">
          <span>{format(new Date(createdAt), 'dd MMM yyyy')}</span>
          <DotIcon />
          <span>{readingTime} mins</span>
        </div>
        <h3 className="font-outfit font-normal mt-1 mb-2 leading-6 text-md line-clamp-2">
          {title}
        </h3>
        <p className="font-outfit font-extralight text-sm text-gray-600 line-clamp-2">{excerpt}</p>
      </div>
    </Link>
  );
}
