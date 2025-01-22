export type UserRole = 'ADMIN' | 'STAFF' | 'MEMBER';
export type LoanStatus = 'ACTIVE' | 'RETURNED' | 'OVERDUE';
export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELED';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  coverImage: string;
  publishedDate: string;
  available: boolean;
  quantity: number;
  availableCopies: number;
}

export interface Loan {
  id: string;
  userId: string;
  bookId: string;
  status: LoanStatus;
  dueDate: string;
  loanDate: string;
  returnDate?: string;
}

export interface Reservation {
  id: string;
  name: string;
  book: string;
  status: ReservationStatus;
  reservationDate: string;
  confirmationDate?: string;
}