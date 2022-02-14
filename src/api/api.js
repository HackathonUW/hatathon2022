import axios from 'axios';

// const endpoint = "https://demo.noguera.dev/api/0.1.0/"; // testid/test.json
const backend = 'https://hatathon-backend.herokuapp.com';

export async function Login() {
    const userinfo = 'smurk:davis';

    const options = {
        method: 'POST',
        headers: {
            Authorization: `Basic ${btoa(userinfo)}`,
            Accept: 'application/JSON',
            'Content-Type': 'application/w-xxx-form-urlencoded',
        },
    };

    const response = await fetch('https://api.wisc.edu/oauth/token', options);
    return response.ok;
}

export async function getUUID() {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    };

    const response = await fetch(`${backend}/new`, options);
    return response.json();
}

export async function queryResults(uuid) {
    const info = {
        uuid,
        type: 'results',
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
    };

    const response = await fetch(`${backend}/get`, options);
    return response.json();
}

export async function fetchProjects() {
    const info = {
        type: 'project',
        ct: 'ALL',
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
    };

    const response = await fetch(`${backend}/get`, options);
    return response.json();
}

export async function fetchProject(id) {
    const info = {
        type: 'project',
        id,
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
    };

    const response = await fetch(`${backend}/get`, options);
    return response.json();
}

export async function fetchAllTestCases() {
    const info = {
        type: 'all_test',
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
    };

    const response = await fetch(`${backend}/get`, options);
    return response.json();
}

export async function fetchTestCases(id) {
    const info = {
        type: 'testcases',
        proj_id: id,
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
    };

    const response = await fetch(`${backend}/get`, options);
    return response.json();
}

export async function fetchTestCase(id) {
    const info = {
        type: 'testcase',
        pid: id,
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
    };
    // console.log(id);

    const response = await fetch(`${backend}/get`, options);
    return response.json();
}

export async function disableTestCase(id) {
    const info = {
        type: 'disable',
        id,
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
    };

    const response = await fetch(`${backend}/edit`, options);
    return response.json();
}

export async function enableTestCase(id) {
    const info = {
        type: 'enable',
        id,
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
    };

    const response = await fetch(`${backend}/edit`, options);
    return response.json();
}

export async function fetchFile(path) {
    const response = await fetch(backend + path);
    // console.warn("GET FILE", response);
    return response.text();
}

export async function CreateTestCase(data, author, name, command, id) {
    // let response = await fetch("https://hatathon-backend.herokuapp.com/create", options);
    let response = await axios.post(`${backend}/create`, data);
    const paths = await response.data;

    // // console.log(paths.path);

    const info = {
        type: 'testcase',
        rating: 0,
        author,
        name,
        pre: '',
        post: '',
        command,
        projectid: id,
        input: paths.path[0],
        output: paths.path[1],
    };

    // // console.log(info);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
    };

    response = await fetch(`${backend}/create`, options);
    // console.log(response);
    return response.json();
}

export async function CreateProject(name, email, author, course, section, prof, type) {
    const info = {
        name,
        email,
        author,
        course,
        section,
        prof,
        type,
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
    };
    const response = await fetch(`${backend}/create`, options);
    return response.json();
}
