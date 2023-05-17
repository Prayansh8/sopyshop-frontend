import React, { Fragment, useEffect } from "react";
import { getAllUsers } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./ProductList.css";
import { toast } from "react-toastify";

const Users = () => {
  const dispatch = useDispatch();
  const { users, error } = useSelector((state) => state.getAllUsers);

  const deleteUserHendeler = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getAllUsers());
  }, [error, dispatch]);

  const columns = [
    { field: "id", headerName: "user Id", minWidth: 300, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 300, flex: 1 },
    {
      field: "email",
      headerName: "Email",
      minWidth: 300,
      flex: 0.3,
    },
    {
      field: "role",
      role: "Role",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 180,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.id}`}>
              <EditIcon />
            </Link>
            <button
              className="deleteProductBtn"
              onClick={() => deleteUserHendeler(params.id)}
            >
              <DeleteIcon />
            </button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  {
    users &&
      users.forEach((user) => {
        rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        });
      });
  }
  return (
    <Fragment>
      <div>
        <div className="mainCont">
          <div className="rightCont">
            <Sidebar />
          </div>
          <div className="leftCont">
            <div className="AdminProductCont">
              <div className="ProductHed">
                <h2>All Users</h2>
              </div>
              <div className="ProductCreteBtn">
                <Link to={`/admin/create/user`}>
                  <button>Create User</button>
                </Link>
              </div>
            </div>
            <div className="DataGIrd">
              <DataGrid rows={rows} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Users;
