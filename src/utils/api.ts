import axios, { AxiosResponse, AxiosError } from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Run symfony serve on backend, following can be added in .env file: process.env.REACT_APP_API_URL
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const signIn = async (email: string, password: string) => {
  const response = await apiClient.post("/sign_in", { email, password });
  return response;
};

export const signUp = async (name: string, email: string, password: string) => {
  const response = await apiClient.post("/sign_up", { name, email, password });
  return response;
};

export const getDashboardStats = async (memberId: string) => {
  const response = await apiClient.get(
    `/dashboard/stats?user_id=${memberId}`
  );
  return response;
};

export const getLoans = async (memberId: string) => {
  const response = await apiClient.get(`/get_loans_by_member/?member_id=${memberId}`);
  return response.data;
};

export const getUpcomingDueDates = async (memberId: string) => {
  const response = await apiClient.get(`/get_upcoming_due_dates/?member_id=${memberId}`);
  return response.data;
};

export const extendLoan = async (loanId: string) => {
  const response = await apiClient.post("/loans/extend/", { loan_id: loanId });
  return response.data;
};

export const returnBook = async (loanId: string) => {
  const response = await apiClient.post("/loans/return/", { loan_id: loanId });
  return response.data;
};

export const getReservations = async (memberId: string) => {
  const response = await apiClient.get(
    `/get_reservations_by_member/member/?member_id=${memberId}`
  );
  return response.data;
};

export const cancelReservation = async (reservationId: string, userId: string) => {
  console.log(reservationId, userId);
  const response = await apiClient.put("/cancel_reservation/", {
    id: reservationId,
    user_id: userId,
  });
  return response.data;
};

export const getBooks = async () => {
  const response = await apiClient.get(`/get_books/`);
  console.log(response);
  return response.data;
};

export const addBook = async (
  title: string,
  author: string,
  isbn: string,
  publishedDate: string,
  quantity: number
) => {
  const response = await apiClient.post("/books/add_book/", {
    title,
    author,
    isbn,
    published_date: publishedDate,
    quantity,
  });
  return response.data;
};

export const updateBook = async (
  bookId: string,
  title: string,
  author: string,
  isbn: string,
  publishedDate: string,
  quantity: number
) => {
  const response = await apiClient.put(`/update_book/${bookId}`, {
    title,
    author,
    isbn,
    published_date: publishedDate,
    quantity,
  });
  return response.data;
};

export const removeBook = async (bookId: string) => {
  const response = await apiClient.delete(`/remove_book/${bookId}`);
  return response.data;
};

export const getAllMembers = async () => {
  const response = await apiClient.get("/get_all_members");
  return response.data;
};

export const addMember = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const response = await apiClient.post("/create_member", {
    name,
    email,
    password,
    role,
  });
  return response.data;
};

export const updateMember = async (
  memberId: string,
  name: string,
  email: string,
  role: string
) => {
  const response = await apiClient.put(`/update_member/${memberId}`, {
    name,
    email,
    role,
  });
  return response.data;
};

export const deleteMember = async (memberId: string) => {
  const response = await apiClient.delete(`/delete_member/${memberId}`);
  return response.data;
};

export default apiClient;
