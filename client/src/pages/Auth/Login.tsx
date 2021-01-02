import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";

import "./login.css";
import { UserProps } from "../../assets/types";
import { LOGIN } from "../../assets/queries";
import { logInUser } from "../../redux/actions/auth";

const Login: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});

  const [addUser, { loading }] = useMutation(LOGIN, {
    update(_, result) {
      let User: UserProps = result.data.login;
      dispatch(logInUser(User));
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

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

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

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});
export default connect(mapStateToProps)(Login);
