import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import * as client from "../../Account/client";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { FormControl } from "react-bootstrap";

export default function PeopleDetails() {
  const { uid } = useParams();
  const [user, setUser] = useState<any>({});

  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    navigate("/Kambaz/Account/Users");
  };

  const [email, setEmail] = useState("");
  const [editingEmail, setEditingEmail] = useState(false);
  const saveUserEmail = async () => {
    const updatedUser = { ...user, email: email };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditingEmail(false);
    navigate("/Kambaz/Account/Users");
  };

  const [role, setRole] = useState("");
  const saveUserRole = async (roleStr: string) => {
    setRole(roleStr);
    const updatedUser = { ...user, role: roleStr };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    navigate("/Kambaz/Account/Users");
  };

  const navigate = useNavigate();

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate("/Kambaz/Account/Users");
  };

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };
  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={() => navigate("/Kambaz/Account/Users")}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />{" "}
      </button>
      <div className="text-center mt-2">
        {" "}
        <FaUserCircle className="text-secondary me-2 fs-1" />{" "}
      </div>
      <hr />
      <div className="text-danger fs-4 wd-name">
        {!editing && (
          <FaPencil
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}
        {editing && (
          <FaCheck
            onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}
        {!editing && (
          <div className="wd-name" onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}
          </div>
        )}
        {user && editing && (
          <FormControl
            className="w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveUser();
              }
            }}
          />
        )}
      </div>
      <div className="mt-3">
        {!editingEmail && (
          <FaPencil
            onClick={() => setEditingEmail(true)}
            className="float-end fs-5 wd-edit"
          />
        )}
        {editingEmail && (
          <FaCheck
            onClick={() => saveUserEmail()}
            className="float-end fs-5 wd-save"
          />
        )}
        {!editingEmail && (
          <div className="wd-name" onClick={() => setEditingEmail(true)}>
            <b>Email:</b> <span className="wd-email"> {user.email} </span>{" "}
            <br />
          </div>
        )}
        {user && editingEmail && (
          <div>
            <b>Email:</b>
            <FormControl
              className="wd-edit-name"
              type="email"
              defaultValue={user.email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveUserEmail();
                }
              }}
            />
          </div>
        )}
      </div>
      <div className="wd-name mt-2">
        <b>Role:</b>{" "}
        <select
          value={role}
          onChange={(e) => saveUserRole(e.target.value)}
          className="form-select"
        >
          <option value="STUDENT">Student</option>
          <option value="TA">Assistant</option>{" "}
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrator</option>
        </select>{" "}
        <br />
      </div>
      <b>Login ID:</b> <span className="wd-login-id"> {user.loginId} </span>{" "}
      <br />
      <b>Section:</b> <span className="wd-section"> {user.section} </span>{" "}
      <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user.totalActivity}</span> <hr />
      <button
        onClick={() => deleteUser(uid)}
        className="btn btn-danger float-end wd-delete"
      >
        {" "}
        Delete{" "}
      </button>
      <button
        onClick={() => navigate("/Kambaz/Account/Users")}
        className="btn btn-secondary float-start float-end me-2 wd-cancel"
      >
        {" "}
        Cancel{" "}
      </button>
    </div>
  );
}
