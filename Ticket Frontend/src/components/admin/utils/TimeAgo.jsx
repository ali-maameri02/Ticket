import React from 'react';

function TimeAgo({ timestamp }) {
  const timeString = calculateTimeAgo(timestamp);

  return (
    <span>{timeString}</span>
  );
}

function calculateTimeAgo(timestamp) {
  const now = new Date();
  const pastTime = new Date(timestamp);
  const timeDifference = now - pastTime;
  console.log(now);
  console.log(pastTime);
  console.log(timeDifference);

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours >= 1) {
    return `about ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutes >= 1) {
    return `about ${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return `less than a minute ago`;
  }
}

export default TimeAgo;
