'use client';

import { useState } from 'react';

export default function BootstrapExample() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="container mt-5">
      <h1 className="display-4 text-center mb-5">Bootstrap 5 Components</h1>
      
      {/* Navigation Tabs */}
      <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
            type="button"
            role="tab"
          >
            Home
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
            type="button"
            role="tab"
          >
            Profile
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
            type="button"
            role="tab"
          >
            Contact
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content" id="myTabContent">
        {activeTab === 'home' && (
          <div className="tab-pane fade show active">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Card Title</h5>
                    <p className="card-text">This is a Bootstrap card component with some sample content.</p>
                    <button className="btn btn-primary">Primary Button</button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="alert alert-success" role="alert">
                  <h4 className="alert-heading">Well done!</h4>
                  <p>This is a success alert with Bootstrap styling.</p>
                  <hr />
                  <p className="mb-0">You can use Bootstrap's alert components for user feedback.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="tab-pane fade show active">
            <div className="row">
              <div className="col-md-8 mx-auto">
                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" />
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="tab-pane fade show active">
            <div className="row">
              <div className="col-md-6">
                <h4>Contact Information</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Email
                    <span className="badge bg-primary rounded-pill">info@example.com</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Phone
                    <span className="badge bg-secondary rounded-pill">+1 234 567 890</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Address
                    <span className="badge bg-info rounded-pill">123 Main St</span>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <div className="progress mb-3">
                  <div className="progress-bar" role="progressbar" style={{width: '75%'}} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>75%</div>
                </div>
                <div className="progress mb-3">
                  <div className="progress-bar bg-success" role="progressbar" style={{width: '50%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>50%</div>
                </div>
                <div className="progress">
                  <div className="progress-bar bg-warning" role="progressbar" style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>25%</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
