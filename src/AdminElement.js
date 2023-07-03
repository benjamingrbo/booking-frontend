import React, { useState } from "react";


const AdminElement = ({children, role}) => {
    if(role == '1'){
        return (
          <>{children}</>
        );
      }else{
        return(
        <div>You do not have access to this page.</div>
        );
      }
};

export default AdminElement;