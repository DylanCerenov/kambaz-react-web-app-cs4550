import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

export default function CopyQuizModal({
  show,
  handleClose,
  handleCopy,
  courseList,
  quiz,
}: {
  show: boolean;
  handleClose: () => void;
  handleCopy: (destinationCid: string) => void;
  courseList: any[];
  quiz: any;
}) {
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const handleSubmit = () => {
    if (selectedCourseId) {
      handleCopy(selectedCourseId);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Copy Quiz: {quiz?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="courseSelect">
            <Form.Label>Select Destination Course</Form.Label>
            <Form.Select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
            >
              <option value="">-- Select a course --</option>
              {courseList.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!selectedCourseId}>
          Copy
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
