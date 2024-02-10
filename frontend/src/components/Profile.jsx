import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Modal, Button } from 'react-bootstrap';
import toastr from 'toastr'; // Import toastr library
import 'toastr/build/toastr.min.css'; // Import toastr CSS
import './Profile.css'; // Import CSS file for styling

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const url = "http://localhost:3000";

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;

          const response = await fetch(`${url}/api/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          const userData = await response.json();
          setUser(userData.user);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser({...user});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const response = await fetch(`${url}/api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editedUser)
      });
      console.log(response.status==200)
      if (response.status==200) {
        setUser(editedUser);
        setIsEditing(false);
        // Show success notification
        toastr.success('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      toastr.error('Error updating profile: ' + error.message);
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {user ? (
        <div>
          <div className="profile-field">
            <strong>Username:</strong> {isEditing ? <input type="text" name="username" autoComplete='off' value={editedUser.username} onChange={handleInputChange} /> : user.username}
          </div>
          <div className="profile-field">
            <strong>DOB:</strong> {isEditing ? <input type="text" name="DOB" autoComplete='off' value={editedUser.DOB} onChange={handleInputChange} /> : user.DOB}
          </div>
          <div className="profile-field">
            <strong>Age:</strong> {isEditing ? <input type="text" name="Age"  autoComplete='off' value={editedUser.Age} onChange={handleInputChange} /> : user.Age}
          </div>
          <div className="profile-field">
            <strong>Contact:</strong> {isEditing ? <input type="text" name="Contact" autoComplete='off' value={editedUser.Contact} onChange={handleInputChange} /> : user.Contact}
          </div>
          <div className="profile-field">
            <strong>City:</strong> {isEditing ? <input type="text" name="City" autoComplete='off' value={editedUser.City} onChange={handleInputChange} /> : user.City}
          </div>
          {isEditing ? (
            <button className="btn btn-primary save-btn" onClick={handleSubmit}>Save</button>
          ) : (
            <button className="btn btn-primary edit-btn" onClick={handleEdit}>Edit</button>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {/* Input fields */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Profile;
