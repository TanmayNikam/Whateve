export const uploadFile = async (form) => {
  try {
    const response = await fetch("http://localhost:8000/acr/send", {
      method: "POST",
      headers: {
        Accept: "applcation/json",
      },
      body: form,
    });
    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.log(error);
  }
};

export const recognizeAudio = async (form) => {
  try {
    const response = await fetch("http://localhost:8000/acr/lookup", {
      method: "POST",
      headers: {
        Accept: "applcation/json",
      },
      body: form,
    });
    const data = await response.json();
    console.log(data);
    return [true, data];
  } catch (error) {
    console.log(error);
    return [false, error];
  }
};
