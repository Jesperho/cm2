import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = (setIsAuthenticated) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
};
