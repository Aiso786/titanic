import React from 'react';
import { Button } from 'react-bootstrap';



const FeedButton: React.FC = () => {
    const feedData = () => fetch('http://localhost:5000/api/passengers', {
        method: 'POST'
    });

    return(
        <Button variant="outline-primary" onClick={feedData}>
            Feed Database
        </Button>
    );
}

export default FeedButton;