import Image from 'next/image';

export default function Logo() {
  return (
    <Image src='/images/logo.svg' width={110} height={50} alt='Havafy logo' />
  );
}
