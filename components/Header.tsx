import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-[0_4px_12px_0px_rgba(0,0,0,0.1)]">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" aria-label="e-shop home">
          <Image
            src="/images/logo.png"
            width={98}
            height={32}
            alt="e-shop logo"
            priority
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
