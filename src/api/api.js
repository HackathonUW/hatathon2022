export async function Login() {
    let userinfo = "smurk:davis";

    const options = {
        method: 'POST',
        headers: {
            'Authorization': "Basic " + btoa(userinfo),
            'Accept': "application/JSON",
            'Content-Type': "application/w-xxx-form-urlencoded",
        }
    };
    
    let response =  await fetch("https://api.wisc.edu/oauth/token", options);
    let data = response.json();
    return data;
}
