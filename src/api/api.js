const endpoint = "https://demo.noguera.dev/api/0.1.0/"; // testid/test.json
const backend = "https://hatathon-backend.herokuapp.com";

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

export async function fetchProjects() {
    var info = {
        type: 'project',
        ct: 'ALL'
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    }

    let response = await fetch(backend + "/get", options);
    return response.json();
}

export async function fetchTestCases(id) {
    var info = {
        type: 'testcases',
        projid: id
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    }

    let response = await fetch(backend + "/get", options);
    return response.json();
}

export async function CreateTestCase(data, id) {
    var info = {
        type: 'testcase',
        projid: id,
        
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    }
    let response = await fetch("https://hatathon-backend.herokuapp.com/create", options);
    return await response.json();
}

export async function CreateProject(name, email, author, course, section, prof, type) {
    var info = {
        name: name,
        email: email,
        author: author,
        course: course,
        section: section,
        prof: prof,
        type: type
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    }
    let response = await fetch("https://hatathon-backend.herokuapp.com/create", options)
    return await response.json();
}
