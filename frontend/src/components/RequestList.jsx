import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RequestList = ({ type }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    
    axios.get(`/api/requests?type=${type}`)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching requests:', error);
      });
  }, [type]);

  const handleApproval = (id, status) => {
    axios.post(`/api/requests/${id}/update`, { status })
      .then(() => {
        setRequests(requests.filter((request) => request.application_id !== id));
      })
      .catch((error) => {
        console.error('Error updating request:', error);
      });
  };

  return (
    <div className="request-list">
      <h2>{type === 'vacation' ? '休暇承認申請' : '出席変更申請'}</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.application_id} className="request-item">
            <p>{request.employee_id} - {request.application_type}</p>
            <div className="buttons">
              <button className="approve-button" onClick={() => handleApproval(request.application_id, 'approved')}>承認する</button>
              <button className="reject-button" onClick={() => handleApproval(request.application_id, 'rejected')}>棄却</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestList;
