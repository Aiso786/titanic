import React from "react";
import { Container, Form, Nav, Navbar, Tab, Tabs } from 'react-bootstrap';
import FeedButton from "../../components/feed-btn";
import PassengerList from "../../components/passenger-list";
import Reporting from "../../components/reporting";

const HomePage: React.FC = () =>  {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                <Navbar.Brand href="#home">Titanic's Passengers</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <FeedButton />
                    </Form>
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <Tabs defaultActiveKey="passengers" className="mt-3">
                <Tab eventKey="passengers" title="Passengers">
                    <PassengerList />
                </Tab>
                <Tab eventKey="reporting" title="Reporting" className="text-center">
                    <Reporting />
                </Tab>
            </Tabs>
        </>
    );
}

export default HomePage;