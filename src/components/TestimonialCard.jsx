export default function TestimonialCard({ title, name, src, children, purpose }) {
  return (
    <div className="relative min-w-80 md:min-w-auto group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out p-6 md:p-7 w-full max-w-md mx-auto font-outfit">
      <div className="absolute top-4 right-5 text-gray-200 text-5xl select-none font-serif leading-none">
        “
      </div>

      <h3 className="text-[18px] md:text-[20px] font-normal text-gray-900 leading-snug">{title}</h3>

      <p className="text-[15px] text-gray-700 leading-relaxed font-extralight py-5">{children}</p>

      <div className="flex items-center gap-3">
        <img
          src={src}
          alt={`Testimonial by ${name} about MDT`}
          title={`Testimonial by ${name} about MDT`}
          className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm"
        />
        <div>
          <p className="font-semibold text-gray-900 text-[15px]">{name}</p>
          <p className="font-extralight text-[13px] text-gray-500">{purpose}</p>
        </div>
      </div>

      {/* Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-primary-500 to-orange-400 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
