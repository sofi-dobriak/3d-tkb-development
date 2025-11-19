export default function dispatchTrigger(name, data) {
    window.dispatchEvent(
        new CustomEvent(
            name, 
        { detail: data }
        )
    );
}