import { useState, useEffect } from "react";
import { FaUsers, FaSave, FaTrash } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../../../../ApiUrl";

const UsersPage = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [editedRoles, setEditedRoles] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user`, {
          headers: { Authorization: localStorage?.getItem("token") },
        });
        const { Users, success, message } = res.data;
        if (success) {
          setUsers(
            Users.map((u) => ({
              id: u._id,
              name: u.username,
              email: u.email,
              role: u.role,
            }))
          );
        } else toast.error(message);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = (id, role) =>
    setEditedRoles({ ...editedRoles, [id]: role });

  const handleRoleSubmit = async (id) => {
    const newRole = editedRoles[id];
    if (!newRole) return;
    const toastId = toast.loading("Updating role...");
    setLoading(true);
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/user/${id}`,
        { role: newRole },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      const { success, message } = res.data;
      if (success) {
        toast.success("Role Updated!", { id: toastId });
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
        );
      } else toast.error(message || "Not authorized!", { id: toastId });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting user...");
    setLoading(true);
    try {
      const res = await axios.delete(`${API_BASE_URL}/user/${id}`, {
        headers: { Authorization: localStorage?.getItem("token") },
      });
      const { success, message } = res.data;
      if (success) {
        toast.success("User deleted.", { id: toastId });
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else toast.error(message || "Not authorized!", { id: toastId });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase());
    const matchRole = !roleFilter || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const filter = (role) => setRoleFilter(roleFilter === role ? "" : role);

  return (
    <div className="container-fluid py-3">
      <Toaster position="top-center" />
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="card-title mb-3 d-flex align-items-center gap-2">
            <FaUsers className="text-primary" />
            Manage Users
          </h5>

          <input
            type="text"
            className="form-control mb-3 bg-light"
            placeholder="🔍 Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Filter Section */}
          <div className="filters mb-3">
            <div className="fw-bold mb-2">Filters:</div>
            <div className="d-flex flex-wrap gap-2">
              {[
                { label: "All", color: "secondary", value: "" },
                { label: "Admin", color: "danger", value: "admin" },
                { label: "Manager", color: "warning text-dark", value: "manager" },
                { label: "User", color: "success", value: "user" },
              ].map(({ label, color, value }) => (
                <span
                  key={value || "all"}
                  onClick={() => filter(value)}
                  className={`badge rounded-pill px-3 py-2 ${
                    roleFilter === value ? `bg-${color}` : "bg-light text-dark border"
                  }`}
                  style={{ cursor: "pointer", fontSize: "0.85rem" }}
                >
                  {label} ({value ? users.filter((u) => u.role === value).length : users.length})
                </span>
              ))}
            </div>
          </div>

          {/* Filter info */}
          {roleFilter && (
            <div className="alert alert-info py-2 d-flex flex-wrap justify-content-between align-items-center">
              <span className="small mb-1 mb-sm-0">
                Showing users with role: <strong>{roleFilter}</strong>
              </span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setRoleFilter("")}
              >
                Clear Filter
              </button>
            </div>
          )}

          {/* Desktop Table */}
          <div className="d-none d-md-block table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => {
                  const changed = editedRoles[u.id] && editedRoles[u.id] !== u.role;
                  return (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          defaultValue={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        >
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                          <option value="user">User</option>
                        </select>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-primary"
                            disabled={!changed || loading}
                            onClick={() => handleRoleSubmit(u.id)}
                          >
                            <FaSave />
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            disabled={loading}
                            onClick={() => handleDelete(u.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="d-block d-md-none">
            {filteredUsers.map((u) => {
              const changed = editedRoles[u.id] && editedRoles[u.id] !== u.role;
              return (
                <div className="card border-0 shadow-sm mb-3" key={u.id}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="fw-bold text-truncate">{u.name}</h6>
                        <small className="text-muted text-truncate d-block mb-2">
                          {u.email}
                        </small>
                      </div>
                      <span
                        className={`badge ${
                          u.role === "admin"
                            ? "bg-danger"
                            : u.role === "manager"
                            ? "bg-warning text-dark"
                            : "bg-success"
                        }`}
                      >
                        {u.role}
                      </span>
                    </div>

                    <div className="mt-2">
                      <label className="form-label small mb-1">Change Role</label>
                      <select
                        className="form-select form-select-sm"
                        defaultValue={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      >
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="user">User</option>
                      </select>
                    </div>

                    <div className="mt-3 d-flex gap-2">
                      <button
                        className="btn btn-sm btn-primary w-100"
                        disabled={!changed || loading}
                        onClick={() => handleRoleSubmit(u.id)}
                      >
                        <FaSave className="me-1" /> Save
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        disabled={loading}
                        onClick={() => handleDelete(u.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-4 text-muted">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
