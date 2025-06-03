import React from "react";

const Form = (props) => {

  let {handleChange,handleSubmit,user} = props
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-7 mx-auto mt-4">
            <form onSubmit={handleSubmit}>
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
