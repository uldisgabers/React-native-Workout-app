import { API_KEY } from "@env";

export const getExerciseDataByMuscle = (muscle) => {
  const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;

  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "X-Api-Key": API_KEY,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error: ", error.message);
    });
};
