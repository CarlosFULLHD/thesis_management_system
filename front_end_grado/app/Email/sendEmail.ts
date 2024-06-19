export async function sendEmail(to:string, subject:string, body:string) {
    const response = await fetch('http://localhost:8080/api/v1/email/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, body })
    });

    if (response.ok) {
        console.log("Email sent successfully");
    } else {
        console.log("Failed to send email");
    }
}

export function replaceTemplateVars(template:string, name:string, observations:string) {
    return template
        .replace('{{name}}', name)
        .replace('{{observations}}', observations);
}