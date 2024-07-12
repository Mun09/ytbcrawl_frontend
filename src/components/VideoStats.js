// src/components/VideoStats.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const VideoStats = ({ titles }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const baseURL = 'https://port-0-ytbcrawl-backend-lyix9okya7654eb7.sel5.cloudtype.app'; // 프로덕션에서는 빈 문자열로 설정하여 상대 경로 사용
        const responses = await Promise.allSettled(titles.map(title =>
          axios.get(`${baseURL}/api/video/${encodeURIComponent(title)}`).catch(err => ({ error: err }))
        ));
        const successResponses = responses.filter(response => response.status === 'fulfilled' && !response.value.error).map(response => response.value.data);
        // const stats = responses.map(response => response.data);

        const formattedData = {
          labels: successResponses[0]?.stats.map(stat => new Date(stat.date).toLocaleDateString()) || [], // 타임스탬프 배열
          datasets: successResponses.map((stat, index) => ({
            label: stat.title,
            data: stat.stats.map(view => view.viewCount),
            borderColor: `hsl(${index * 60}, 100%, 50%)`,
            fill: false,
          }))
        };

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching video data:', error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [titles]);

  if(loading) return <p>로딩 중...</p>;

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default VideoStats;
