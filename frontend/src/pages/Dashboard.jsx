import { useState } from "react";
import API from "../services/api";

const Dashboard = () => {
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
    });

    const [course, setCourse] = useState("");

    const updatePassword = async () => {
        try {
            await API.put("/update-password", passwords);
            alert("Password updated");
        } catch (err) {
            alert(err.response?.data?.msg || "Error");
        }
    };

    const updateCourse = async () => {
        try {
            await API.put("/update-course", { course });
            alert("Course updated");
        } catch (err) {
            alert(err.response?.data?.msg || "Error");
        }
    };

    return (
        <div className="container dashboard">
            <h2>Dashboard</h2>

            <div className="card">
                <h3>Update Password</h3>
                <input placeholder="Old Password" type="password" onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })} />
                <input placeholder="New Password" type="password" onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} />
                <button onClick={updatePassword}>Update</button>
            </div>

            <div className="card">
                <h3>Update Course</h3>
                <input placeholder="New Course" onChange={(e) => setCourse(e.target.value)} />
                <button onClick={updateCourse}>Update</button>
            </div>
        </div>
    );
};

export default Dashboard;