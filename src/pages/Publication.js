import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";

function Squarecard() {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    fetch("/data/Publication.json")
      .then((response) => response.json())
      .then((data) => setCardsData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const cardStyles = {
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    border: "1px solid #ccc",
    transition: "transform 0.2s",
    cursor: "pointer",
  };

  const cardImageStyles = {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  };

  const cardTitleStyles = {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "10px 0",
    textAlign: "left",
    color: "#333",
  };

  const cardTextStyles = {
    fontSize: "16px",
    fontFamily: "Arial, sans-serif",
    color: "#555",
    margin: "10px 0",
    textAlign: "left",
  };

  const iconStyles = {
    width: "40px",
    height: "40px",
    cursor: "pointer",
  };

  const aboutButtonStyles = {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    marginLeft: "10px",
  };

  const gridContainerStyles = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    display: "flex",
    justifyContent: "center", // Center the grid horizontally
  };

  const cardContainerStyles = {
    minHeight: "400px", // Set a fixed height for cards
  };

  return (
    <Layout>
      <div style={{ minHeight: "100vh", padding: "0 20px" }}>
        <Grid container spacing={3} style={gridContainerStyles}>
          {cardsData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                style={{ ...cardStyles, ...cardContainerStyles }}
                onMouseEnter={() => {
                  document.querySelector(`#card-${index}`).style.transform =
                    "scale(1.05)";
                }}
                onMouseLeave={() => {
                  document.querySelector(`#card-${index}`).style.transform =
                    "scale(1)";
                }}
                id={`card-${index}`}
                onClick={() => navigate(card.PageURL)}
              >
                <CardMedia
                  component="img"
                  alt={card.Title}
                  image={card.ImageURL}
                  style={cardImageStyles}
                />
                <CardContent>
                  <Typography variant="h6" style={cardTitleStyles}>
                    {card.Title}
                  </Typography>
                  <Typography variant="body2" style={cardTextStyles}>
                    {card.Type}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      marginTop: "20px",
                      alignItems: "center",
                    }}
                  >
                    <img src={card.IconURL} alt="Icon 1" style={iconStyles} />
                    <img src={card.IconURL1} alt="Icon 2" style={iconStyles} />
                    {index !== 1 && index !== 2 && (
                      <Button
                        component={Link}
                        to={card.AboutURL}
                        style={aboutButtonStyles}
                      >
                        About
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Footer style={{ marginTop: "20px" }} />
      </div>
    </Layout>
  );
}

export default Squarecard;
