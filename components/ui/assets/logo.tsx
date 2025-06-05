import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="relative w-full max-w-[120px] aspect-[5/2] transition-all duration-200 rounded-md">
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
