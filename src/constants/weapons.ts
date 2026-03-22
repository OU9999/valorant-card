const WEAPON_ICON_BASE_URL = "https://media.valorant-api.com/weapons";

const getWeaponIconUrl = (weaponId: string): string =>
  `${WEAPON_ICON_BASE_URL}/${weaponId.toLowerCase()}/killstreamicon.png`;

export { getWeaponIconUrl };
