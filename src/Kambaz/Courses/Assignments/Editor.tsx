import {
  FormGroup,
  FormLabel,
  FormControl,
  Form,
  Col,
  Row,
  FormSelect,
  Button,
} from "react-bootstrap";
import { Link, useParams } from "react-router";
import { addAssignment, updateAssignment } from "./reducer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { v4 as uuidv4 } from "uuid";

function formatDate(year: number, month: number, day: number) {
  const monthStr = String(month).padStart(2, "0");
  const dayStr = String(day).padStart(2, "0");
  return `${year}-${monthStr}-${dayStr}`;
}

function stringDateToObject(inputDate: string) {
  const [year, month, day] = inputDate.split("-").map(Number);

  return {
    year: year,
    month: month,
    day: day,
    hour: 0,
    minute: 0,
  };
}

export default function AssignmentEditor() {
  let { cid, aid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const assignment = assignments.find((a: { _id: string }) => a._id === aid);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(assignment ? assignment.title : "");
  const [desc, setDesc] = useState(assignment ? assignment.desc : "");
  const [points, setPoints] = useState(assignment ? assignment.points : 100);
  const [dueDate, setDueDate] = useState(
    assignment
      ? formatDate(
          assignment.dueDate.year,
          assignment.dueDate.month,
          assignment.dueDate.day
        )
      : "2024-05-13"
  );
  const [availableDate, setAvailableDate] = useState(
    assignment
      ? formatDate(
          assignment.availableDate.year,
          assignment.availableDate.month,
          assignment.availableDate.day
        )
      : "2024-05-06"
  );
  const [untilDate, setUntilDate] = useState(
    assignment
      ? formatDate(
          assignment.dueDate.year,
          assignment.dueDate.month,
          assignment.dueDate.day
        )
      : "2024-05-13"
  );
  const saveAssignment = async (assignment: any) => {
    await assignmentsClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  const createAssignmentForCourse = async () => {
    if (!cid) return;

    if (aid === "New") {
      aid = uuidv4();
      const newAssignment = {
        _id: aid,
        title: title,
        course: cid,
        desc: desc,
        points: points,
        availableDate: stringDateToObject(availableDate),
        dueDate: stringDateToObject(dueDate),
      };

      const assignment = await coursesClient.createAssignmentForCourse(
        cid,
        newAssignment
      );
      dispatch(addAssignment(assignment));
    } else {
      // Updating
      const newAssignment = {
        _id: aid,
        title: title,
        course: cid,
        desc: desc,
        points: points,
        availableDate: stringDateToObject(availableDate),
        dueDate: stringDateToObject(dueDate),
      };

      saveAssignment(newAssignment);
    }
  };

  return (
    <div id="wd-assignments-editor" className="w-50">
      <FormGroup className="mb-3" controlId="wd-assignment-name">
        <FormLabel>Assignment Name</FormLabel>
        <FormControl
          placeholder="Title..."
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormGroup>

      <FormGroup className="mb-3" controlId="wd-textarea">
        <FormControl
          as="textarea"
          rows={3}
          placeholder="Description..."
          defaultValue={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </FormGroup>

      <Form.Group as={Row} className="mb-3" controlId="points">
        <Form.Label column sm={2} style={{ textAlign: "right" }}>
          Points
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="number"
            defaultValue={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="assignment-group">
        <Form.Label column sm={2} style={{ textAlign: "right" }}>
          Assignment Group
        </Form.Label>
        <Col sm={10}>
          <FormSelect>
            <option selected>ASSIGNMENTS</option>
          </FormSelect>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="display-grade-as">
        <Form.Label column sm={2} style={{ textAlign: "right" }}>
          Display Grade as
        </Form.Label>
        <Col sm={10}>
          <FormSelect>
            <option selected>Percentage</option>
          </FormSelect>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="submission-type">
        <Form.Label column sm={2} style={{ textAlign: "right" }}>
          Submission Type
        </Form.Label>
        <Col
          sm={10}
          className="wd-rounded-corners-all-around-alternate 
       wd-border-thin wd-border-gray wd-border-solid"
        >
          <FormSelect>
            <option selected>Online</option>
          </FormSelect>
          <br />
          <Form.Label>
            <b>Online Entry Options</b>
          </Form.Label>
          <Col sm={10}>
            <Form.Check label="Text Entry" />
            <Form.Check label="Website URL" />
            <Form.Check label="Media Recordings" />
            <Form.Check label="Student Annotation" />
            <Form.Check label="File Uploads" />
          </Col>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="assign">
        <Form.Label column sm={2} style={{ textAlign: "right" }}>
          Assign
        </Form.Label>
        <Col
          sm={10}
          className="wd-rounded-corners-all-around-alternate 
       wd-border-thin wd-border-gray wd-border-solid"
        >
          <Form.Label column sm={2}>
            <b>Assign to</b>
          </Form.Label>
          <Col sm={10}>
            <Form.Control value="Everyone" />
          </Col>
          <Form.Label column sm={2}>
            <b>Due</b>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              defaultValue={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Col>

          <div className="wd-flex-row-container">
            <div>
              <Form.Label column>
                <b>Available from</b>
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="date"
                  defaultValue={availableDate}
                  onChange={(e) => setAvailableDate(e.target.value)}
                />
              </Col>
            </div>

            <div>
              <Form.Label column sm={2}>
                <b>Until</b>
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="date"
                  defaultValue={untilDate}
                  onChange={(e) => setUntilDate(e.target.value)}
                />
              </Col>
            </div>
          </div>
        </Col>
      </Form.Group>

      <div dir="rtl">
        <div className="wd-flex-row-container">
          <Link
            to={`/Kambaz/Courses/${cid}/Assignments`}
            className="wd-dashboard-course-link text-decoration-none text-dark"
          >
            <Button
              variant="danger"
              size="lg"
              className="me-1 float-end"
              id="wd-add-module-btn"
              onClick={createAssignmentForCourse}
            >
              Save
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="me-1 float-end"
              id="wd-add-module-btn"
            >
              Cancel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
