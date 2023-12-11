import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/'>
      <a>
        <Image
          src='/images/logo.svg'
          width={110}
          height={50}
          alt='Havafy logo'
        />
      </a>
    </Link>
  );
}
