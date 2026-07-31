// Permission Matrix for Role-Based Access Control

export type UserRole = 'admin' | 'manager' | 'mentor' | 'student';

export interface Permission {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canManage: boolean;
}

export const permissions: Record<UserRole, Record<string, Permission>> = {
  admin: {
    dashboard: { canView: true, canCreate: false, canEdit: false, canDelete: false, canManage: true },
    users: { canView: true, canCreate: true, canEdit: true, canDelete: true, canManage: true },
    courses: { canView: true, canCreate: true, canEdit: true, canDelete: true, canManage: true },
    classes: { canView: true, canCreate: true, canEdit: true, canDelete: true, canManage: true },
    students: { canView: true, canCreate: true, canEdit: true, canDelete: true, canManage: true },
    mentors: { canView: true, canCreate: true, canEdit: true, canDelete: true, canManage: true },
    blogs: { canView: true, canCreate: true, canEdit: true, canDelete: true, canManage: true },
    assignments: { canView: true, canCreate: true, canEdit: true, canDelete: true, canManage: true },
    assessments: { canView: true, canCreate: true, canEdit: true, canDelete: true, canManage: true },
    reports: { canView: true, canCreate: true, canEdit: true, canDelete: true, canManage: true },
    notifications: { canView: true, canCreate: true, canEdit: true, canDelete: true, canManage: true },
    cms: { canView: true, canCreate: true, canEdit: true, canDelete: true, canManage: true },
    settings: { canView: true, canCreate: false, canEdit: true, canDelete: false, canManage: true },
  },
  manager: {
    dashboard: { canView: true, canCreate: false, canEdit: false, canDelete: false, canManage: true },
    users: { canView: true, canCreate: false, canEdit: false, canDelete: false, canManage: false },
    courses: { canView: true, canCreate: true, canEdit: true, canDelete: false, canManage: true },
    classes: { canView: true, canCreate: true, canEdit: true, canDelete: false, canManage: true },
    students: { canView: true, canCreate: false, canEdit: true, canDelete: false, canManage: true },
    mentors: { canView: true, canCreate: false, canEdit: false, canDelete: false, canManage: false },
    blogs: { canView: true, canCreate: true, canEdit: true, canDelete: false, canManage: true },
    assignments: { canView: true, canCreate: false, canEdit: false, canDelete: false, canManage: false },
    assessments: { canView: true, canCreate: false, canEdit: false, canDelete: false, canManage: false },
    reports: { canView: true, canCreate: true, canEdit: true, canDelete: false, canManage: true },
    notifications: { canView: true, canCreate: true, canEdit: true, canDelete: false, canManage: true },
    cms: { canView: false, canCreate: false, canEdit: false, canDelete: false, canManage: false },
    settings: { canView: true, canCreate: false, canEdit: true, canDelete: false, canManage: false },
  },
  mentor: {
    dashboard: { canView: true, canCreate: false, canEdit: false, canDelete: false, canManage: true },
    users: { canView: false, canCreate: false, canEdit: false, canDelete: false, canManage: false },
    courses: { canView: true, canCreate: false, canEdit: true, canDelete: false, canManage: false },
    classes: { canView: true, canCreate: false, canEdit: true, canDelete: false, canManage: false },
    students: { canView: true, canCreate: false, canEdit: true, canDelete: false, canManage: false },
    mentors: { canView: false, canCreate: false, canEdit: false, canDelete: false, canManage: false },
    blogs: { canView: true, canCreate: true, canEdit: true, canDelete: false, canManage: false },
    assignments: { canView: true, canCreate: true, canEdit: true, canDelete: false, canManage: true },
    assessments: { canView: true, canCreate: true, canEdit: true, canDelete: false, canManage: true },
    reports: { canView: true, canCreate: false, canEdit: false, canDelete: false, canManage: false },
    notifications: { canView: true, canCreate: false, canEdit: false, canDelete: false, canManage: false },
    cms: { canView: false, canCreate: false, canEdit: false, canDelete: false, canManage: false },
    settings: { canView: true, canCreate: false, canEdit: true, canDelete: false, canManage: false },
  },
  student: {
    dashboard: { canView: true, canCreate: false, canEdit: false, canDelete: false, canManage: true },
    users: { canView: false, canCreate: false, canEdit: false, canDelete: false, canManage: false },
    courses: { canView: true, canCreate: false, canEdit: false, canDelete: false, canManage: false },
    classes: { canView: true, canCreate: false, canEdit: false, canDelete: false, canManage: false },
    students: { canView: true, canCreate: false, canEdit: true, canDelete: false, canManage: false },
    mentors: { canView: false, canCreate: false, canEdit: false, canDelete: false, canManage: false },
    blogs: { canView: true, canCreate: false, canEdit: false, canDelete: false, canManage: false },
    assignments: { canView: true, canCreate: false, canEdit: false, canDelete: false, canManage: false },
    assessments: { canView: true, canCreate: false, canEdit: false, canDelete: false, canManage: false },
    reports: { canView: true, canCreate: false, canEdit: false, canDelete: false, canManage: false },
    notifications: { canView: true, canCreate: false, canEdit: false, canDelete: false, canManage: false },
    cms: { canView: false, canCreate: false, canEdit: false, canDelete: false, canManage: false },
    settings: { canView: true, canCreate: false, canEdit: true, canDelete: false, canManage: false },
  },
};

export function hasPermission(role: UserRole, module: string, action: keyof Permission): boolean {
  return permissions[role]?.[module]?.[action] || false;
}

export function canAccessRoute(role: UserRole, route: string): boolean {
  const module = route.split('/')[0];
  return hasPermission(role, module, 'canView');
}
