export function flip() {
    return {
        type: 'FLIP'
    }
}

export function login() {
    return {
        type: 'AUTHENTICATED'
    }
}

export function logout() {
    return {
        type: 'UNAUTHENTICATED'
    }
}

export function detailsUpdate(payload){ 
    return {
        type: 'DETAILS_UPDATE', 
        payload
    }
}

export function filterPost(payload) {
    return {
        type: 'FILTER_POST', 
        payload
    }
}

export function type(page) {
    return {
        type: 'TYPE', 
        payload: page
    }
}