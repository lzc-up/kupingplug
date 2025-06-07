import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="relative w-[120px] h-[48px] transition-all duration-200 rounded-md flex-shrink-0">
      <Image
        src="/images/leoga.avif"
        alt="LEGO Logo"
        fill
        className="object-contain"
        priority
      />
    </Link>
  );
}
