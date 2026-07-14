// Colorado Rockies logo
import rockiesLogo from "figma:asset/3ce6caf893a1cfd93859cedd6683984fc09f45fa.png";

export const teamLogos: Record<string, string> = {
  "Colorado Rockies": rockiesLogo,
  "Rockies": rockiesLogo,
  "Colorado": rockiesLogo,
};

export const getTeamLogo = (teamName: string): string | undefined => {
  // Try exact match first
  if (teamLogos[teamName]) {
    return teamLogos[teamName];
  }
  
  // Try case-insensitive match
  const lowerTeamName = teamName.toLowerCase();
  const matchedKey = Object.keys(teamLogos).find(
    key => key.toLowerCase() === lowerTeamName
  );
  
  if (matchedKey) {
    return teamLogos[matchedKey];
  }
  
  // Try partial match
  const partialMatchKey = Object.keys(teamLogos).find(
    key => lowerTeamName.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerTeamName)
  );
  
  return partialMatchKey ? teamLogos[partialMatchKey] : undefined;
};
