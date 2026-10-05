import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosClient from '@/lib/axios';

export interface Course {
  id: string;
  title: string;
  category: string;
  students: number;
  rating: number;
  status: 'Published' | 'Draft';
  price: string;
  revenue?: string;
  lessons?: number;
  level?: string;
  thumbnail?: string;
  updated?: string;
}

interface CoursesState {
  courses: Course[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  statusFilter: 'All' | 'Published' | 'Draft';
}

const INITIAL_COURSES: Course[] = [
  { id: 'CRS-01', title: 'Astrophysics & Cosmology 101', category: 'Astronomy & Physics', students: 1420, rating: 4.9, status: 'Published', price: '₹4,999', revenue: '₹70,98,580', lessons: 24, level: 'Intermediate', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' },
  { id: 'CRS-02', title: 'Orbital Mechanics Masterclass', category: 'Space Engineering', students: 890, rating: 4.8, status: 'Published', price: '₹5,999', revenue: '₹53,39,110', lessons: 32, level: 'Beginner', thumbnail: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80' },
  { id: 'CRS-03', title: 'Deep Sky Astrophotography', category: 'Astrophotography', students: 640, rating: 4.7, status: 'Published', price: '₹3,499', revenue: '₹22,39,360', lessons: 18, level: 'Advanced', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80' },
  { id: 'CRS-04', title: 'James Webb Telescope Data Analysis', category: 'Data Science', students: 0, rating: 0, status: 'Draft', price: '₹4,499', updated: '2 hours ago', lessons: 12, level: 'Intermediate', thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80' },
  { id: 'CRS-05', title: 'Exoplanet Detection & Habitability', category: 'Astronomy & Physics', students: 0, rating: 0, status: 'Draft', price: '₹3,999', updated: '1 day ago', lessons: 15, level: 'Beginner', thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80' },
  { id: 'CRS-06', title: 'Cosmic Ray Physics Laboratory', category: 'Physics', students: 0, rating: 0, status: 'Draft', price: '₹5,499', updated: '3 days ago', lessons: 8, level: 'Advanced', thumbnail: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80' },
];

const initialState: CoursesState = {
  courses: INITIAL_COURSES,
  loading: false,
  error: null,
  searchQuery: '',
  statusFilter: 'All',
};

// Async Thunks with Axios
export const fetchCoursesThunk = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await axiosClient.get('/courses');
      if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
      return INITIAL_COURSES;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch courses from API');
    }
  }
);

export const updateCourseThunk = createAsyncThunk(
  'courses/updateCourse',
  async ({ id, courseData }: { id: string; courseData: Partial<Course> }, { rejectWithValue }) => {
    try {
      await axiosClient.put(`/courses/${id}`, courseData);
      return { id, courseData };
    } catch (err: any) {
      console.warn(`[Axios updateCourseThunk] API call fallback for ${id}:`, err.message);
      return { id, courseData };
    }
  }
);

export const deleteCourseThunk = createAsyncThunk(
  'courses/deleteCourse',
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/courses/${id}`);
      return id;
    } catch (err: any) {
      console.warn(`[Axios deleteCourseThunk] API call fallback for ${id}:`, err.message);
      return id;
    }
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<'All' | 'Published' | 'Draft'>) {
      state.statusFilter = action.payload;
    },
    addLocalCourse(state, action: PayloadAction<Course>) {
      state.courses.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Courses
      .addCase(fetchCoursesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoursesThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.length > 0) {
          state.courses = action.payload;
        }
      })
      .addCase(fetchCoursesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Course
      .addCase(updateCourseThunk.fulfilled, (state, action) => {
        const { id, courseData } = action.payload;
        const index = state.courses.findIndex(c => c.id === id);
        if (index !== -1) {
          state.courses[index] = { ...state.courses[index], ...courseData };
        }
      })

      // Delete Course
      .addCase(deleteCourseThunk.fulfilled, (state, action) => {
        const id = action.payload;
        state.courses = state.courses.filter(c => c.id !== id);
      });
  },
});

export const { setSearchQuery, setStatusFilter, addLocalCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
