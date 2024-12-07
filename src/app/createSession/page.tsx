'use client';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { createSession } from '@/lib/dbActions';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import swal from 'sweetalert';
import DatePicker from 'react-datepicker';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { CreateSessionSchema } from '@/lib/validationSchemas';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/createSession.style.css';

const onSubmit = async (
  data: {
    title: string;
    description: string;
    class: string;
    place: string;
    sessionDate: Date;
    startTime: Date;
    endTime: Date;
  },
  session: any,
) => {
  const currentUser = parseInt(session?.user?.id, 10);
  await createSession({ ...data, id: currentUser, userId: currentUser, added: true });

  swal('Success', 'created session', 'success', {
    timer: 1000,
  });
};

const CreateSessionPage: React.FC = () => {
  const { data: session, status } = useSession();
  const { register, handleSubmit, control } = useForm({
    resolver: yupResolver(CreateSessionSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }
  return (
    <div className="p-5">
      <h1 className="createSessionTitle text-center">
        <strong>Create Sessions</strong>
      </h1>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={10}>
            <Card className="cardBox">
              <Card.Body>
                <Form onSubmit={handleSubmit((data) => onSubmit(data, session))}>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Session Title</Form.Label>
                        <input type="text" {...register('title')} className="form-control" placeholder="Enter Title" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Controller
                          name="sessionDate"
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              selected={field.value}
                              className="form-control"
                              onChange={(date) => field.onChange(date)}
                              dateFormat="MMMM d, yyyy"
                              placeholderText="Select session date"
                              todayButton="Today"
                            />
                          )}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Start Time</Form.Label>
                        <Controller
                          name="startTime"
                          control={control}
                          render={({ field }) => (
                            <input
                              id="startTime"
                              type="time"
                              className="form-control"
                              value={field.value ? field.value.toTimeString().slice(0, 5) : ''}
                              onChange={(e) => {
                                const time = new Date();
                                const [hours, minutes] = e.target.value.split(':');
                                time.setHours(parseInt(hours, 10), parseInt(minutes, 10));
                                field.onChange(time);
                              }}
                            />
                          )}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>End Time</Form.Label>
                        <Controller
                          name="endTime"
                          control={control}
                          render={({ field }) => (
                            <input
                              id="endTime"
                              type="time"
                              className="form-control"
                              value={field.value ? field.value.toTimeString().slice(0, 5) : ''}
                              onChange={(e) => {
                                const time = new Date();
                                const [hours, minutes] = e.target.value.split(':');
                                time.setHours(parseInt(hours, 10), parseInt(minutes, 10));
                                field.onChange(time);
                              }}
                            />
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <input
                          type="text"
                          {...register('description')}
                          className="form-control"
                          placeholder="Enter Session Description"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Class</Form.Label>
                        <input type="text" {...register('class')} className="form-control" placeholder="Enter Class" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Place</Form.Label>
                        <input
                          type="text"
                          {...register('place')}
                          className="form-control"
                          placeholder="Where to study"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="form-group">
                    <Row className="pt-3">
                      <Col />
                      <Col />
                      <Col />
                      <Col>
                        <Button className="cSbutton" type="submit" variant="primary">
                          Add Session
                        </Button>
                      </Col>
                      <Col />
                      <Col />
                      <Col />
                    </Row>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateSessionPage;
