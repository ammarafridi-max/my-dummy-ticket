import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { updateBlogTagApi } from '../../services/apiBlogTags';

export function useUpdateBlogTag() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updateBlogTag, isLoading: isUpdatingBlogTag } = useMutation({
    mutationFn: ({ id, tagData }) => updateBlogTagApi(id, tagData),
    onSuccess: (_, variables) => {
      toast.success('Blog tag updated successfully');
      queryClient.invalidateQueries({ queryKey: ['blog-tags'] });
      queryClient.invalidateQueries({ queryKey: ['blog-tag', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      navigate('/blog-tags');
    },
    onError: (err) => {
      toast.error(err.message || 'Blog tag could not be updated');
    },
  });

  return { updateBlogTag, isUpdatingBlogTag };
}
