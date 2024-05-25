import LoginLink from '@/components/users/LoginLink';

export default function User() {
  return (
    <div className='hidden items-center justify-start space-x-5 text-xs md:space-x-6 md:text-base lg:flex'>
      <LoginLink />
    </div>
  );
}
