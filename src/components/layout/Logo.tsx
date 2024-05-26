import Image from 'next/image';
import Link from 'next/link';

export default function Logo({
  width = 110,
  height = 50,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <Link href='/'>
      <Image
        src='/images/logo.svg'
        width={width}
        height={height}
        alt='Havafy logo'
      />
    </Link>
  );
}
