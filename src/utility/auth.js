export const logoutUser = () => {
    localStorage.removeItem("showDekhoCurrentUser");
    sessionStorage.removeItem("showDekhoCurrentUser");

};