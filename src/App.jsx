import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import Form from "./components/Form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Route, Routes, useNavigate } from "react-router-dom";

let url = "http://localhost:3000/user";
const App = () => {
  
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [editIdx, setEditIdx] = useState("");
  const [error,setError] = useState({})
  const navi = useNavigate();

  useEffect(() => {
    handleFetch();
  }, []);
  
  

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validation()) return;

    if (editIdx == "") {
      await axios.post(url, { ...user, id: String(Date.now()) });
      toast.success("User added successfully", {});
    } else {
      await axios.put(`${url}/${editIdx}`, { ...user });
      toast.info("User updated successfully", {});
      setEditIdx("")
    }

    handleFetch();
    setUser({});
    navi("/table")
  };

  const handleFetch = async () => {
    let res = await axios.get(url);
    let data = res.data;
    setList(data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${url}/${id}`);
    toast.warn("User Deleted!!!", {});
    handleFetch()
  };

  const handleEdit = (id) => {
    let data = list.find((val) => val.id === id);
    setUser(data);
    setEditIdx(id);
    navi("/")
  };

  const validation = ()=>{
    let error = {};
    if(!user.email) error.email = "Email is required.";
    if(!user.password) error.password = "Password is required.";
    setError(error);
    return Object.keys(error).length === 0
  }

  return (
    <>
      <Routes> 
        <Route path="/" element={<Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        user={user} error={error}/>}
      />
      {/* <Route path="/form" element={<Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        user={user} error={error}/>}
      /> */}
      <Route path="/table" element={<Table handleDelete={handleDelete} handleEdit={handleEdit} list={list}/>}/>
      </Routes>
      
    

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
