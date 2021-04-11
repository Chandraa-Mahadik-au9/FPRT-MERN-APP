import React from "react";

const Message = ({ varient, children }) => {
  return (
    <div>
      <div className={`alert alert-${varient}`} role='alert'>
        {children}
      </div>
    </div>
  );
};

Message.defaultProps = {
  varient: "info",
};

export default Message;
