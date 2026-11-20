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
import AdminGrants from './pages/AdminGrants'
import Admin from './pages/Admin'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Chat from './pages/Chat'
import Groups from './pages/Groups'
import Research from './pages/Research'
import Guides from './pages/Guides'
import Media from './pages/Media'
import Emergency from './pages/Emergency'

export default function App() {
  return (
    <Routes>
      {/* Auth — no layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Full-screen pages — no layout */}
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/:id" element={<Chat />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />

      {/* Admin — no layout */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/grants" element={<AdminGrants />} />

      {/* Public pages — with layout */}
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
              <Route path="/groups" element={<Groups />} />
              <Route path="/research" element={<Research />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/media" element={<Media />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route
                path="*"
                element={
                  <div dir="rtl" className="min-h-[60vh] flex items-center justify-center text-center px-4">
                    <div>
                      <h1 className="text-[80px] font-bold text-[#1e40af] mb-4">404</h1>
                      <p className="text-[20px] text-[#1f2937] mb-2">הדף לא נמצא</p>
                      <p className="text-[#6b7280] mb-8">הדף שחיפשתם אינו קיים.</p>
                      <a href="/" className="btn btn-blue">חזרה לדף הבית</a>
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
