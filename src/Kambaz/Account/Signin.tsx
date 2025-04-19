import { Button, FormControl } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kambaz/Dashboard");
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl
        defaultValue={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        className="mb-2"
        placeholder="username"
        id="wd-username"
      />
      <FormControl
        defaultValue={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        className="mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />
      <Button onClick={signin} id="wd-signin-btn" className="w-100">
        {" "}
        Sign in{" "}
      </Button>
      <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
        {" "}
        Sign up{" "}
      </Link>

      <br />
      <br />
      <br />

      <p>CS 4500 - Final Project</p>
      <ul>
        <li>Dylan Cerenov</li>
        <li>Avery Leiss</li>
        <li>Declan Lowney</li>
        <li>Elizabeth McDowell</li>
        <li>Ella Zaugg-James</li>
      </ul>

      <Link
        id="backend-link"
        to="https://github.com/Declan211/cs4550-project-frontend"
      >
        Frontend Github Repo
      </Link>
      <br />
      <Link
        id="backend-link"
        to="https://github.com/Declan211/cs4550-project-backend"
      >
        Backend Github Repo
      </Link>
    </div>
  );
}
