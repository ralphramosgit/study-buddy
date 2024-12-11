import React from 'react';
// import { Card, Button, Form } from 'react-bootstrap';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Playlist } from '@prisma/client';
import PlaylistCard from '../../components/PlaylistCard';
import PlaylistForm from '../../components/PlaylistForm';
import '../../styles/studyPlaylist.style.css';

type ExtendedPlaylist = Playlist & {
  owner: {
    id: number;
    profile?: {
      firstName: string;
      lastName: string;
    };
  };
};

const StudyPlaylist = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return <div>Session not found</div>;
  }

  const userSession = session as unknown as { user: { email: string; id: string; randomKey: string } };
  const currentUser = parseInt(userSession.user.id, 10);

  // Fetch study sessions on the server
  const playlists: ExtendedPlaylist[] = (await prisma.playlist.findMany({
    include: {
      owner: {
        include: {
          profile: true,
        },
      },
    },
  })) as ExtendedPlaylist[];

  return (
    <div className="playlist">
      <h1 className="studyPlaylistTitle">
        <strong>Study Playlist</strong>
      </h1>
      <PlaylistForm currentUser={currentUser} />
      <div className="playlistListDiv">
        <PlaylistCard playlists={playlists} />
      </div>
    </div>
  );
};
export default StudyPlaylist;
