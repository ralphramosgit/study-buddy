'use client';

import React from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { addPlaylist } from '@/lib/dbActions';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { AddPlaylistSchema } from '@/lib/validationSchemas';
import '../styles/PlaylistForm.style.css';

interface PlaylistFormProps {
  currentUser: number;
}

const isValidSpotifyUrl = (url: string) => {
  const spotifyUrlPattern = /^https:\/\/open\.spotify\.com\/playlist\/[a-zA-Z0-9]+(\?.*)?$/;
  return spotifyUrlPattern.test(url);
};

const PlaylistForm: React.FC<PlaylistFormProps> = ({ currentUser }) => {
  const { status } = useSession();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(AddPlaylistSchema),
  });

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }
  const onSubmit = async (data: { url: string }) => {
    if (!isValidSpotifyUrl(data.url)) {
      swal('Error', 'Please enter a valid Spotify playlist URL', 'error');
      return;
    }

    try {
      await addPlaylist({
        id: Math.floor(Math.random() * 10000),
        playlistId: Math.floor(Math.random() * 10000),
        userId: currentUser,
        url: data.url,
      });
      swal('Success!', 'Added playlist', 'success', {
        buttons: {
          confirm: {
            visible: true,
            closeModal: true,
          },
        },
        closeOnClickOutside: true,
        closeOnEsc: true,
        timer: 1500,
      });
    } catch (error) {
      swal('Error', 'Failed to add playlist', 'error');
    }
  };

  return (
    <div className="playlistFormCont">
      <Card className="playlistFormCard">
        <Card.Title className="px-3 pt-2">
          <strong>Share your Study Playlist</strong>
        </Card.Title>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col xs={10} className="mx-auto px-2">
                <Form.Group>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter playlist URL (spotify links only)"
                    {...register('url')}
                  />
                </Form.Group>
              </Col>
              <Col xs={2} className="d-flex">
                <Form.Group>
                  <Button className="addBtn" type="submit" variant="custom">
                    Add Playlist
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
export default PlaylistForm;
