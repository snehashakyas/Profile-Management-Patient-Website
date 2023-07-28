import { Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { deletePatient } from "../features/patients/patientSlice";

function PatientDeleteForm({ selectedPatient, setTrigger }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePatient(selectedPatient));
    setTrigger(false); // Close the popup after deletion
  };

  return (
    <section className="form">
      <form>
        <div className="form-group">
          <h2>Are you sure you want to delete patient?</h2>
        </div>
        <div className="form-group">
          <Button className="btn" mb={8} onClick={handleDelete}>
            Confirm Delete
          </Button>
        </div>
      </form>
    </section>
  );
}

export default PatientDeleteForm;
