import Image from "next/image";

export default function HeroBanner() {
  return (
    <section aria-labelledby="hero-title">
      <Image
        className="w-full h-[300px] md:h-[414px] lg:h-[400px] object-cover"
        src="images/hero.jpg"
        width={1440}
        height={400}
        alt="Various mobile phones and accessories displayed on a table"
        priority
        sizes="100vw"
      />
      <div className="p-12 md:p-6 lg:p-12">
        <h1
          id="hero-title"
          className="font-bold text-[32px] md:text-[42px] lg:text-5xl mb-5 leading-none"
        >
          Mobile Phones & Accessories
        </h1>
        <p className="font-normal text-base lg:text-2xl max-w-[1002px]">
          Explore our wide range of cutting-edge mobile devices and essential
          accessories. Find the perfect smartphone to suit your needs and
          enhance your mobile experience with our curated selection of add-ons.
        </p>
      </div>
    </section>
  );
}
