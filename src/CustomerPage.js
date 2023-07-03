import React, { useState } from "react";

const CustomerElement = ({children, role}) => {
  if(role == '2'){
    return (
      <>{children}</>
    );
  }else{
    return(
      <div>You do not have access to this page.</div>
      );
  }
  
};

export default CustomerElement;