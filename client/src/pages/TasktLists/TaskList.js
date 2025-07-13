import React, { useEffect, useState } from "react";
import {
  fetchTasks,
  deleteEvent,
  createTask,
  updateTask,
} from "../../api/taskApi.js";
import { useNavigate } from "react-router-dom";
import "./TaskList.css";
import Button from "../../component/button/Button.js";
import Table from "../../component/table/Table.js";
import Form from "../../component/form/Form.js";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { getUserById } from "../../api/userApi.js";

const TaskList = () => {
  const [tasks, setTask] = useState([]);

  const [limit] = useState(5);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [popup, setPopup] = useState({ visible: false, message: "", type: "" });
  const [user, setUser] = useState(null);

  const showPopup = (message, type = "success") => {
    setPopup({ visible: true, message, type });
    setTimeout(() => {
      setPopup({ visible: false, message: "", type: "" });
    }, 3000);
  };

  const navigate = useNavigate();

  const loadTask = async () => {
    const params = {
      limit,
      search,
    };
    const res = await fetchTasks(params);
    setTask(res.data.data);
    console.log(res.data.data);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadTask();
    }, 400); // wait for user to stop typing

    const loadUserDetails = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const res = await getUserById(userId);
        setUser(res.data.data);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    loadUserDetails();

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure?")) {
        await deleteEvent(id);
        showPopup("Task Deleted Successfully", "success");
        loadTask();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showPopup("Session Expired. Please Login again.", "error");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await updateTask(editId, formData);
        showPopup("Task Updated Successfully!", "success");
      } else {
        await createTask(formData);
        showPopup("Task Created Successfully!", "success");
      }

      setFormData({});
      setEditId(null);
      setShowForm(false);
      loadTask();
    } catch (error) {
      console.error("Error submitting form:", error);
      showPopup("Session Expired. Please Login again.", "error");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  const handleEdit = (task) => {
    setFormData(task);
    setEditMode(true);

    setEditId(task._id);
    console.log("this is taskid", task.task_id);
    console.log("this is editid", editId);
    setShowForm(true);
  };

  const columns = [
    { header: "Task Title", accessor: "task_title" },
    // { header: "Date", accessor: "date" },
    { header: "Task Description", accessor: "task_description" },
    { header: "Priority", accessor: "priority" },
    { header: "Status", accessor: "status" },
    { header: "Assigned To", accessor: "assigned_to" },
  ];

  return (
    <div>
      <div className="container">
        {popup.visible && (
          <div className={`custom-popup ${popup.type}`}>{popup.message}</div>
        )}
        <h2 className="head-title">Tasks</h2>
        <span>
          Hello <strong>{user?.userName}!</strong>
        </span>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by task title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Button variant="register" onClick={() => setShowForm(true)}>
          <PlusOutlined />
          New Task
        </Button>
      </div>

      {/* Task Table */}
      <Table
        columns={columns}
        data={tasks}
        actions={(task) => (
          <>
            <div className="action-buttons">
              <Button onClick={() => handleEdit(task)}>
                <EditOutlined />
              </Button>
              <Button onClick={() => handleDelete(task._id)} variant="danger">
                <DeleteOutlined />
              </Button>
            </div>
          </>
        )}
      />

      {/* form data */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <Form
              fields={[
                {
                  name: "task_title",
                  label: "Task Title",
                  placeholder: "Task Title",
                  required: true,
                },
                {
                  name: "task_description",
                  label: "Description",
                  placeholder: "Description",
                  required: true,
                },
                {
                  name: "priority",
                  label: "Priority",
                  placeholder: "Priority",
                  required: true,
                },

                {
                  name: "status",
                  label: "Status",
                  placeholder: "Status",
                  required: true,
                },
                {
                  name: "assigned_to",
                  label: "Assigned To",
                  placeholder: "Assigned To",
                  required: true,
                },
              ]}
              values={formData}
              onChange={handleFormChange}
              onSubmit={handleFormSubmit}
              showForm={true}
              onClose={() => setShowForm(false)}
              title={editMode ? "Edit Task" : "Add New Task"}
              submitText={editMode ? "Update" : "Create"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
