'use client';

import { Playlist } from '@prisma/client';
import '../styles/playlistCard.style.css';
import { Card } from 'react-bootstrap';

type ExtendedPlaylist = Playlist & {
  owner: {
    id: number;
    profile?: {
      firstName: string;
      lastName: string;
    };
  };
};

const PlaylistCard = ({ playlists }: { playlists: ExtendedPlaylist[] }) => (
  <div>
    <div className="playlistCards">
      {playlists.map((playlist) => (
        <Card className="playlistCard">
          <Card.Title>
            <h3>{`${playlist.owner.profile?.firstName} ${playlist.owner.profile?.lastName}'s Playlist`}</h3>
          </Card.Title>
          <Card.Body>
            <div className="playlistCardCont">
              <a id="urlText" href={playlist.url} target="_blank" rel="noreferrer">
                {playlist.url}
              </a>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  </div>
);

export default PlaylistCard;
