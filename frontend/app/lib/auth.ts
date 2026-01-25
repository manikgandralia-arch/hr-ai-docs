// frontend/app/lib/auth.ts

export const AUTH = {
  // change these later
  username: "admin",
  password: "admin123",
};

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("hr_ai_docs_logged_in") === "true";
}

export function login(username: string, password: string): boolean {
  if (username === AUTH.username && password === AUTH.password) {
    localStorage.setItem("hr_ai_docs_logged_in", "true");
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem("hr_ai_docs_logged_in");
}