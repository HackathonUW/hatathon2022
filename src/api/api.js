export default class UWAPI {
    async static Login() {
        let userinfo = "smurk:davis";

        const str = "Basic " + btoa(userinfo)
        const options = {
            method: 'POST',
            headers: {
                'Authorization': str,
                'Accept': application/JSON,
                'Content-Type': application/w-xxx-form-urlencoded,
            }
        }
        
        let response =  await fetch("https://api.wisc.edu/oauth/token", options);
        let data = response.json();
        return data;
    }
}
