// src/components/VideoStats.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const VideoStats = ({ title }) => {
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : ''; // 프로덕션에서는 빈 문자열로 설정하여 상대 경로 사용
        const encodedTitle = encodeURIComponent(title);
        const response = await axios.get(`${baseURL}/api/video/${encodedTitle}`);
        setVideoData(response.data);
      } catch (error) {
        console.error('Error fetching video data:', error.message);
      }
    };

    fetchData();
  }, [title]);

  if (!videoData) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: videoData.stats.map((stat) => new Date(stat.date).toLocaleDateString()),
    datasets: [
      {
        label: 'View Count',
        data: videoData.stats.map((stat) => stat.viewCount),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2>{videoData.title}</h2>
      <Line data={chartData} />
    </div>
  );
};

export default VideoStats;
