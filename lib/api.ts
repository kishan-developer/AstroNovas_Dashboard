// API Configuration for Dashboard
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api';

const getHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const apiClient = {
  async get(endpoint: string) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`[apiClient.get] ${endpoint} failed, falling back if available:`, error);
      return { success: false, error: (error as Error).message };
    }
  },

  async post(endpoint: string, data: any) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.warn(`[apiClient.post] ${endpoint} failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  },

  async put(endpoint: string, data: any) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.warn(`[apiClient.put] ${endpoint} failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  },

  async patch(endpoint: string, data: any) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.warn(`[apiClient.patch] ${endpoint} failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  },

  async delete(endpoint: string) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return await response.json();
    } catch (error) {
      console.warn(`[apiClient.delete] ${endpoint} failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  },
};

// Fallback Mock Data for Roles when Backend DB is offline or empty
const MOCK_USERS_BY_ROLE: Record<string, any[]> = {
  admin: [
    { id: 'ADM-001', _id: 'ADM-001', name: 'Rajesh Sharma', email: 'rajesh@astronovas.in', role: 'admin', permissions: 'Full Access', lastLogin: '2026-08-28', status: 'Active', isActive: true, createdAt: '2026-01-01' },
    { id: 'ADM-002', _id: 'ADM-002', name: 'Pooja Verma', email: 'pooja@astronovas.in', role: 'admin', permissions: 'Full Access', lastLogin: '2026-08-27', status: 'Active', isActive: true, createdAt: '2026-01-02' },
  ],
  manager: [
    { id: 'MGR-001', _id: 'MGR-001', name: 'Amitabh Sen', email: 'amitabh@astronovas.in', role: 'manager', department: 'Operations', lastLogin: '2026-08-28', status: 'Active', isActive: true, createdAt: '2026-01-03' },
    { id: 'MGR-002', _id: 'MGR-002', name: 'Sujata Nair', email: 'sujata@astronovas.in', role: 'manager', department: 'Academic Affairs', lastLogin: '2026-08-25', status: 'Active', isActive: true, createdAt: '2026-01-04' },
  ],
  mentor: [
    { id: 'MTR-001', _id: 'MTR-001', name: 'Dr. Vikram Sarabhai', email: 'vikram@astronovas.in', role: 'mentor', expertise: ['Vedic Astrology', 'Cosmology'], rating: 4.9, status: 'Active', isActive: true, createdAt: '2026-01-01' },
    { id: 'MTR-002', _id: 'MTR-002', name: 'Sunita Williams', email: 'sunita@astronovas.in', role: 'mentor', expertise: ['Space Engineering'], rating: 4.8, status: 'Active', isActive: true, createdAt: '2026-01-03' },
    { id: 'MTR-003', _id: 'MTR-003', name: 'Pandit Shastri', email: 'shastri@astronovas.in', role: 'mentor', expertise: ['Vastu Shastra'], rating: 5.0, status: 'Active', isActive: true, createdAt: '2026-01-07' },
  ],
  student: [
    { id: 'STU-1001', _id: 'STU-1001', name: 'Aarav Sharma', email: 'aarav.sharma@example.in', role: 'student', enrolledCourses: 4, progress: '88%', status: 'Active', isActive: true, createdAt: '2026-01-15' },
    { id: 'STU-1002', _id: 'STU-1002', name: 'Ananya Patel', email: 'ananya.p@example.in', role: 'student', enrolledCourses: 2, progress: '45%', status: 'Active', isActive: true, createdAt: '2026-01-20' },
    { id: 'STU-1003', _id: 'STU-1003', name: 'Rohan Gupta', email: 'rohan.g@example.in', role: 'student', enrolledCourses: 5, progress: '96%', status: 'Active', isActive: true, createdAt: '2025-12-10' },
    { id: 'STU-1004', _id: 'STU-1004', name: 'Priya Verma', email: 'priya.v@example.in', role: 'student', enrolledCourses: 1, progress: '12%', status: 'Inactive', isActive: false, createdAt: '2026-02-01' },
    { id: 'STU-1005', _id: 'STU-1005', name: 'Aditya Kumar', email: 'aditya.k@example.in', role: 'student', enrolledCourses: 3, progress: '70%', status: 'Active', isActive: true, createdAt: '2026-01-05' },
  ],
};

// High-level API Service Helpers
export const studentService = {
  async getStudents(role?: string) {
    const res = await apiClient.get(`/students${role ? `?role=${role}` : ''}`);
    if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
    // Fallback to mock data if API endpoint is not populated or offline
    return role ? (MOCK_USERS_BY_ROLE[role] || []) : Object.values(MOCK_USERS_BY_ROLE).flat();
  },

  async getStudentById(studentId: string) {
    const res = await apiClient.get(`/students/${studentId}`);
    if (res && res.success && res.data) {
      return res.data;
    }
    // Fallback lookup from mock dataset
    const allMocks = Object.values(MOCK_USERS_BY_ROLE).flat();
    return allMocks.find((u) => u.id === studentId || u._id === studentId) || {
      id: studentId,
      _id: studentId,
      name: `Aarav Sharma (${studentId})`,
      email: `student_${studentId}@astronovas.in`,
      role: 'student',
      status: 'Active',
      isActive: true,
      bio: 'AstroNovas Indian Scholar',
      createdAt: new Date().toISOString(),
    };
  },

  async getStudentStats() {
    const res = await apiClient.get('/students/stats');
    if (res && res.success && res.data) {
      return res.data;
    }
    return {
      totalStudents: 15234,
      activeStudents: 14890,
      verifiedStudents: 13500,
      studentsByRole: {
        admin: 5,
        manager: 12,
        mentor: 48,
        student: 15169,
      },
    };
  },

  async updateStudentStatus(studentId: string, isActive: boolean) {
    return apiClient.put(`/students/${studentId}/status`, { isActive });
  },

  async updateStudentRole(studentId: string, role: string) {
    return apiClient.put(`/students/${studentId}/role`, { role });
  },
};

export const userService = studentService;

export const courseService = {
  async getCourses() {
    const res = await apiClient.get('/courses');
    if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
    return [
      { id: 'CRS-001', title: 'Mastering Vedic Astronomy & Cosmology', category: 'Astronomy & Physics', level: 'Intermediate', students: 1240, rating: 4.9, price: '₹4,999', status: 'Published' },
      { id: 'CRS-002', title: 'Space Engineering & Satellite Dynamics', category: 'Space Engineering', level: 'Beginner', students: 850, rating: 4.8, price: '₹3,499', status: 'Published' },
      { id: 'CRS-003', title: 'Astrophotography & Sky Observation', category: 'Astrophotography', level: 'Advanced', students: 620, rating: 5.0, price: '₹5,999', status: 'Draft' },
    ];
  },

  async createCourse(courseData: any) {
    return apiClient.post('/courses', courseData);
  },

  async getCourseById(courseId: string) {
    return apiClient.get(`/courses/${courseId}`);
  },

  async updateCourse(courseId: string, courseData: any) {
    return apiClient.put(`/courses/${courseId}`, courseData);
  },

  async deleteCourse(courseId: string) {
    return apiClient.delete(`/courses/${courseId}`);
  },
};

export const dashboardService = {
  async getAdminStats() {
    const res = await apiClient.get('/analytics/admin/stats');
    if (res && res.success && res.data) {
      return res.data;
    }
    return {
      totalStudents: 15234,
      totalCourses: 48,
      totalRevenue: '₹12,84,500',
      activeMentors: 32,
      completionRate: '94%',
    };
  },

  async getStudentDashboardData(studentId: string) {
    const res = await apiClient.get(`/students/${studentId}/dashboard`);
    if (res && res.success && res.data) {
      return res.data;
    }
    return {
      studentName: 'Aarav Sharma',
      activeCourse: {
        title: 'Astrophysics & Cosmology 101',
        nextLesson: 'Lesson 4: Cosmic Microwave Background Radiation',
        progress: 75,
      },
      stats: {
        enrolledCount: 4,
        completedCount: 2,
        certificatesEarned: 2,
        streakDays: 14,
      },
    };
  },

  async getAnnouncements() {
    const res = await apiClient.get('/announcements');
    if (res && res.success && Array.isArray(res.data)) {
      return res.data;
    }
    return [
      { id: '1', title: 'New Astrophysics Lab Live Session Announced', date: '2026-08-28', category: 'Live Session' },
      { id: '2', title: 'Scheduled Platform Maintenance on Sept 1', date: '2026-08-25', category: 'System' },
    ];
  },
};

export const authService = {
  async login(credentials: { email: string; password?: string }) {
    const res = await apiClient.post('/auth/login', credentials);
    if (res && res.token) {
      localStorage.setItem('token', res.token);
    }
    return res;
  },

  async getProfile() {
    return apiClient.get('/auth/profile');
  },
};

export const certificateService = {
  async getCertificates() {
    const res = await apiClient.get('/certificates');
    if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
    return [
      { id: 'CERT-AST-9821', studentId: 'STU-1001', student: 'Aarav Sharma', course: 'Astrophysics & Cosmology 101', issuedOn: 'Feb 10, 2026', completionDate: 'Feb 08, 2026', grade: '96% (Distinction)', status: 'Issued', verificationCode: 'AST-CERT-2026-901', customCertificateUrl: null, mentor: 'Dr. Vikram Sarabhai' },
      { id: 'CERT-ORB-4412', studentId: 'STU-1002', student: 'Ananya Patel', course: 'Orbital Mechanics Masterclass', issuedOn: 'Jan 18, 2026', completionDate: 'Jan 15, 2026', grade: '95% (Distinction)', status: 'Issued', verificationCode: 'ORB-CERT-2026-412', customCertificateUrl: null, mentor: 'Sunita Williams' },
      { id: 'CERT-AST-3190', studentId: 'STU-1003', student: 'Rohan Gupta', course: 'Deep Sky Astrophotography', issuedOn: 'Mar 02, 2026', completionDate: 'Feb 28, 2026', grade: '88% (Merit)', status: 'Issued', verificationCode: 'AST-CERT-2026-190', customCertificateUrl: null, mentor: 'Pandit Shastri' },
      { id: 'REQ-CERT-104', studentId: 'STU-1005', student: 'Aditya Kumar', course: 'James Webb Telescope Data Analysis', requestedOn: 'Aug 28, 2026', completionDate: 'Aug 27, 2026', grade: '92% (Distinction)', status: 'Pending Approval', verificationCode: null, customCertificateUrl: null, mentor: 'Dr. Vikram Sarabhai' },
      { id: 'REQ-CERT-105', studentId: 'STU-1004', student: 'Priya Verma', course: 'Cosmic Ray Physics Laboratory', requestedOn: 'Aug 26, 2026', completionDate: 'Aug 25, 2026', grade: '84% (Pass)', status: 'Pending Approval', verificationCode: null, customCertificateUrl: null, mentor: 'Sunita Williams' },
    ];
  },

  async requestCertificate(payload: { studentId: string; courseId: string; courseTitle: string }) {
    return apiClient.post('/certificates/request', payload);
  },

  async approveCertificate(id: string, payload?: any) {
    return apiClient.put(`/certificates/${id}/approve`, payload || {});
  },

  async rejectCertificate(id: string, reason: string) {
    return apiClient.put(`/certificates/${id}/reject`, { reason });
  },

  async uploadCustomCertificate(id: string, fileName: string) {
    return apiClient.post(`/certificates/${id}/upload`, { fileName });
  },
};

export const assessmentService = {
  async getQuizzes() {
    const res = await apiClient.get('/assessments/quizzes');
    if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
    return [
      { id: 'QZ-01', title: 'Stellar Evolution & Redshift Quiz', course: 'Astrophysics & Cosmology 101', questionsCount: 15, duration: '20 mins', passRate: '88%', attempts: 1240, status: 'Published' },
      { id: 'QZ-02', title: 'Hohmann Transfer Trajectory Assessment', course: 'Orbital Mechanics Masterclass', questionsCount: 10, duration: '15 mins', passRate: '92%', attempts: 810, status: 'Published' },
      { id: 'QZ-03', title: 'Narrowband Imaging Calibration Exam', course: 'Deep Sky Astrophotography', questionsCount: 20, duration: '30 mins', passRate: '79%', attempts: 520, status: 'Published' },
      { id: 'QZ-04', title: 'James Webb Telescope Data Science Test', course: 'James Webb Telescope Data Analysis', questionsCount: 12, duration: '25 mins', passRate: '94%', attempts: 340, status: 'Draft' },
    ];
  },

  async getQuizById(id: string) {
    const res = await apiClient.get(`/assessments/quizzes/${id}`);
    if (res && res.success && res.data) {
      return res.data;
    }
    return {
      id: id.startsWith('QZ-') ? id : `QZ-0${id}`,
      title: 'Stellar Evolution & Redshift Quiz',
      course: 'Astrophysics & Cosmology 101',
      questionsCount: 15,
      duration: '20 mins',
      passRate: '88%',
      attempts: 1240,
      passingScore: 70,
      questions: [
        { id: 'Q-901', question: 'What equation models the critical mass density required for a flat universe?', options: ['Friedmann Equation', 'Hubble Law', 'Kepler 3rd Law', 'Schrödinger Wave'], correctAnswer: 'Friedmann Equation', type: 'Multiple Choice', category: 'Cosmology', difficulty: 'Hard', points: 10 },
        { id: 'Q-902', question: 'True or False: A Hohmann transfer orbit requires minimum delta-v for co-planar circular orbit transfers.', options: ['True', 'False'], correctAnswer: 'True', type: 'True / False', category: 'Orbital Mechanics', difficulty: 'Medium', points: 5 },
        { id: 'Q-903', question: 'Calculate the wavelength shift of H-alpha radiation at z = 0.5.', options: ['984 nm', '656 nm', '720 nm', '512 nm'], correctAnswer: '984 nm', type: 'Numeric Input', category: 'Astrophysics', difficulty: 'Hard', points: 10 },
      ],
    };
  },

  async createQuiz(payload: any) {
    return apiClient.post('/assessments/quizzes', payload);
  },

  async updateQuiz(id: string, payload: any) {
    return apiClient.put(`/assessments/quizzes/${id}`, payload);
  },

  async deleteQuiz(id: string) {
    return apiClient.delete(`/assessments/quizzes/${id}`);
  },

  async getQuestionsBank() {
    const res = await apiClient.get('/assessments/questions');
    if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
    return [
      { id: 'Q-901', question: 'What equation models the critical mass density required for a flat universe?', type: 'Multiple Choice', category: 'Cosmology', difficulty: 'Hard', points: 10 },
      { id: 'Q-902', question: 'True or False: A Hohmann transfer orbit requires minimum delta-v for co-planar circular orbit transfers.', type: 'True / False', category: 'Orbital Mechanics', difficulty: 'Medium', points: 5 },
      { id: 'Q-903', question: 'Calculate the wavelength shift of H-alpha radiation at z = 0.5.', type: 'Numeric Input', category: 'Astrophysics', difficulty: 'Hard', points: 10 },
      { id: 'Q-904', question: 'Identify the primary cause of chromatic aberration in refractor telescope lenses.', type: 'Multiple Choice', category: 'Astrophotography', difficulty: 'Easy', points: 5 },
      { id: 'Q-905', question: 'Determine the orbital velocity at Low Earth Orbit altitude of 400km.', type: 'Numeric Input', category: 'Space Engineering', difficulty: 'Medium', points: 8 },
    ];
  },

  async createQuestion(payload: any) {
    return apiClient.post('/assessments/questions', payload);
  },

  async deleteQuestion(id: string) {
    return apiClient.delete(`/assessments/questions/${id}`);
  },

  async getAssessmentResults() {
    const res = await apiClient.get('/assessments/results');
    if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
    return [
      { id: 'ATT-8801', studentId: 'STU-1001', student: 'Aarav Sharma', quiz: 'Stellar Evolution & Redshift Quiz', score: '96%', result: 'Passed', date: '10 mins ago', timeTaken: '14 mins', correctAnswers: '14/15' },
      { id: 'ATT-8802', studentId: 'STU-1002', student: 'Ananya Patel', quiz: 'Hohmann Transfer Trajectory Assessment', score: '92%', result: 'Passed', date: '45 mins ago', timeTaken: '11 mins', correctAnswers: '9/10' },
      { id: 'ATT-8803', studentId: 'STU-1003', student: 'Rohan Gupta', quiz: 'Narrowband Imaging Calibration Exam', score: '88%', result: 'Passed', date: '2 hours ago', timeTaken: '24 mins', correctAnswers: '18/20' },
      { id: 'ATT-8804', studentId: 'STU-1004', student: 'Priya Verma', quiz: 'Stellar Evolution & Redshift Quiz', score: '55%', result: 'Failed', date: '3 hours ago', timeTaken: '19 mins', correctAnswers: '8/15' },
      { id: 'ATT-8805', studentId: 'STU-1005', student: 'Aditya Kumar', quiz: 'James Webb Telescope Data Science Test', score: '94%', result: 'Passed', date: '5 hours ago', timeTaken: '20 mins', correctAnswers: '11/12' },
    ];
  },
};

export const productService = {
  async getProducts() {
    const res = await apiClient.get('/products');
    if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
    return [
      { id: 'PRD-101', title: 'AstroNovas Pro Refractor Telescope 100ED', sku: 'SKU-AST-100ED', category: 'Telescope Optics', price: '₹48,999', stock: 24, status: 'In Stock', rating: 4.9, salesCount: 142, description: 'High-aperture extra-low dispersion doublet refractor for solar and deep sky photography.' },
      { id: 'PRD-102', title: 'Narrowband CMOS Astrophotography Camera 16MP', sku: 'SKU-CAM-16MP', category: 'Astrophotography', price: '₹64,500', stock: 12, status: 'In Stock', rating: 4.8, salesCount: 98, description: 'Cooled CMOS astrophotography sensor with ultra-low readout noise and high quantum efficiency.' },
      { id: 'PRD-103', title: 'Motorized Equatorial GoTo Mount EQ5', sku: 'SKU-MNT-EQ5', category: 'Astronomy Gear', price: '₹39,999', stock: 4, status: 'Low Stock', rating: 5.0, salesCount: 65, description: 'Computerized GoTo tracking mount with dual-axis stepper motors and planetarium connectivity.' },
      { id: 'PRD-104', title: 'Orbital Mechanics & Rocketry Lab Kit', sku: 'SKU-KIT-ORB01', category: 'Laboratory Kits', price: '₹8,499', stock: 50, status: 'In Stock', rating: 4.7, salesCount: 310, description: 'Hands-on practical physics kit for calculating orbital velocity, delta-v, and staging ratios.' },
      { id: 'PRD-105', title: 'Vedic Cosmology & Astrophysics Comprehensive Guide', sku: 'SKU-BK-VEDIC', category: 'Books & Guides', price: '₹1,499', stock: 0, status: 'Out of Stock', rating: 4.9, salesCount: 520, description: 'Academic hardcover research manual correlating classical Indian astronomy with modern cosmology.' },
    ];
  },

  async getProductById(id: string) {
    const res = await apiClient.get(`/products/${id}`);
    if (res && res.success && res.data) {
      return res.data;
    }
    const products = await this.getProducts();
    return products.find((p: any) => p.id === id || p._id === id) || products[0];
  },

  async createProduct(payload: any) {
    return apiClient.post('/products', payload);
  },

  async updateProduct(id: string, payload: any) {
    return apiClient.put(`/products/${id}`, payload);
  },

  async deleteProduct(id: string) {
    return apiClient.delete(`/products/${id}`);
  },
};

export const enrollmentService = {
  async getEnrollments(params?: { search?: string; status?: string; paymentMethod?: string; page?: number; limit?: number }) {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.status) query.append('status', params.status);
    if (params?.paymentMethod) query.append('paymentMethod', params.paymentMethod);
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());

    const res = await apiClient.get(`/enrollments/admin/all?${query.toString()}`);
    if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res;
    }

    // High quality mock dataset for enrollments with Payment Screenshots, QR Code payment mode, status, and details
    return {
      success: true,
      data: [
        {
          _id: 'ENR-501',
          id: 'ENR-501',
          user: { _id: 'STU-1001', name: 'Aarav Sharma', email: 'aarav.sharma@example.in', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
          course: { _id: 'CRS-001', title: 'Astrophysics & Cosmology 101', price: 4999, category: 'Astronomy & Physics' },
          enrolledAt: '2026-08-28T10:30:00.000Z',
          amountPaid: 4999,
          paymentMethod: 'qr_code',
          paymentStatus: 'verified',
          transactionId: 'UPI/62910488219/GPAY',
          paymentScreenshotUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
          status: 'completed',
          progress: 100,
          notes: 'Auto-verified via Google Pay UPI screenshot.',
        },
        {
          _id: 'ENR-502',
          id: 'ENR-502',
          user: { _id: 'STU-1002', name: 'Ananya Patel', email: 'ananya.p@example.in', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
          course: { _id: 'CRS-002', title: 'Orbital Mechanics Masterclass', price: 5999, category: 'Space Engineering' },
          enrolledAt: '2026-08-25T14:15:00.000Z',
          amountPaid: 5999,
          paymentMethod: 'upi',
          paymentStatus: 'verified',
          transactionId: 'UPI/88301923144/PHONEPE',
          paymentScreenshotUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80',
          status: 'active',
          progress: 45,
          notes: 'PhonePe QR payment verified.',
        },
        {
          _id: 'ENR-503',
          id: 'ENR-503',
          user: { _id: 'STU-1003', name: 'Rohan Gupta', email: 'rohan.g@example.in', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
          course: { _id: 'CRS-003', title: 'Deep Sky Astrophotography', price: 3499, category: 'Astrophotography' },
          enrolledAt: '2026-08-29T09:40:00.000Z',
          amountPaid: 3499,
          paymentMethod: 'qr_code',
          paymentStatus: 'pending',
          transactionId: 'UPI/90123847110/PAYTM',
          paymentScreenshotUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
          status: 'pending_payment',
          progress: 0,
          notes: 'Uploaded Paytm QR screenshot receipt, approval pending verification.',
        },
        {
          _id: 'ENR-504',
          id: 'ENR-504',
          user: { _id: 'STU-1004', name: 'Priya Verma', email: 'priya.v@example.in', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80' },
          course: { _id: 'CRS-001', title: 'Astrophysics & Cosmology 101', price: 4999, category: 'Astronomy & Physics' },
          enrolledAt: '2026-08-30T16:20:00.000Z',
          amountPaid: 4999,
          paymentMethod: 'bank_transfer',
          paymentStatus: 'pending',
          transactionId: 'NEFT/HDFC0001928/7721',
          paymentScreenshotUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
          status: 'pending_payment',
          progress: 0,
          notes: 'IMPS Bank slip uploaded by student.',
        },
        {
          _id: 'ENR-505',
          id: 'ENR-505',
          user: { _id: 'STU-1005', name: 'Aditya Kumar', email: 'aditya.k@example.in', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
          course: { _id: 'CRS-002', title: 'Orbital Mechanics Masterclass', price: 5999, category: 'Space Engineering' },
          enrolledAt: '2026-08-20T11:10:00.000Z',
          amountPaid: 5999,
          paymentMethod: 'card',
          paymentStatus: 'verified',
          transactionId: 'PAY_CC_991823001',
          paymentScreenshotUrl: null,
          status: 'active',
          progress: 78,
          notes: 'Paid via Stripe Credit Card gateway.',
        },
      ],
      pagination: {
        page: 1,
        limit: 20,
        total: 5,
        totalPages: 1,
      },
    };
  },

  async getEnrollmentStats() {
    const res = await apiClient.get('/enrollments/admin/stats');
    if (res && res.success && res.data) {
      return res.data;
    }
    return {
      totalEnrollments: 128,
      activeCount: 94,
      pendingCount: 14,
      completedCount: 18,
      rejectedCount: 2,
      totalRevenue: 642500,
    };
  },

  async createEnrollment(payload: {
    userId: string;
    courseId: string;
    amountPaid?: number;
    paymentMethod?: string;
    transactionId?: string;
    paymentScreenshotUrl?: string;
    notes?: string;
    status?: string;
  }) {
    return apiClient.post('/enrollments/admin/create', payload);
  },

  async updateEnrollmentStatus(enrollmentId: string, status: string, notes?: string) {
    return apiClient.patch(`/enrollments/admin/${enrollmentId}/status`, { status, notes });
  },

  async deleteEnrollment(enrollmentId: string) {
    return apiClient.delete(`/enrollments/admin/${enrollmentId}`);
  },
};




