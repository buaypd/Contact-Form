export function validateForm(data) {
    const errors = [];


    if (!data.fname || data.fname.trim() === "") {
        errors.push("First name is required.");
    }


    if (!data.lname || data.lname.trim() === "") {
        errors.push("Last name is required.");
    }


    const validMeetOptions = ['school', 'work', 'networking', 'online'];
    if (!validMeetOptions.includes(data.meet)) {
        errors.push("Please select a valid option for how we met.");
    }

    if (data.mailingList === 'on') {
        const validFormats = ['html', 'text'];
        if (!data.emailFormat || !validFormats.includes(data.emailFormat)) {
            errors.push("Please select an email format (HTML or Text).");
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}