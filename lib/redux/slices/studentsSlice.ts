import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosClient from '@/lib/axios';

export interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: number;
  progress: number;
  status: 'Active' | 'Inactive';
  joined: string;
}

interface StudentsState {
  students: Student[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  statusFilter: string;
}

const INITIAL_STUDENTS: Student[] = [
  { id: 'STU-1001', name: 'Aarav Sharma', email: 'aarav.sharma@example.in', enrolledCourses: 4, progress: 88, status: 'Active', joined: 'Jan 15, 2026' },
  { id: 'STU-1002', name: 'Ananya Patel', email: 'ananya.p@example.in', enrolledCourses: 2, progress: 45, status: 'Active', joined: 'Jan 20, 2026' },
  { id: 'STU-1003', name: 'Rohan Gupta', email: 'rohan.g@example.in', enrolledCourses: 5, progress: 96, status: 'Active', joined: 'Dec 10, 2025' },
  { id: 'STU-1004', name: 'Priya Verma', email: 'priya.v@example.in', enrolledCourses: 1, progress: 12, status: 'Inactive', joined: 'Feb 01, 2026' },
  { id: 'STU-1005', name: 'Aditya Kumar', email: 'aditya.k@example.in', enrolledCourses: 3, progress: 70, status: 'Active', joined: 'Jan 05, 2026' },
];

const initialState: StudentsState = {
  students: INITIAL_STUDENTS,
  loading: false,
  error: null,
  searchQuery: '',
  statusFilter: 'All',
};

export const fetchStudentsThunk = createAsyncThunk(
  'students/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await axiosClient.get('/students');
      if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
      return INITIAL_STUDENTS;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch students');
    }
  }
);

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudentSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setStudentStatusFilter(state, action: PayloadAction<string>) {
      state.statusFilter = action.payload;
    },
    addStudent(state, action: PayloadAction<Student>) {
      state.students.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudentsThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.length > 0) {
          state.students = action.payload;
        }
      })
      .addCase(fetchStudentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setStudentSearchQuery, setStudentStatusFilter, addStudent } = studentsSlice.actions;
export default studentsSlice.reducer;
