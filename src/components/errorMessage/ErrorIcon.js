const ErrorIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        version="1.1"
        viewBox="0 0 32 32"
        fill="red"
      >
        <g transform="scale(2)">
          <circle cx="8" cy="8" r="7" />
          <rect
            fill="white"
            width="2"
            height="10"
            x="-.98"
            y="-16.29"
            transform="rotate(135)"
          />
          <rect
            fill="white"
            width="2"
            height="10"
            x="-12.29"
            y="-5.01"
            transform="rotate(-135)"
          />
        </g>
      </svg>
    </>
  );
};

export default ErrorIcon;
