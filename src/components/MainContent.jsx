import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import Prayer from "./Prayer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";

export default function MainContent() {
  const [timings, setTimings] = useState({});
  const [city, setCity] = useState("Rabat");
  const getTimings = async (selectedCity) => {
    try {
      const response =
        await axios.get`https://api.aladhan.com/v1/timingsByCity?country=MA&city=${selectedCity}`();
      setTimings(response.data.data.timings);
    } catch (error) {
      console.error("Error fetching timings:", error);
    }
  };
  useEffect(() => {
    getTimings(city);
    const t = moment();
    setToday(t.format("LLLL"));
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  const [today, setToday] = useState("");
  return (
    <>
      <Grid container>
        <Grid xs={6}>
          <div>
            <h2>{today}</h2>
            <h1>{city}</h1>
          </div>
        </Grid>
        <Grid xs={6}>
          <div>
            <h2>Temps restant pour Isha </h2>
            <h1>1:22</h1>
          </div>
        </Grid>
      </Grid>
      <Divider />
      {/* PRAYERS CARDS */}
      <Stack
        direction="row"
        justifyContent="space-around"
        style={{ marginTop: "50px" }}
      >
        <Prayer
          name="Fajr"
          time={timings.Fajr}
          image="src/assets/images/fajr.png"
        />
        <Prayer
          name="Dhuhr"
          time={timings.Dhuhr}
          image="src/assets/images/dohr.png"
        />
        <Prayer
          name="Asr"
          time={timings.Asr}
          image="src/assets/images/asr.png"
        />

        <Prayer
          name="Maghrib"
          time={timings.Maghrib}
          image="src/assets/images/maghreb.png"
        />
        <Prayer
          name="Isha"
          time={timings.Isha}
          image="src/assets/images/ichaa.png"
        />
      </Stack>
      {/* PRAYERS CARDS */}

      {/* SELECT CITY */}
      <Stack
        direction="row"
        justifyContent="center"
        style={{ marginTop: "40px" }}
      >
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">Ville</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={city}
            label="City"
            onChange={handleCityChange}
          >
            <MenuItem value={"Rabat"}>Rabat</MenuItem>
            <MenuItem value={"Dakhla"}>Dakhla</MenuItem>
            <MenuItem value={"Oujda"}>Oujda</MenuItem>
            <MenuItem value={"Mohammedia"}>Mohammedia</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {/* SELECT CITY */}
    </>
  );
}
