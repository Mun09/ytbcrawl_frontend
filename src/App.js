// client/src/App.js
import React, { useState } from 'react';
import VideoStats from './components/VideoStats';

const App = () => {
  const [title, setTitle] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState('');
  const [timestamp, setTimestamp] = useState(Date.now()); // 추가된 상태

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setVideoData(title);
      setTimestamp(Date.now());
    } catch (err) {
      setError('Error fetching video data');
      console.error('Error fetching video data:', err.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>YouTube Video Stats</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter YouTube Video Title"
          />
          <button type="submit">Get Stats</button>
        </form>
        {error && <p>{error}</p>}
        {videoData && <VideoStats key={timestamp} title={videoData} />}
      </header>
    </div>
  );
};

export default App;
