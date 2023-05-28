import React, { useState, useEffect } from 'react';

const ModalInformation = ({ visible = false, title = '', content = '', footer = '', onClose }) => {
  const onKeydown = ({ key }) => {
    if (key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, []);

  if (!visible) return null;

  return (
    <div className="modals">
      <div className="modal-dialog">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-content">{content}</div>
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default ModalInformation;
