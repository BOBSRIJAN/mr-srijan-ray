export const API_BASE = "http://127.0.0.1:8000/reactportfolio/api/v1";
export const ENDPOINTS = {
LOGIN: `${API_BASE}/login`,
LOGOUT: `${API_BASE}/logout`,
STATUS: `${API_BASE}/adminstatus`,
GET_PROJECTS: `${API_BASE}/getprojectdata`,
ADD_PROJECT: `${API_BASE}/addproject`,
UPDATE_PROJECT: `${API_BASE}/updateproject`,
DELETE_PROJECT: `${API_BASE}/deleteproject`,
SAVE_CONTACT_MESSAGE: `${API_BASE}/savecontactmassage`,
GET_CONTACT_MESSAGE: `${API_BASE}/getcontactmassage`,
DELETE_CONTACT_MESSAGE: `${API_BASE}/deletecontactmassage`
};