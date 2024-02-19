let responseData = [];

async () => {
  try {
    const response = await fetch("http://sestoas647/node/sb11/api");
    responseData = await response.json();
    console.log(responseData);

    sb11codes.ansvarigPartValues = responseData
      .filter((item) => item.Attribut === "Ansvarig part")
      .map((item) => ({ Kod: item.Kod, Beskrivning: item.Beskrivning }));

    const elementValues = responseData
      .filter((item) => item.Attribut === "Element")
      .map((item) => ({ Kod: item.Kod, Beskrivning: item.Beskrivning }));

    const presentationValues = responseData
      .filter((item) => item.Attribut === "Presentation")
      .map((item) => ({ Kod: item.Kod, Beskrivning: item.Beskrivning }));

    const statusValues = responseData
      .filter((item) => item.Attribut === "Status")
      .map((item) => ({ Kod: item.Kod, Beskrivning: item.Beskrivning }));

    //console.log(ansvarigPartValues);
    //console.log(elementValues);
    //console.log(presentationValues);
    //console.log(statusValues);
  } catch (error) {
    console.error(error);
  }
}

async function getSB11Codes(part) {
  try {
    const response = await fetch("http://sestoas647/node/sb11/api");
    responseData = await response.json();
    if (part == "ansvarigPartValues") {
      sb11codes.ansvarigPartValues = responseData
        .filter((item) => item.Attribut === "Ansvarig part")
        .map((item) => ({ Kod: item.Kod, Beskrivning: item.Beskrivning }));
    }
    if (part == "elementValues") {
      sb11codes.elementValues = responseData
        .filter((item) => item.Attribut === "Element")
        .map((item) => ({ Kod: item.Kod, Beskrivning: item.Beskrivning }));
    }
    if (part == "presentationValues") {
      sb11codes.presentationValues = responseData
        .filter((item) => item.Attribut === "Presentation")
        .map((item) => ({ Kod: item.Kod, Beskrivning: item.Beskrivning }));
    }
    if (part == "statusValues") {
      sb11codes.statusValues = responseData
        .filter((item) => item.Attribut === "Status")
        .map((item) => ({ Kod: item.Kod, Beskrivning: item.Beskrivning }));
    }

    //console.log(responseData);
  } catch (error) {
    console.error(error);
  }
}

console.log(getSB11Codes("ansvarigPartValues"));



export const sb11codes = {
    ansvarigPartValues: () => [
        { Kod: "1", Beskrivning: "Kommun" },
        { Kod: "2", Beskrivning: "Landsting" },
        { Kod: "3", Beskrivning: "Privat" },
        { Kod: "4", Beskrivning: "Stat" },
        { Kod: "5", Beskrivning: "Övrigt" },
        ],
    elementValues: () => [
        { Kod: "1", Beskrivning: "Byggnad" },
        { Kod: "2", Beskrivning: "Byggnadsdel" },
        { Kod: "3", Beskrivning: "Installation" },
        { Kod: "4", Beskrivning: "Rum" },
        { Kod: "5", Beskrivning: "Yta" },
        { Kod: "6", Beskrivning: "Övrigt" },
        ],
    presentationValues: () => [
        { Kod: "1", Beskrivning: "Byggnad" },
        { Kod: "2", Beskrivning: "Byggnadsdel" },
        { Kod: "3", Beskrivning: "Installation" },
        { Kod: "4", Beskrivning: "Rum" },
        { Kod: "5", Beskrivning: "Yta" },
        { Kod: "6", Beskrivning: "Övrigt" },
        ],
    statusValues: () => [
        { Kod: "1", Beskrivning: "Aktiv" },
    ],
};


