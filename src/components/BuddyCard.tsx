'use client';

import React, { useState, useEffect } from 'react';
import { addBuddy, removeBuddy, isBuddyWithCurrentUser } from '@/lib/dbActions';
import { Buddy } from '@prisma/client';
// import { StarFill } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import { Card, Button, Image, Badge } from 'react-bootstrap';
import SearchBuddies from './SearchBuddies';
import '../styles/buddyCard.style.css';

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

const BuddyCard = ({ buddyList, currentUser }: { buddyList: ExtendedBuddy[]; currentUser: number }) => {
  const [search, setSearch] = useState('');
  const [buddyStatus, setBuddyStatus] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    buddyList.forEach(async (buddy) => {
      const isBuddy = await isBuddyWithCurrentUser(buddy.userDupe.id, currentUser);
      setBuddyStatus((prev) => ({ ...prev, [buddy.userDupe.id]: isBuddy }));
    });
  }, [buddyList, currentUser]);

  const addBuddyBtn = async (buddy: ExtendedBuddy) => {
    console.log('Buddy ID:', buddy.id);
    console.log('Current User ID:', currentUser);
    await addBuddy(buddy.id, currentUser);
    swal('Success', 'Added Buddy', 'success', {
      timer: 1000,
    });
  };

  const removeBuddyBtn = async (buddy: ExtendedBuddy) => {
    console.log('Buddy ID:', buddy.id);
    console.log('Current User ID:', currentUser);
    await removeBuddy(buddy.id, currentUser);
    swal('Success', 'Removed Buddy', 'error', {
      timer: 1000,
    });
  };

  const buddySearch = buddyList.filter((buddy) => {
    const firstName = buddy.userDupe.profile?.firstName ?? '';
    const lastName = buddy.userDupe.profile?.lastName ?? '';
    const combinedName = `${firstName} ${lastName}`.toLowerCase();
    const searchLower = search.toLowerCase();

    return (
      buddy.userDupe.profile?.firstName?.toLowerCase().includes(searchLower) ||
      buddy.userDupe.profile?.lastName?.toLowerCase().includes(searchLower) ||
      combinedName.includes(searchLower) ||
      buddy.userDupe.profile?.major?.toLowerCase().includes(searchLower) ||
      buddy.userDupe.profile?.collegeRole?.toLowerCase().includes(searchLower) ||
      buddy.userDupe.profile?.social?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div>
      <div>
        <SearchBuddies search={search} setSearch={setSearch} />
      </div>
      <div className="buddyCards">
        {buddySearch
          .filter((buddy) => buddy.userDupe.id !== currentUser && buddy.userDupe.profile)
          .map((buddy) => (
            <div key={buddy.userDupe.id} className="buddyCardBorder">
              <Card className="buddyCardCont">
                <Card.Body>
                  <Image className="profilePic" src={buddy.userDupe.profile?.profilePicUrl} />
                  <Card.Title className="pt-3">
                    {buddy.userDupe?.profile
                      ? `${buddy.userDupe.profile.firstName} ${buddy.userDupe.profile.lastName}`
                      : 'Unknown'}
                  </Card.Title>
                  <div>
                    {(() => {
                      let role = 'role';

                      let pillColor = 'primary';
                      if (buddy.userDupe.profile?.collegeRole === 'Student') {
                        role = 'Student';
                        pillColor = 'success';
                      }

                      if (buddy.userDupe.profile?.collegeRole === 'LA') {
                        role = 'LA';
                        pillColor = 'warning';
                      }

                      if (buddy.userDupe.profile?.collegeRole === 'TA') {
                        role = 'TA';
                        pillColor = 'danger';
                      }

                      return (
                        <Badge pill bg={pillColor}>
                          {role}
                        </Badge>
                      );
                    })()}
                    <p>
                      <strong>Bio:</strong>
                      {buddy.userDupe.profile?.bio ?? 'No Bio'}
                    </p>
                    <p>
                      <strong>Major:</strong>
                      {buddy.userDupe.profile?.major ?? 'No Major'}
                    </p>
                    <p>
                      <strong>Socials:</strong>
                      {buddy.userDupe.profile?.social ?? 'No Social'}
                    </p>
                  </div>
                  <Card.Body className="cardBtnDiv">
                    {(() => {
                      if (buddy.userDupe.id === currentUser) {
                        return (
                          <Button
                            className="requestBtn"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            Edit Profile
                          </Button>
                        );
                      }

                      // useEffect(() => {
                      //   buddyList.forEach(async (buddy) => {
                      //     const isBuddy = await isBuddyWithCurrentUser(buddy.userDupe.id, currentUser);
                      //     setBuddyStatus((prev) => ({ ...prev, [buddy.userDupe.id]: isBuddy }));
                      //   });
                      // }, [buddyList, currentUser]);

                      if (buddyStatus[buddy.userDupe.id]) {
                        return (
                          <Button
                            className="removeBtn"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeBuddyBtn(buddy);
                            }}
                          >
                            Remove
                          </Button>
                        );
                      }
                      return (
                        <Button
                          className="requestBtn"
                          onClick={(e) => {
                            e.stopPropagation();
                            addBuddyBtn(buddy);
                          }}
                        >
                          Add
                        </Button>
                      );
                    })()}
                  </Card.Body>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BuddyCard;
