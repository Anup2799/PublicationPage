import React, { useState, useEffect } from "react";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";

function Squarecard() {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    fetch("/data/blogs_wp.json")
      .then((response) => response.json())
      .then((data) => setCardsData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const pageStyles = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const headerStyles = {
    padding: "20px",
    textAlign: "center",
    color: "black",
    fontSize: "24px", // Increased font size for the title
    marginBottom: "20px", // Added bottom margin for spacing
  };

  const cardContainerStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
  };

  const customCardStyles = {
    width: "260px",
    height: "auto",
    borderRadius: "10px",
    padding: "20px",
    margin: "10px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    border: "1px solid #ccc",
    transition: "transform 0.2s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const cardImageStyles = {
    width: "100%",
    objectFit: "cover",
    borderRadius: "8px", // Added border radius for a smoother image corner
    marginBottom: "10px", // Added bottom margin for spacing
  };

  const cardTitleStyles = {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "10px 0",
    textAlign: "center",
  };

  const cardTextStyles = {
    fontSize: "16px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
    margin: "10px 0",
    textAlign: "left",
  };

  const cardActionsStyles = {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  };

  const learnMoreLinkStyles = {
    textDecoration: "underline",
    color: "#007bff",
  };

  const footerStyles = {
    marginTop: "20px",
  };

  return (
    <Layout>
      <div style={pageStyles}>
        <header style={headerStyles}>
          <h4>Whitepapers</h4>
        </header>
        <div style={cardContainerStyles}>
          {cardsData.map((card, index) => (
            <div
              key={index}
              style={customCardStyles}
              onMouseEnter={() => {
                document.querySelector(`#card-${index}`).style.transform = "scale(1.05)";
              }}
              onMouseLeave={() => {
                document.querySelector(`#card-${index}`).style.transform = "scale(1)";
              }}
              id={`card-${index}`}
            >
              <img src={card.ImageURL} alt={card.title} style={cardImageStyles} />
              <div>
                <div style={cardTitleStyles}>{card.title}</div>
                <div style={cardTextStyles}>{card.text}</div>
              </div>
              <div style={cardActionsStyles}>
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={learnMoreLinkStyles}
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
        <Footer style={footerStyles} />
      </div>
    </Layout>
  );
}

export default Squarecard;
