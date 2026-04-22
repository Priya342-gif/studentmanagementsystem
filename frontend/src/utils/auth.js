export const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
};

export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};