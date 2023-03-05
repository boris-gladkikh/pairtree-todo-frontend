import { Modal, Button } from "react-bootstrap";

function ClearListConfirmDialog({ showModal, handleClose, handleDeleteAll }) {
  
  const deleteAndClose = () => {
    handleDeleteAll();
    handleClose();
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Modal.Title>Are you sure you want to clear your list?</Modal.Title>
          <p>This can not be undone!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteAndClose}>
            Delete List
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ClearListConfirmDialog;
