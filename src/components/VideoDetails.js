import React, { useState } from 'react';
import axios from 'axios';

function VideoDetails() {
  const [videoId, setVideoId] = useState('');
  const [videoDetails, setVideoDetails] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchVideoDetails = async () => {
    try {
      const response = await axios.get(`/api/video/${videoId}/`);
      setVideoDetails(response.data);
      fetchComments();
    } catch (error) {
      console.error('Error fetching video details:', error);
    }
  };

  const fetchComments = async (pageToken = '') => {
    try {
      const response = await axios.get(`/api/video/${videoId}/comments/?pageToken=${pageToken}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter Video ID" 
        value={videoId} 
        onChange={(e) => setVideoId(e.target.value)} 
      />
      <button onClick={fetchVideoDetails}>Fetch Video Details</button>
      
      {videoDetails && (
        <div>
          <h2>{videoDetails.title}</h2>
          <p>{videoDetails.description}</p>
          <p>Views: {videoDetails.view_count}</p>
          <p>Likes: {videoDetails.like_count}</p>
        </div>
      )}
      
      <div>
        <h3>Comments</h3>
        {comments.length > 0 ? (
          comments.map((comment, index) => <p key={index}>{comment}</p>)
        ) : (
          <p>No comments available</p>
        )}
      </div>
    </div>
  );
}

export default VideoDetails;
