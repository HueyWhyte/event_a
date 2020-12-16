import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Redirect } from "react-router-dom";

import "./login.css";
import { UserProps } from "../../assets/types";
import { LOGIN } from "../../assets/queries";

const Login: React.FC = () => {
  const [values, setValues] = useState({});

  const [addUser, { loading }] = useMutation(LOGIN, {
    update(_, result) {
      let User: UserProps = result.data.login;
      console.log(User);
      localStorage.setItem("x-auth-token", User.token);
      localStorage.setItem("userId", User.id);

      <Redirect to="/" />;
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions);
    },
    variables: values,
  });

  if (loading) return <h1>Loading...</h1>;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const loginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUser();
  };

  return (
    <div>
      <section
        style={{
          boxShadow: "0 0 2em 0 rgba(64, 74, 128, 0.15)",
          backgroundColor: "white",
          marginTop: 100,
          width: "50%",
          borderRadius: 20,
          marginLeft: "auto",
          marginRight: "auto",
          padding: 6,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Login to our Account</h1>

        <form className="form_container" onSubmit={loginUser}>
          <input
            onChange={onChange}
            type="username"
            name="username"
            placeholder="Username"
          />
          <input
            onChange={onChange}
            type="password"
            name="password"
            placeholder="Password"
          />

          <input type="submit" value="Login" />
        </form>
      </section>
    </div>
  );
};

export default Login;
