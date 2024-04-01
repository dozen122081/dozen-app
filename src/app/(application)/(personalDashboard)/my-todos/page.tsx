"use client"
import { useUser } from '@clerk/nextjs';
import RequestCategoryAdd from './_components/RequestCategoryAdd';
import { TodoBoard } from './_components/TodoBoard';

const Page = () => {
  const { user } = useUser();
  // const [userData, setUserData] = useState<UserData | null>(null); // Explicitly define the type of state
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!user) return null;
  //     const response = await fetch('/api/user');
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch user data');
  //     }
  //     const data = await response.json();
  //     console.log(data)
  //     const userInfo = await fetchUserData(data.id);
  //     if (!data?.onboarded) {
  //       redirect("/onboarding");
  //       return;
  //     }

  //     const userMail = (user?.emailAddresses[0]).toString();
  //     setUserData({
  //       id: data.id,
  //       objectId: data._id || "",
  //       username: data.username || user.username || "",
  //       name: data.name || user.firstName || "",
  //       image: data.image || user.imageUrl,
  //       email: userMail || "",
  //     });
  //   };

  //   fetchData();
  // }, [user]);

  // if (!userData) return null;
  if(!user) return null;

  return (
    <div className='w-full py-10 px-5 flex flex-col gap-10 md:h-[110vh]'>
      <div className='flex justify-between items-center'>
        <h1 className="md:text-3xl font-bold text-2xl">{user.firstName}'s Task Status</h1>
        <div>
          <RequestCategoryAdd />
        </div>
      </div>
      <div className='w-full lg:max-w-[90vw]'>
        <TodoBoard userId={user.id.toString()} />
      </div>
    </div>
  );
};

export default Page;
