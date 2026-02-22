import { useQuery } from '@tanstack/react-query';
import { getPublishedBlogsApi } from '../../services/apiBlog';

export function useBlogs() {
  const {
    data: blogs = [],
    isLoading: isLoadingBlogs,
    isError: isErrorBlogs,
  } = useQuery({
    queryKey: ['blogs', 'published'], // better cache key
    queryFn: getPublishedBlogsApi,
  });

  return { blogs, isLoadingBlogs, isErrorBlogs };
}
