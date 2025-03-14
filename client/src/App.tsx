// backend/server.ts (Example using Node.js and Express)
import express from 'express';
import mongoose from 'mongoose';
import { userRouter, adminRouter, vendorRouter } from './routes'; // Placeholder routes

const app = express();
const port = 3001;

// MongoDB connection (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(express.json()); // for parsing application/json
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/vendor', vendorRouter);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


// backend/models/User.ts (Example using Mongoose)
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'vendor'], default: 'user' },
  // Add other fields as needed
});

const User = mongoose.model('User', userSchema);
export default User;


// frontend/src/components/AuthProvider.tsx (Example using React Context)
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from backend on mount (e.g., using localStorage or session storage)
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


// frontend/src/App.tsx (Example integration)
import React from 'react';
import { AuthProvider } from './components/AuthProvider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserPanel from './UserPanel';
import AdminPanel from './AdminPanel';
import VendorPanel from './VendorPanel';
import Login from './Login';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserPanel />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/vendor" element={<VendorPanel />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;