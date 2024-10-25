import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faTrash, faEye, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        gender: ''
    });
    const [currentUserId, setCurrentUserId] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("https://server-7oyv.onrender.com/user");
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const deleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`https://server-7oyv.onrender.com/user/${userId}`, { method: 'DELETE' });
                if (response.ok) {
                    fetchUsers();
                } else {
                    const errorData = await response.json();
                    alert(`Error deleting user: ${errorData.message}`);
                }
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    const handleAddUser = async () => {
        try {
            const response = await fetch("https://server-7oyv.onrender.com/user/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message);
                return;
            }

            setShowAdd(false);
            resetUserForm();
            fetchUsers();
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const handleUpdateUser = async () => {
        try {
            const response = await fetch(`https://server-7oyv.onrender.com/user/${currentUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message);
                return;
            }

            setShowEdit(false);
            resetUserForm();
            fetchUsers();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const resetUserForm = () => {
        setNewUser({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            address: '',
            gender: ''
        });
        setCurrentUserId(null);
    };

    const openEditModal = (user) => {
        setNewUser(user);
        setCurrentUserId(user._id);
        setShowEdit(true);
    };

    const viewUser = (user) => {
        setSelectedUser(user);
        setShowDetails(true);
    };

    return (
        <Container>
            <h1 className="my-4">User Management</h1>
            <Button style={{ backgroundColor: 'transparent', border: 'none', color: 'black' }} className="mb-3" onClick={() => setShowAdd(true)}>
                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                Add User
            </Button>

            <Table striped bordered hover>
                <thead className="table-header" style={{backgroundColor: 'green ! important'}}>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Gender</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.address}</td>
                            <td>{user.gender}</td>
                            <td>
                                <Button style={{ backgroundColor: 'transparent', border: 'none', color: 'black' }} className="me-2" onClick={() => viewUser(user)}>
                                    <FontAwesomeIcon icon={faEye} />
                                </Button>
                                <Button style={{ backgroundColor: 'transparent', border: 'none', color: 'black' }} className="me-2" onClick={() => openEditModal(user)}>
                                    <FontAwesomeIcon icon={faUserEdit} />
                                </Button>
                                <Button style={{ backgroundColor: 'transparent', border: 'none', color: 'black' }} onClick={() => deleteUser(user._id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table> 

            {/* Add User Modal */}
            <Modal show={showAdd} onHide={() => setShowAdd(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="phoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" value={newUser.phoneNumber} onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="gender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" value={newUser.gender} onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ backgroundColor: 'transparent', border: 'none', color: 'black' }} onClick={() => setShowAdd(false)}>Close</Button>
                    <Button style={{ backgroundColor: 'black', color: 'white' }} onClick={handleAddUser}>Add User</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit User Modal */}
            <Modal show={showEdit} onHide={() => setShowEdit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="phoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" value={newUser.phoneNumber} onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="gender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" value={newUser.gender} onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ backgroundColor: 'transparent', border: 'none', color: 'black' }} onClick={() => setShowEdit(false)}>Close</Button>
                    <Button style={{ backgroundColor: 'black', color: 'white' }} onClick={handleUpdateUser}>Update User</Button>
                </Modal.Footer>
            </Modal>

            {/* User Details Modal */}
            <Modal show={showDetails} onHide={() => setShowDetails(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <div>
                            <p><strong>First Name:</strong> {selectedUser.firstName}</p>
                            <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
                            <p><strong>Email:</strong> {selectedUser.email}</p>
                            <p><strong>Phone Number:</strong> {selectedUser.phoneNumber}</p>
                            <p><strong>Address:</strong> {selectedUser.address}</p>
                            <p><strong>Gender:</strong> {selectedUser.gender}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ backgroundColor: 'transparent', border: 'none', color: 'black' }} onClick={() => setShowDetails(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default UserTable;
