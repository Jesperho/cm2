import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useSignup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (userData) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          phone_number: userData.phone_number,
          gender: userData.gender,
          date_of_birth: userData.date_of_birth,
          membership_status: userData.membership_status,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem("user", JSON.stringify(responseData));
        toast.success("Account Created Successfully");
        navigate("/login");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading };
};
