import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import MyFiles from './pages/MyFiles';
import Subscription from './pages/Subscription';
import Transactions from './pages/Transactions';
import {RedirectToSignIn, SignedIn, SignedOut} from "@clerk/clerk-react";
import {Toaster} from "react-hot-toast";
import {UserCreditsProvider} from "./context/UserCreditsContext.jsx";
import PublicFileView from "./pages/PublicFileView.jsx";

const App = () => {
  return (
    <UserCreditsProvider>
      <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/dashboard' element={
          <>
            <SignedIn><Dashboard /></SignedIn>
            <SIgnedOut><RedirectToSignIn /></SIgnedOut>
          </>
        } />
        <Route path='/upload' element={
          <>
            <SignedIn><Upload /></SignedIn>
            <SIgnedOut><RedirectToSignIn /></SIgnedOut>
          </>
        } />
        <Route path='/my-files' element={
          <>
            <SignedIn><MyFiles /></SignedIn>
            <SIgnedOut><RedirectToSignIn /></SIgnedOut>
          </>
        } />
        <Route path='/subscriptions' element={
          <>
            <SignedIn><Subscription /></SignedIn>
            <SIgnedOut><RedirectToSignIn /></SIgnedOut>
          </>
        } />
        <Route path='/Transactions' element={
          <>
            <SignedIn> <Transactions /></SignedIn>
            <SIgnedOut><RedirectToSignIn /></SIgnedOut>
          </>
        } />
        <Route path="file/:fileId" element={
                        <>
                            <PublicFileView />
                        </>
                    }/>
      </Routes>
    </BrowserRouter>
    </UserCreditsProvider>
  )
}

export default App;
