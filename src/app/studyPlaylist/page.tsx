'use client';

import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Playlist } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { addPlaylist } from '@/lib/dbActions';
import swal from 'sweetalert';
import LoadingSpinner from '@/components/LoadingSpinner';
import { redirect } from 'next/navigation';
import { AddPlaylistSchema } from '@/lib/validationSchemas';
import PlaylistCard from '../../components/PlaylistCard';

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

const onSubmit = async (data: { url: string }, session: any) => {
  const currentUser = parseInt(session?.user?.id, 10);

  await addPlaylist({
    id: Math.floor(Math.random() * 10000),
    playlistId: Math.floor(Math.random() * 10000),
    userId: currentUser,
    url: data.url,
  });

  swal('Success!', 'Added playlist', 'success', {
    timer: 1000,
  });
};

const studyPlaylist: React.FC = () => {
  const { data: session, status } = useSession();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(AddPlaylistSchema),
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
            <Form.Group>
              <Button className="cSbutton" type="submit" variant="primary">
                Add Playlist
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      <div className="playlistListDiv">
        <PlaylistCard playlistCards={playlistCards} />
      </div>
    </div>
  );
};
export default studyPlaylist;
