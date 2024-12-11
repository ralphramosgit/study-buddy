'use client';

import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { addPlaylist } from '@/lib/dbActions';
import swal from 'sweetalert';
import LoadingSpinner from '@/components/LoadingSpinner';
import { redirect } from 'next/navigation';
// import { prisma } from '@/lib/prisma';
import PlaylistCard from '../../components/PlaylistCard';

import '../../styles/studyPlaylist.style.css';

const onSubmit = async (
  data: {
    playlistUrl: string;
  },
  session: any,
) => {
  const currentUser = parseInt(session?.user?.id, 10);
  await addPlaylist({ ...data, id: currentUser, userId: currentUser });

  swal('Success!', 'Added playlist', 'success', {
    timer: 1000,
  });
};

const studyPlaylist: React.FC = () => {
  const { data: session, status } = useSession();
  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(addPlaylistSchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <div className="playlist">
      <h1 className="studyPlaylistTitle">
        <strong>Study Playlist</strong>
      </h1>

      <Card className="playlistFormCard">
        <Card.Body>
          <Form onSubmit={handleSubmit((data) => onSubmit(data, session))}>
            <Form.Group>
              <Form.Label>Share your study playlist</Form.Label>
              <input type="text" placeholder="Enter playlist URL" {...register('url')} />
            </Form.Group>
          </Form>
          <Button className="cSbutton" type="submit" variant="primary">
            Add Playlist
          </Button>
        </Card.Body>
      </Card>

      <div className="playlistListDiv">
        <PlaylistCard playlistCards={playlistCards} currentUser={currentUser} />
      </div>
    </div>
  );
};
export default studyPlaylist;
