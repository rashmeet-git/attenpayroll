import React from 'react';

const EmployeeInfo = ({ type }) => {
  return (
    <div className="employee-info">
      <h2>{type === 'attendance' ? '出勤情報' : '給与情報'}</h2>
      {/* Display relevant information here */}
    </div>
  );
};

export default EmployeeInfo;
