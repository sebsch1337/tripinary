export const validateId = (id) => id.match("^[0-9a-fA-F]{24}$");

export const validateTripName = (name) => name.match("^[a-zA-ZäÄöÖüÜß ]*$");
