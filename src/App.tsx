import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Community from './pages/Community'
import Articles from './pages/Articles'
import ArticleDetail from './pages/ArticleDetail'
import Contact from './pages/Contact'
import Volunteer from './pages/Volunteer'
import Donate from './pages/Donate'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AuthCallback from './pages/AuthCallback'
import CourtRulings from './pages/CourtRulings'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/community" element={<Community />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:id" element={<ArticleDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/court-rulings" element={<CourtRulings />} />
              <Route
                path="*"
                element={
                  <div dir="rtl" className="min-h-[60vh] flex items-center justify-center text-center px-4">
                    <div>
                      <h1 className="text-[80px] font-bold text-[#0071e3] mb-4">404</h1>
                      <p className="text-[20px] text-[#1d1d1f] mb-2">הדף לא נמצא</p>
                      <p className="text-[#86868b] mb-8">הדף שחיפשתם אינו קיים.</p>
                      <a href="/" className="apple-btn apple-btn-primary">חזרה לדף הבית</a>
                    </div>
                  </div>
                }
              />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  )
}
