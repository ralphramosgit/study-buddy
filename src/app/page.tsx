'use client';

import { Col, Container, Row, Button, Image } from 'react-bootstrap';
import './globals.css';
import { useSession } from 'next-auth/react';

/** The Home page. */
const Home = () => {
  const { data: session } = useSession();

  const handleClick = () => {
    if (session) {
      window.location.href = '/sessions';
    } else {
      window.location.href = '/auth/signin';
    }
  };

  return (
    <main>
      <Container id="landing-page" fluid className="py-3">
        <Row id="home" className=" align-middle text-center vh-100">
          <Col xs={12} className="d-flex flex-column justify-content-center align-items-center">
            <h1 className="title">
              <strong>Study</strong>
            </h1>
            <h1 className="title">
              <strong>Buddy</strong>
            </h1>
            <h2 className="quote py-4">&quot;Your study success starts with a buddy&quot;</h2>
            <Button className="get-started" onClick={handleClick}>
              <span className="text-decoration-none" style={{ color: 'black' }}>
                Get Started
              </span>
            </Button>
          </Col>
        </Row>
        {/* <Row id="about" className="about-row vh-100">
          <h1 className="py-5 px-5">
            <strong>What is Study Buddy?</strong>
          </h1>
          <div className="container">
            <div className="overlay" />
            <p className="text">
              Study buddy is an application to find a buddy to study with. With study buddy, you can find and schedule
              study sessions.
            </p>
          </div>
        </Row> */}

        <Row id="about" className="about-row vh-100">
          <h1 className="mt-5 px-5">
            <strong>What Is Study Buddy?</strong>
          </h1>
          <Col className="about-col-centered pt-4">
            <Col className="about-col-centered px-5">
              <Image src="/owlbuddy.jpg" alt="Owl Buddy" className="aboutImg" />
            </Col>
            <Col className="about-col-centered px-5 ">
              <div className="aboutDes pt-4">
                <h3 className="aboutP">
                  Study buddy is an application to find a buddy to study with. With study buddy, you can find and
                  schedule study sessions. You can add specific details about your sessions such as date, time, class,
                  and place. Also feel free to find and add study playlists. Enjoy.
                </h3>
              </div>
            </Col>
          </Col>

          {/* <Row>
            <Col className="about-col">
              <img src="/images/landing-page.png" alt="landing page" className="about-img" />
            </Col>
            <Col>
              <div className="about">
                <p>
                  Study buddy is an application to find a buddy to study with. With study buddy, you can find and
                  schedule study sessions.
                </p>
              </div>
            </Col>
          </Row> */}
        </Row>
        <Row id="tutorial" className=" vh-100">
          <h1 className="mt-5 px-5">
            <strong>Tutorial</strong>
          </h1>
          <Col className="vid-col-centered">
            <div className="tutorialDiv pt-4">
              <iframe
                width="1100"
                height="618.75"
                src="https://www.youtube.com/embed/auDqvob7254?si=0sPUmew74mybzD63"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write;
                encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Home;
