import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        gender: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await fetch(`https://server-7oyv.onrender.com/user/${id}`);
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const handleUpdateUser = async () => {
        try {
            const response = await fetch(`https://server-7oyv.onrender.com/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message);
                return;
            }

            navigate('/');
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <Container>
            <h1 className="my-4">Edit User</h1>
            <Form>
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" value={user.phoneNumber} onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control as="select" value={user.gender} onChange={(e) => setUser({ ...user, gender: e.target.value })}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handleUpdateUser}>Update User</Button>
            </Form>
        </Container>
    );
};

export default EditUser;
