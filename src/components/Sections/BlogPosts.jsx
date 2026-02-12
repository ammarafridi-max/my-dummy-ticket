import { useBlogs } from '../../hooks/blog/useBlogs';
import { Swiper, SwiperSlide } from 'swiper/react';
import BlogCard from '../BlogCard';
import Container from '../Container';
import PrimarySection from '../PrimarySection';
import SectionTitle from '../SectionTitle';

export default function BlogPosts({
  title = 'Blog Posts',
  subtitle = 'Recently published blog posts',
}) {
  const { blogs, isLoadingBlogs, isErrorBlogs } = useBlogs();

  return (
    <PrimarySection className="py-10 md:py-12 lg:py-15">
      <Container>
        <SectionTitle subtitle={subtitle} textAlign="center">
          {title}
        </SectionTitle>

        <div className="lg:hidden mt-8">
          <Swiper spaceBetween={16} slidesPerView={1.1} className="overflow-visible">
            {blogs?.map((post, i) => (
              <SwiperSlide
                key={i}
                className="bg-white rounded-3xl overflow-hidden cursor-pointer duration-300 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]"
              >
                <BlogCard blog={post} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="hidden lg:grid lg:grid-cols-3 gap-7 mt-8">
          {blogs?.map((post, i) => (
            <BlogCard key={i} blog={post} />
          ))}
        </div>
      </Container>
    </PrimarySection>
  );
}
