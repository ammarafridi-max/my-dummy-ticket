import { useQuery } from '@tanstack/react-query';
import { getAllBlogsApi } from '../../services/apiBlog';

export function useBlogsByTag(tag) {
  const {
    data,
    isLoading: isLoadingBlogsByTag,
    isError: isErrorBlogsByTag,
  } = useQuery({
    queryKey: ['blogs', 'published', 'tag', tag],
    queryFn: () => getAllBlogsApi({ status: 'published', tag, limit: 100 }),
    enabled: Boolean(tag),
  });

  return {
    blogs: data?.blogs || [],
    isLoadingBlogsByTag,
    isErrorBlogsByTag,
  };
}
