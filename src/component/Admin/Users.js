import React, { Fragment, useEffect } from "react";
import { deleteUserByAdmin, getAllUsers } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./ProductList.css";
import { toast } from "react-toastify";
import MobileAdminBar from "./MobileAdminBar";

const Users = () => {
  const dispatch = useDispatch();
  const { users, error } = useSelector((state) => state.getAllUsers);

  const deleteUserHendeler = (id) => {
    dispatch(deleteUserByAdmin(id));
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getAllUsers());
  }, [error, dispatch]);

  const columns = [
    { field: "id", headerName: "user Id", minWidth: 250, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 250, flex: 1 },
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

  users &&
    users.forEach((user) => {
      rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    });

  return (
    <Fragment>
      <div>
        <div className="mobileTopBarContainer">
          <MobileAdminBar />
        </div>
        <div className="mainCont">
          <div className="rightContAdmin">
            <Sidebar />
          </div>
          <div className="leftContAdmin">
            <div className="AdminProductCont">
              <div>
                <h2>All Users</h2>
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
