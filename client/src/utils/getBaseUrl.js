export const getBaseURL = () => {
  // Si estás en localhost (desarrollo local) usar backend local
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    return "http://localhost:5000";
  }
  return "https://muebleria-hermanos-jota-devrush.onrender.com";
};
