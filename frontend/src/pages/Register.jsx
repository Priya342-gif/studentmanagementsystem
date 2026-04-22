import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        course: "",
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/register", form);
            alert("Registered Successfully");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.msg || "Error");
        }
    };

    return (
        <div className="container form-container">
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <input placeholder="Course" onChange={(e) => setForm({ ...form, course: e.target.value })} />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;