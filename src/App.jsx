import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import Form from "./components/Form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


const App = () => {
  let url = "http://localhost:3000/user";
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [editIdx, setEditIdx] = useState("");

  useEffect(() => {
    handleFetch();
  }, []);
  
  

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editIdx == "") {
      await axios.post(url, { ...user, id: String(Date.now()) });
      toast.success("User added successfully", {});
    } else {
      await axios.put(`${url}/${editIdx}`, { ...user });
      toast.info("User updated successfully", {});
    }

    handleFetch();
  };

  const handleFetch = async () => {
    let res = await axios.get(url);
    let data = res.data;
    setList(data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${url}/${id}`);
    toast.warn("User Deleted!!!", {});
  };

  const handleEdit = (id) => {
    let data = list.find((val) => val.id === id)[0];
    setUser(data);
    setEditIdx(id);
  };

  return (
    <>
      <Navbar />
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        user={user}
      />
    <Table handleDelete={handleDelete} handleEdit={handleEdit} list={list}/>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
