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
  const [nextPrayerIndex, setNextPrayerIndex] = useState(2);
  const [timings, setTimings] = useState({});
  const [city, setCity] = useState("Rabat");
  const [remainingTime, setRemainingTime] = useState("");
  const prayersArray = [
    { key: "Fajr", displayName: "Fajr" },
    { key: "Dhuhr", displayName: "Dhuhr" },
    { key: "Asr", displayName: "Asr" },
    { key: "Maghrib", displayName: "Maghrib" },
    { key: "Isha", displayName: "Isha" },
  ];
  const [today, setToday] = useState("");
  const getTimings = async (selectedCity) => {
    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?country=MA&city=${selectedCity}`
      );
      setTimings(response.data.data.timings);
    } catch (error) {
      console.error("Error fetching timings:", error);
    }
  };
  useEffect(() => {
    getTimings(city);
  }, [city]);
  useEffect(() => {
    let interval = setInterval(() => {
      setupContdownTimer();
    }, 1000);
    const t = moment();
    setToday(t.format("LLLL"));
    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  const setupContdownTimer = () => {
    const momentNow = moment();
    let prayerIndex = 2;
    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }
    setNextPrayerIndex(prayerIndex);
    const nextPrayerObject = prayersArray[prayerIndex];
    const nextPrayerTime = timings[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");
    const diffTime = nextPrayerTimeMoment.diff(momentNow);

    if (diffTime > 0) {
      const durationRemainingTime = moment.duration(diffTime);
      const formattedRemainingTime = `${durationRemainingTime.hours()}h ${durationRemainingTime.minutes()}m ${durationRemainingTime.seconds()}s`;
      setRemainingTime(formattedRemainingTime);
    } else {
      setRemainingTime("0h 0m 0s");
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

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
            <h2>
              Temps restant pour {prayersArray[nextPrayerIndex].displayName}{" "}
            </h2>
            <h1>{remainingTime}</h1>
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
