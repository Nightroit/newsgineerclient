export default function (state = "news", action) {
    switch(action.type) {
        case 'TYPE': 
            return action.payload;
        default: 
            return state; 
    }
}