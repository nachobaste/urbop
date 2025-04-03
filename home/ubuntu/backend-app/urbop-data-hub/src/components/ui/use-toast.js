// Mock implementation for toast component
export const useToast = () => {
  return {
    toast: ({ title, description, variant }) => {
      console.log(`Toast: ${title} - ${description} (${variant})`);
      return { id: Date.now() };
    },
    dismiss: (toastId) => {
      console.log(`Dismissed toast: ${toastId}`);
    }
  };
};

export const ToastProvider = ({ children }) => {
  return children;
};

export const ToastViewport = () => {
  return null;
};

export const Toast = ({ children }) => {
  return null;
};

export const ToastTitle = ({ children }) => {
  return null;
};

export const ToastDescription = ({ children }) => {
  return null;
};

export const ToastClose = () => {
  return null;
};

export const ToastAction = ({ children }) => {
  return null;
};
