import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

export default function MediaCard({ name, time, image }) {
  return (
    <Card xs={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={image} title="" />
      <CardContent>
        <h2> {name}</h2>
        <h2> {time}</h2>
      </CardContent>
    </Card>
  );
}
