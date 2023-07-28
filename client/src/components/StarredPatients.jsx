import { Flex, Image, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

function StarredPatients({
  patients,
  setSelectedPatient,
  setButtonPopupDelete,
  setSelectedPatientAll,
  setButtonPopupEdit,
}) {
  const [data, setData] = useState([]);
  const iterableArray = Object.values(patients);
  const countStarred = (iterableArray) => {
    var count = 0;
    iterableArray.map((i) => {
      if (i.isStarred == true) {
        count = count + 1;
      }
    });
    return count;
  };

  useEffect(() => {
    const starredPatients = patients.filter((patient) => patient.isStarred);
    const sortedStarredPatients = starredPatients.sort((a, b) =>
      a.fullName.localeCompare(b.fullName)
    );
    setData(sortedStarredPatients);
  }, [patients]);

  return (
    <>
      <section>
        {patients && countStarred(patients) > 0 ? (
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
              {data.map((i) => {
                return i.isStarred ? (
                  <tr>
                    <td>
                      <Image
                        boxSize="20px"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1600px-HD_transparent_picture.png?20200606142532"
                        alt="Not Special Attention Patient"
                        ml={8}
                        mt={10}
                        mr={5}
                      />
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
                ) : (
                  <p>&nbsp;</p>
                );
              })}
            </table>
          </div>
        ) : (
          <Flex mt={20} mb={30} alignItems="center" justifyContent="center">
            <Text>
              {" "}
              You have no Special Attention patients! Add a new patient or edit
              an existing patient as a Special Attention patient.{" "}
            </Text>
          </Flex>
        )}
      </section>
    </>
  );
}

export default StarredPatients;
