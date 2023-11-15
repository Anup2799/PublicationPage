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
 
function Patents() {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState([]);
  const [patentCount, setPatentCount] = useState(0);
 
  useEffect(() => {
    fetch("/data/Publication.json") // Change the file path to your actual file path
      .then((response) => response.json())
      .then((data) => {
        // Filter only "Patent" cards
        const patentCards = data.filter((card) => card.ID.startsWith("P"));
        setCardsData(patentCards);
        setPatentCount(patentCards.length);
      })
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
    height: "100%",
    objectFit: "cover",
  };
 
  const cardTitleStyles = {
    fontSize: "25px",
    fontWeight: "bold",
    margin: "10px 0",
    textAlign: "center",
    color: "#000",
  };
 
  const headingStyles = {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginTop: "20px",
  };
 
  const iconStyles = {
    width: "40px",
    height: "40px",
    cursor: "pointer",
  };
 
  const aboutButtonStyles = {
    backgroundColor: "#000",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    marginLeft: "10px",
    fontWeight: "bold",
  };
 
  const gridContainerStyles = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
  };
 
  const cardContainerStyles = {
    minHeight: "400px",
  };
 
  return (
    <Layout>
      <div style={{ minHeight: "100vh", padding: "0 20px" }}>
        <Typography variant="h2" style={headingStyles}>
          Patent ({patentCount})
        </Typography>
        <Grid container spacing={3} style={gridContainerStyles}>
          {cardsData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                style={{
                  ...cardStyles,
                  ...cardContainerStyles,
                }}
                onMouseEnter={() => {
                  document.querySelector(`#card-${index}`).style.transform =
                    "scale(1.05)";
                }}
                onMouseLeave={() => {
                  document.querySelector(`#card-${index}`).style.transform =
                    "scale(1)";
                }}
                id={`card-${index}`}
                onClick={() => navigate(card.url)}
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
                    {card.ID.startsWith("P") && (
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
 
export default Patents;