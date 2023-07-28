import { Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPatient } from "../features/patients/patientSlice";

function PatientEditForm({ selectedPatient, selectedPatientAll, setTrigger }) {
  const [patient, setPatient] = useState({
    fullName: selectedPatientAll.fullName,
    email: selectedPatientAll.email,
    contact: selectedPatientAll.contact,
    dob: selectedPatientAll.dob,
    profilePic: selectedPatientAll.profilePic,
    isStarred: selectedPatientAll.isStarred,
  });

  const dispatch = useDispatch();

  const { fullName, email, contact, dob, profilePic, isStarred } = patient;

  const onSubmit = (e) => {
    e.preventDefault();

    // form data
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("dob", dob);
    formData.append("profilePic", profilePic);
    formData.append("isStarred", isStarred);

    dispatch(editPatient({ id: selectedPatient, formData }));

    setTrigger(false);
  };

  const onChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      // if file is profilePic photo
      const file = event.target.files[0]; // access selected file from input
      setPatient((prevState) => ({
        ...prevState,
        profilePic: file,
      }));
    } else if (type === "checkbox") {
      var isTicked = false;
      var checkBox = document.getElementById("isStarred");
      if (checkBox.checked == true) {
        isTicked = true;
      } else {
        isTicked = false;
      }

      setPatient((prevState) => ({
        ...prevState,
        isStarred: isTicked,
      }));
    } else {
      setPatient((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit} enctype="multipart/form-data">
        <div className="form-group">
          <h2>Edit Patient Form:</h2>

          <label htmlFor="fullName">Full Name</label>
          <Input
            placeholder={selectedPatientAll.fullName}
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            variant="filled"
            mb={3}
            onChange={onChange}
          />

          <label htmlFor="email">Email</label>
          <Input
            placeholder={selectedPatientAll.email}
            type="email"
            id="email"
            name="email"
            value={email}
            variant="filled"
            mb={3}
            onChange={onChange}
          />

          <label htmlFor="contact">Phone Contact</label>
          <Input
            placeholder={selectedPatientAll.contact}
            type="number"
            id="contact"
            name="contact"
            value={contact}
            variant="filled"
            mb={3}
            onChange={onChange}
          />

          <label htmlFor="dob">Date of Birth</label>
          <Input
            placeholder={selectedPatientAll.dob}
            type="date"
            id="dob"
            name="dob"
            value={dob}
            variant="filled"
            mb={3}
            onChange={onChange}
          />

          <label htmlFor="profilePic">
            Replace Old Profile Picture (PNG only)
          </label>
          <Input
            placeholder="Profile Picture"
            type="file"
            id="profilePic"
            name="profilePic"
            variant="filled"
            mb={3}
            onChange={onChange}
          />
          <div className="form-group form-group--checkbox">
            <label htmlFor="isStarred">Special attention needed?</label>
            <Input
              checked={isStarred}
              type="checkbox"
              id="isStarred"
              name="isStarred"
              value={isStarred}
              variant="filled"
              mb={3}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-group">
          <Button className="btn" mb={8} type="submit">
            Confirm Edit
          </Button>
        </div>
      </form>
    </section>
  );
}

export default PatientEditForm;
