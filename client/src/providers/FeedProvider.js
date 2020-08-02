import React, { useState } from 'react';
import axios from 'axios';

const FeedContext = React.createContext();

export const FeedConsumer = FeedContext.Consumer;

export const FeedProvider = (props) => {
  
  const [pictures, setPictures] = useState([]);
  const [query, setQuery ] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [searching, setSearching ] = useState(false);

  const categorySearch = (catId) => {
    setSearching(true)
    axios.get(`/api/pictures/?search=${query}&limit=11&offset=${0}&category_id=${catId}`)
      .then(res => {
        setPictures(res.data);
        setSearching(false);
      })
      .catch(console.log)
  }

  const searchPictures = () => {
    return new Promise((resolve, reject) => {
      setCategoryId(null)
      setSearching(true)
      axios.get(`/api/pictures/?search=${query}&limit=11&offset=${pictures.length}&category_id=${categoryId}`)
        .then(res => {
          setPictures(pictures.concat(res.data));
          setSearching(false);
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        })
    })
  }

  const resetAndSearchPictures = () => {
    return new Promise((resolve, reject) => {
      setCategoryId(null)
      setSearching(true)
      axios.get(`/api/pictures/?search=${query}&limit=11&offset=${0}&category_id=${categoryId}`)
        .then(res => {
          setPictures(res.data);
          setSearching(false);
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        })
    })
  }

  const resetPictures = () => setPictures([]);

  const deletePicture = (incomingId) => setPictures( pictures.filter(a => a.id !== incomingId ))

  return(
    <FeedContext.Provider value={{
      pictures,
      searching,
      resetPictures,
      resetAndSearchPictures,
      setQuery,
      setCategoryId,
      categoryId,
      categorySearch,
      query,
      searchPictures,
      offset: pictures.length,
      deletePicture,
    }}> 
      { props.children }
    </FeedContext.Provider>     
  )
}

export default FeedProvider;