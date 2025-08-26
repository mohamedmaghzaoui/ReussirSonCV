import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const ResumeContext = createContext();
axios.defaults.withCredentials = true;

export const ResumeProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // GET resumes for current user
  const {
    data: resumes = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["resumes"],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/cvs/`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // ADD resume 
  const { mutateAsync: addResume } = useMutation({
    mutationFn: async (resumeData) => {
      const res = await axios.post(`${apiUrl}/cvs/`, resumeData);
      return res.data;
    },
    onSuccess: (newResume) => {
      queryClient.setQueryData(["resumes"], (old = []) => [...old, newResume]);
    },
    onError: (err) => {
      console.error("Erreur lors de la création du CV :", err);
    },
  });

  // DELETE resume 
  const { mutateAsync: deleteResume } = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${apiUrl}/cvs/${id}/`);
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["resumes"], (old = []) =>
        old.filter((cv) => cv.id !== deletedId),
      );
    },
    onError: (err) => {
      console.error("Erreur lors de la suppression du CV :", err);
    },
  });

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        loading: isLoading,
        error,
        addResume,
        deleteResume,
        refetch: () => queryClient.invalidateQueries(["resumes"]),
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumes = () => useContext(ResumeContext);
