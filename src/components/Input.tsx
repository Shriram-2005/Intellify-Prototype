import React from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`intellify-input-wrapper ${className}`.trim()}>
      {label && <label className="intellify-input-label">{label}</label>}
      <input 
        className={`intellify-input ${error ? 'intellify-input--error' : ''}`} 
        {...props} 
      />
      {error && <span className="intellify-input-error-msg">{error}</span>}
    </div>
  );
};
