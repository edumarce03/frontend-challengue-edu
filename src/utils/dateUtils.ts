/**
 * Calcula la edad a partir de una fecha de nacimiento en formato "DD-MM-YYYY"
 */
export function calculateAge(birthDay: string): number {
  // Parsear la fecha en formato DD-MM-YYYY
  const [day, month, year] = birthDay.split("-").map(Number);

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Si aún no ha cumplido años este año, restar 1
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
