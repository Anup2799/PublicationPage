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
import CardDetails from "../pages/CardDetails";

function Squarecard() {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState([]);
  const [patentCount, setPatentCount] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    fetch("/data/Publication.json")
      .then((response) => response.json())
      .then((data) => {
        const patentCards = data.filter((card) => card.ID.startsWith("P"));
        setCardsData(patentCards);
        setPatentCount(patentCards.length);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredCards = cardsData.filter((card) =>
    card.Title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleCardClick = (card, event) => {
    const clickableElements = ["IMG", "BUTTON"];
    if (clickableElements.includes(event.target.tagName)) {
      return;
    }
    setSelectedCard(card);
  };

  const handleIconClick = (card) => {
    navigate(card.CardDetailsURL);
  };

  return (
    <Layout>
      <div style={{ minHeight: "100vh", padding: "0 20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} style={{ padding: "20px" }}>
            <Typography variant="h2" style={{ fontSize: "36px", fontWeight: "bold", textAlign: "left", marginTop: "20px" }}>
              Patent
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} style={{ padding: "20px" }}>
            <input
              type="text"
              placeholder="Search by title"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{
                marginTop: "20px",
                padding: "15px",
                width: "90%",
                fontSize: "18px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" style={{ fontSize: "18px", fontWeight: "bold", textAlign: "left" }}>
              <span style={{ fontWeight: "normal" }}>Patent:</span>{" "}
              <strong>{patentCount}</strong> |{" "}
              <span style={{ fontWeight: "normal" }}>Total:</span>{" "}
              <strong>{cardsData.length}</strong>
            </Typography>
          </Grid>

          {filteredCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  border: "1px solid #ccc",
                  transition: "transform 0.2s",
                  cursor: "pointer",
                  minHeight: "400px",
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
                onClick={(event) => handleCardClick(card, event)}
              >
                <CardMedia
                  component="img"
                  alt={card.Title}
                  image={card.ImageURL}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <CardContent>
                  <Typography variant="h6" style={{ fontSize: "25px", fontWeight: "bold", margin: "10px 0", textAlign: "left" }}>
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
                    <img
                      src={card.IconURL}
                      alt="Icon 1"
                      style={{ width: "40px", height: "40px", cursor: "pointer" }}
                      onClick={() => navigate(card.PageURL1)}
                    />
                    <img
                      src={card.IconURL1}
                      alt="Icon 2"
                      style={{ width: "40px", height: "40px", cursor: "pointer" }}
                      onClick={() => handleIconClick(card)}
                    />
                    {card.ID.startsWith("P") && (
                      <Button
                        component={Link}
                        to={`/abouturl/${card.AboutURL}`}  
                        style={{
                          backgroundColor: "#000",
                          color: "#fff",
                          padding: "10px 15px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          textDecoration: "none",
                          display: "inline-block",
                          marginLeft: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        About
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {selectedCard && (
            <CardDetails
              card={selectedCard}
              onClose={() => setSelectedCard(null)}
            />
          )}
        </Grid>

        <Footer style={{ marginTop: "20px" }} />
      </div>
    </Layout>
  );
}

export default Squarecard;
