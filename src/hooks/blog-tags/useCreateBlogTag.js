import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createBlogTagApi } from '../../services/apiBlogTags';

export function useCreateBlogTag() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createBlogTag, isLoading: isCreatingBlogTag } = useMutation({
    mutationFn: createBlogTagApi,
    onSuccess: () => {
      toast.success('Blog tag created successfully');
      queryClient.invalidateQueries({ queryKey: ['blog-tags'] });
      navigate('/blog-tags');
    },
    onError: (err) => {
      toast.error(err.message || 'Blog tag could not be created');
    },
  });

  return { createBlogTag, isCreatingBlogTag };
}
