import LoginLink from '@/components/users/LoginLink';

export default function User() {
  return (
    <div className='flex items-center justify-start space-x-5 text-xs md:space-x-6 md:text-base'>
      <LoginLink />
    </div>
  );
}
