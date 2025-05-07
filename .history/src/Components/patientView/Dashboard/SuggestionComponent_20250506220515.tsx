import React, { useEffect, useState } from "react";
import { baseURL } from "../../../Services/Others/baseURL";
import SuggestionBox from "./SuggestionBox";

type Suggestion = {
  doctorId: string;
  date: string;
  time: string;
};

type DoctorInfo = {
  uid: string;
  name: string;
};

const SuggestionComponent = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [doctors, setDoctors] = useState<DoctorInfo[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const user = JSON.parse(localStorage.getItem("User") || "{}");
      const uid = user.id;

      if (!uid) return;

      try {
        const [suggRes, docRes] = await Promise.all([
          fetch(`${baseURL}/getsuggest`, {
            headers: { uidPatient: uid },
          }),
          fetch(`${baseURL}/getDocList`, {
            headers: { "Content-Type": "application/json" },
          }),
        ]);

        const suggData = await suggRes.json();
        const docData = await docRes.json();
        console.log("Fetched doctors:", docData.dataDoc);
        setSuggestions(suggData);
        setDoctors(docData.dataDoc || []);
      } catch (error) {
        console.error("Failed to fetch suggestions or doctors:", error);
      }
    };

    fetchSuggestions();
  }, []);

  const getDoctorName = (uid: string) => {
    const doc = doctors.find((d) => d.uid === uid);
    return doc?.name ?? "Unknown Doctor";
  };

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
        <SuggestionBox
          key={index}
          suggestion={suggestion}
          doctorName={getDoctorName(suggestion.doctorId)}
        />
      ))}
    </div>
  );
};

export default SuggestionComponent;
