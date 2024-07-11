import React from 'react';

const Message = ({ body, author, mentionedUsernames, createdAt }) => {
  const formattedTime = getFormattedTime(createdAt);

  return (
    <div className='message'>
      <span className='message__author'>{author}</span>
      <span className='message__timestamp'>{formattedTime}</span>
      <p>
        {getFormattedBody(body, mentionedUsernames)}
      </p>
    </div>
  );
};

function getFormattedBody(body, usernames) {
  return usernames.length
    ? body
      .split(new RegExp(`(${usernames.join('|')})`))
      .map((text, idx) => idx % 2 === 0
        ? text
        : <strong key={text}>{text}</strong>
      )
    : body;
}

function getFormattedTime(dateString) {
  const date = new Date(dateString);

  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();

  const startOfYesterday = startOfDay - (1000 * 60 * 60 * 24);

  let formattedTime = date.toLocaleTimeString([], {
    timeStyle: 'short'
  });

  if (date.getTime() < startOfYesterday) {
    formattedTime = date.toDateString();
  } else if (date.getTime() < startOfDay) {
    formattedTime = `Yesterday at ${formattedTime}`;
  }

  return formattedTime;
}

export default Message;