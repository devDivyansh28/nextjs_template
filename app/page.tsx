import Image from 'next/image'
import { requireAuth } from '@/lib/auth-guard';
import LogoutButton from "@/components/ui/Logout"

async function Home() {
  const session = await requireAuth();
  const {user} = session;

  return (
    <div className='flex justify-center items-center min-h-screen bg-zinc-900 text-white p-4'>
      <div className='bg-zinc-800 rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center gap-6'>
        <div className='relative w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-700'>
          <Image 
            src={user.image!} 
            alt='Profile picture' 
            fill
            className='object-cover'
          />
        </div>
        
        <div className='text-center space-y-2'>
          <h1 className='text-2xl font-bold'>{user.name}</h1>
          <p className='text-zinc-400 text-sm'>{user.email}</p>
        </div>
        
        <LogoutButton />
      </div>
    </div>
  );
}

export default Home;