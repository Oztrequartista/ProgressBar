import React, { useState, useEffect } from "react";
import { Backdrop, Button, CircularProgress } from "@material-ui/core";
import axios from "axios";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";

function App() {
  //states
  const [scrollTop, setScrollTop] = useState(0);
  const [open, setOpen] = useState(true);
  const [posts, setPosts] = useState([]);

  //refer to websites to understand concepts again
  const scrollTo = () => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    //height gives you the maximum scrollTop value or the highest vertical scroll
    //height here represents the full height of the inner content minus the height of the visible content

    const scrolled = Math.floor((winScroll / height) * 100); // convert to percentage
    // this gives you 100
    //console.log(scrolled);
    setScrollTop(scrolled);
  };

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));

  const classes = useStyles();

  async function getUser() {
    try {
      const response = await axios.get(
        "http://jsonplaceholder.typicode.com/posts/"
      );
      console.log(response);
      const items = response.data;
      console.log(items);
      setPosts(items);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", scrollTo);
    return () => {
      window.removeEventListener("scroll", scrollTo);
    };
  }, [scrollTop]);
  if (open) {
    return (
      <>
        <Backdrop className={classes.backdrop} open>
          <h2>Loading...</h2>
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }
  return (
    <div className="App">
      <div className="progressContainer">
        <div className="progressBar" style={{ width: `${scrollTop}%` }}></div>
      </div>
      <h2>Scroll Indicator</h2>
      {posts.map((item) => {
        const { id, title } = item;
        return <p key={id}>{title}</p>;
      })}
    </div>
  );
}

export default App;
