import React from 'react';

const Notification = ({ message, messageBool }) => {
    if (message === null) {
        return null;
    }
    if (!messageBool) {
        return (
            <div className="error">
                {message}
            </div>
        )
    } else {
        return (
            <div className="success">
                {message}
            </div>
        )
    }

}

export default Notification;