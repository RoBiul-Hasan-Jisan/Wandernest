import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Header from './components/pages/Header.jsx'
import Footer from './components/pages/Footer.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import CreateTrip from './components/pages/CreateTrip.jsx'
import HowItWorks from './components/pages/HowItWorks.jsx'
import ContactUs from './components/pages/ContactUs.jsx'
import TermsOfService from './components/pages/TermsOfService.jsx'
import PrivacyPolicy from './components/pages/PrivacyPolicy.jsx'
import CookiePolicy from './components/pages/CookiePolicy.jsx'
import UserManual from './components/pages/UserManual.jsx'
import Office from './components/pages/Office.jsx'
import JoinUs from './components/pages/joinus.jsx'
import TripDetails from './components/Trips/TripDetails'
import AISuggestionPage from "./components/pages/AISuggestionPage";
import MyTrips from './components/pages/MyTrips.jsx';

// Create a layout component that includes Header and Footer
const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      {children}
    </main>
    <Footer />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <App />
      </Layout>
    )
  },
  {
    path: '/how-it-works',
    element: (
      <Layout>
        <HowItWorks />
      </Layout>
    )
  },
  {
    path: '/contact',
    element: (
      <Layout>
        <ContactUs />
      </Layout>
    )
  },
  {
    path: '/terms',
    element: (
      <Layout>
        <TermsOfService />
      </Layout>
    )
  },
  {
    path: '/create-trip',
    element: (
      <Layout>
        <CreateTrip />
      </Layout>
    )
  },
  {
    path: '/my-trips',
    element: (
      <Layout>
        <MyTrips />
      </Layout>
    )
  },
  {
    path: '/privacy',
    element: (
      <Layout>
        <PrivacyPolicy />
      </Layout>
    )
  },
  {
    path: '/cookies',
    element: (
      <Layout>
        <CookiePolicy />
      </Layout>
    )
  },
  {
    path: '/user-manual',
    element: (
      <Layout>
        <UserManual />
      </Layout>
    )
  },
  {
    path: '/user-join',
    element: (
      <Layout>
        <JoinUs />
      </Layout>
    )
  },
  {
    path: '/view-trip/:tripId',
    element: (
      <Layout>
        <TripDetails />
      </Layout>
    )
  },
  {
    path: '/ai-suggestion',
    element: (
      <Layout>
        <AISuggestionPage />
      </Layout>
    )
  },
  {
    path: '/offices',
    element: (
      <Layout>
        <Office />
      </Layout>
    )
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
)