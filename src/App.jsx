import { Navigate, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import Authpage from './pages/Authpage/Authpage'
import PageLayout from './Layouts/PageLayout/PageLayout'
import useAuthStore from './store/authStore'
import Archived from './pages/Archived/Archived'

function App() {
  const authUser = useAuthStore((state) => state.user)
  return (
    <PageLayout>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Homepage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/archived"
          element={authUser ? <Archived /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!authUser ? <Authpage /> : <Navigate to="/" />}
        />
      </Routes>
    </PageLayout>
  )
}

export default App
