import { useQuery } from '@tanstack/react-query';
import { getAllBlogsApi } from '../../services/apiBlog';

export function useBlogs() {
  const {
    data: blogs = [],
    isLoading: isLoadingBlogs,
    isError: isErrorBlogs,
  } = useQuery({
    queryKey: ['blogs', 'published'], // better cache key
    queryFn: getAllBlogsApi,
  });

  return { blogs, isLoadingBlogs, isErrorBlogs };
}
