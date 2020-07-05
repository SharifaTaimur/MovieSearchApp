import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    //video #124
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault(); // video #113

    const errors = this.validate();
    this.setState({ errors: errors || {} }); //video #121

    // if we have erros we return imediately we wont call the server
    if (errors) return;

    //call the server
    console.log("submitted");
  };

  validateProperty = ({ name, value }) => {
    //video #125
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
    // if (error) return error.details[0].message;
    // return null;
  };

  // Mosh way video #115 controlled elemments
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  // other way
  //   handleChange = (e) => {
  //     const { name, value } = e.target;
  //     const data = { ...this.state.data };
  //     data[name] = value;
  //     this.setState({ data });
  //   };

  render() {
    const { data, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            value={data.username}
            name="username"
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            value={data.password}
            name="password"
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          {/* <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              value={data.username}
              name="username"
              onChange={this.handleChange}
              id="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={data.password}
              name="password"
              onChange={this.handleChange}
              id="password"
              type="text"
              className="form-control"
            />
          </div> */}

          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
