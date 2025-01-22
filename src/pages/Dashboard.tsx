import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {
  BookOpen,
  Users,
  Calendar,
  BookMarked,
  Clock,
  CheckCircle,
  UserPlus,
} from "lucide-react";
import { formatDate } from "../lib/utils";
import { Book, Loan, Reservation, User, UserRole } from "../types";
import * as api from "../utils/api";

function DashboardHome() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    activeLoans: 0,
    pendingReservations: 0,
    booksRead: 0,
    overdue: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    if (!user?.id) return;
    try {
      const { data } = await api.getDashboardStats(user.id);
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Welcome, {user?.name}!</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Active Loans</h3>
          <p className="text-3xl font-bold text-amber-600">
            {stats?.activeLoans ?? 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Pending Reservations</h3>
          <p className="text-3xl font-bold text-amber-600">
            {stats?.pendingReservations ?? 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Books Read</h3>
          <p className="text-3xl font-bold text-amber-600">{stats?.booksRead ?? 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Overdue</h3>
          <p className="text-3xl font-bold text-red-600">{stats?.overdue ?? 0}</p>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <RecentActivity />
        <UpcomingDueDates />
      </div>
    </div>
  );
}

function RecentActivity() {
  // TODO: Replace these with API calls
  const activities = [
    { id: 1, type: "loan", book: "The Great Gatsby", date: "2024-03-15" },
    { id: 2, type: "return", book: "1984", date: "2024-03-14" },
    { id: 3, type: "reservation", book: "Dune", date: "2024-03-13" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3">
            {activity.type === "loan" && (
              <BookMarked className="w-5 h-5 text-amber-600" />
            )}
            {activity.type === "return" && (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
            {activity.type === "reservation" && (
              <Calendar className="w-5 h-5 text-blue-600" />
            )}
            <div>
              <p className="text-sm font-medium">{activity.book}</p>
              <p className="text-xs text-gray-500">{activity.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UpcomingDueDates() {
  const { user } = useAuthStore();
  const [upcomingDueDates, setUpcomingDueDates] = useState<Loan[]>([]);

  useEffect(() => {
    fetchUpcomingDueDates();
  }, []);

  const fetchUpcomingDueDates = async () => {
    if (!user?.id) return;
    const { data } = await api.getUpcomingDueDates(user.id);
    setUpcomingDueDates(data);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Upcoming Due Dates</h3>
      <div className="space-y-4">
        {upcomingDueDates.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-amber-600" />
            <div>
              <p className="text-sm font-medium">{item.book}</p>
              <p className="text-xs text-gray-500">Due: {item.dueDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MyLoans() {
  const { user } = useAuthStore();
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    if (!user?.id) return;
    try {
      const fetchedLoans = await api.getLoans(user.id);
      setLoans(fetchedLoans);
    } catch (error) {
      console.error("Failed to fetch loans:", error);
    }
  };

  const handleExtendLoan = async (loanId: string) => {
    try {
      await api.extendLoan(loanId);
      alert("Loan extended successfully");
    } catch (error) {
      console.error("Failed to extend loan:", error);
    }
  };

  const handleReturnBook = async (loanId: string) => {
    try {
      await api.returnBook(loanId);
      alert("Book returned successfully");
    } catch (error) {
      console.error("Failed to return book:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Loans</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y">
          {loans.map((loan) => (
            <div key={loan.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Book ID: {loan.bookId}</h3>
                  <p className="text-sm text-gray-600">
                    Borrowed: {formatDate(loan.loanDate)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Due: {formatDate(loan.dueDate)}
                  </p>
                  {loan.returnDate && (
                    <p className="text-sm text-gray-600">
                      Returned: {formatDate(loan.returnDate)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MyReservations() {
  const { user } = useAuthStore();
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    if (!user?.id) return;
    try {
      const fetchedReservations = await api.getReservations(user.id);
      setReservations(fetchedReservations);
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
    }
  };

  const handleCancelReservation = async (reservationId: string) => {
    try {
      if (!user?.id) return;
      await api.cancelReservation(reservationId, user.id);
      fetchReservations();
    } catch (error) {
      console.error("Failed to cancel reservation:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Reservations</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    Book Name: {reservation.book}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Reserved: {formatDate(reservation.reservationDate.date)}
                  </p>
                  {reservation.confirmationDate && (
                    <p className="text-sm text-gray-600">
                      Confirmed: {formatDate(reservation.confirmationDate)}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {reservation.status === "PENDING" && (
                    <button
                      onClick={() => handleCancelReservation(reservation.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Cancel
                    </button>
                  )}
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      reservation.status === "CONFIRMED"
                        ? "bg-green-100 text-green-800"
                        : reservation.status === "CANCELED"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {reservation.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ManageBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedDate: "",
    quantity: 0,
  });

  const fetchBooks = async () => {
    try {
      const fetchedBooks = await api.getBooks();

      const formattedBooks = fetchedBooks.map((book: Book) => ({
        ...book,
        publishedDate: new Date(book.publishedDate.date).toISOString().split("T")[0], // Extract YYYY-MM-DD
      }));

      setBooks(formattedBooks);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.addBook(
        newBook.title,
        newBook.author,
        newBook.isbn,
        newBook.publishedDate,
        newBook.quantity
      );
      setShowAddForm(false);
      fetchBooks();
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  const handleUpdateBook = async (bookId: string) => {
    if (!editingBook) return;
    try {
      await api.updateBook(
        bookId,
        editingBook.title,
        editingBook.author,
        editingBook.isbn,
        editingBook.publishedDate,
        editingBook.quantity
      );
      setEditingBook(null);
      fetchBooks();
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  const handleRemoveBook = async (bookId: string) => {
    try {
      await api.removeBook(bookId);
      fetchBooks();
    } catch (error) {
      console.error("Failed to remove book:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Books</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded"
        >
          Add New Book
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Book</h3>
          <form onSubmit={handleAddBook} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({ ...newBook, title: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                value={newBook.author}
                onChange={(e) =>
                  setNewBook({ ...newBook, author: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ISBN
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                value={newBook.isbn}
                onChange={(e) =>
                  setNewBook({ ...newBook, isbn: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Published Date
              </label>
              <input
                type="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                value={newBook.publishedDate}
                onChange={(e) =>
                  setNewBook({ ...newBook, publishedDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Copies
              </label>
              <input
                type="number"
                required
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                value={newBook.quantity}
                onChange={(e) =>
                  setNewBook({
                    ...newBook,
                    quantity: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
              >
                Add Book
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ISBN
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Published Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Copies
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book: Book) => (
              <tr key={book.id}>
                <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.isbn}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.publishedDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setEditingBook(book)}
                    className="text-amber-600 hover:text-amber-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveBook(book.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Edit Member</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateBook(editingBook.id);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  value={editingBook.title}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Author
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  value={editingBook.author}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      author: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ISBN
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  value={editingBook.isbn}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      isbn: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Published Date
                </label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  value={editingBook.publishedDate}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      publishedDate: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  value={editingBook.quantity}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      quantity: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingBook(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ManageMembers() {
  const [members, setMembers] = useState<User[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<User | null>(null);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    password: "",
    role: "MEMBER",
  });

  const fetchMembers = async () => {
    try {
      const fetchedMembers = await api.getAllMembers();
      setMembers(fetchedMembers);
    } catch (error) {
      console.error("Failed to fetch members:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.addMember(
        newMember.name,
        newMember.email,
        newMember.password,
        newMember.role
      );
      setShowAddForm(false);
      fetchMembers();
    } catch (error) {
      console.error("Failed to add member:", error);
    }
  };

  const handleUpdateMember = async (memberId: string) => {
    if (!editingMember) return;
    try {
      await api.updateMember(
        memberId,
        editingMember.name,
        editingMember.email,
        editingMember.role
      );
      setEditingMember(null);
      fetchMembers();
    } catch (error) {
      console.error("Failed to update member:", error);
    }
  };

  const handleDeleteMember = async (memberId: string) => {
    try {
      await api.deleteMember(memberId);
      fetchMembers();
    } catch (error) {
      console.error("Failed to delete member:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Members</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Add New Member
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Member</h3>
          <form onSubmit={handleAddMember} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                value={newMember.name}
                onChange={(e) =>
                  setNewMember({ ...newMember, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                value={newMember.email}
                onChange={(e) =>
                  setNewMember({ ...newMember, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                value={newMember.role}
                onChange={(e) =>
                  setNewMember({
                    ...newMember,
                    role: e.target.value as UserRole,
                  })
                }
              >
                <option value="MEMBER">Member</option>
                <option value="STAFF">Staff</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
              >
                Add Member
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      member.role === "ADMIN"
                        ? "bg-purple-100 text-purple-800"
                        : member.role === "STAFF"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {member.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setEditingMember(member)}
                    className="text-amber-600 hover:text-amber-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Edit Member</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateMember(editingMember.id);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  value={editingMember.name}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  value={editingMember.email}
                  onChange={(e) =>
                    setEditingMember({
                      ...editingMember,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  value={editingMember.role}
                  onChange={(e) =>
                    setEditingMember({
                      ...editingMember,
                      role: e.target.value as UserRole,
                    })
                  }
                >
                  <option value="MEMBER">Member</option>
                  <option value="STAFF">Staff</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const location = useLocation();
  const { user } = useAuthStore();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
          <p className="text-sm text-gray-600">{user?.role}</p>
        </div>
        <nav className="mt-4">
          <Link
            to="/dashboard"
            className={`flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 ${
              location.pathname === "/dashboard"
                ? "bg-amber-50 text-amber-600"
                : ""
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Overview</span>
          </Link>
          <Link
            to="/dashboard/loans"
            className={`flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 ${
              location.pathname === "/dashboard/loans"
                ? "bg-amber-50 text-amber-600"
                : ""
            }`}
          >
            <BookMarked className="w-5 h-5" />
            <span>My Loans</span>
          </Link>
          <Link
            to="/dashboard/reservations"
            className={`flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 ${
              location.pathname === "/dashboard/reservations"
                ? "bg-amber-50 text-amber-600"
                : ""
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>My Reservations</span>
          </Link>
          {user?.role === "ADMIN" && (
            <>
              <Link
                to="/dashboard/manage-books"
                className={`flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 ${
                  location.pathname === "/dashboard/manage-books"
                    ? "bg-amber-50 text-amber-600"
                    : ""
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span>Manage Books</span>
              </Link>
              <Link
                to="/dashboard/manage-members"
                className={`flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 ${
                  location.pathname === "/dashboard/manage-members"
                    ? "bg-amber-50 text-amber-600"
                    : ""
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Manage Members</span>
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/loans" element={<MyLoans />} />
          <Route path="/reservations" element={<MyReservations />} />
          {user?.role === "ADMIN" && (
            <>
              <Route path="/manage-books" element={<ManageBooks />} />
              <Route path="/manage-members" element={<ManageMembers />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}
