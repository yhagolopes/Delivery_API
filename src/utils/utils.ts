export const hasExpired = (createdAt: number, expiresIn: number): boolean => {
  const elapsedTime: number = createdAt + expiresIn;
  if (Date.now() > elapsedTime) {
    return true;
  }
  return false;
};

export const isRequesterAChatOnwer = (
  requesterId: string,
  chatOnwers: string[]
): boolean => {
  for (let i = 0; i < chatOnwers.length; i++) {
    if (requesterId === chatOnwers[i]) return true;
  }
  return false;
};

// Length 6
export const getRandomCode = (): number => {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
};
