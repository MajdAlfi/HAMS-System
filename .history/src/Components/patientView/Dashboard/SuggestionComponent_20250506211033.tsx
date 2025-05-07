import React, { useEffect, useState } from "react";
import { baseURL } from "../../../Services/Others/baseURL";
import SuggestionBox from "./SuggestionBox";

type Suggestion = {
  doctorId: string;
  date: string;
  time: string;
};

const SuggestionComponent = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const user = JSON.parse(localStorage.getItem("User") || "{}");
      const uid = user.id;

      if (!uid) return;

      try {
        const response = await fetch(`${baseURL}/getsuggest`, {
          headers: {
            uidPatient: uid,
          },
        });

        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        overflowX: "auto",
        padding: "10px",
        gap: "20px",
      }}
    >
      {suggestions.map((suggestion, index) => (
        <SuggestionBox key={index} suggestion={suggestion} />
      ))}
    </div>
  );
};

export default SuggestionComponent;
