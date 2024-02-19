<script>
  import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
    Toast,
    ToastBody,
    ToastHeader,
    Icon,
  } from "sveltestrap";

  import { chart } from "svelte-apexcharts";

  import Svelecte from "svelecte";

  // let options = {
  //   chart: {
  //     type: "bar",
  //   },
  //   series: [
  //     {
  //       name: "sales",
  //       data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
  //     },
  //   ],
  //   xaxis: {
  //     categories: ["September 2022", 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  //   },
  // };

  // import { copy } from 'svelte-copy';

  //import { sb11codes } from "./lib/sb11data.js";

  // test med fetch

  let ansvarigPartValues = [];
  let elementValues = [];
  let presentationValues = [];
  let statusValues = [];

  // let MonthStats = {
  //   _12monthAgo: 6,
  //   _11monthAgo: 8,
  //   _10monthAgo: 23,
  //   _9monthAgo: 64,
  //   _8monthAgo: 2,
  //   _7monthAgo: 5,
  //   _6monthAgo: 1,
  //   _5monthAgo: 6,
  //   _4monthAgo: 7,
  //   _3monthAgo: 2,
  //   _2monthAgo: 6,
  //   _1monthAgo: 66,
  // };

  // function writeStatistic() {
  //   fetch("http://sestoas647/node/sb11/api/stats")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not OK");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // Process the fetched data
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       // Handle any errors that occurred during the fetch
  //       console.error("Error:", error);
  //     });
  // }

  fetchData();

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

        presentationValues = data
          .filter((item) => item.Attribut === "Presentation")
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

        //console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Error:", error);
      });
  }

  fetchData();

  let scriptCopied = false;
  let buttonClass = "btn btn-secondary disabled";
  let scriptButtonClass = true;

  let selection = null;

  let SB11List = [];
  let autocadCode = [];
  let autocadCode2 = [];
  let autocadCodeString = "";

  autocadCode.push("-layer");
  autocadCode2.push("cmddia 0 -layer make");

  function autocadCodeToString() {
    //console.log(autocadCode.length);
    scriptCopied = false;
    autocadCodeString = autocadCode.join("\n") + "\n" + "S\n0\n(command)\n";
    if (autocadCode.length > 1) {
      scriptButtonClass = false;
    } else {
      scriptButtonClass = true;
    }
  }

  const SB11Code = {
    SB11Kod: "",
    SB11Beskrivning: "",
  };

  function addSB11Code() {
    scriptCopied = false;
    autocadCode.push("M");
    autocadCode = autocadCode;
    //console.log(autocadCode);

    SB11Code.SB11Kod =
      selectedAnsvarigPart.Kod +
      selectedElement.Kod +
      selectedPresentation.Kod +
      selectedStatus.Kod;

    let newSB11Code = {
      SB11Kod:
        selectedAnsvarigPart.Kod +
        selectedElement.Kod +
        selectedPresentation.Kod +
        selectedStatus.Kod,
      SB11Beskrivning:
        selectedAnsvarigPart.Beskrivning +
        " | " +
        selectedElement.Beskrivning +
        " | " +
        selectedPresentation.Beskrivning +
        " | " +
        selectedStatus.Beskrivning,
    };

    autocadCode.push(newSB11Code.SB11Kod);
    autocadCode.push("D");
    autocadCode.push(newSB11Code.SB11Beskrivning);
    autocadCode.push(newSB11Code.SB11Kod);

    SB11List = [...SB11List, newSB11Code];
  }
  function removeFromList(index) {
    SB11List.splice(index, 1);
    autocadCode.pop();
    autocadCode.pop();
    autocadCode.pop();
    autocadCode.pop();
    autocadCode.pop();
    autocadCode = autocadCode;
    autocadCodeToString();
    SB11List = SB11List;
  }

  // function copyText() {
  //   navigator.clipboard.writeText(autocadCodeString);
  //   scriptCopied = true;
  // }

  // const Clipboard = () => {
  //   const copyText = async (text) => {
  //     try {
  //       await navigator.clipboard.writeText(text);

  //       alert("Text successfully copied to clipboard!");
  //     } catch (error) {
  //       alert(`Failed to copy text to clipboard: ${error.message}`);
  //     }
  //   };

  //   return {
  //     copyText,
  //   };
  // };

  // const clipboard = Clipboard();

  // clipboard.copyText("Hi, from the sample script!");

  let selectedAnsvarigPart = { Kod: "Ark", Beskrivning: "Ark" };
  let selectedElement = { Kod: "", Beskrivning: "" };
  let selectedPresentation = { Kod: "", Beskrivning: "" };
  let selectedStatus = { Kod: "", Beskrivning: "" };

  function handleSelection() {
    // try {
    //   console.log(selection.Beskrivning);
    // } catch {
    //   console.log("Lyckades inte hantera selectionen");
    // }

    if (
      selectedAnsvarigPart != null &&
      selectedElement != null &&
      selectedPresentation != null &&
      selectedStatus != null
    ) {
      buttonClass = "btn btn-success";
    } else {
      buttonClass = "btn btn-secondary disabled";
    }
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.swecogroup.com/sweco-digital-platforms/5.1.2/css/sweco-bootstrap.css"
  />'

  <link
    rel="stylesheet"
    href="https://cdn.swecogroup.com/sweco-digital-platforms/5.1.2/fonts/fonts.css"
  />
  <link
    rel="stylesheet"
    href="https://cdn.swecogroup.com/sweco-digital-platforms/5.1.2/icons/css/all.min.css"
  />
</svelte:head>

<div class="container mt-3">
  <h2>Skapa SB11-lager</h2>
  <p>
    Här kan du söka fram och skapa SB11-lagernamn. SB11-lagernamn består av fyra
    "fält" och 11 "positioner". Fälten härstammar från Strukturplatsen. När du byggt dina
    lagernamn, kan du enkelt "scripta in" dom i AutoCAD med tillhörande
    beskrivningar. Detta verktyg är utvecklat av Svante Tegeland.
  </p>


  <!-- <p>
    <img src="/src/assets/sb11.png" alt="SB11" class="img-fluid" />
  </p> -->

  <Card class="mb-3">
    <CardBody>
      <!--------- Test ------------->
    

      <section>
        <form>
          <Svelecte
            options={ansvarigPartValues}
            inputId="ansvarig-part"
            valueAsObject={false}
            bind:readSelection={selectedAnsvarigPart}
            clearable
            placeholder="Sök Ansvarig part"
            name="ansvarig-part"
            on:change={handleSelection}
          />

          <Svelecte
            options={elementValues}
            inputId="element"
            valueAsObject={true}
            bind:readSelection={selectedElement}
            clearable
            placeholder="Sök Element"
            name="element"
            on:change={handleSelection}
          />

          <Svelecte
            options={presentationValues}
            inputId="presentation"
            valueAsObject={true}
            bind:readSelection={selectedPresentation}
            clearable
            placeholder="Sök Presentation"
            name="presentation"
            on:change={handleSelection}
          />

          <Svelecte
            options={statusValues}
            inputId="status"
            valueAsObject={true}
            bind:readSelection={selectedStatus}
            clearable
            placeholder="Sök Status"
            name="status"
            on:change={handleSelection}
          />
        </form>
      </section>

      <Button
        class={buttonClass}
        on:click={addSB11Code}
        on:click={autocadCodeToString}>Spara</Button
      >

      <!--------- Test ------------->
      <CardText />
    </CardBody>
  </Card>
  <Card>
    <CardBody>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">SB11-kod</th>
            <th scope="col">Beskrivning</th>
          </tr>
        </thead>
        <tbody>
          {#each SB11List as SB11Code, index}
            <tr>
              <td>{SB11Code.SB11Kod}</td>
              <td>{SB11Code.SB11Beskrivning}</td>
              <td
                ><button
                  type="button"
                  class="btn btn-outline-danger"
                  on:click={() => removeFromList(index)}
                  on:click={autocadCodeToString}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
                    />
                    <path
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
                    />
                  </svg>
                </button></td
              >
            </tr>
          {/each}
        </tbody>
      </table>
      <!-- <Button
        on:click={copyText}
        on:click={writeStatistic}
        disabled={scriptButtonClass}
      > -->
      {#if scriptCopied === true}
        <i class="fa-light fa-thumbs-up" />
        Kopierat! Nu kan du klistra in kommandot i AutoCAD:s kommandorad för att
        skapa lagren
        <Icon slot="icon" name="emoji-sunglasses" class="ms-2" />
      {:else}
        Kopiera AutoCAD-kommandon
        <Icon slot="icon" name="emoji-sunglasses" class="ms-2" />
      {/if}
      <!-- </Button> -->
    </CardBody>
  </Card>

  {#if autocadCode.length > 1}
    <Card body color="light" style="margin-top: 15px">
      <CardBody>
        <p>
          <CardText
            >{#each autocadCode as scriptRow, index}
              {scriptRow}
              <br />
            {/each}</CardText
          >
          (command)
          <br />
          <br />
        </p>
      </CardBody>
    </Card>
  {/if}
  
  <!-- <div class="container"  style="margin-top: 15px">
    <h2>12 månaders statistik</h2>
    <p>
      Här kan du se hur många SB11-koder som skapats de senaste 12 månaderna.
    </p>
    <p>
      <Button on:click={writeStatistic}>Hämta statistik</Button>
    </p>
  </div> -->

  <!-- <div use:chart={options} /> -->
</div>

<style>
  @font-face {
    font-family: "Gelasio";
    font-style: normal;
    font-weight: 400;
    src: local("Gelasio Regular"), local("Gelasio-Regular"),
      url(https://fonts.gstatic.com/s/gelasio/v1/cIf9MaFfvUQxTTqS9C6hYQ.woff2)
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }


</style>
