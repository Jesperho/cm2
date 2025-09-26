import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useLogin = (setIsAuthenticated) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setError(null);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const userData = await response.json();
      localStorage.setItem("user", JSON.stringify(userData));
      setIsAuthenticated(true);
      toast.success("Login Successful");
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return { login, error };
};
