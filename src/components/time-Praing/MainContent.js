import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import "moment/dist/locale/ar-dz";
import { Box } from "@mui/material";
moment.locale("ar");
export default function MainContent() {
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [cities, setCities] = useState([]);
	const[cc,setCc] = useState("SA")
	const [ci, setCi] = useState("Makkah al Mukarramah");
	// STATES
	const [nextPrayerIndex, setNextPrayerIndex] = useState(2);
	const [timings, setTimings] = useState({
		Fajr: "", //04:20
		Dhuhr: "", //11:50
		Asr: "", // 15:18
		Sunset: "",// 18:03
		Isha: "",//19:33
	});
	const [remainingTime, setRemainingTime] = useState("");
	const [today, setToday] = useState("");
	const prayersArray = [
		{ key: "Fajr", displayName: "Fajr" },
		{ key: "Dhuhr", displayName: "Dhuhr" },
		{ key: "Asr", displayName: "Asr" },
		{ key: "Sunset", displayName: "Sunset" },
		{ key: "Isha", displayName: "Isha" },
	];
	const getTimings = async () => {
		if(ci.length > 0 && cc.length > 0){
		const response = await axios.get(
			`https://api.aladhan.com/v1/timingsByCity?country=${cc}&city=${ci}`
		);
		setTimings(response.data.data.timings);
		console.log('timing' ,  response.data.data.timings)
		}
	};
	useEffect(() => {
		getTimings();
	}, [cc,ci]);
	useEffect(() => {
		let interval = setInterval(() => {
			setupCountdownTimer();
		}, 1000);
		const t = moment();
		setToday(t.format("MMM Do YYYY | h:mm"));
		return () => {
			clearInterval(interval);
		};
	}, [timings,cc,ci]);

	const setupCountdownTimer = () => {
		const momentNow = moment();
		let prayerIndex = 2;
		if (
			momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
			momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
		){
			prayerIndex = 1;
		} else if (
			momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
			momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
		) {
			prayerIndex = 2;
		} else if (
			momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
			momentNow.isBefore(moment(timings["Sunset"], "hh:mm"))
		) {
			prayerIndex = 3;
		} else if (
			momentNow.isAfter(moment(timings["Sunset"], "hh:mm")) &&
			momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
		) {
			prayerIndex = 4;
		} else {
			prayerIndex = 0;
		}
		setNextPrayerIndex(prayerIndex);
		// now after knowing what the next prayer is, we can setup the countdown timer by getting the prayer's time
		const nextPrayerObject = prayersArray[prayerIndex];
		// console.log('nextPrayerObject',nextPrayerObject)
		const nextPrayerTime = timings[nextPrayerObject.key];
		const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");
		let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);
		if (remainingTime < 0) {
			const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
			const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
				moment("00:00:00", "hh:mm:ss")
			);
			const totalDiffernce = midnightDiff + fajrToMidnightDiff;
			remainingTime = totalDiffernce;
		}
		// console.log(remainingTime);
		const durationRemainingTime = moment.duration(remainingTime);
		setRemainingTime(
			`${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`
		);
	};


useEffect(() => {
const fetchCountries = async () => {	
	try {
		const response = await fetch('https://restcountries.com/v3.1/all');
		const data = await response.json();
		setCountries(data);
		} catch (error) {
		console.error('Error fetching countries:', error);
		}
	};
fetchCountries();
}, []);

const fetchCities = async (countryCode) => {
	try 
	{
	const response =
	await axios.get(`https://api.teleport.org/api/cities/?search=${countryCode}`);
		setCities(response.data._embedded['city:search-results']);
	//   console.log(response.data._embedded['city:search-results'])
	} 
	catch (error)
	{
		console.error('Error fetching cities:', error);
	}
};
return (
< div style={{padding:50 }}>
	<div style={{padding:50 , display:'flex' ,flexWrap:"wrap", justifyContent:'center' , alignItems:'center', gap:100}} >
	<div>
		<h2> Country: <span style={{color:"wheat"}}>{selectedCountry}</span></h2>
		<select style={{color:'black' ,background:'silver',height:'40px',borderRadius: '10px',width:'100%',
    padding: '1px'}} 
			onChange={(e)=>{
			let ahmed = JSON.parse(e.target.value)
			fetchCities(ahmed.name.common);
			setSelectedCountry(ahmed.name.common)	
			setCc(ahmed.cca2)
		}}>
{
	countries.map((country)=>{
		return(
		<>
			<option value={JSON.stringify(country)} key={country.cca2}>
				{country.name.common} 
			</option>
		</>
	)
	})
}
	</select>
	</div>
{
	<div>
		<h2>Cities in : <span style={{color:"green"}}>{selectedCountry} </span></h2>
		<select  style={{color:'white' ,background:'silver',height:'40px',borderRadius: '10px',width:'100%',
    padding: '1px'}} 
			onChange={(e)=>{
			let originalString = e.target.value
			let regex = /,.*$/;
			let modifiedString = originalString.replace(regex, '');
			setCi(modifiedString)
				}
			}>
			{cities.map((city) => (
			<option key={city._links['city:item'].href} 
			value={city.matching_full_name} >{city.matching_full_name}</option>
			))}
		</select>
	</div>
}
	</div>
		{/* TOP ROW */}
		<Grid container>
			<Grid xs={8}>
				<div style={{background:''}}>
					<h2>{today}</h2>
					<h1>{ ci !== null ? ci : 'default' }: {selectedCountry}</h1>
				</div>
			</Grid>
				<Grid xs={4}>
					<div>
						<h2> still to  {" "} 
							{/* متبقي حتى صلاة{" "} */}
							{prayersArray[nextPrayerIndex].displayName}
						</h2>
						<h1>{remainingTime}</h1>
						<audio src="" autoPlay={remainingTime =='00:00:00'?true:false} ></audio>
					</div>
				</Grid>
			</Grid>
			{/*== TOP ROW ==*/}
			<Divider style={{ borderColor: "white", opacity: "0.1" }} />
			{/* PRAYERS CARDS */}
		
			<Box component={'div'}
			sx={{display:'flex',justifyContent:'center', alignItems:'center', gap:10 , flexWrap:'wrap'}}>
			
				<Prayer
					name="Fagr"
					time={timings.Fajr}
					image="https://wepik.com/api/image/ai/9a07baa7-b49b-4f6b-99fb-2d2b908800c2"
				/>
				<Prayer
					name="Duhr"
					time={timings.Dhuhr}
					image="https://wepik.com/api/image/ai/9a07bb45-6a42-4145-b6aa-2470408a2921"
				/>
				<Prayer
					name="Asr"
					time={timings.Asr}
					image="https://wepik.com/api/image/ai/9a07bb90-1edc-410f-a29a-d260a7751acf"
				/>
				<Prayer
					name="Sunset"
					time={timings.Sunset}
					image="https://wepik.com/api/image/ai/9a07bbe3-4dd1-43b4-942e-1b2597d4e1b5"
				/>
				<Prayer
					name="Isha"
					time={timings.Isha}
					image="https://wepik.com/api/image/ai/9a07bc25-1200-4873-8743-1c370e9eff4d"
				/>
				</Box>
			{/* </Stack> */}
			{/*== PRAYERS CARDS ==*/}
			{/* SELECT CITY */}
			<Stack
				direction="row"
				justifyContent={"center"}
				style={{ marginTop: "40px" }}
			>
			</Stack>
		</div>
	);
}
