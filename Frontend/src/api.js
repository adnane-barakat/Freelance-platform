// This is a mock API for demonstration purposes
// In a real application, you would make actual API calls to your backend

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const users = [];

export const loginUser = async (email, password) => {
  await delay(1000); // Simulate API call
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    return { email: user.email };
  }
  throw new Error('Invalid email or password');
};

export const signupUser = async (email, password) => {
  await delay(1000); // Simulate API call
  if (users.some(u => u.email === email)) {
    throw new Error('Email already exists');
  }
  const newUser = { email, password };
  users.push(newUser);
  return { email: newUser.email };
};

export const logoutUser = async () => {
  await delay(1000); // Simulate API call
  // In a real application, you would invalidate the session on the server
};

