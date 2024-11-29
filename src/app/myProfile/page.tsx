import { Profile } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { Button } from 'react-bootstrap';
import '../../styles/myProfile.style.css';
import { prisma } from '@/lib/prisma';
import authOptions from '@/lib/auth';
// import SessionCard from '../../components/SessionCard';

// const userId = parseInt(session?.user?.id, 10);

const myProfile = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return <div>Session not found</div>;
  }
  const userSession = session as unknown as { user: { email: string; id: string; randomKey: string } };

  const profiles: Profile[] = await prisma.profile.findMany({});

  return (
    <div className="myProfile p-5">
      <h1 className="myProfileTitle text-center">
        <strong>My Profile</strong>
      </h1>
      <div className="myProfileDiv">
        <div className="myProfilePic" />
        <div className="myProfileInfo">
          {profiles
            .filter((profile) => profile.userId === parseInt(userSession.user?.id, 10))
            .map((profile) => (
              <div key={profile.userId}>
                <h5>
                  <strong>Name:</strong>
                  {`${profile.firstName} ${profile.lastName}`}
                </h5>
                <h5>
                  <strong>Major:</strong>
                  {profile.major}
                </h5>
                <h5>
                  <strong>Role:</strong>
                  {profile.collegeRole}
                </h5>
                <h5>
                  <strong>Socials: </strong>
                  {profile.social}
                </h5>
                <h5>
                  <strong>Bio: </strong>
                  {profile.bio}
                </h5>
                {/* add profile.major here within h5 tag and other datafields */}
              </div>
            ))}
        </div>
        <div className="px-4">
          <Button className="myBuddiesBtn">Buddies</Button>
        </div>
        <div className="editProfileBtnContainer">
          <Button className="editProfileBtn" href="/editProfile">
            Edit Profile
          </Button>
        </div>
      </div>
      <h1 className="py-4 px-5">
        <strong>My Sessions</strong>
      </h1>

      <div className="sessionListDiv">{/* <div className="sessionsList"></div> */}</div>
    </div>
  );
};

export default myProfile;
