import React from 'react'

function HeartIcon({
    fill = 'none'
}) {
    return (
        <svg
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.9932 3.13581C8.9938 0.7984 5.65975 0.169643 3.15469 2.31001C0.649644 4.45038 0.296968 8.02898 2.2642 10.5604C3.89982 12.6651 8.84977 17.1041 10.4721 18.5408C10.6536 18.7016 10.7444 18.7819 10.8502 18.8135C10.9426 18.8411 11.0437 18.8411 11.1361 18.8135C11.2419 18.7819 11.3327 18.7016 11.5142 18.5408C13.1365 17.1041 18.0865 12.6651 19.7221 10.5604C21.6893 8.02898 21.3797 4.42787 18.8316 2.31001C16.2835 0.192157 12.9925 0.7984 10.9932 3.13581Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>

    )
}

export default HeartIcon