export default function TestimonialCard({
  title,
  name,
  src,
  children,
  purpose,
}) {
  return (
    <div className="min-w-80 w-full bg-gray-100 rounded-lg relative py-7.5 px-7">
      <h3 className="text-lg text-left font-bold font-merriweather">{title}</h3>
      <p className="text-left font-light text-md my-5">{children}</p>
      <div className="w-full flex justify-start items-center">
        <img
          src={src}
          alt={`Testimonial by ${name} about My Dummy Ticket`}
          title={`Testimonial by ${name} about My Dummy Ticket`}
          className="w-11 h-11 rounded-full object-cover object-center mr-3"
        />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="font-medium text-[13px] leading-4 text-gray-500">
            {purpose}
          </p>
        </div>
      </div>
    </div>
  );
}
