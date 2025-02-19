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
import * as db from "../../Database";

function formatDate(year: number, month: number, day: number) {
  const monthStr = String(month).padStart(2, "0");
  const dayStr = String(day).padStart(2, "0");
  return `${year}-${monthStr}-${dayStr}`;
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignments = db.assignments;
  const assignment = assignments.find((a) => a._id === aid);

  return (
    <div id="wd-assignments-editor" className="w-50">
      <FormGroup className="mb-3" controlId="wd-assignment-name">
        <FormLabel>Assignment Name</FormLabel>
        <FormControl
          placeholder="Title..."
          defaultValue={assignment ? assignment.title : ""}
        />
      </FormGroup>
      <FormGroup className="mb-3" controlId="wd-textarea">
        <FormControl
          as="textarea"
          rows={3}
          placeholder="Description..."
          defaultValue={assignment ? assignment.desc : ""}
        />
      </FormGroup>

      <Form.Group as={Row} className="mb-3" controlId="points">
        <Form.Label column sm={2} style={{ textAlign: "right" }}>
          Points
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="number"
            defaultValue={assignment ? assignment.points : "100"}
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
              defaultValue={
                assignment
                  ? formatDate(
                      assignment.dueDate.year,
                      assignment.dueDate.month,
                      assignment.dueDate.day
                    )
                  : "2024-05-13"
              }
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
                  defaultValue={
                    assignment
                      ? formatDate(
                          assignment.availableDate.year,
                          assignment.availableDate.month,
                          assignment.availableDate.day
                        )
                      : "2024-05-06"
                  }
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
                  defaultValue={
                    assignment
                      ? formatDate(
                          assignment.dueDate.year,
                          assignment.dueDate.month,
                          assignment.dueDate.day
                        )
                      : "2024-05-13"
                  }
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
