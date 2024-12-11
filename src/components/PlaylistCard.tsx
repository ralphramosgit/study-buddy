'use client';

import '../styles/playlistCard.style.css';
import { Card } from 'react-bootstrap';

const PlaylistCard = ({ studySessions }: { studySessions: ExtendedPlaylist[] }) => (
  <Card className="playlistCard">
    <Card.Title>Playlist Owner</Card.Title>
    <Card.Body>
      <div>
        <h3>Playlist Owner</h3>
        <a href="playlist.com" target="_blank">
          playlist here
        </a>
      </div>
    </Card.Body>
  </Card>
);

export default PlaylistCard;
