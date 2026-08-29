import React from "react";
import { useSelector } from "react-redux";

const PlatformSelector = ({ value, onChange }) => {
  const platforms = useSelector(
    (state) => state.platforms.platforms
  );

  return (
    <select
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "12px",
        marginTop: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
      }}
    >
      {platforms.map((platform, index) => (
        <option key={index} value={platform}>
          {platform}
        </option>
      ))}
    </select>
  );
};

export default PlatformSelector;