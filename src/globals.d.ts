declare global {
    interface Window {
      initializeAnimations: () => void; // Declare the function type
    }
  }
  
  export {}; // This is necessary to make the file a module.
  