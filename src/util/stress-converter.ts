/* eslint-disable no-dupe-else-if */

import StressLevel from "../types/stress-level";

function determineStressLevel(
  gsr: number,
  hr: number,
  bt: number
): StressLevel {
  if (gsr < 2) {
    if (60 <= hr && hr <= 70 && 36.1 <= bt && bt <= 37) {
      if (bt > 35) {
        return "Relax"; // Relax - conditions 1, 5
      } else if (33 <= bt && bt <= 35) {
        return "Relax"; // Relax - conditions 6, 7
      } else {
        return "Relax"; // Relax - condition 8
      }
    } else if (71 <= hr && hr <= 90 && 36.1 <= bt && bt <= 37) {
      if (hr <= 90) {
        return "Relax"; // Relax - conditions 2, 6
      } else {
        return "Relax"; // Relax - condition 3
      }
    } else if (91 <= hr && hr <= 100 && 36.1 <= bt && bt <= 37) {
      return "Relax"; // Relax - condition 3
    } else if (hr > 100 && 36.1 <= bt && bt <= 37) {
      return "Relax"; // Relax - condition 4
    } else if (60 <= hr && hr <= 70 && 35 <= bt && bt <= 36) {
      return "Relax"; // Relax - condition 5
    } else if (71 <= hr && hr <= 90 && 35 <= bt && bt <= 36) {
      return "Relax"; // Relax - condition 6
    } else if (60 <= hr && hr <= 70 && 33 <= bt && bt <= 34.9) {
      return "Relax"; // Relax - condition 7
    } else if (60 <= hr && hr <= 70 && bt < 33) {
      return "Relax"; // Relax - condition 8
    } else if (
      2 <= gsr &&
      gsr <= 4 &&
      60 <= hr &&
      hr <= 70 &&
      36 <= bt &&
      bt <= 37
    ) {
      return "Relax"; // Relax - condition 9
    }
  } else if (gsr < 2 && hr >= 91 && 35 <= bt && bt <= 36) {
    return "Low Level Stress"; // Low Level Stress - condition 1
  } else if (gsr < 2 && hr > 100 && 36 <= bt && bt <= 37) {
    return "Low Level Stress"; // Low Level Stress - condition 2
  } else if (gsr < 2 && 33 <= bt && bt <= 34.9 && 71 <= hr && hr <= 90) {
    return "Low Level Stress"; // Low Level Stress - condition 3
  } else if (gsr < 2 && 33 <= bt && bt <= 34.9 && 91 <= hr && hr <= 100) {
    return "Low Level Stress"; // Low Level Stress - condition 4
  } else if (gsr < 2 && bt < 33 && 71 <= hr && hr <= 90) {
    return "Low Level Stress"; // Low Level Stress - condition 5
  } else if (gsr < 2 && bt < 33 && 91 <= hr && hr <= 100) {
    return "Low Level Stress"; // Low Level Stress - condition 6
  } else if (
    2 <= gsr &&
    gsr <= 3.9 &&
    36.1 <= bt &&
    bt <= 37 &&
    71 <= hr &&
    hr <= 90
  ) {
    return "Low Level Stress"; // Low Level Stress - condition 7
  } else if (
    2 <= gsr &&
    gsr <= 3.9 &&
    36.1 <= bt &&
    bt <= 37 &&
    91 <= hr &&
    hr <= 100
  ) {
    return "Low Level Stress"; // Low Level Stress - condition 8
  } else if (2 <= gsr && gsr <= 3.9 && 36.1 <= bt && bt <= 37 && hr > 100) {
    return "Low Level Stress"; // Low Level Stress - condition 9
  } else if (
    2 <= gsr &&
    gsr <= 3.9 &&
    35 <= bt &&
    bt <= 36 &&
    60 <= hr &&
    hr <= 70
  ) {
    return "Low Level Stress"; // Low Level Stress - condition 10
  } else if (
    2 <= gsr &&
    gsr <= 3.9 &&
    35 <= bt &&
    bt <= 36 &&
    71 <= hr &&
    hr <= 90
  ) {
    return "Low Level Stress"; // Low Level Stress - condition 11
  } else if (
    2 <= gsr &&
    gsr <= 3.9 &&
    35 <= bt &&
    bt <= 36 &&
    91 <= hr &&
    hr <= 100
  ) {
    return "Low Level Stress"; // Low Level Stress - condition 12
  } else if (
    2 <= gsr &&
    gsr <= 3.9 &&
    33 <= bt &&
    bt <= 34.9 &&
    60 <= hr &&
    hr <= 70
  ) {
    return "Low Level Stress"; // Low Level Stress - condition 13
  } else if (
    2 <= gsr &&
    gsr <= 3.9 &&
    33 <= bt &&
    bt <= 34.9 &&
    71 <= hr &&
    hr <= 90
  ) {
    return "Low Level Stress"; // Low Level Stress - condition 14
  } else if (2 <= gsr && gsr <= 3.9 && bt < 33 && 71 <= hr && hr <= 90) {
    return "Low Level Stress"; // Low Level Stress - condition 15
  } else if (2 <= gsr && gsr <= 3.9 && bt < 33 && 60 <= hr && hr <= 70) {
    return "Low Level Stress"; // Low Level Stress - condition 16
  } else if (
    4 <= gsr &&
    gsr <= 6 &&
    36.1 <= bt &&
    bt <= 37 &&
    60 <= hr &&
    hr <= 70
  ) {
    return "Low Level Stress"; // Low Level Stress - condition 17
  } else if (
    4 <= gsr &&
    gsr <= 6 &&
    36.1 <= bt &&
    bt <= 37 &&
    91 <= hr &&
    hr <= 100
  ) {
    return "Low Level Stress"; // Low Level Stress - condition 18
  } else if (2 <= gsr && gsr <= 3.9 && 33 <= bt && bt <= 34.9 && hr > 100) {
    return "Medium Level Stress"; // Medium Level Stress - condition 1
  } else if (gsr < 2 && bt < 33 && hr > 100) {
    return "Medium Level Stress"; // Medium Level Stress - condition 2
  } else if (2 <= gsr && gsr <= 3.9 && 35 <= bt && bt <= 36 && hr > 100) {
    return "Medium Level Stress"; // Medium Level Stress - condition 3
  } else if (
    2 <= gsr &&
    gsr <= 3.9 &&
    33 <= bt &&
    bt <= 34.9 &&
    91 <= hr &&
    hr <= 100
  ) {
    return "Medium Level Stress"; // Medium Level Stress - condition 4
  } else if (2 <= gsr && gsr <= 3.9 && 33 <= bt && bt <= 34.9 && hr > 100) {
    return "Medium Level Stress"; // Medium Level Stress - condition 5
  } else if (2 <= gsr && gsr <= 3.9 && bt < 33 && 91 <= hr && hr <= 100) {
    return "Medium Level Stress"; // Medium Level Stress - condition 6
  } else if (2 <= gsr && gsr <= 3.9 && bt < 33 && hr > 100) {
    return "Medium Level Stress"; // Medium Level Stress - condition 7
  } else if (
    4 <= gsr &&
    gsr <= 6 &&
    36.1 <= bt &&
    bt <= 37 &&
    91 <= hr &&
    hr <= 100
  ) {
    return "Medium Level Stress"; // Medium Level Stress - condition 8
  } else if (4 <= gsr && gsr <= 6 && 36.1 <= bt && bt <= 37 && hr > 100) {
    return "Medium Level Stress"; // Medium Level Stress - condition 9
  } else if (
    4 <= gsr &&
    gsr <= 6 &&
    35 <= bt &&
    bt <= 36 &&
    60 <= hr &&
    hr <= 70
  ) {
    return "Medium Level Stress"; // Medium Level Stress - condition 10
  } else if (
    4 <= gsr &&
    gsr <= 6 &&
    35 <= bt &&
    bt <= 36 &&
    71 <= hr &&
    hr <= 90
  ) {
    return "Medium Level Stress"; // Medium Level Stress - condition 11
  } else if (
    4 <= gsr &&
    gsr <= 6 &&
    35 <= bt &&
    bt <= 36 &&
    91 <= hr &&
    hr <= 100
  ) {
    return "Medium Level Stress"; // Medium Level Stress - condition 12
  } else if (4 <= gsr && gsr <= 6 && 35 <= bt && bt <= 36 && hr > 100) {
    return "Medium Level Stress"; // Medium Level Stress - condition 13
  } else if (
    4 <= gsr &&
    gsr <= 6 &&
    33 <= bt &&
    bt <= 34.9 &&
    60 <= hr &&
    hr <= 70
  ) {
    return "Medium Level Stress"; // Medium Level Stress - condition 14
  } else if (
    4 <= gsr &&
    gsr <= 6 &&
    33 <= bt &&
    bt <= 34.9 &&
    71 <= hr &&
    hr <= 90
  ) {
    return "Medium Level Stress"; // Medium Level Stress - condition 15
  } else if (4 <= gsr && gsr <= 6 && bt < 33 && 60 <= hr && hr <= 70) {
    return "Medium Level Stress"; // Medium Level Stress - condition 16
  } else if (4 <= gsr && gsr <= 6 && bt < 33 && 71 <= hr && hr <= 90) {
    return "Medium Level Stress"; // Medium Level Stress - condition 17
  } else if (gsr > 6 && 36.1 <= bt && bt <= 37 && 60 <= hr && hr <= 70) {
    return "Medium Level Stress"; // Medium Level Stress - condition 18
  } else if (gsr > 6 && 36.1 <= bt && bt <= 37 && 91 <= hr && hr <= 100) {
    return "Medium Level Stress"; // Medium Level Stress - condition 19
  } else if (gsr > 6 && 36.1 <= bt && bt <= 37 && 91 <= hr && hr <= 100) {
    return "Medium Level Stress"; // Medium Level Stress - condition 20
  } else if (gsr > 6 && 36.1 <= bt && bt <= 37 && hr > 100) {
    return "Medium Level Stress"; // Medium Level Stress - condition 21
  } else if (gsr > 6 && 35 <= bt && bt <= 36 && 60 <= hr && hr <= 70) {
    return "Medium Level Stress"; // Medium Level Stress - condition 22
  } else if (gsr > 6 && 35 <= bt && bt <= 36 && 71 <= hr && hr <= 90) {
    return "Medium Level Stress"; // Medium Level Stress - condition 23
  } else if (gsr > 6 && 35 <= bt && bt <= 36 && 91 <= hr && hr <= 100) {
    return "Medium Level Stress"; // Medium Level Stress - condition 24
  } else if (
    gsr >= 4 &&
    gsr <= 6 &&
    bt >= 33 &&
    bt <= 34.9 &&
    hr >= 91 &&
    hr <= 100
  ) {
    return "High Level Stress"; // High Level Stress - condition 1
  } else if (gsr >= 4 && gsr <= 6 && bt >= 33 && bt <= 34.9 && hr > 100) {
    return "High Level Stress"; // High Level Stress - condition 2
  } else if (gsr >= 4 && gsr <= 6 && bt < 33 && hr >= 91 && hr <= 100) {
    return "High Level Stress"; // High Level Stress - condition 3
  } else if (gsr >= 4 && gsr <= 6 && bt < 33 && hr > 100) {
    return "High Level Stress"; // High Level Stress - condition 4
  } else if (gsr > 6 && bt >= 35 && bt <= 36 && hr >= 100) {
    return "High Level Stress"; // High Level Stress - condition 5
  } else if (gsr > 6 && bt >= 33 && bt <= 34.9 && hr >= 91 && hr <= 100) {
    return "High Level Stress"; // High Level Stress - condition 6
  } else if (gsr > 6 && bt >= 33 && bt <= 34.9 && hr > 100) {
    return "High Level Stress"; // High Level Stress - condition 7
  } else if (gsr > 6 && bt >= 33 && bt < 33.9 && hr >= 91 && hr <= 100) {
    return "High Level Stress"; // High Level Stress - condition 8
  } else if (gsr > 6 && bt >= 33 && bt < 33.9 && hr > 100) {
    return "High Level Stress"; // High Level Stress - condition 9
  } else if (gsr > 6 && bt < 33 && hr >= 60 && hr <= 70) {
    return "High Level Stress"; // High Level Stress - condition 10
  } else if (gsr > 6 && bt < 33 && hr >= 71 && hr <= 90) {
    return "High Level Stress"; // High Level Stress - condition 11
  } else if (gsr > 6 && bt < 33 && hr >= 91 && hr <= 100) {
    return "High Level Stress"; // High Level Stress - condition 12
  } else if (gsr > 6 && bt < 33 && hr > 100) {
    return "High Level Stress"; // High Level Stress - condition 13
  } else {
    return "Relax";
  }
  return "Relax";
}

export default determineStressLevel;
