/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Button } from "react-bootstrap";
import Layout from "../components/common/Layout";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { CreateScore, FetchScore } from "../services/scores";

export default function Home() {
  const [currentPrice, setCurrentPrice] = useState("");
  const prevPriceRef = useRef();
  const [predciton, setPrediction] = useState(null);
  const [score, setScore] = useState(0);
  useEffect(() => {
    async function setUserId() {
      sessionStorage.setItem("user", "632d79afcb49f00759b4811c");
      const data = await FetchScore("632d79afcb49f00759b4811c");
      console.log(data.data);
    }

    async function getBitcoinPrice() {
      const res = await axios.get(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      // console.log(, "res");
      setCurrentPrice(res.data.bpi.USD.rate);
      prevPriceRef.current = currentPrice;
    }
    async function checkUserPrediction() {
      if (
        prevPriceRef.current > currentPrice &&
        sessionStorage.getItem("userPrediction") == "DOWN"
      ) {
        await CreateScore({
          id: sessionStorage.getItem("user"),
          score: score + 1,
        });
        setScore(score + 1);
        setPrediction(true);
      } else if (
        prevPriceRef.current < currentPrice &&
        sessionStorage.getItem("userPrediction") == "UP"
      ) {
        await CreateScore({
          id: sessionStorage.getItem("user"),
          score: score + 1,
        });
        setScore(score + 1);
        setPrediction(true);
      } else {
        setPrediction(false);
      }
    }
    const date = new Date();
    getBitcoinPrice();
    checkUserPrediction();
    setInterval(() => getBitcoinPrice(), (60 - date.getSeconds()) * 1000);

    setUserId();
  }, [currentPrice]);

  const UserPrediction = (value) => {
    sessionStorage.setItem("userPrediction", value);
  };
  return (
    <Layout>
      <h1>Bitcoin Guess Game</h1>
      <div className="d-flex flex-row justify-content-between">
        <p>Current Bitcoin Price: {currentPrice}</p>
        <p>Previous Bitcoin Price: {prevPriceRef.current}</p>
        <div className="d-flex justify-content-between">
          <Button
            variant="primary"
            style={{ marginRight: "2rem" }}
            onClick={() => UserPrediction("UP")}
          >
            Bitcon Goes Up
          </Button>
          <Button variant="danger" onClick={() => UserPrediction("DOWN")}>
            Bitcon Goes Down
          </Button>
          <p style={{ marginLeft: "1rem", marginRight: "1rem" }}>
            Your Score:{score}
          </p>
        </div>
      </div>
      {predciton == true && (
        <>
          <iframe
            src="https://giphy.com/embed/5jT0jaNDsM6Ik7X9yq"
            width="280"
            height="280"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
            style={{ margin: "2rem" }}
          ></iframe>
          <p>
            <a href="https://giphy.com/gifs/justin-background-confetti-5jT0jaNDsM6Ik7X9yq">
              via GIPHY
            </a>
          </p>
        </>
      )}
      {predciton == false && (
        <>
          <img src="/bomb.gif" height={200} width={200} />
        </>
      )}
    </Layout>
  );
}
