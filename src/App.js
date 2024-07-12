// client/src/App.js
import React, { useState } from 'react';
import VideoStats from './components/VideoStats';

const App = () => {
  const [titles, setTitles] = useState([]);
  const [inputTitle, setInputTitle] = useState('');
  const [error, setError] = useState('');
  const [timestamp, setTimestamp] = useState(Date.now());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (inputTitle) {
        setTitles([...titles, inputTitle]);
        setInputTitle('');
        setTimestamp(Date.now());
      }
    } catch (err) {
      setError('영상 데이터를 가져오는 중 오류 발생');
      console.error('영상 데이터를 가져오는 중 오류 발생:', err.message);
    }
  };

  const handleRemoveTitle = (title) => {
    setTitles(titles.filter(t => t !== title));
    setTimestamp(Date.now());
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>YouTube Video Stats</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            placeholder="Enter YouTube Video Title"
          />
          <button type="submit">Get Stats</button>
        </form>
        {error && <p>{error}</p>}
        <div>
          {titles.map((title, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <p>{title}</p>
              <button onClick={() => handleRemoveTitle(title)}>X</button>
            </div>
          ))}
        </div>

        {titles.length > 0 && <VideoStats key={timestamp} titles={titles} />}
      </header>
    </div>
  );
};

export default App;
