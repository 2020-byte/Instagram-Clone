import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/');
  }
  
  return (
    <section className='w-full flex flex-col md:flex-row max-w-[850px] p-4'>
      <div className='w-full basis-3/4 min-w-0'>
        {/* TODO:min-w-0이 구체적으로 어떻게 작용하는 지 여기서 알아보기 */}
        <FollowingBar/>
        <PostList/>
      </div>
      <div className='basis-1/4 ml-8'>
        <SideBar user={user}/>
      </div>
    </section>
  );

}
