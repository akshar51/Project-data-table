import React from "react";
import Navbar from "../components/Navbar";


const Form = (props) => {

  let {handleChange,handleSubmit,user,error} = props
  return (
    <>
    <Navbar/>
      <div className="container">
        <div className="row">
          <div className="col-md-7 mx-auto mt-4">
            <form onSubmit={handleSubmit}>
              <h1 className="text-center">Sign Up</h1>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email : 
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={user.email || ""}
                />
                {
                  error.email && <span className="fw-bold text-danger">{error.email}</span>
                }
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password : 
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={user.password || ""}
                />
                {
                  error.password && <span className="fw-bold text-danger">{error.password}</span>
                }
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
