import { Button, ListGroup, Dropdown } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus, FaTrash, FaEllipsisV, FaCheck } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteQuiz, setQuizzes } from "./reducer";
import * as quizzesClient from "./client";
import DeleteModal from "./DeleteModal";
import * as coursesClient from "../client";
import CopyQuizModal from "./QuizCopyModal";
import { MdDoNotDisturb } from "react-icons/md";

export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [qid, setQid] = useState("");

  const [showCopyModal, setShowCopyModal] = useState(false);
  const [quizToCopy, setQuizToCopy] = useState<any>(null);
  const [courseList, setCourseList] = useState<any[]>([]);

  const fetchQuizzes = async () => {
    if (!cid) {
      throw new Error("skibidi");
    }

    const quizzes1 = await coursesClient.findQuizzesForCourse(cid);
    dispatch(setQuizzes(quizzes1));
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchCourses = async () => {
    const allCourses = await coursesClient.fetchAllCourses();
    setCourseList(allCourses.filter((c: any) => c._id !== cid)); // exclude current course
  };

  useEffect(() => {
    fetchQuizzes();
    fetchCourses();
  }, []);

  const removeQuiz = async (quizId: any) => {
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const togglePublish = async (quiz: any) => {
    const updatedQuiz = { ...quiz, published: !quiz.published };
    await quizzesClient.updateQuiz(updatedQuiz);
    fetchQuizzes();
  };

  const getAvailability = (quiz: any) => {
    const now = new Date();
    const availableDate = new Date(quiz["available date"]);
    const untilDate = new Date(quiz["until date"]);

    if (now > untilDate) {
      return "Closed";
    } else if (now >= availableDate && now <= untilDate) {
      return "Available";
    } else {
      return `Not available until ${quiz["available date"]}`;
    }
  };

  return (
    <div id="wd-quizzes">
      <div className="d-flex align-items-center w-100">
        {isFaculty && (
          <Button
            variant="primary"
            size="lg"
            className="ms-auto"
            id="wd-add-quiz"
            onClick={async () => {
              const newQuiz = {
                title: "New Quiz",
                points: 0,
                published: false,
                "number of questions": 0,
                "available date": new Date().toISOString(),
                "until date": new Date().toISOString(),
                "due date": new Date().toISOString(),
                "quiz type": "Graded Quiz",
                "assignment group": "Quizzes",
                "shuffle answers": true,
                "time limit": 20,
                "multiple attempts": false,
                "how many attempts": 1,
                "show correct answers": "Never",
                "access code": "",
                "one question at a time": true,
                "webcam required": false,
                "lock questions after answering": false,
              };

              const createdQuiz = await quizzesClient.createQuiz(cid!, newQuiz);
              fetchQuizzes();
              navigate(`/Kambaz/Courses/${cid}/Quizzes/${createdQuiz._id}`);
            }}
          >
            <FaPlus className="me-2" /> Quiz
          </Button>
        )}
      </div>
      <br />
      <ListGroup className="rounded-0" id="wd-quizzes-list">
        {quizzes.length === 0 ? (
          <p>No quizzes available. Click "Add Quiz" to create one.</p>
        ) : (
          quizzes
            .filter((quiz: any) => isFaculty || quiz.published) // Students only see published quizzes
            .map((quiz: any) => (
              <ListGroup.Item
                key={quiz._id}
                className="d-flex align-items-center"
              >
                <BsGripVertical className="me-2" />
                <div className="flex-grow-1">
                  {isFaculty ? (
                    <Link
                      to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
                      className="text-decoration-none"
                    >
                      <b>{quiz.title}</b>
                    </Link>
                  ) : (
                    <b>{quiz.title}</b>
                  )}
                  <div>
                    {getAvailability(quiz)} | {quiz.points} pts |{" "}
                    {quiz["number of questions"]} Questions | Due{" "}
                    {quiz["due date"]}
                  </div>
                </div>

                {/* Only show to faculty */}
                {isFaculty && (
                  <>
                    <Button
                      variant="link"
                      onClick={async () => await togglePublish(quiz)}
                    >
                      {quiz.published ? (
                        <FaCheck className="text-success" />
                      ) : (
                        <MdDoNotDisturb className="text-danger" />
                      )}
                    </Button>

                    {isFaculty && (
                      <Dropdown className="ms-2">
                        <Dropdown.Toggle
                          as="div"
                          style={{ cursor: "pointer" }}
                          id={`dropdown-${quiz._id}`}
                        >
                          <FaEllipsisV />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              navigate(
                                `/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/edit`
                              )
                            }
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setQid(quiz._id);
                              handleShow();
                            }}
                          >
                            Delete
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={async () => await togglePublish(quiz)}
                          >
                            {quiz.published ? "Unpublish" : "Publish"}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setQuizToCopy(quiz);
                              setShowCopyModal(true);
                            }}
                          >
                            Copy
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}

                    <FaTrash
                      className="text-danger ms-2"
                      onClick={() => {
                        setQid(quiz._id);
                        handleShow();
                      }}
                    />
                  </>
                )}
              </ListGroup.Item>
            ))
        )}
      </ListGroup>
      <CopyQuizModal
        show={showCopyModal}
        handleClose={() => setShowCopyModal(false)}
        handleCopy={async (destinationCid) => {
          const copiedQuiz = { ...quizToCopy };
          delete copiedQuiz._id;
          copiedQuiz.title += " (Copy)";
          await quizzesClient.createQuiz(destinationCid, copiedQuiz);
          fetchQuizzes();
        }}
        courseList={courseList}
        quiz={quizToCopy}
      />

      <DeleteModal
        show={show}
        handleClose={handleClose}
        deleteQuiz={removeQuiz}
        qid={qid}
      />
    </div>
  );
}
