import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserActivityProvider } from './contexts/UserActivityContext';
import { ApiModeProvider } from './contexts/ApiModeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FeaturesPage from './pages/FeaturesPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import AdminSettings from './pages/AdminSettings';


function App() {
  return (
    <AuthProvider>
      <UserActivityProvider>
        <ApiModeProvider>
          <Router>
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Header />
                  <main className="flex-grow">
                    <HomePage />
                  </main>
                  <Footer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/properties"
              element={
                <ProtectedRoute>
                  <Header />
                  <main className="flex-grow">
                    <PropertiesPage />
                  </main>
                  <Footer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/property/:id"
              element={
                <ProtectedRoute>
                  <Header />
                  <main className="flex-grow">
                    <PropertyDetailPage />
                  </main>
                  <Footer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <Header />
                  <main className="flex-grow">
                    <AboutPage />
                  </main>
                  <Footer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Header />
                  <main className="flex-grow">
                    <ContactPage />
                  </main>
                  <Footer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/features"
              element={
                <ProtectedRoute>
                  <Header />
                  <main className="flex-grow">
                    <FeaturesPage />
                  </main>
                  <Footer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Header />
                  <main className="flex-grow">
                    <ProfilePage />
                  </main>
                  <Footer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
          </Router>
        </ApiModeProvider>
      </UserActivityProvider>
    </AuthProvider>
  );
}

export default App;