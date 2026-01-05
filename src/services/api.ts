// Use relative /api path for Vercel deployment
const API_URL = '/api';

export const api = {
  // Student APIs
  async getStudent(rollNo: string) {
    const response = await fetch(`${API_URL}/students/${rollNo}`);
    if (!response.ok) throw new Error('Failed to fetch student');
    return response.json();
  },

  async updateStudent(rollNo: string, data: any) {
    const response = await fetch(`${API_URL}/students/${rollNo}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update student');
    return response.json();
  },

  // Course APIs
  async getCourses() {
    const response = await fetch(`${API_URL}/courses`);
    if (!response.ok) throw new Error('Failed to fetch courses');
    return response.json();
  },

  async createCourse(data: any) {
    const response = await fetch(`${API_URL}/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create course');
    return response.json();
  },

  async updateCourse(id: string, data: any) {
    const response = await fetch(`${API_URL}/courses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update course');
    return response.json();
  },

  async deleteCourse(id: string) {
    const response = await fetch(`${API_URL}/courses/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete course');
    return response.json();
  },

  // Assignment APIs
  async getAssignments() {
    const response = await fetch(`${API_URL}/assignments`);
    if (!response.ok) throw new Error('Failed to fetch assignments');
    return response.json();
  },

  async createAssignment(data: any) {
    const response = await fetch(`${API_URL}/assignments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create assignment');
    return response.json();
  },

  async updateAssignment(id: string, data: any) {
    const response = await fetch(`${API_URL}/assignments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update assignment');
    return response.json();
  },

  async deleteAssignment(id: string) {
    const response = await fetch(`${API_URL}/assignments/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete assignment');
    return response.json();
  },
};
