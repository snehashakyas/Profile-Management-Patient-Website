import { Heading, Flex, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import PatientForm from "../components/PatientForm";
import PatientEditForm from "../components/PatientEditForm";
import PatientDeleteForm from "../components/PatientDeleteForm";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { getPatients, reset2 } from "../features/patients/patientSlice";
import Popup from "../components/Popup";
import { toast } from "react-toastify";
import StarredPatients from "../components/StarredPatients";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // for user
  const { patients, isLoading, isError, message } = useSelector(
    (state) => state.patients
  ); // for patients
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopupEdit, setButtonPopupEdit] = useState(false);
  const [buttonPopupDelete, setButtonPopupDelete] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedPatientAll, setSelectedPatientAll] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!user) {
      // if no user
      navigate("/users/signin");
    }

    dispatch(getPatients());

    return () => {
      dispatch(reset2());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <Flex flexDirection="row" gap="20">
        <section className="heading">
          <p>Your Patients Dashboard</p>
        </section>
        <button className="btn" onClick={() => setButtonPopup(true)}>
          Add Patient
        </button>
      </Flex>
      <br></br>

      <section>
        <Flex flexDirection="row" gap="10">
          <Heading ml={50} mb={20}>
            Special Attention Patients
          </Heading>
          <Image
            boxSize="20px"
            src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3267823/yellow-star-icon-md.png"
            alt="Special Attention Patient"
            mt={6}
          />
        </Flex>
      </section>

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <PatientForm setTrigger={setButtonPopup} />
      </Popup>

      <Popup trigger={buttonPopupEdit} setTrigger={setButtonPopupEdit}>
        <PatientEditForm
          setTrigger={setButtonPopupEdit}
          selectedPatientAll={selectedPatientAll}
          selectedPatient={selectedPatient}
        />
      </Popup>

      <Popup trigger={buttonPopupDelete} setTrigger={setButtonPopupDelete}>
        <PatientDeleteForm
          setTrigger={setButtonPopupDelete}
          selectedPatient={selectedPatient}
        />
      </Popup>

      {patients && patients.length > 0 ? (
        <StarredPatients
          patients={patients}
          setSelectedPatient={setSelectedPatient}
          setButtonPopupDelete={setButtonPopupDelete}
          setSelectedPatientAll={setSelectedPatientAll}
          setButtonPopupEdit={setButtonPopupEdit}
        />
      ) : (
        <Flex alignItems="center" justifyContent="center">
          <p>
            {" "}
            You have no Special Attention patients! Add a new patient or edit an
            existing patient as a Special Attention patient.{" "}
          </p>
        </Flex>
      )}

      <br></br>

      <section>
        <Heading ml={50} mb={20}>
          All Patients
        </Heading>

        {patients && patients.length > 0 ? (
          <div>
            <table>
              <tr>
                <th></th>
                <th>&nbsp;</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Contact</th>
                <th>Date of Birth</th>
                <th>Actions</th>
                <th></th>
              </tr>
              {patients.map((i) => {
                return (
                  <tr>
                    <td>
                      {i.isStarred ? (
                        <Image
                          boxSize="20px"
                          src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3267823/yellow-star-icon-md.png"
                          alt="Special Attention Patient"
                          ml={8}
                          mt={10}
                          mr={5}
                        />
                      ) : (
                        <Image
                          boxSize="20px"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1600px-HD_transparent_picture.png?20200606142532"
                          alt="Not Special Attention Patient"
                          ml={8}
                          mt={10}
                          mr={5}
                        />
                      )}
                    </td>
                    <td>
                      <p>
                        <Image
                          mt={10}
                          src={`http://localhost:3002/${i.profilePic.substring(
                            7
                          )}`}
                          height="80px"
                          width="80px"
                        />
                      </p>
                    </td>
                    <td>{i.fullName} </td>
                    <td>{i.email} </td>
                    <td>{i.contact} </td>
                    <td>{i.dob} </td>
                    <td>
                      <Flex flexDirection="row" gap="15">
                        <button
                          onClick={() => {
                            setSelectedPatient(i._id);
                            setButtonPopupDelete(true);
                          }}
                          className="btn-delete"
                        >
                          DELETE
                        </button>
                        <button
                          className="btn-edit"
                          onClick={() => {
                            setSelectedPatientAll(i);
                            setSelectedPatient(i._id);
                            setButtonPopupEdit(true);
                          }}
                        >
                          EDIT
                        </button>
                      </Flex>
                    </td>
                    <td>
                      <Image
                        boxSize="20px"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1600px-HD_transparent_picture.png?20200606142532"
                        alt=""
                        ml={0}
                        mt={10}
                        mr={0}
                      />
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        ) : (
          <Flex alignItems="center" justifyContent="center">
            <p>
              {" "}
              You have no patients! Click the 'Add Patient' button above to add
              your patients to your patient portal.{" "}
            </p>
          </Flex>
        )}
      </section>
      <br></br>
    </>
  );
}

export default Dashboard;
