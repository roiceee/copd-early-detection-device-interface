type Gender = "male" | "female";

function evaluateCOPD(
  ratio: number,
  PEF: number,
  SPO2: number,
  gender: Gender
): { data: string; style: string } {
  // if all is 0, return Evaluation would be here

  if (ratio === 0 && PEF === 0 && SPO2 === 0) {
    return { data: "Evaluation would be here", style: "text-gray-500" };
  }

  // First, check if all critical conditions are met
  if (ratio <= 70 && SPO2 <= 92) {
    if (
      (gender === "male" && PEF <= 350) ||
      (gender === "female" && PEF <= 250)
    ) {
      return { data: "Highly Probable COPD", style: "text-danger" };
    }
  }

  // Next, check if ratio and PEF alone meet criteria for probable COPD
  if (ratio <= 70) {
    if (
      (gender === "male" && PEF <= 350) ||
      (gender === "female" && PEF <= 250)
    ) {
      return { data: "Probable COPD", style: "text-warning" };
    }

    // If PEF does not meet the criteria, check ratio and SPO2
    if (SPO2 <= 92) {
      return { data: "Probable COPD", style: "text-warning" };
    }
  }

  // If none of the conditions are satisfied
  return { data: "Safe Level", style: "text-success" };
}

export { evaluateCOPD };
export type { Gender };
