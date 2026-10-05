import { UserRole } from './permissions';

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: NavItem[];
}

export const navigationConfig: Record<UserRole, NavItem[]> = {
  admin: [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: 'LayoutDashboard',
    },
    {
      title: 'Students',
      href: '/admin/students',
      icon: 'Users',
      children: [
        { title: 'Students', href: '/admin/students' },
        { title: 'Add Student', href: '/admin/students/add' },
        { title: 'Student Details', href: '/admin/students/1' },
      ],
    },
    {
      title: 'Courses',
      href: '/admin/courses',
      icon: 'BookOpen',
      children: [
        { title: 'All Courses', href: '/admin/courses' },
        { title: 'Create Course', href: '/admin/courses/create' },
        { title: 'Draft Courses', href: '/admin/courses/drafts' },
        { title: 'Published Courses', href: '/admin/courses/published' },
        { title: 'All Categories', href: '/admin/courses/categories' },
        { title: 'Add Category', href: '/admin/courses/categories/add' },
      ],
    },
    {
      title: 'Product',
      href: '/admin/products',
      icon: 'Package',
      children: [
        { title: 'All Products', href: '/admin/products' },
        { title: 'Create Product', href: '/admin/products/create' },
        { title: 'Product Details', href: '/admin/products/1' },
      ],
    },
    // {
    //   title: 'Lessons',
    //   href: '/admin/lessons',
    //   icon: 'FileText',
    //   children: [
    //     { title: 'All Lessons', href: '/admin/lessons' },
    //     { title: 'Lesson Management', href: '/admin/lessons/management' },
    //   ],
    // },
    {
      title: 'Assessments',
      href: '/admin/assessments/quizzes',
      icon: 'ClipboardCheck',
      children: [
        { title: 'Quizzes', href: '/admin/assessments/quizzes' },
        { title: 'Questions', href: '/admin/assessments/questions' },
        { title: 'Results', href: '/admin/assessments/results' },
      ],
    },
    {
      title: 'Assignments',
      href: '/admin/assignments',
      icon: 'FileCheck',
      children: [
        { title: 'All Assignments', href: '/admin/assignments' },
        { title: 'Submissions', href: '/admin/assignments/submissions' },
        { title: 'Grading', href: '/admin/assignments/grading' },
      ],
    },
    {
      title: 'Enrollments',
      href: '/admin/enrollments',
      icon: 'GraduationCap',
      children: [
        { title: 'All Enrollments', href: '/admin/enrollments' },
        { title: 'Pending Enrollments', href: '/admin/enrollments/pending' },
      ],
    },
    {
      title: 'Certificates',
      href: '/admin/certificates',
      icon: 'UserCheck',
      children: [
        { title: 'All Certificates', href: '/admin/certificates' },
        { title: 'Certificate Templates', href: '/admin/certificates/templates' },
      ],
    },
    {
      title: 'Analytics',
      href: '/admin/analytics/students',
      icon: 'BarChart3',
      children: [
        { title: 'Student Analytics', href: '/admin/analytics/students' },
        { title: 'Course Analytics', href: '/admin/analytics/courses' },
        { title: 'Revenue Analytics', href: '/admin/analytics/revenue' },
        { title: 'Completion Analytics', href: '/admin/analytics/completion' },
      ],
    },
    {
      title: 'Announcements',
      href: '/admin/announcements',
      icon: 'Bell',
      children: [
        { title: 'All Announcements', href: '/admin/announcements' },
        { title: 'Create Announcement', href: '/admin/announcements/create' },
      ],
    },
    {
      title: 'Settings',
      href: '/admin/settings/general',
      icon: 'Settings',
      children: [
        { title: 'General', href: '/admin/settings/general' },
        { title: 'Profile', href: '/admin/settings/profile' },
        { title: 'Notifications', href: '/admin/settings/notifications' },
        { title: 'Security', href: '/admin/settings/security' },
      ],
    },
  ],
  manager: [
    {
      title: 'Dashboard',
      href: '/dashboard/manager',
      icon: 'LayoutDashboard',
    },
    {
      title: 'Student Directory',
      href: '/dashboard/manager/students',
      icon: 'Users',
      children: [
        { title: 'All Students', href: '/dashboard/manager/students' },
        { title: 'Mentors', href: '/dashboard/manager/mentors' },
        { title: 'Managers', href: '/dashboard/manager/managers' },
        { title: 'Admins', href: '/dashboard/manager/admins' },
        { title: 'Roles & Permissions', href: '/dashboard/manager/roles' },
      ],
    },
    {
      title: 'Course Management',
      href: '/dashboard/manager/courses',
      icon: 'BookOpen',
      children: [
        { title: 'All Courses', href: '/dashboard/manager/courses' },
        { title: 'Add Course', href: '/dashboard/manager/courses/add' },
        { title: 'Categories', href: '/dashboard/manager/courses/categories' },
        { title: 'Course Levels', href: '/dashboard/manager/courses/levels' },
        { title: 'Course Modules', href: '/dashboard/manager/courses/modules' },
        { title: 'Lessons', href: '/dashboard/manager/courses/lessons' },
        { title: 'Videos', href: '/dashboard/manager/courses/videos' },
        { title: 'Assign Mentors', href: '/dashboard/manager/courses/assign-mentors' },
        { title: 'Course Reviews', href: '/dashboard/manager/courses/reviews' },
        { title: 'Certificates', href: '/dashboard/manager/courses/certificates' },
      ],
    },
    {
      title: 'Class Management',
      href: '/dashboard/manager/classes',
      icon: 'Calendar',
      children: [
        { title: 'All Classes', href: '/dashboard/manager/classes' },
        { title: 'Live Classes', href: '/dashboard/manager/classes/live' },
        { title: 'Upcoming Classes', href: '/dashboard/manager/classes/upcoming' },
        { title: 'Recorded Classes', href: '/dashboard/manager/classes/recorded' },
        { title: 'Class Calendar', href: '/dashboard/manager/classes/calendar' },
        { title: 'Attendance', href: '/dashboard/manager/classes/attendance' },
        { title: 'Assign Students', href: '/dashboard/manager/classes/assign-students' },
      ],
    },
    {
      title: 'Student Management',
      href: '/dashboard/manager/students',
      icon: 'GraduationCap',
      children: [
        { title: 'All Students', href: '/dashboard/manager/students' },
        { title: 'Student Progress', href: '/dashboard/manager/students/progress' },
        { title: 'Enrollments', href: '/dashboard/manager/students/enrollments' },
        { title: 'Certificates', href: '/dashboard/manager/students/certificates' },
        { title: 'Attendance', href: '/dashboard/manager/students/attendance' },
        { title: 'Performance Reports', href: '/dashboard/manager/students/performance' },
      ],
    },
    {
      title: 'Mentor Management',
      href: '/dashboard/manager/mentors',
      icon: 'UserCheck',
      children: [
        { title: 'All Mentors', href: '/dashboard/manager/mentors' },
        { title: 'Assign Courses', href: '/dashboard/manager/mentors/assign-courses' },
        { title: 'Assign Classes', href: '/dashboard/manager/mentors/assign-classes' },
        { title: 'Performance', href: '/dashboard/manager/mentors/performance' },
        { title: 'Ratings', href: '/dashboard/manager/mentors/ratings' },
        { title: 'Availability', href: '/dashboard/manager/mentors/availability' },
      ],
    },
    {
      title: 'Blog Management',
      href: '/dashboard/manager/blogs',
      icon: 'FileText',
      children: [
        { title: 'All Blogs', href: '/dashboard/manager/blogs' },
        { title: 'Add Blog', href: '/dashboard/manager/blogs/add' },
        { title: 'Categories', href: '/dashboard/manager/blogs/categories' },
        { title: 'Comments', href: '/dashboard/manager/blogs/comments' },
        { title: 'SEO', href: '/dashboard/manager/blogs/seo' },
      ],
    },
    {
      title: 'Orders & Payments',
      href: '/dashboard/manager/orders',
      icon: 'CreditCard',
      children: [
        { title: 'Orders', href: '/dashboard/manager/orders' },
        { title: 'Payments', href: '/dashboard/manager/payments' },
        { title: 'Transactions', href: '/dashboard/manager/transactions' },
        { title: 'Refunds', href: '/dashboard/manager/refunds' },
        { title: 'Coupons', href: '/dashboard/manager/coupons' },
      ],
    },
    {
      title: 'Reports',
      href: '/dashboard/manager/reports',
      icon: 'BarChart3',
      children: [
        { title: 'Revenue Report', href: '/dashboard/manager/reports/revenue' },
        { title: 'Student Report', href: '/dashboard/manager/reports/students' },
        { title: 'Course Report', href: '/dashboard/manager/reports/courses' },
        { title: 'Mentor Report', href: '/dashboard/manager/reports/mentors' },
        { title: 'Class Report', href: '/dashboard/manager/reports/classes' },
      ],
    },
    {
      title: 'Notifications',
      href: '/dashboard/manager/notifications',
      icon: 'Bell',
      children: [
        { title: 'Email', href: '/dashboard/manager/notifications/email' },
        { title: 'Push Notifications', href: '/dashboard/manager/notifications/push' },
        { title: 'Announcements', href: '/dashboard/manager/notifications/announcements' },
      ],
    },
    {
      title: 'CMS',
      href: '/dashboard/manager/cms',
      icon: 'Globe',
      children: [
        { title: 'Homepage', href: '/dashboard/manager/cms/homepage' },
        { title: 'About', href: '/dashboard/manager/cms/about' },
        { title: 'Contact', href: '/dashboard/manager/cms/contact' },
        { title: 'FAQs', href: '/dashboard/manager/cms/faqs' },
        { title: 'Testimonials', href: '/dashboard/manager/cms/testimonials' },
      ],
    },
    {
      title: 'Settings',
      href: '/dashboard/manager/settings',
      icon: 'Settings',
      children: [
        { title: 'General Settings', href: '/dashboard/manager/settings/general' },
        { title: 'Website Settings', href: '/dashboard/manager/settings/website' },
        { title: 'Email Settings', href: '/dashboard/manager/settings/email' },
        { title: 'Payment Settings', href: '/dashboard/manager/settings/payment' },
        { title: 'API Keys', href: '/dashboard/manager/settings/api' },
        { title: 'Security', href: '/dashboard/manager/settings/security' },
        { title: 'Profile', href: '/dashboard/manager/settings/profile' },
      ],
    },
  ],
  mentor: [
    {
      title: 'Dashboard',
      href: '/dashboard/mentor',
      icon: 'LayoutDashboard',
    },
    {
      title: 'My Courses',
      href: '/dashboard/mentor/courses',
      icon: 'BookOpen',
      children: [
        { title: 'All Courses', href: '/dashboard/mentor/courses' },
        { title: 'Course Content', href: '/dashboard/mentor/courses/content' },
        { title: 'Lessons', href: '/dashboard/mentor/courses/lessons' },
        { title: 'Videos', href: '/dashboard/mentor/courses/videos' },
        { title: 'Resources', href: '/dashboard/mentor/courses/resources' },
      ],
    },
    {
      title: 'My Classes',
      href: '/dashboard/mentor/classes',
      icon: 'Calendar',
      children: [
        { title: "Today's Classes", href: '/dashboard/mentor/classes/today' },
        { title: 'Upcoming Classes', href: '/dashboard/mentor/classes/upcoming' },
        { title: 'Live Classes', href: '/dashboard/mentor/classes/live' },
        { title: 'Recorded Classes', href: '/dashboard/mentor/classes/recorded' },
        { title: 'Attendance', href: '/dashboard/mentor/classes/attendance' },
      ],
    },
    {
      title: 'Students',
      href: '/dashboard/mentor/students',
      icon: 'GraduationCap',
      children: [
        { title: 'My Students', href: '/dashboard/mentor/students' },
        { title: 'Student Progress', href: '/dashboard/mentor/students/progress' },
        { title: 'Assignments', href: '/dashboard/mentor/students/assignments' },
        { title: 'Q&A', href: '/dashboard/mentor/students/qa' },
        { title: 'Certificates', href: '/dashboard/mentor/students/certificates' },
      ],
    },
    {
      title: 'Assignments',
      href: '/dashboard/mentor/assignments',
      icon: 'FileCheck',
      children: [
        { title: 'Create Assignment', href: '/dashboard/mentor/assignments/create' },
        { title: 'Review Submission', href: '/dashboard/mentor/assignments/review' },
        { title: 'Grades', href: '/dashboard/mentor/assignments/grades' },
      ],
    },
    {
      title: 'Blog',
      href: '/dashboard/mentor/blogs',
      icon: 'FileText',
      children: [
        { title: 'My Blogs', href: '/dashboard/mentor/blogs' },
        { title: 'Create Blog', href: '/dashboard/mentor/blogs/create' },
        { title: 'Drafts', href: '/dashboard/mentor/blogs/drafts' },
      ],
    },
    {
      title: 'Messages',
      href: '/dashboard/mentor/messages',
      icon: 'MessageSquare',
      children: [
        { title: 'Student Chat', href: '/dashboard/mentor/messages/chat' },
        { title: 'Notifications', href: '/dashboard/mentor/messages/notifications' },
      ],
    },
    {
      title: 'Profile',
      href: '/dashboard/mentor/profile',
      icon: 'User',
      children: [
        { title: 'My Profile', href: '/dashboard/mentor/profile' },
        { title: 'Availability', href: '/dashboard/mentor/profile/availability' },
        { title: 'Change Password', href: '/dashboard/mentor/profile/password' },
      ],
    },
  ],
  student: [
    { title: 'Dashboard', href: '/student/1/dashboard', icon: 'LayoutDashboard' },
    { title: 'Courses', href: '/student/1/courses', icon: 'BookOpen' },
    { title: 'Learn', href: '/student/1/learn', icon: 'FolderOpen' },
    { title: 'Quizzes', href: '/student/1/quizzes', icon: 'ClipboardCheck' },
    { title: 'Assignments', href: '/student/1/assignments', icon: 'FileCheck' },
    { title: 'Certificates', href: '/student/1/certificates', icon: 'GraduationCap' },
    { title: 'Achievements', href: '/student/1/achievements', icon: 'BarChart3' },
    { title: 'Notifications', href: '/student/1/notifications', icon: 'Bell' },
    { title: 'Profile', href: '/student/1/profile', icon: 'User' },
    { title: 'Settings', href: '/student/1/settings', icon: 'Settings' },
  ],
};
