'use client';

import React, { useState, ChangeEvent } from 'react';
import s3 from '@/lib/s3';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import { BoxArrowInUp } from 'react-bootstrap-icons';
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
    image: string;
  },
  session: any,
) => {
  const currentUser = parseInt(session?.user?.id, 10);
  await createSession({ ...data, id: currentUser, userId: currentUser });

  swal('Success', 'created session', 'success', {
    timer: 1000,
  });
};

const CreateSessionPage: React.FC = () => {
  const { data: session, status } = useSession();
  const [image, setImage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateSessionSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  function handleImgUpload(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const uploadParams = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET!,
        Key: `public/${Date.now()}_${file.name}`,
        Body: file,
        ContentType: file.type,
      };

      s3.upload(uploadParams, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
        if (err) {
          console.error('Error uploading image:', err);
        } else {
          console.log('Image uploaded successfully:', data.Location);
          setValue('image', data.Location);
          setImage(data.Location);
        }
      });
    }
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
                        <input
                          type="text"
                          {...register('title')}
                          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                          placeholder="Enter Title"
                        />
                        <div className="invalid-feedback" />
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
                              className={`form-control ${errors.sessionDate ? 'is-invalid' : ''}`}
                              onChange={(date) => field.onChange(date)}
                              dateFormat="MMMM d, yyyy"
                              placeholderText="Select session date"
                              todayButton="Today"
                            />
                          )}
                        />
                        <div className="invalid-feedback" />
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
                              className={`form-control ${errors.startTime ? 'is-invalid' : ''}`}
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
                        <div className="invalid-feedback" />
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
                              className={`form-control ${errors.endTime ? 'is-invalid' : ''}`}
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
                        <div className="invalid-feedback" />
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
                          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                          placeholder="Enter Session Description"
                        />
                        <div className="invalid-feedback" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Session Image</Form.Label>
                        <div className="imageDiv">
                          <div className="sessionImg">
                            {image ? (
                              <Image src={image} alt="Session Image" className="uploaded-image" />
                            ) : (
                              <div className="placeholder-image py-3">
                                No image
                                <br />
                                uploaded
                              </div>
                            )}
                          </div>
                          <div className="addBtnDiv">
                            <Button
                              className="add-icon-circle"
                              onClick={() => document.getElementById('image')?.click()}
                            >
                              <span className="add-icon">
                                <i className="bi bi-box-arrow-in-up" />
                                <BoxArrowInUp />
                              </span>
                            </Button>
                          </div>
                        </div>
                        <input
                          id="image"
                          type="file"
                          accept="image/png, image/jpeg image/jpg"
                          style={{ display: 'none' }}
                          onChange={handleImgUpload}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          <Form.Group>
                            <Form.Label>Class</Form.Label>
                            <input
                              type="text"
                              {...register('class')}
                              className={`form-control ${errors.class ? 'is-invalid' : ''}`}
                              placeholder="Enter Class"
                            />
                            <div className="invalid-feedback" />
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
                              className={`form-control ${errors.place ? 'is-invalid' : ''}`}
                              placeholder="Where to study"
                            />
                            <div className="invalid-feedback" />
                          </Form.Group>
                        </Col>
                      </Row>
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
