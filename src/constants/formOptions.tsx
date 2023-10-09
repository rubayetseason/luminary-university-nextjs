export const genderOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Others",
    value: "others",
  },
];

export const bloodGroupOptions = [
  {
    label: "A+",
    value: "A+",
  },
  {
    label: "A-",
    value: "A-",
  },
  {
    label: "B+",
    value: "B+",
  },
  {
    label: "B-",
    value: "B-",
  },
  {
    label: "AB+",
    value: "AB+",
  },
  {
    label: "AB-",
    value: "AB-",
  },
  {
    label: "O+",
    value: "O+",
  },
  {
    label: "O-",
    value: "O-",
  },
];

export const facultyOptions = [
  {
    label: "Faculty of Science and Engineering",
    value: "Faculty of science and engineering",
  },
  {
    label: "Faculty of Business Studies",
    value: "Faculty of Business Studies",
  },
  {
    label: "Faculty of Arts",
    value: "Faculty of Arts",
  },
];
export const acDepartmentOptions = [
  {
    label: "Computer Science & Engineering",
    value: "cse",
  },
  {
    label: "Electrical Engineering & Electronics",
    value: "eee",
  },
];
export const acSemesterOptions = [
  {
    label: "Fall",
    value: "fall",
  },
  {
    label: "Autumn",
    value: "autumn",
  },
  {
    label: "Summer",
    value: "summer",
  },
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const monthOptions = months.map((month: string) => {
  return {
    label: month,
    value: month,
  };
});

export const days = [
  "SATURDAY",
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
];
export const daysOptions = days.map((day: string) => {
  return {
    label: day,
    value: day,
  };
});
