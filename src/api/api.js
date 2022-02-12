import axios from "axios";

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

export async function getUUID() {


    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    }

    let response = await fetch(backend + "/new", options);
    return response.json();
}

export async function queryResults(uuid) {
    var info = {
        uuid: uuid,
        type: 'results'
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

export async function fetchProject(id) {
    var info = {
        type: 'project',
        id: id
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
        proj_id: id
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

export async function fetchTestCase(id) {
    var info = {
        type: 'testcase',
        pid: id
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    }
    console.log(id);

    let response = await fetch(backend + "/get", options);
    return response.json();
}

export async function disableTestCase(id) {
    var info = {
        type: 'disable',
        id: id
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    }

    let response = await fetch(backend + "/edit", options);
    return response.json();
}

export async function enableTestCase(id) {
    var info = {
        type: 'enable',
        id: id
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    }

    let response = await fetch(backend + "/edit", options);
    return response.json();
}

export async function fetchFile(path) {
    let response = await fetch(backend + path);
    console.warn("GET FILE", response);
    return response.text();
}

export async function CreateTestCase(data, author, name, command, id) {

    // let response = await fetch("https://hatathon-backend.herokuapp.com/create", options);
    let response = await axios.post(backend + "/create", data);
    let paths = await response.data;

    // console.log(paths.path);

    var info = {
        type: 'testcase',
        rating: 0,
        author: author,
        name: name,
        pre: "",
        post: "",
        command: command,
        projectid: id,
        input: paths.path[0],
        output: paths.path[1]
    };

    // console.log(info);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info)
    }

    response = await fetch(backend + "/create", options);
    console.log(response);
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
    let response = await fetch(backend + "/create", options)
    return await response.json();
}
