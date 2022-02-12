import { useEffect } from "react";

function Login()
{
	let userinfo = "smurk:davis";
	useEffect(() => {
		authenticate();
	},[])
	function authenticate()
	{
		const str = "Basic " + btoa(userinfo)
		const options = {
			method: 'POST',
			headers: {
				'Authorization': str,
				'Accept': application/JSON,
				'Content-Type': application/w-xxx-form-urlencoded,
			}
		}
		fetch("https://api.wisc.edu/oauth/token",options).then(response => response.json);
	
	
	}
}

