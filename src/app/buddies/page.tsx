// 'use client';

// import { useState } from 'react';
import authOptions from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { Buddy } from '@prisma/client';
// import SearchBuddies from '../../components/SearchBuddies';
import BuddyCard from '../../components/BuddyCard';
import '../../styles/buddies.style.css';

type ExtendedBuddy = Buddy & {
  userDupe: {
    id: number;
    profile?: {
      firstName: string;
      lastName: string;
      bio: string;
      major: string;
      collegeRole: string;
      social: string;
      profilePicUrl: string;
    };
  };
};

const Buddies = async () => {
  // const [search, setSearch] = useState('');

  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return <div>Session not found</div>;
  }
  const userSession = session as unknown as { user: { email: string; id: string; randomKey: string } };
  const currentUser = parseInt(userSession.user.id, 10);

  // Fetch buddies on the server

  const buddyList: ExtendedBuddy[] = (await prisma.buddy.findMany({
    include: {
      userDupe: {
        include: {
          profile: true,
        },
      },
    },
  })) as ExtendedBuddy[];

  return (
    <div className="">
      <h1 className="buddiesPageTitle">
        <strong> Buddies </strong>
      </h1>
      {/* <SearchBuddies search={search} setSearch={setSearch} /> */}
      <div className="buddiesListDiv">
        <BuddyCard buddyList={buddyList} currentUser={currentUser} />
      </div>
    </div>
  );
};
export default Buddies;
