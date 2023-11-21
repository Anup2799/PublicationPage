import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import CardDetailsW from "../pages/CardDetailsW";

function Squarecard() {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState([]);
  const [nonPatentCount, setNonPatentCount] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to convert date string to a sortable format
  function convertToDateSortableFormat(dateString) {
    if (!dateString) {
      return null;
    }
    const [day, month, year] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`);
  }

  useEffect(() => {
    fetch("/data/Whitepaper.json")
      .then((response) => response.json())
      .then((data) => {
        // Sort the data based on the "Date" property in descending order
        const sortedData = data.sort((a, b) => {
          const dateA = convertToDateSortableFormat(a.Date);
          const dateB = convertToDateSortableFormat(b.Date);
          return dateB - dateA;
        });

        setCardsData(sortedData);
        setNonPatentCount(sortedData.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
      })
      .finally(() => setLoading(false));
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
    navigate(card.CardDetailsWURL);
  };

  return (
    <Layout>
      <div style={{ minHeight: "100vh", padding: "0 20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} style={{ padding: "10px" }}>
            <Typography
              variant="h2"
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                textAlign: "left",
                marginTop: "20px",
              }}
            >
              Whitepaper & Blog
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} style={{ padding: "10px" }}>
            <input
              type="text"
              placeholder="Search by title"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{
                marginTop: "10px",
                padding: "15px",
                width: "90%",
                fontSize: "18px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="h5"
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              <span style={{ fontWeight: "normal" }}>Whitepaper & Blog:</span>{" "}
              <strong>{nonPatentCount}</strong>
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
                  <Typography
                    variant="h6"
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      margin: "10px 0",
                      textAlign: "left",
                    }}
                  >
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
                      style={{
                        width: "40px",
                        height: "40px",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(card.PageURL1)}
                    />
                    <img
                      src={card.IconURL1}
                      alt="Icon 2"
                      style={{
                        width: "40px",
                        height: "40px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleIconClick(card)}
                    />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {selectedCard && (
            <CardDetailsW
              card={selectedCard}
              onClose={() => setSelectedCard(null)}
            />
          )}

          {loading && <p>Loading...</p>}
          {error && <p>Error fetching data. Please try again later.</p>}
        </Grid>

        <Footer style={{ marginTop: "20px" }} />
      </div>
    </Layout>
  );
}

export default Squarecard;
