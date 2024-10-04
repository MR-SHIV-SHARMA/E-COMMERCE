import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import for displaying toast notifications
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import for using FontAwesome icons
import { faChevronUp } from "@fortawesome/free-solid-svg-icons"; // Importing the chevron up icon
import "react-toastify/dist/ReactToastify.css"; // Styles for toast notifications

// ScrollToTop Component: Scrolls to the top of the page on route change
export const ScrollToTop = () => {
  const { pathname } = useLocation(); // Get the current pathname from the router

  useEffect(() => {
    window.scrollTo({
      top: 0, // Scroll to the top of the page
      left: 0, // Scroll to the leftmost part of the page
      behavior: "smooth", // Smooth scrolling effect
    });
  }, [pathname]); // Run effect when the pathname changes

  return null; // No UI rendered by this component
};

// BackToTopButton Component: Button to scroll back to the top of the page
export const BackToTopButton = () => {
  const [visible, setVisible] = useState(false); // State to manage button visibility

  // Function to handle scroll events and show/hide the button
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setVisible(true); // Show button if scrolled more than 300px
    } else {
      setVisible(false); // Hide button if less than 300px
    }
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // Scroll to the top
      behavior: "smooth", // Smooth scrolling effect
    });
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Cleanup the event listener on component unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once

  return (
    <>
      {visible && (
        <button onClick={scrollToTop} style={styles.button}>
          <FontAwesomeIcon icon={faChevronUp} style={styles.icon} />{" "}
          {/* Icon for the button */}
        </button>
      )}
    </>
  );
};

// LoadingSpinner Component: Displays a loading spinner
export const LoadingSpinner = () => (
  <div style={styles.spinner}>
    <div className="loader"></div>{" "}
    {/* Loader class for custom spinner styles */}
  </div>
);

// Error Boundary Component: Catches JavaScript errors in child components
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false }; // State to track if an error occurred
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }; // Update state to indicate an error occurred
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary Caught: ", error, errorInfo); // Log error details
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>; // Fallback UI
    }

    return this.props.children; // Render children if no error
  }
}

// Styles for components
const styles = {
  button: {
    position: "fixed", // Fixed position to stay in view
    bottom: "20px", // Distance from the bottom
    left: "50%", // Center horizontally
    transform: "translateX(-50%)", // Shift left by 50% of its width to center it
    backgroundColor: "#ffffff", // White background for the button
    color: "#000000", // Dark text color for visibility
    border: "1px solid #f0a500", // Border to match the theme
    borderRadius: "50%", // Circular button
    padding: "12px", // Increased padding for better click area
    cursor: "pointer", // Pointer cursor on hover
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.4)", // Enhanced shadow for depth
    transition:
      "background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease", // Transition effects
    display: "flex", // Flexbox for centering icon
    alignItems: "center", // Center icon vertically
    justifyContent: "center", // Center icon horizontally
    zIndex: 1000, // Ensure the button is above other elements
  },
  buttonHover: {
    backgroundColor: "#f0a500", // Change background color on hover
    transform: "scale(1.1)", // Slightly enlarge button on hover
    boxShadow: "0 16px 32px rgba(0, 0, 0, 0.6)", // Deeper shadow on hover
  },
  icon: {
    fontSize: "24px", // Increased icon size for better visibility
    transition: "transform 0.3s ease", // Smooth scaling transition on hover
  },
  spinner: {
    display: "flex", // Flexbox for centering spinner
    justifyContent: "center", // Center spinner horizontally
    alignItems: "center", // Center spinner vertically
    height: "100vh", // Full viewport height
  },
};

// Exporting ToastContainer for notifications
export { ToastContainer };
