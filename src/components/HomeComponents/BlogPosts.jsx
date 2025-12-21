import BlogCard from '../BlogCard';
import Container from '../Container';
import PrimarySection from '../PrimarySection';
import SectionTitle from '../SectionTitle';
import { useBlogs } from '../../hooks/useBlogs';

export default function BlogPosts({
  title = 'Blog Posts',
  subtitle = 'Recently published blog posts',
}) {
  const { blogs, isLoadingBlogs, isErrorBlogs } = useBlogs();
  return (
    <PrimarySection className="pt-5 pb-15 lg:pb-20 lg:pt-0">
      <Container>
        <SectionTitle subtitle={subtitle} textAlign="center">
          {title}
        </SectionTitle>
        <div className="flex items-start gap-7 lg:grid lg:grid-cols-3 lg:gap-7">
          {blogs?.map((post, i) => (
            <BlogCard key={i} blog={post} />
          ))}
        </div>
      </Container>
    </PrimarySection>
  );
}
