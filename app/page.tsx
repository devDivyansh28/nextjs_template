import Image from 'next/image'
import {Button} from  "@/components/ui/button";
import {ModeToggle} from "@/components/Mode-Toggle";
import { requireAuth } from '@/lib/auth-guard';

async function Home() {
  const session = await requireAuth();

  const {user} = session;

  return (
    <>
   <div className='flex justify-center items-center h-screen bg-zinc-900 text-white'>
    <Image src={user.image!} alt='user Image' className='h-50 w-50 object-contain'/>
   </div>
    </>
  );
}

export default Home;