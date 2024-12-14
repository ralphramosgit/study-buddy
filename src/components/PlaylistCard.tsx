// 'use client';

// import { Playlist } from '@prisma/client';
// import '../styles/playlistCard.style.css';
// import { Card } from 'react-bootstrap';

// type ExtendedPlaylist = Playlist & {
//   owner: {
//     id: number;
//     profile?: {
//       firstName: string;
//       lastName: string;
//     };
//   };
// };

// const PlaylistCard = ({ playlists }: { playlists: ExtendedPlaylist[] }) => (
//   <div>
//     <div className="playlistCards">
//       {playlists.map((playlist) => (
//         <Card className="playlistCard">
//           <Card.Title>
//             <h3>{`${playlist.owner.profile?.firstName} ${playlist.owner.profile?.lastName}'s Playlist`}</h3>
//           </Card.Title>
//           <Card.Body>
//             <div className="playlistCardCont">
//               <a id="urlText" href={playlist.url} target="_blank" rel="noreferrer">
//                 {playlist.url}
//               </a>
//             </div>
//           </Card.Body>
//         </Card>
//       ))}
//     </div>
//   </div>
// );

// export default PlaylistCard;

// 'use client';

// import { Playlist } from '@prisma/client';
// import '../styles/playlistCard.style.css';
// import { Card } from 'react-bootstrap';
// import { useEffect, useState } from 'react';

// declare global {
//   interface Window {
//     onSpotifyIframeApiReady: (IFrameAPI: any) => void;
//     SpotifyIframeAPI?: any;
//   }
// }

// type ExtendedPlaylist = Playlist & {
//   owner: {
//     id: number;
//     profile?: {
//       firstName: string;
//       lastName: string;
//     };
//   };
// };

// const PlaylistCard = ({ playlists }: { playlists: ExtendedPlaylist[] }) => {
//   const [isSpotifyApiLoaded, setIsSpotifyApiLoaded] = useState(false);
//   useEffect(() => {
//     if (window.SpotifyIframeAPI) {
//       setIsSpotifyApiLoaded(true);
//       return;
//     }

//     // Dynamically load Spotify Embed API script
//     const script = document.createElement('script');
//     script.src = 'https://open.spotify.com/embed/iframe-api/v1';
//     script.async = true;
//     document.body.appendChild(script);

//     // Setup Spotify Embed when API is ready
//     window.onSpotifyIframeApiReady = (IFrameAPI) => {
//       playlists.forEach((playlist, index) => {
//         const element = document.getElementById(`embed-iframe-${index}`);

//         // Ensure the playlist URL is a valid Spotify URI
//         const spotifyUri = playlist.url.startsWith('spotify:')
//           ? playlist.url
//           : `spotify:playlist:${playlist.url.split('playlist/')[1]}`;

//         const options = {
//           uri: spotifyUri,
//           width: '100%',
//           height: '380', // Recommended height for full playlist view
//         };

//         // Create Spotify Embed controller
//         if (element) {
//           IFrameAPI.createController(element, options, () => {});
//         }
//       });
//     };

//     // Cleanup script on component unmount
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, [playlists]);

//   return (
//     <div>
//       <div className="playlistCards">
//         {playlists.map((playlist, index) => (
//           <Card className="playlistCard" key={playlist.id}>
//             <Card.Title>
//               <h3>{`${playlist.owner.profile?.firstName} ${playlist.owner.profile?.lastName}'s Playlist`}</h3>
//             </Card.Title>
//             <Card.Body>
//               <div className="playlistCardCont">
//                 <div id={`embed-iframe-${index}`} />
//               </div>
//             </Card.Body>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PlaylistCard;

'use client';

import { Playlist } from '@prisma/client';
import '../styles/playlistCard.style.css';
import { Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    onSpotifyIframeApiReady: (IFrameAPI: any) => void;
    SpotifyIframeAPI?: any;
  }
}

type ExtendedPlaylist = Playlist & {
  owner: {
    id: number;
    profile?: {
      firstName: string;
      lastName: string;
    };
  };
};

const PlaylistCard = ({ playlists }: { playlists: ExtendedPlaylist[] }) => {
  const [isSpotifyApiLoaded, setIsSpotifyApiLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load Spotify Embed API script
    const script = document.createElement('script');
    script.src = 'https://open.spotify.com/embed/iframe-api/v1';
    script.async = true;
    document.body.appendChild(script);

    // Setup Spotify Embed when API is ready
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      window.SpotifyIframeAPI = IFrameAPI;
      setIsSpotifyApiLoaded(true);
    };

    // Cleanup function
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    // Create Spotify embeds when API is loaded and playlists change
    if (isSpotifyApiLoaded && window.SpotifyIframeAPI) {
      playlists.forEach((playlist, index) => {
        const element = document.getElementById(`embed-iframe-${index}`);

        // Clear any existing iframe
        if (element) {
          element.innerHTML = '';

          // Ensure the playlist URL is a valid Spotify URI
          const spotifyUri = playlist.url.startsWith('spotify:')
            ? playlist.url
            : `spotify:playlist:${playlist.url.split('playlist/')[1].split('?')[0]}`;

          const options = {
            uri: spotifyUri,
            width: '100%',
            height: '380', // Recommended height for full playlist view
          };

          // Create Spotify Embed controller
          window.SpotifyIframeAPI.createController(element, options, () => {});
        }
      });
    }
  }, [playlists, isSpotifyApiLoaded]);

  return (
    <div>
      <div className="playlistCards">
        {playlists.map((playlist, index) => (
          <Card className="playlistCard" key={playlist.id}>
            <Card.Title>
              <h3>{`${playlist.owner.profile?.firstName} ${playlist.owner.profile?.lastName}'s Playlist`}</h3>
            </Card.Title>
            <Card.Body>
              <div className="playlistCardCont">
                <div id={`embed-iframe-${index}`} />
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlaylistCard;
