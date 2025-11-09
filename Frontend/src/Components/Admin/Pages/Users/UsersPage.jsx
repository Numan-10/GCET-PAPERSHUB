import { useState, useEffect } from "react";
import { FaUsers, FaSave, FaTrash } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../../../../ApiUrl";

const UsersPage = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState(""); // Add role filter state
  const [users, setUsers] = useState([
    {
      id: "",
      name: "",
      email: "",
      role: "",
    },
  ]);
  const [editedRoles, setEditedRoles] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user`, {
          headers: {
            Authorization: localStorage?.getItem("token"),
          },
        });
        const { Users, success, message } = response.data;
        console.log(Users);
        if (success) {
          setLoading(false);
          const showUsers = Users.map((user) => ({
            id: user._id,
            name: user.username,
            email: user.email,
            role: user.role,
          }));
          setUsers(showUsers);
        } else {
          toast.error(message);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = (id, role) => {
    setEditedRoles({ ...editedRoles, [id]: role });
  };

  const handleRoleSubmit = async (id) => {
    const newRole = editedRoles[id];
    if (!newRole) return;

    setLoading(true);
    const toastId = toast.loading("Updating role...");
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/user/${id}`,
        {
          role: newRole,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const { success, message } = response.data;
      if (success) {
        toast.success("Role Updated!", { id: toastId });
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, role: newRole } : user
          )
        );
      } else {
        toast.error(message || "You are not authorized!", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to update.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const toastId = toast.loading("Deleting user...");
    try {
      const response = await axios.delete(`${API_BASE_URL}/user/${id}`, {
        headers: {
          Authorization: localStorage?.getItem("token"),
        },
      });
      const { success, message } = response.data;
      if (success) {
        toast.success("User deleted.", { id: toastId });
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } else {
        toast.error(message || "You are not authorized!", { id: toastId });
      }
    } catch(err) {
      toast.error( err.response?.data?.message ||"Failed to delete.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // Updated filtering logic - both search and role filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      ?.toLowerCase()
      .includes(search?.toLowerCase());
    const matchesRole =
      roleFilter === "" ||
      user.role?.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  // Filter function for badges
  const filter = (role) => {
    if (roleFilter === role) {
      setRoleFilter(""); // Clear filter if same role clicked
    } else {
      setRoleFilter(role); // Set new filter
    }
  };

  return (
    <div className="container-fluid py-3">
      <Toaster position="top-center" />

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3 d-flex align-items-center gap-2">
            <FaUsers className="text-primary" />
            Manage Users
          </h5>

          <input
            type="text"
            className="form-control mb-3 bg-light"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Responsive Filters - Stack on mobile */}
          <div className="filters mb-3">
            <div className="fw-bold mb-2">Filters:</div>
            <div className="d-flex flex-wrap gap-2">
              {/* All Users Filter */}
              <span
                className={`badge p-2 ${
                  roleFilter === "" ? "text-bg-primary" : "text-bg-secondary"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setRoleFilter("")}
              >
                All ({users.length})
              </span>

              {/* Admin Filter */}
              <span
                className={`badge p-2 ${
                  roleFilter === "admin"
                    ? "text-bg-danger"
                    : "text-bg-light text-dark border"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => filter("admin")}
              >
                Admin ({users.filter((u) => u.role === "admin").length})
              </span>

              {/* Manager Filter */}
              <span
                className={`badge p-2 ${
                  roleFilter === "manager"
                    ? "text-bg-warning"
                    : "text-bg-light text-dark border"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => filter("manager")}
              >
                Manager ({users.filter((u) => u.role === "manager").length})
              </span>

              {/* User Filter */}
              <span
                className={`badge p-2 ${
                  roleFilter === "user"
                    ? "text-bg-success"
                    : "text-bg-light text-dark border"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => filter("user")}
              >
                User ({users.filter((u) => u.role === "user").length})
              </span>
            </div>
          </div>

          {/* Show active filter - responsive */}
          {roleFilter && (
            <div className="alert alert-info d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
              <span className="small">
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

          {/* Table for Desktop (hidden on mobile) */}
          <div className="d-none d-md-block">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => {
                    const isChanged =
                      editedRoles[user.id] &&
                      editedRoles[user.id] !== user.role;
                    return (
                      <tr key={user.id}>
                        <td
                          className="text-truncate"
                          style={{ maxWidth: "150px" }}
                        >
                          {user.name}
                        </td>
                        <td
                          className="text-truncate"
                          style={{ maxWidth: "200px" }}
                        >
                          {user.email}
                        </td>
                        <td>
                          <select
                            className="form-select form-select-sm"
                            defaultValue={user.role}
                            onChange={(e) =>
                              handleRoleChange(user.id, e.target.value)
                            }
                          >
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="user">User</option>
                          </select>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              user.role === "admin"
                                ? "bg-danger"
                                : user.role === "manager"
                                ? "bg-warning"
                                : "bg-success"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-sm btn-primary"
                              disabled={!isChanged || loading}
                              onClick={() => handleRoleSubmit(user.id)}
                              title="Save"
                            >
                              <FaSave />
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              disabled={loading}
                              onClick={() => handleDelete(user.id)}
                              title="Delete"
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
          </div>

          {/* Cards for Mobile (hidden on desktop) - Original responsive design */}
          <div className="d-block d-md-none">
            {filteredUsers.map((user) => {
              const isChanged =
                editedRoles[user.id] && editedRoles[user.id] !== user.role;
              return (
                <div className="card mb-3" key={user.id}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="flex-grow-1 me-2">
                        <h6 className="card-title fw-bold mb-1 text-truncate">
                          {user.name}
                        </h6>
                        <p className="card-text text-muted small mb-0 text-truncate">
                          {user.email}
                        </p>
                      </div>
                      <span
                        className={`badge ${
                          user.role === "admin"
                            ? "bg-danger"
                            : user.role === "manager"
                            ? "bg-warning text-dark"
                            : "bg-success"
                        }`}
                      >
                        {user.role}
                      </span>
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-bold">
                        Change Role
                      </label>
                      <select
                        className="form-select form-select-sm"
                        defaultValue={user.role}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                      >
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="user">User</option>
                      </select>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-primary flex-fill"
                        disabled={!isChanged || loading}
                        onClick={() => handleRoleSubmit(user.id)}
                      >
                        <FaSave className="me-1" />
                        Save Role
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        disabled={loading}
                        onClick={() => handleDelete(user.id)}
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
            <div className="text-center py-4">
              <p className="text-muted">
                No users found {roleFilter && `with role "${roleFilter}"`}
                {search && ` matching "${search}"`}.
              </p>
            </div>
          )}

          {/* Results count - responsive */}
          <div className="mt-3 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
            <div className="text-muted small">
              Showing {filteredUsers.length} of {users.length} users
              {roleFilter && ` (filtered by ${roleFilter})`}
            </div>
            {search && (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setSearch("")}
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
