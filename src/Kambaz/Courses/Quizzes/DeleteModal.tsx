import { Modal, Button } from "react-bootstrap";
export default function DeleteModal({
  show,
  handleClose,
  deleteQuiz,
  qid,
}: {
  show: boolean;
  handleClose: () => void;
  deleteQuiz: (quizId: string) => void;
  qid: string;
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {" "}
          Cancel{" "}
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            deleteQuiz(qid);
            handleClose();
          }}
        >
          {" "}
          Ok{" "}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
