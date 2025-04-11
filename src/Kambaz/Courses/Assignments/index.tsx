import { Button, ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FaCaretDown, FaPlus, FaTrash } from "react-icons/fa6";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteAssignment, setAssignments } from "./reducer";
import DeleteModal from "./DeleteModal";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

function formatDate(date: {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}) {
  const { year, month, day, hour, minute } = date;

  const dateObj = new Date(year, month - 1, day, hour, minute);
  const datePart = dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  ``;
  const timePart = dateObj
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();
  return `${datePart} at ${timePart}`;
}

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [aid, setAid] = useState("");

  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(
      cid as string
    );
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const removeAssignment = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex align-items-center w-100">
        <div className="input-group w-50">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            id="wd-search-assignment"
          />
        </div>

        {isFaculty && (
          <Button
            variant="secondary"
            size="lg"
            className="me-1 ms-auto"
            id="wd-add-assignment-group"
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Group
          </Button>
        )}

        {isFaculty && (
          <Button
            variant="danger"
            size="lg"
            className="me-1 float-end"
            id="wd-add-assignment"
            onClick={() => {
              navigate("/Kambaz/Courses/" + cid + "/Assignments/New");
            }}
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Assignment
          </Button>
        )}
      </div>
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <div className="wd-flex-row-container">
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretDown />
              <div style={{ paddingLeft: "8px" }}>ASSIGNMENTS</div>
              <div className="container">
                <span className="badge rounded-pill border border-dark text-dark float-end">
                  40% of Total
                </span>
              </div>
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <Link
                  key={assignment._id}
                  to={assignment._id}
                  className="text-decoration-none"
                >
                  <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    <TfiWrite className="icon-padding me-2" />
                    <div className="flex-grow-1" style={{ padding: "8px" }}>
                      <b>{assignment.title}</b>
                      <div>
                        <div style={{ color: "red", display: "inline" }}>
                          Multiple Modules
                        </div>{" "}
                        | <b>Not available until</b>{" "}
                        {formatDate(assignment.availableDate)} | <b>Due</b>{" "}
                        {formatDate(assignment.dueDate)} | {assignment.points}{" "}
                        pts
                      </div>
                    </div>

                    <FaTrash
                      className="text-danger me-2 mb-1"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setAid(assignment._id);
                        handleShow();
                      }}
                    />

                    <LessonControlButtons />
                  </ListGroup.Item>
                </Link>
              ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>

      <DeleteModal
        show={show}
        handleClose={handleClose}
        deleteAssignment={(assignmentId) => removeAssignment(assignmentId)}
        aid={aid}
      />
    </div>
  );
}
