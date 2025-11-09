import { useState, useEffect } from "react";
import { FaUsers, FaSave, FaTrash, FaSearch } from "react-icons/fa";
import { MdAdminPanelSettings, MdManageAccounts, MdPerson } from "react-icons/md";
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
        setEditedRoles((prev) => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
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
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = !roleFilter || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const filter = (role) => setRoleFilter(roleFilter === role ? "" : role);

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <MdAdminPanelSettings size={16} className="text-danger" />;
      case "manager":
        return <MdManageAccounts size={16} className="text-warning" />;
      default:
        return <MdPerson size={16} className="text-primary" />;
    }
  };

  return (
    <div className="container-fluid px-2 py-2">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="d-flex align-items-center gap-2 mb-3 px-1">
        <FaUsers className="text-primary flex-shrink-0" size={20} />
        <h5 className="mb-0 fw-bold" style={{ fontSize: "18px" }}>Manage Users</h5>
        <span className="badge bg-primary ms-auto flex-shrink-0">{users.length}</span>
      </div>

      {/* Search */}
      <div className="mb-3 px-1">
        <div className="input-group shadow-sm">
          <span className="input-group-text bg-white border-end-0 px-2">
            <FaSearch className="text-muted" size={12} />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ fontSize: "13px" }}
          />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="mb-3 px-1">
        <div className="small fw-semibold text-muted mb-2" style={{ fontSize: "11px" }}>
          Filter by Role:
        </div>
        <div className="d-flex flex-wrap gap-2">
          {[
            { label: "All", color: "secondary", value: "", count: users.length },
            { label: "Admin", color: "danger", value: "admin", count: users.filter(u => u.role === "admin").length },
            { label: "Manager", color: "warning", value: "manager", count: users.filter(u => u.role === "manager").length },
            { label: "User", color: "primary", value: "user", count: users.filter(u => u.role === "user").length },
          ].map(({ label, color, value, count }) => (
            <button
              key={value || "all"}
              onClick={() => filter(value)}
              className={`btn btn-sm ${
                roleFilter === value ? `btn-${color}` : "btn-outline-secondary"
              }`}
              style={{ fontSize: "11px", padding: "4px 10px" }}
            >
              {label} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* User Cards */}
      <div className="px-1">
        {filteredUsers.map((u) => {
          const changed = editedRoles[u.id] && editedRoles[u.id] !== u.role;
          return (
            <div key={u.id} className="card shadow-sm border-0 mb-2" style={{ borderRadius: "8px" }}>
              <div className="card-body p-2">
                {/* User Header */}
                <div className="d-flex align-items-start mb-2">
                  <div className="flex-shrink-0 me-2 mt-1">
                    {getRoleIcon(u.role)}
                  </div>
                  <div className="flex-grow-1" style={{ minWidth: 0, overflow: "hidden" }}>
                    <h6 className="mb-0 fw-bold text-truncate" style={{ fontSize: "14px" }}>
                      {u.name}
                    </h6>
                    <div className="small text-muted text-truncate" style={{ fontSize: "12px" }}>
                      {u.email}
                    </div>
                  </div>
                </div>

                {/* Role Selector */}
                <div className="mb-2">
                  <label className="form-label mb-1 fw-semibold" style={{ fontSize: "11px" }}>
                    Change Role
                  </label>
                  <select
                    className="form-select form-select-sm"
                    value={editedRoles[u.id] || u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    style={{ fontSize: "12px" }}
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="user">User</option>
                  </select>
                </div>

                {/* Action Buttons - Full Width Row */}
                <div className="d-flex gap-2 w-100">
                  <button
                    className="btn btn-primary btn-sm"
                    disabled={!changed || loading}
                    onClick={() => handleRoleSubmit(u.id)}
                    style={{ fontSize: "12px", flex: "1" }}
                  >
                    <FaSave className="me-1" size={10} />
                    Save
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    disabled={loading}
                    onClick={() => handleDelete(u.id)}
                    style={{ fontSize: "12px", width: "45px", flexShrink: 0 }}
                  >
                    <FaTrash size={10} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-5">
          <FaUsers size={40} className="text-muted opacity-50 mb-2" />
          <p className="text-muted mb-0 small">No users found</p>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
