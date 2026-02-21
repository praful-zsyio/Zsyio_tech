import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AboutUs from './pages/AboutUs'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ServicesPage from './pages/ServicesPage'
import BackToTopButton from './components/BackToTopButton'
import ScrollToTop from './components/ScrollToTop'
import ContactPage from './pages/ContactPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import DisclaimerPage from './pages/DisclaimerPage'
import TrademarksPage from './pages/TrademarksPage'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import EstimateSection from './components/services/EstimationSection'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='/projects/:projectId' element={<ProjectDetailPage />} />
          <Route path='/services' element={<ServicesPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
          <Route path='/disclaimer' element={<DisclaimerPage />} />
          <Route path='/trademarks' element={<TrademarksPage />} />
          <Route path="/estimate/:serviceId" element={<EstimateSection />} />
        </Routes>
      </main>
      <Footer />
      <BackToTopButton />
    </AuthProvider>
  )
}

export default App