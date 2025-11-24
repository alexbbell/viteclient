import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MyLayout } from './Components/MyLayout'
import { Homepage } from './Components/Pages/Homepage'

import { lazy } from 'react'
// import { Services } from './Components/Pages/Services/Services'
// import { Admin } from './Components/Pages/Admin/Admin'

const Auth = lazy(async () => await import ('./Components/Pages/Auth'))
const About = lazy(async () => await import('./Components/Pages/About'))
const Skills = lazy(async () => await import ('./Components/Pages/Skills'))
const Blog = lazy(async () => await import ('./Components/Pages/Blog'))
const LangMaster = lazy(async () => await import ('./Components/Pages/LangMaster/LangMaster'))
const Mathema = lazy(async () => await import ('./Components/Mathema/Mathema'))
const Admin = lazy(async () => await import ('./Components/Pages/Admin/Admin'))
const Services = lazy(async () => await import ('./Components/Pages/Services/Services'))

const App = (): React.JSX.Element => {

  return (
        <React.Suspense fallback={<div>Loading…</div>}>

    <Routes>
      <Route path="/" element={<MyLayout />}>
        <Route path=":lng?/" element={<Homepage />} />
        <Route path="/auth/" element={<Auth />}></Route>
        <Route path="/:lng/blogs" element={<Blog />} />
        <Route path="/:lng/services" element={<Services />} />
        <Route path="/:lng/about" element={<About />} />
        <Route path="/:lng/experience" element={<Skills query="work" />} />
        <Route path="/:lng/skills" element={<Skills query="skills" />} />
        <Route path="/:lng/lngmngr" element={<LangMaster />} />
        <Route path="/:lng/math" element={<Mathema />} />
        <Route path="/:lng/connectmysite" element={<Admin />} />
        
                 {/* Redirect invalid langs to /en */}
          {/* <Route path=":lng" element={<Navigate to="/en" replace />} /> */}

          {/* Optional 404 */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Route>
    </Routes>
    </React.Suspense>
 
  )
}

export default App
