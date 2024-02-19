let ansvarigPartValues = [];
let elementValues = [];
let presentationValues = [];
let statusValues = [];

function fetchData() {
  console.log("Fetching data...");
  fetch("http://sestoas647/node/sb11/api")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .then((data) => {
      // Process the fetched data
      ansvarigPartValues = data
        .filter((item) => item.Attribut === "Ansvarig part")
        .map((item) => ({
          Kod: item.Kod,
          Sammanfattning: item.Beskrivning + " (" + item.Kod + ")",
          Beskrivning: item.Beskrivning,
        }));

      elementValues = data
        .filter((item) => item.Attribut === "Element")
        .map((item) => ({
          Kod: item.Kod,
          Sammanfattning: item.Beskrivning + " (" + item.Kod + ")",
          Beskrivning: item.Beskrivning,
        }));

      presentationValues = data.filter((item) => item.Attribut === "Presentation")
      .map((item) => ({
        Kod: item.Kod,
        Sammanfattning: item.Beskrivning + " (" + item.Kod + ")",
        Beskrivning: item.Beskrivning,
      }));
    

      statusValues = data
        .filter((item) => item.Attribut === "Status")
        .map((item) => ({
          Kod: item.Kod,
          Sammanfattning: item.Beskrivning + " (" + item.Kod + ")",
          Beskrivning: item.Beskrivning,
        }));

      console.log("Ansvarig part: " + ansvarigPartValues[0].Beskrivning);
      console.log("Element: " + elementValues.Attribut);
      console.log("Presentation: " + presentationValues.Attribut);
      console.log("Status: " + statusValues.Attribut);

      //console.log(data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("Error:", error);
    });
}

fetchData();

// const response = await fetch("http://sestoas647/node/sb11/api");
// let responseData = await response.json();

// ansvarigPartValues = responseData
//   .filter((item) => item.Attribut === "Ansvarig part")
//   .map((item) => ({
//     Kod: item.Kod,
//     Sammanfattning: item.Beskrivning + " (" + item.Kod + ")",
//     Beskrivning: item.Beskrivning,
//   }));

// elementValues = responseData
//   .filter((item) => item.Attribut === "Element")
//   .map((item) => ({
//     Kod: item.Kod,
//     Sammanfattning: item.Beskrivning + " (" + item.Kod + ")",
//     Beskrivning: item.Beskrivning,
//   }));

// presentationValues = responseData
//   .filter((item) => item.Attribut === "Presentation")
//   .map((item) => ({
//     Kod: item.Kod,
//     Sammanfattning: item.Beskrivning + " (" + item.Kod + ")",
//     Beskrivning: item.Beskrivning,
//   }));

// statusValues = responseData
//   .filter((item) => item.Attribut === "Status")
//   .map((item) => ({
//     Kod: item.Kod,
//     Sammanfattning: item.Beskrivning + " (" + item.Kod + ")",
//     Beskrivning: item.Beskrivning,
//   }));

ansvarigPartValues = ansvarigPartValues;

export const sb11codes = {
  ansvarigPartValues,
  elementValues,
  presentationValues,
  statusValues,
};
