import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addEnrollment, deleteEnrollment } from "./reducer";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";
  const isStudent = currentUser.role === "STUDENT";
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const [enrollmentsButtonToggled, setEnrollmentsButtonToggled] =
    useState(false);
  const dispatch = useDispatch();

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {isFaculty && (
        <div>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              {" "}
              Add{" "}
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </div>
      )}
      {isStudent && (
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={() => {
            setEnrollmentsButtonToggled(!enrollmentsButtonToggled);
          }}
        >
          Enrollments
        </button>
      )}
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>{" "}
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
            .filter((course) => {
              if (enrollmentsButtonToggled) {
                return enrollments.some(
                  (enrollment: { user: any; course: any }) =>
                    enrollment.user === currentUser._id &&
                    enrollment.course === course._id
                );
              } else {
                return true;
              }
            })
            .map((course) => (
              <Col className="wd-dashboard-course" style={{ width: "260px" }}>
                <Card>
                  <Link
                    to={`/Kambaz/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img
                      variant="top"
                      src="/images/reactjs.jpg"
                      width="100%"
                      height={160}
                    />
                    <Card.Body>
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </Card.Title>
                      <Card.Text
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </Card.Text>
                      <Button variant="primary">Go</Button>

                      {isFaculty && (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                      )}
                      {isFaculty && (
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      )}

                      {isStudent &&
                        enrollments.some(
                          (enrollment: { user: any; course: any }) =>
                            enrollment.user === currentUser._id &&
                            enrollment.course === course._id
                        ) && (
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(
                                deleteEnrollment({
                                  userId: currentUser._id,
                                  courseId: course._id,
                                })
                              );
                            }}
                            className="btn btn-danger me-2 float-end"
                          >
                            Unenroll
                          </button>
                        )}
                      {isStudent &&
                        !enrollments.some(
                          (enrollment: { user: any; course: any }) =>
                            enrollment.user === currentUser._id &&
                            enrollment.course === course._id
                        ) && (
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(
                                addEnrollment({
                                  user: currentUser._id,
                                  course: course._id,
                                })
                              );
                            }}
                            className="btn btn-success me-2 float-end"
                          >
                            Enroll
                          </button>
                        )}
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}
