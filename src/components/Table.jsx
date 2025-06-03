import React, { useState } from 'react'
import DataTable from 'react-data-table-component'

const Table = (props) => {

  let {handleDelete,handleEdit,list} = props


  const [textfilter, setTextfilter] = useState("");
  

  let userData = list.filter((val)=>{
    return val.email?.toLowerCase().includes(textfilter.toLowerCase())
  })

  let column = [
    {
      name:"Email",
      selector : (row)=> row.email,
      sortable : true
    },
    {
      name:"Password",
      selector : (row)=> row.password,
      sortable : true
    },
    {
      name:"Action",
      selector : (row)=> {
        return(
          <>
            <button className='btn btn-warning me-1' onClick={()=>handleEdit(row.id)}>Edit</button>
            <button className='btn btn-danger me-1' onClick={()=>handleDelete(row.id)}>Delete</button>
          </>
        )
      }
    }

  ]

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-7 mx-auto">
            <div className='d-flex justify-content-end mb-2'>
              <input type="text" name='search' className='px-3 py-1' placeholder='Search user...' 
              onChange={(e)=>setTextfilter(e.target.value)}/>
            </div>

            <DataTable
            title={"User Data : "}
            data={userData}
            columns={column}
            pagination
            selectableRows
            highlightOnHover
            pointerOnHover
            responsive
            fixedHeader
            fixedHeaderScrollHeight="300px"/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Table
