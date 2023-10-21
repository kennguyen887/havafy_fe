import LoginModal from '@/components/users/LoginModal';

export default function User() {
  return (
    <div className='flex items-center justify-between space-x-5 text-xs md:space-x-6 md:text-base'>
      <LoginModal />
    </div>
  );
}
