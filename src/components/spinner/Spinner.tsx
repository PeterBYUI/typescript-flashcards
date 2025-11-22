import classes from "./Spinner.module.css";

export default function Spinner() {

    return <div role="status" aria-live="polite">
        <span className="sr-only">Loading...</span>
        <div className={classes.spinner}></div>
    </div>
}