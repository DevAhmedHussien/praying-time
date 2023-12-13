// import * as React from "react";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Prayer = (
{
	name,
	time,
	image
}
) => {
	return (
		<Card sx={{ width: "200px" }}>
			<CardMedia
				sx={{ height: 140 }}
				image={image}
				title="green iguana"
			/>
			<CardContent>
			<Typography variant="h2" color="text.secondary">
				{name}
				</Typography>
				{/* <h2></h2> */}
				<Typography variant="h3" color="text.secondary">
					{time}
				</Typography>
			</CardContent>
		</Card>
	);
}
export default Prayer