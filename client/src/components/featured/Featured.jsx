import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import * as React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import "./featured.scss";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movie/random?type=${type}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option >Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={content?.img} alt="" />
      <div className="info">
        <img src={content?.imgTitle} alt="" />
        <span className="desc">{content?.desc}</span>
        <div className="buttons">
          <Link style= {{textDecoration: 'none'}} to={{ pathname: "/watch", movie: content }}>
            <button className="play">
              <PlayArrow />
              <span>Play</span>
            </button>
          </Link>
          <button onClick={handleClickOpen} className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>

      <div className="InfoTable">
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          className="customModel"

        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            style= {{backgroundColor: 'black', color: 'white', fontSize: '30px'}}
          >
            {content.title}
          </BootstrapDialogTitle>

          <DialogContent style={{backgroundColor: 'black', color:'white'}} dividers className="imgParent">
            <Typography gutterBottom>
              <img
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
                src={content.img}
                alt="" className="imgThumbNail"
              />
              <Link style={{color:'white'}} to={{ pathname: "/watch", movie: content }}>
              <button
                  style={{border: 'solid 2px', borderRadius: '5px', cursor: 'pointer',
                         width: '80px', margin: '10px 5px'}}
                  className="playBtn"
                >
                  <PlayArrow Style="margin-right:33px" />
                </button>
              </Link>
            </Typography>

            <Typography gutterBottom >
              <span style={{marginRight: '10px'}}>{content.year}</span>
              <span style={{border: 'solid 0.5px'}}>+{content.limit}</span>
            </Typography>

            <Typography gutterBottom>
              <span style={{display:'flex', marginBottom:'5px'}}>
                {content.desc}
              </span>
              <span>
                Thể Loại: {content.genre}
              </span>
            </Typography>
            <Typography gutterBottom>
            </Typography>
          </DialogContent>
        </BootstrapDialog>
      </div>

    </div>
  );
}
