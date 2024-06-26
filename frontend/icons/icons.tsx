export const BagIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role="presentation"
      className="stroke-gray-300 m-0"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M17 14h2V9H5v5h2v-1a1 1 0 012 0v1h6v-1a1 1 0 012 0v1zm0 2v1a1 1 0 01-2 0v-1H9v1a1 1 0 01-2 0v-1H5v3h14v-3h-2zM9 7h6V6H9v1zM7 7V5a1 1 0 011-1h8a1 1 0 011 1v2h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h2z"
      ></path>
    </svg>
  );
};

export const BranchIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role="presentation"
      className="stroke-gray-300"
    >
      <path
        fill="currentColor"
        d="M11 5v2h2V5h-2zm0 6V9h-1a1 1 0 01-1-1V4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-1v2h5a1 1 0 011 1v3h1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4a1 1 0 011-1h1v-2H7v2h1a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4a1 1 0 011-1h1v-3a1 1 0 011-1h5zm-6 6v2h2v-2H5zm12 0v2h2v-2h-2z"
      ></path>
    </svg>
  );
};

export const BuildingIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role="presentation"
      className="stroke-gray-300"
    >
      <g fill="currentColor" fillRule="evenodd">
        <path
          d="M8 6H5.009C3.902 6 3 6.962 3 8.15v10.7C3 20.04 3.9 21 5.009 21h5.487H8v-2.145c-1.616-.001-3-.003-3-.004 0 0 .005-10.708.009-10.708L8 8.144V6z"
          fillRule="nonzero"
        ></path>
        <path d="M12 7h2v2h-2zm-6 3h2v2H6zm0 3h2v2H6zm6-3h2v2h-2zm0 3h2v2h-2zm2 3h2v3h-2zm2-9h2v2h-2zm0 3h2v2h-2zm0 3h2v2h-2z"></path>
        <path
          d="M18.991 19C18.998 19 19 4.995 19 4.995c0 .006-7.991.005-7.991.005C11.002 5 11 19 11 19h7.991zM9 4.995C9 3.893 9.902 3 11.009 3h7.982C20.101 3 21 3.893 21 4.995v14.01A2.004 2.004 0 0118.991 21H9V4.995z"
          fillRule="nonzero"
        ></path>
      </g>
    </svg>
  );
};

export const LocationIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role="presentation"
      className="stroke-gray-100"
    >
      <path
        d="M12 21c-2.28 0-6-8.686-6-12a6 6 0 1112 0c0 3.314-3.72 12-6 12zm0-9a2.912 2.912 0 100-5.824A2.912 2.912 0 0012 12z"
        fill="currentColor"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export const EmailIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role="presentation"
      className="stroke-gray-300 m-0"
    >
      <g fill="currentColor" fillRule="evenodd">
        <path
          d="M5 7v10h14V7H5zm14-2c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h14z"
          fillRule="nonzero"
        ></path>
        <path d="M5.498 6.5H3.124c.149.44.399.854.75 1.205l5.882 5.881a3.117 3.117 0 004.41 0l5.882-5.881c.35-.351.6-.765.749-1.205h-2.373l-5.672 5.672a1.119 1.119 0 01-1.583 0L5.498 6.5z"></path>
      </g>
    </svg>
  );
};

export const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
};

export const XIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};

export const EllipseIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
      />
    </svg>
  );
};

export const DeleteIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
};

export const EditIcon = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  );
};

export const HighPriorityIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className="w-4 h-4"
    >
      <path
        d="M3.5 9.9c-.5.3-1.1.1-1.4-.3s-.1-1.1.4-1.4l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.3.5-.9.6-1.4.3L8 7.2 3.5 9.9z"
        fill="#ff5630"
      />
    </svg>
  );
};

export const HigherPriorityIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className="w-4 h-4"
    >
      <path
        d="M3.47876 7.9c-.5.3-1.1.1-1.4-.4s-.1-1 .4-1.3l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.2.4-.8.6-1.3.3l-4.5-2.7-4.5 2.7z"
        fill="#ff5630"
      />
      <path
        d="M3.47876 12.2c-.5.3-1.1.2-1.4-.3s-.1-1.1.4-1.4l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.3.5-.9.6-1.4.3l-4.4-2.7-4.5 2.7z"
        fill="#ff7452"
      />
    </svg>
  );
};

export const HighestPriorityIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className="w-4 h-4"
    >
      <path
        d="M7.984436 3.200867l-4.5 2.7c-.5.3-1.1.1-1.3-.4s-.2-1.1.3-1.3l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.3.5-.9.6-1.4.3l-4.4-2.7z"
        fill="#ff5630"
      />
      <path
        d="M3.484436 10.200867c-.5.3-1.1.1-1.3-.3s-.2-1.1.3-1.4l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.3.5-.9.6-1.4.3l-4.4-2.7-4.5 2.7z"
        fill="#ff7452"
      />
      <path
        d="M3.484436 14.500867c-.5.3-1.1.2-1.3-.3s-.2-1.1.3-1.4l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.3.5-.9.6-1.4.3l-4.4-2.7-4.5 2.7z"
        fill="#ff8f73"
      />
    </svg>
  );
};

export const LowPriorityIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className="w-4 h-4"
    >
      <path
        d="M12.5 6.1c.5-.3 1.1-.1 1.4.4.3.5.1 1.1-.3 1.3l-5 3c-.3.2-.7.2-1 0l-5-3c-.6-.2-.7-.9-.4-1.3.2-.5.9-.7 1.3-.4L8 8.8l4.5-2.7z"
        fill="#0065ff"
      />
    </svg>
  );
};

export const LowestPriority = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className="w-4 h-4"
    >
      <path
        d="M12.504883 8.14541c.5-.3 1.1-.1 1.4.4s.1 1-.4 1.3l-5 3c-.3.2-.7.2-1 0l-5-3c-.5-.3-.6-.9-.3-1.4.2-.4.8-.6 1.3-.3l4.5 2.7 4.5-2.7z"
        fill="#0065ff"
      />
      <path
        d="M12.504883 3.84541c.5-.3 1.1-.2 1.4.3s.1 1.1-.4 1.4l-5 3c-.3.2-.7.2-1 0l-5-3c-.5-.3-.6-.9-.3-1.4.3-.5.9-.6 1.4-.3l4.4 2.7 4.5-2.7z"
        fill="#2684ff"
      />
    </svg>
  );
};

export const MediumPriority = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      id="Warstwa_1"
      x="0px"
      y="0px"
      viewBox="0 0 16 16"
      className="w-4 h-4"
      enableBackground="new 0 0 16 16"
      xmlSpace="preserve"
      style={{ fill: "#FFAB00" }}
    >
      <g id="icon_x2F_16px_x2F_medium-priority-">
        <g>
          <path
            d="M3,4h10c0.6,0,1,0.4,1,1s-0.4,1-1,1H3C2.4,6,2,5.6,2,5S2.4,4,3,4z M3,10h10c0.6,0,1,0.4,1,1s-0.4,1-1,1H3    c-0.6,0-1-0.4-1-1S2.4,10,3,10z"
          />
        </g>
      </g>
    </svg>
  );
};

export const UserIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role="presentation"
      className={className}
    >
      <g fill="currentColor" fill-rule="evenodd">
        <path d="M6 14c0-1.105.902-2 2.009-2h7.982c1.11 0 2.009.894 2.009 2.006v4.44c0 3.405-12 3.405-12 0V14z"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </g>
    </svg>
  );
};
