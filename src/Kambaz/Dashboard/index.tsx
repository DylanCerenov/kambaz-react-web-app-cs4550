import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "260px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/reactjs.jpg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS1234 React JS
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Full Stack software developer
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "260px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/4400/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/programming-languages.jpg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS4400 Programming Languages
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Programming Languages!
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "260px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/4550/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/web-dev.jpg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS4550 Web Dev
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Learn Web Dev!
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "260px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/4700/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/networks.jpg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS4700 Networks
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Learn networks
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "260px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/3000/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/algorithms.jpg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS3000 Algorithms
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Learn algorithms!
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "260px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/4730/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/dist-sys.jpg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS4730 Distributed Systems
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Distributed Systems!
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "260px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/3200/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/databases.jpg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS3200 Databases
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Relational databases!
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
