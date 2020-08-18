import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FeedConsumer } from '../../providers/FeedProvider'
import useTrigger from '../../hooks/useTrigger'

const SearchBar = (props) => {

  useTrigger(props.query, 500, () => {
    if (props.categoryId) return;
    props.resetAndSearchPictures();
    props.setNoMorePictures(false)
    props.setQuerySearch(props.query)
  });

  return (
    <StyledInput
      type="text"
      name="formName"
      value={props.query}
      placeholder="Find something new..."
      onChange={(e) => {
        props.setQuery(e.target.value)
        props.setCategoryId(null)
      }}
    />
  )
}

const StyledInput = styled.input`
  border: none;
  height: 30px;
  width: 50vw;
  box-sizing: border-box;
  outline: none;
  font-family: Montserrat;
  font-size: 10px;
  font-weight: 600;
  text-indent:10px;
  ::placeholder {
    font-family: Montserrat;
    font-weight: 600;
    text-shadow: 0px 2px 4px rgba(255, 255, 255, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.25);
    color: rgba(39, 39, 53, 0.75);
  }
`
const ConnectedSearchBar = (props) => (
  <FeedConsumer>
    {(value) => <SearchBar {...props} {...value} />}
  </FeedConsumer>
);

export default ConnectedSearchBar;