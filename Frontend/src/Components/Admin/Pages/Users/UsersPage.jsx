import { useState, useEffect } from "react";
import { FaUsers, FaSave, FaTrash } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UsersPage = () => {
  const [search, setSearch] = useState("");
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
        const response = await axios.get("http://localhost:3000/user");
        // console.log(response.data);
        const { Users, success } = response.data;
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
      const response = await axios.patch(`http://localhost:3000/user/${id}`, {
        role: newRole,
      });
      const { success } = response.data;
      if (success) {
        toast.success("Role Updated!", { id: toastId });
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, role: newRole } : user
          )
        );
      }
      // const copy = { ...editedRoles };
      // delete copy[id];
      // setEditedRoles(copy);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const toastId = toast.loading("Deleting user...");
    try {
      const response = await axios.delete(`http://localhost:3000/user/${id}`);
      const { success } = response.data;
      if (success) {
        toast.success("User deleted.", { id: toastId });
        setUsers((prev) => prev.filter((user) => user.id !== id));
      }
    } catch {
      toast.error("Failed to delete.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(search?.toLowerCase())
  );

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

          {/* Table for Desktop (hidden on mobile) */}
          <div className="d-none d-md-block">
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
                    editedRoles[user.id] && editedRoles[user.id] !== user.role;
                  return (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          defaultValue={user.role}
                          onChange={(e) =>
                            handleRoleChange(user.id, e.target.value)
                          }
                        >
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            user.role === "admin" ? "bg-danger" : "bg-success"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-primary"
                            disabled={!isChanged || loading}
                            onClick={() => handleRoleSubmit(user.id)}
                          >
                            <FaSave />
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            disabled={loading}
                            onClick={() => handleDelete(user.id)}
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

          {/* Cards for Mobile (hidden on desktop) */}
          <div className="d-block d-md-none">
            {filteredUsers.map((user) => {
              const isChanged =
                editedRoles[user.id] && editedRoles[user.id] !== user.role;
              return (
                <div className="card mb-3" key={user.id}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="card-title fw-bold mb-1">{user.name}</h6>
                        <p className="card-text text-muted small mb-0">
                          {user.email}
                        </p>
                      </div>
                      <span
                        className={`badge ${
                          user.role === "Admin" ? "bg-danger" : "bg-success"
                        }`}
                      >
                        {user.role}
                      </span>
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-bold">Role</label>
                      <select
                        className="form-select form-select-sm"
                        defaultValue={user.role}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                      >
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                      </select>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-primary"
                        disabled={!isChanged || loading}
                        onClick={() => handleRoleSubmit(user.id)}
                      >
                        Save Role
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        disabled={loading}
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted">No users found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
