import React from "react";
import styled from "styled-components";
import { IoClose, IoSearch } from "react-icons/io5";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "react-click-outside-hook";
import { useEffect, } from "react";
import { useRef } from "react";
import {useLocation} from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
import { useDebounce } from "../../hooks/deBounceHook";
import axios from "axios";
import TvShow  from "../tvShows/tvShows";

const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 60px;
  background-color: rgba(0,0,0,0.75);
  border-radius: 6px;
  border: 2px solid white;
  position: absolute;
  margin-top: -10px;
  margin-bottom: -500px;
  margin-left: -380px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
`;

const SearchInputContainer = styled.div`
  width: 320px;
  min-height: 2.5em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 10px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 15px;
  color: white;
  font-weight: 200;
  border-radius: 6px;
  background-color: transparent;

  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }

  &::placeholder {
    color: #bebebe;
    transition: all 250ms ease-in-out;
  }
`;

const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 27px;
  margin-right: 10px;
  margin-top: 6px;
  vertical-align: middle;
  align-items: center;
`;

const CloseIcon = styled(motion.span)`
  color: #bebebe;
  font-size: 23px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: #dfdfdf;
  }
`;

const LineSeperator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 2px;
  background-color: white;
`;

const SearchContent = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow-y: auto;
  overflow-x: hidden;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WarningMessage = styled.span`
  color: #a1a1a1;
  font-size: 14px;
  display: flex;
  align-self: center;
  justify-self: center;
`;

const containerVariants = {
  expanded: {
    height: "20em",
  },
  collapsed: {
    height: "2.8em",
  },
};

const containerTransition = { type: "spring", damping: 22, stiffness: 150 };

export function SearchBar(props) {
    const [isExpanded, setExpanded] = useState(false);
    const [parentRef, isClickedOutside] = useClickOutside();
    const inputRef = useRef();
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [tvShows, setTvShows] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [noTvShows, setNoTvShows] = useState(false);
  
    const isEmpty = !tvShows || tvShows.length === 0;
  
    const changeHandler = (e) => {
      e.preventDefault();
      if (e.target.value.trim() === "") setNoTvShows(false);
  
      setSearchQuery(e.target.value);
    };
  
    const expandContainer = () => {
      setExpanded(true);
    };
  
    const collapseContainer = () => {
      setExpanded(false);
      setSearchQuery("");
      setLoading(false);
      setNoTvShows(false);
      setTvShows([]);
      if (inputRef.current) inputRef.current.value = "";
    };
  
    useEffect(() => {
      if (isClickedOutside) collapseContainer();
    }, [isClickedOutside]);
  
    const prepareSearchQuery = (query) => {
      const url = `/movie/search/?q=${query}`;
  
      return encodeURI(url);
    };
  
    const searchTvShow = async () => {
      if (!searchQuery || searchQuery.trim() === "") return;
  
      setLoading(true);
      setNoTvShows(false);
  
      const URL = prepareSearchQuery(searchQuery);
  
      const response = await axios.get(URL).catch((err) => {
        console.log("Error: ", err);
      });
  
      if (response) {
        console.log("Response: ", response.data);
        if (response.data && response.data.length === 0) setNoTvShows(true);
        const tvShows = response.data.filter((item) => {
            return Object.values(item.title)
              .join("")
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          });
        setTvShows(tvShows);
      }
  
      setLoading(false);
    };
  
    useDebounce(searchQuery, 500, searchTvShow);
    return (
      <SearchBarContainer
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={containerVariants}
        transition={containerTransition}
        ref={parentRef}
      >
        <SearchInputContainer>
          <SearchIcon>
            <IoSearch />
          </SearchIcon>
          <SearchInput
            placeholder="Search for ..."
            onFocus={expandContainer}
            ref={inputRef}
            value={searchQuery}
            onChange={changeHandler}
          />
          <AnimatePresence>
            {isExpanded && (
              <CloseIcon
                key="close-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={collapseContainer}
                transition={{ duration: 0.2 }}
              >
                <IoClose />
              </CloseIcon>
            )}
          </AnimatePresence>
        </SearchInputContainer>
        {isExpanded && <LineSeperator />}
        {isExpanded && (
          <SearchContent>
            {isLoading && (
              <LoadingWrapper>
                <MoonLoader loading color="white" size={20} />
              </LoadingWrapper>
            )}
            {!isLoading && isEmpty && !noTvShows && (
              <LoadingWrapper>
                <WarningMessage >Start typing to Search</WarningMessage>
              </LoadingWrapper>
            )}
            {!isLoading && noTvShows && (
              <LoadingWrapper>
                <WarningMessage>No Tv Shows or Series found!</WarningMessage>
              </LoadingWrapper>
            )}
            {!isLoading && !isEmpty && (
              <>
                {tvShows.map((show ) => (
                  <TvShow
                    key={show._id}
                    thumbanilSrc={show.img}
                    name={show.title}
                    show={show}
                  />
                ))}
              </>
            )}
          </SearchContent>
        )}
      </SearchBarContainer>
    );
  }