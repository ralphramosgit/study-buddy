'use client';

import { useState } from 'react';
import { addSession, leaveSession } from '@/lib/dbActions';
import { StudySession } from '@prisma/client';
import { Card, Button, Modal, Image, Tabs, Tab, Row, Col } from 'react-bootstrap';
import swal from 'sweetalert';
import SessionBuddyCard from './SessionBuddyCard';
import SearchSessions from './SearchSessions';
import '../styles/sessionCard.style.css';

type ExtendedStudySession = StudySession & {
  owner: {
    id: number;
    profile?: {
      firstName: string;
      lastName: string;
    };
  };
  users: {
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
    myBuddies?: {
      buddyId: number;
    }[];
  }[];
};

const SessionCard = ({
  studySessions,
  currentUser,
}: {
  studySessions: ExtendedStudySession[];
  currentUser: number;
}) => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<ExtendedStudySession | null>(null);

  const addSessionBtn = async (studySession: ExtendedStudySession) => {
    console.log('Study Session ID:', studySession.id);
    console.log('Current User ID:', currentUser);
    await addSession(studySession.id, currentUser);
    swal('Success', 'Added Session', 'success', {
      timer: 1000,
    });
  };
  const leaveSessionBtn = async (studySession: ExtendedStudySession) => {
    console.log('Leaving Study Session ID:', studySession.id);
    console.log('Current User ID:', currentUser);
    await leaveSession(studySession.id, currentUser);
    swal('Success', 'Left Session', 'success', {
      timer: 1000,
    });
  };
  const studySessionsSearch = studySessions.filter((session) => {
    const firstName = session.owner.profile?.firstName ?? '';
    const lastName = session.owner.profile?.lastName ?? '';
    const combinedName = `${firstName} ${lastName}`.toLowerCase();
    const searchLower = search.toLowerCase();

    return (
      session.title.toLowerCase().includes(searchLower) ||
      session.description.toLowerCase().includes(searchLower) ||
      session.owner.profile?.firstName?.toLowerCase().includes(searchLower) ||
      session.owner.profile?.lastName?.toLowerCase().includes(searchLower) ||
      combinedName.includes(searchLower) ||
      session.class.toLowerCase().includes(searchLower) ||
      session.place.toLowerCase().includes(searchLower) ||
      session.users.some(
        (user) =>
          user.profile?.firstName.toLowerCase().includes(searchLower) ||
          user.profile?.lastName.toLowerCase().includes(searchLower),
      )
    );
  });

  const handleShowModal = (session: ExtendedStudySession) => {
    setSelectedSession(session);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSession(null);
  };

  return (
    <div>
      <div>
        <SearchSessions search={search} setSearch={setSearch} />
      </div>
      <div className="sessionCards">
        {studySessionsSearch.map((studySessionInfo) => (
          <div
            key={studySessionInfo.id}
            className="sessionCardBorder"
            onClick={() => handleShowModal(studySessionInfo)}
            onKeyDown={(e) => e.key === 'Enter' && handleShowModal(studySessionInfo)}
            role="button"
            tabIndex={0}
          >
            <Card className="sessionCardCont">
              <Card.Img
                variant="top"
                src={studySessionInfo.image}
                className="cardImg"
                style={{ height: '150px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title className="fixOverflow">{studySessionInfo.title}</Card.Title>
                <div>
                  <p>{studySessionInfo.description}</p>
                  <p>
                    <strong>Organizer: </strong>
                    {studySessionInfo.owner?.profile
                      ? `${studySessionInfo.owner.profile.firstName} ${studySessionInfo.owner.profile.lastName}`
                      : 'Unknown'}
                  </p>
                  <p>
                    <strong>Buddies: </strong>
                    {studySessionInfo.users?.length > 0 &&
                      studySessionInfo.users
                        .map((buddy) => `${buddy.profile?.firstName || ''} ${buddy.profile?.lastName || ''}`.trim())
                        .join(', ')}
                    {(!studySessionInfo.users || studySessionInfo.users.length === 0) && 'No buddies yet'}
                  </p>
                  <p>
                    <strong>Class: </strong>
                    {studySessionInfo.class}
                  </p>
                  <p>
                    <strong>Where: </strong>
                    {studySessionInfo.place}
                  </p>
                  <p>
                    <strong>Date: </strong>
                    {new Date(studySessionInfo.sessionDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p>
                    <strong>Time: </strong>
                    {new Date(studySessionInfo.startTime).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                    -
                    {new Date(studySessionInfo.endTime).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>
                </div>
                <div className="py-1" />

                {(() => {
                  if (studySessionInfo.owner.id === currentUser) {
                    return (
                      <Button
                        className="sessionBtn"
                        href={`/editSession?id=${studySessionInfo.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        Edit
                      </Button>
                    );
                  }

                  const isUserInSession = studySessionInfo.users?.some((user) => user.id === currentUser);

                  if (isUserInSession) {
                    return (
                      <Button
                        className="removeBtn"
                        onClick={(e) => {
                          e.stopPropagation();
                          leaveSessionBtn(studySessionInfo);
                        }}
                      >
                        Leave Session
                      </Button>
                    );
                  }
                  return (
                    <Button
                      className="sessionBtn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addSessionBtn(studySessionInfo);
                      }}
                    >
                      Add
                    </Button>
                  );
                })()}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {selectedSession && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered id="sessionModal">
          <Modal.Header closeButton>
            <Modal.Title>
              <strong>{selectedSession.title}</strong>
            </Modal.Title>
          </Modal.Header>
          <Card.Body>
            <Tabs defaultActiveKey="info" className="mb-3 custom-tabs">
              <Tab eventKey="info" title="Study Session Info" className="sessionInfoTab">
                <Row>
                  <Col>
                    <Image src={selectedSession.image} className="cardImgModal" alt={selectedSession.title} />
                  </Col>
                  <Col>
                    <Row>
                      <p className="nonOverflow">
                        <strong>Description:</strong>
                        {selectedSession.description}
                      </p>
                    </Row>
                    <Row>
                      <p>
                        <strong>Organizer:</strong>
                        {selectedSession.owner.profile
                          ? `${selectedSession.owner.profile.firstName} ${selectedSession.owner.profile.lastName}`
                          : 'Unknown'}
                      </p>
                    </Row>
                    <Row>
                      <p>
                        <strong>Class:</strong>
                        {selectedSession.class}
                      </p>
                    </Row>
                    <Row>
                      <p>
                        <strong>Where:</strong>
                        {selectedSession.place}
                      </p>
                    </Row>
                    <Row>
                      <p>
                        <strong>Date: </strong>
                        {new Date(selectedSession.sessionDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </Row>
                    <Row>
                      <p>
                        <strong>Time: </strong>
                        {new Date(selectedSession.startTime).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })}
                        -
                        {new Date(selectedSession.endTime).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </p>
                    </Row>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="buddies" title="Buddies">
                <div className="buddyListDiv" style={{ height: '500px', overflowY: 'scroll' }}>
                  <SessionBuddyCard buddyList={[selectedSession]} currentUser={currentUser} />
                </div>
              </Tab>
            </Tabs>
          </Card.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button> */}

            {(() => {
              if (selectedSession.owner.id === currentUser) {
                return (
                  <Button
                    className="sessionBtn"
                    href={`/editSession?id=${selectedSession.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Edit
                  </Button>
                );
              }

              const isUserInSession = selectedSession.users?.some((user) => user.id === currentUser);

              if (isUserInSession) {
                return (
                  <Button
                    className="removeBtn"
                    onClick={(e) => {
                      e.stopPropagation();
                      leaveSessionBtn(selectedSession);
                    }}
                  >
                    Leave Session
                  </Button>
                );
              }
              return (
                <Button
                  className="sessionBtn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addSessionBtn(selectedSession);
                  }}
                >
                  Add
                </Button>
              );
            })()}
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default SessionCard;
