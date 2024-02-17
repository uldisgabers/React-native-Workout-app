export const getExerciseDataByMuscle = (muscle) => {
  const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;

  return fetch(apiUrl, {
    method: "GET",
    headers: {
      // "X-Api-Key": process.env.API_NINJAS_EXERCISES_API_KEY,
      "X-Api-Key": "+vOCJAjfI6mytRtG4zTXUQ==Sc39tfxDKCvfUYSS",
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

export const getAllExerciseData = () => {
  const apiUrl = `https://api.api-ninjas.com/v1/exercises`;

  return fetch(apiUrl, {
    method: "GET",
    headers: {
      // "X-Api-Key": process.env.API_NINJAS_EXERCISES_API_KEY,
      "X-Api-Key": "+vOCJAjfI6mytRtG4zTXUQ==Sc39tfxDKCvfUYSS",
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
