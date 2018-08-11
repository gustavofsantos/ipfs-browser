export function genKey() {
    return '_' + Math.random().toString(36).substr(1,9);
}