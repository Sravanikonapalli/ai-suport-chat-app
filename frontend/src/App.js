import { useState } from 'react';
import Chat from './components/Chat';
import UploadFAQ from './components/UploadFAQ';
import ViewFAQs from './components/ViewFAQs';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showSignupDialog, setShowSignupDialog] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>AI Customer Support</h2>

      <Chat />

      <div style={{ marginTop: 10 }}>
        <button onClick={() => setShowUploadDialog(true)}>Upload FAQ</button>
        {loggedIn && <button onClick={handleLogout} style={{ marginLeft: 10 }}>Logout</button>}
      </div>

      <ViewFAQs />

      {/* Upload Dialog */}
      {showUploadDialog && (
        <div className="dialog">
          <div className="dialog-content">
            <button className="close" onClick={() => setShowUploadDialog(false)}>X</button>
            {!loggedIn ? (
              <>
                <p>Only admins can upload FAQs.</p>
                <button onClick={() => {
                  setShowUploadDialog(false);
                  setShowLoginDialog(true);
                }}>Login to Upload</button>
              </>
            ) : (
              <UploadFAQ />
            )}
          </div>
        </div>
      )}

      {/* Login Dialog */}
      {showLoginDialog && (
        <div className="dialog">
          <div className="dialog-content">
            <button className="close" onClick={() => setShowLoginDialog(false)}>X</button>
            <Login
              onLogin={() => {
                setLoggedIn(true);
                setShowLoginDialog(false);
                setShowUploadDialog(true); // open upload after login
              }}
              onSwitchToSignup={() => {
                setShowLoginDialog(false);
                setShowSignupDialog(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Signup Dialog */}
      {showSignupDialog && (
        <div className="dialog">
          <div className="dialog-content">
            <button className="close" onClick={() => setShowSignupDialog(false)}>X</button>
            <Signup
              onSwitchToLogin={() => {
                setShowSignupDialog(false);
                setShowLoginDialog(true);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
