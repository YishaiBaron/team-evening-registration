# Team Evening Registration Form - Next.js, React, TypeScript

## Overview

This project involves the development of a dynamic and responsive registration form for a team evening using Next.js (version 14), React, and TypeScript. Tailwind CSS is utilized for design, ensuring adaptability to various screen sizes.

## Form Requirements

- **Selecting an Employee:** Choose an employee from a predefined array.
- **Spouse Joining:** Checkbox to indicate if the spouse will join.
- **Number of Children Joining:** Enter the count of children attending.
- **Number of Children Over 18:** Enter the count of children over 18 years old.
- **Shabbat Observance:** Checkbox for individuals observing Shabbat.
- **Number of Rooms:** Select the number of rooms from a list.
- **Number of Persons Arriving:** Input for the total number of people arriving.
- **Connecting Door Needed:** Checkbox to indicate the need for a connecting door.
- **Need for Transportation and Number of Places:** Choose transportation requirements from a list.
- **Basketball Tournament Notification:** Display a message if the total number of people exceeds 5, indicating the opportunity to register for a basketball tournament.

## Price Calculation Logic

- **Basic Price:** 500 shekels.
- **Supplement for a Spouse:** 100 shekels.
- **Supplement for Each Child:** 50 shekels.
- **Supplement for a Child Over 18:** 250 shekels.
- **Transportation Cost Per Person:** 25 shekels.
- **Participation in a Team Evening:** 20 shekels for an adult, 10 shekels for a child.
- **Discount for Shabbat Observance:** 18% of the final price.
- **Supplement for Another Room:** 500 shekels.

## Validation and Form Submission

- **Validation:** The form's fields are validated using an API function (`api/webhooks/route.ts`).
- **Form Submission:** Upon form submission, the data is sent to the API for validation, and feedback is provided on whether the validation passed or not.
- **Data Storage:** All form data is saved in an SQLite database.

## Project Structure

- `components/`: React components including InputField, Checkbox, SelectField, Popup, and the main RegistrationForm.
- `api/webhooks/route.ts`: API route for form validation and data storage in the SQLite database.
- `styles/`: Tailwind CSS stylesheets for styling the components.
- `public/`: Static assets.

## Getting Started

1. Clone the repository: `git clone https://github.com/yishaibaron/team-evening-registration-form.git`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## Technologies Used

- Next.js (v14)
- React
- TypeScript
- Tailwind CSS
- SQLite
- Axios (for API requests)

