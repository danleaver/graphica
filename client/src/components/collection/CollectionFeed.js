import React, { useState, useEffect} from 'react';
import CollectionCard from './CollectionCard'
import styled from 'styled-components';

const CollectionFeed = (props) => {
  const updateFeedState = (incomingId) => {
    props.deletePicture(incomingId)
  }
  
  const renderColumns = () => {
    const column_arrays = [[], [], []];
    let iterator = 0;

    props.pictures.forEach((listItem) => {
      column_arrays[iterator].push(listItem);
      if(iterator == 2) iterator = 0;
      else iterator ++;
    })
  
    return(
      <>
        {props.pictures.length > 0 
          ?
            <FeedDiv>
              <ColumnContainer>
                {column_arrays[0].map(listItem =><><CollectionCard key={listItem.id} picture={listItem} updateFeedState={updateFeedState}/></>)}
              </ColumnContainer>
              <MiddleContainer>
                {column_arrays[1].map(listItem =><><CollectionCard key={listItem.id} picture={listItem} updateFeedState={updateFeedState}/></>)}
              </MiddleContainer>
              <ColumnContainer>
                {column_arrays[2].map(listItem =><><CollectionCard key={listItem.id} picture={listItem} updateFeedState={updateFeedState}/></>)}
              </ColumnContainer>
            </FeedDiv>
          : 
            <NoContent>
              [ there are no pictures in this collection yet ]
            </NoContent>
        }
      </>
    )
  }

  return renderColumns();
};


const NoContent = styled.div`
  display: flex;  
  width: 100vw;
  justify-content: center;
  padding: 2rem;
  font-weight: 600;
  font-size: 16px;
  color: grey;
`
const FeedDiv = styled.div`
  display: flex;
  // padding-right: 20px;
  // padding-top: 20px;
  width: 75vw;
  margin: auto;
  min-width: 1000px;
`
const ColumnContainer = styled.div`
  // margin-top: 20px;
  // margin-left: 20px;
  width: calc(100% / 3);
  @media (max-width: 1600px) {};
  @media (max-width: 1100px) {}
  @media only screen and (max-width: 800px) {}
`
const MiddleContainer = styled.div`
  margin: 0 25px;
  width: calc(100% / 3);
  @media (max-width: 1600px) {};
  @media (max-width: 1100px) {}
  @media only screen and (max-width: 800px) {}
`

export default CollectionFeed
