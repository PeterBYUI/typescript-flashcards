export function isEmailValid(str: string) {
    if (!str || typeof str !== "string") return false;

    const email = str.trim();
    const firstCharacter = email[0];
    const lastCharacter = email[email.length - 1];
    const [local, domain] = email.split("@");

    if (!email.includes("@")) return false;
    if (email.includes(" ")) return false;
    if (firstCharacter === "@" || lastCharacter === "@") return false;
    if (firstCharacter === "." || lastCharacter === ".") return false;
    if (email.includes("..")) return false;
    if (!local || !domain) return false;
    if (!domain.includes(".")) return false;

    let atNumber = 0;
    for (let char of email) {
        if (char === "@") atNumber++;
    }
    if (atNumber > 1) return false;

    return true;
}