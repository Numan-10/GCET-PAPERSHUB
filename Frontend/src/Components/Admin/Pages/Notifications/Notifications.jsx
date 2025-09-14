import React, { useState, useEffect } from "react";
import { MdAdd, MdEdit, MdDelete, MdLink } from "react-icons/md";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../../../../ApiUrl";
import { IoNotificationsOffCircleOutline } from "react-icons/io5";
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ message: "", link: "" });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/notifications`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      if (data.success) setNotifications(data.notifications.reverse());
      else setNotifications([]);
    } catch {
      toast.error("Failed to load notifications");
      setNotifications([]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) return toast.error("Message required");

    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };

    try {
      if (editId)
        await axios.put(
          `${API_BASE_URL}/notifications/${editId}`,
          form,
          config
        );
      else await axios.post(`${API_BASE_URL}/notifications`, form, config);

      toast.success(editId ? "Updated!" : "Added!");
      resetForm();
      fetchNotifications();
    } catch {
      toast.error("Failed to save");
    }
  };

  const handleEdit = (item) => {
    setForm({ message: item.message, link: item.link || "" });
    setEditId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/notifications/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      toast.success("Deleted!");
      fetchNotifications();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const resetForm = () => {
    setForm({ message: "", link: "" });
    setShowForm(false);
    setEditId(null);
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Notifications</h3>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <MdAdd className="me-1" /> Add
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card mb-4 p-3">
          <form onSubmit={handleSave}>
            <textarea
              className="form-control mb-3"
              rows="3"
              placeholder="Write notification message..."
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            <input
              type="url"
              className="form-control mb-3"
              placeholder="Link (optional)"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
            />

            <div>
              <button type="submit" className="btn btn-success me-2">
                {editId ? "Update" : "Save"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {notifications.length === 0 ? (
        <div className="text-center text-muted py-4">
          <p>
            <IoNotificationsOffCircleOutline size={70}/>
          </p>
          <p className="">No notifications yet.</p>
        </div>
      ) : (
        notifications.map((item) => (
          <div key={item._id} className="card mb-3">
            <div className="card-body">
              <p className="mb-3">{item.message}</p>

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm"
                    >
                      <MdLink className="me-1" /> Visit Link
                    </a>
                  )}
                </div>

                <div className="d-flex gap-1">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleEdit(item)}
                  >
                    <MdEdit />
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      <Toaster position="top-center" />
    </div>
  );
};

export default Notifications;
