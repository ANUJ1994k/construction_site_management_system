import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'; // Import the Navbar
import CreateTask from "./pages/CreateTask";
import ViewTasks from "./pages/ViewTasks";
import EditTask from "./pages/EditTask";
import SiteList from "./pages/SiteList";
import AddSiteForm from './components/AddSiteForm';
import SiteDetails from "./components/SiteDetails";
import SitesDashboard from "./pages/SitesDashboard";
import DailyProgressReport from "./components/DailyProgressReport";
import TrackProgress from './components/TrackProgress';
import AssignWorkers from "./components/AssignWorkers";
import ViewProgress from "./components/ViewProgress";

function App() {
  return (
    <Router>
      <Navbar /> 
      <SitesDashboard />
      <Routes>
        <Route path="/" element={<SiteList />} />
        <Route path="/add-site" element={<AddSiteForm />} />
        <Route path="/site/:siteId" element={<SiteDetails />} />
        <Route path="/report/:siteId" element={<DailyProgressReport />} />
        <Route path="/site/:siteId/tasks/create" element={<CreateTask />} />
        <Route path="/site/:siteId/tasks" element={<ViewTasks />} />
        <Route path="/site/:siteId/tasks/edit/:taskId" element={<EditTask />} />
        <Route path="/site/:siteId/task/:taskId/progress" element={<TrackProgress />} />
        <Route path="/site/:siteId/task/:taskId/assign-workers" element={<AssignWorkers />} />
        <Route path="/site/:siteId/task/:taskId/progress/view" element={<ViewProgress />} />
      </Routes>
    </Router>
  );
}

export default App;
