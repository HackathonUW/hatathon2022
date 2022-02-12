const endpoint = "https://demo.noguera.dev/api/0.1.0/"; // testid/test.json

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
    let data = await response.text();
    return response.ok;
}
