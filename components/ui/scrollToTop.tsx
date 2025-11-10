'use client'
import React from 'react'

const ScrollToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    }

    return (
        <button
            id="backToTop"
            aria-label="Back to top"
            onClick={scrollToTop}
            style={{
                position: "fixed",
                bottom: "30px",
                right: "30px",
                background: "#000000",
                color: "#ffffff",
                border: "3px solid #000000",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                cursor: "pointer",
                opacity: "1",
                visibility: "visible",
                transition: "all 0.3s ease",
                zIndex: "9999",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: "bold",
                boxShadow: "0 0 0 5px #000000, 0 4px 12px rgba(0,0,0,0.8)",
                textShadow: "0 0 2px #000000",
            }}
        >
            ↑
        </button>
    )
}

export default ScrollToTop