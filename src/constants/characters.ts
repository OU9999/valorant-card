const MEDIA_BASE = "https://media.valorant-api.com/agents";

const createCharacter = (name: string, id: string) => {
  const lowerId = id.toLowerCase();
  return {
    name,
    id,
    icon: `${MEDIA_BASE}/${lowerId}/displayicon.png`,
    fullPortrait: `${MEDIA_BASE}/${lowerId}/fullportrait.png`,
  } as const;
};

/**
 * Valorant 캐릭터 목록
 * @see /api/valorant/content?locale=ko-KR
 */
const CHARACTERS = [
  createCharacter("게코", "E370FA57-4757-3604-3648-499E1F642D3F"),
  createCharacter("페이드", "DADE69B4-4F5A-8528-247B-219E5A1FACD6"),
  createCharacter("브리치", "5F8D3A7F-467B-97F3-062C-13ACF203C006"),
  createCharacter("데드록", "CC8B64C8-4B25-4FF9-6E7F-37B4DA43D235"),
  createCharacter("테호", "B444168C-4E35-8076-DB47-EF9BF368F384"),
  createCharacter("레이즈", "F94C3B30-42BE-E959-889C-5AA313DBA261"),
  createCharacter("체임버", "22697A3D-45BF-8DD7-4FEC-84A9E28C69D7"),
  createCharacter("케이/오", "601DBBE7-43CE-BE57-2A40-4ABD24953621"),
  createCharacter("스카이", "6F2A04CA-43E0-BE17-7F36-B3908627744D"),
  createCharacter("사이퍼", "117ED9E3-49F3-6512-3CCF-0CADA7E3823B"),
  createCharacter("소바", "320B2A48-4D9B-A075-30F1-1F93A9B638FA"),
  createCharacter("킬조이", "1E58DE9C-4950-5125-93E9-A0AEE9F98746"),
  createCharacter("하버", "95B78ED7-4637-86D9-7E41-71BA8C293152"),
  createCharacter("바이스", "EFBA5359-4016-A1E5-7626-B1AE76895940"),
  createCharacter("바이퍼", "707EAB51-4836-F488-046A-CDA6BF494859"),
  createCharacter("피닉스", "EB93336A-449B-9C1B-0A54-A891F7921D69"),
  createCharacter("비토", "92EEEF5D-43B5-1D4A-8D03-B3927A09034B"),
  createCharacter("아스트라", "41FB69C1-4189-7B37-F117-BCAF1E96F1BF"),
  createCharacter("브림스톤", "9F0D8BA9-4140-B941-57D3-A7AD57C6B417"),
  createCharacter("아이소", "0E38B510-41A8-5780-5E8F-568B2A4F2D6C"),
  createCharacter("클로브", "1DBF2EDD-4729-0984-3115-DAA5EED44993"),
  createCharacter("네온", "BB2A4828-46EB-8CD1-E765-15848195D751"),
  createCharacter("요루", "7F94D92C-4234-0A36-9646-3A87EB8B5C89"),
  createCharacter("웨이레이", "DF1CB487-4902-002E-5C17-D28E83E78588"),
  createCharacter("세이지", "569FDD95-4D10-43AB-CA70-79BECC718B46"),
  createCharacter("레이나", "A3BFB853-43B2-7238-A4F1-AD90E9E46BCC"),
  createCharacter("오멘", "8E253930-4C05-31DD-1B6C-968525494517"),
  createCharacter("제트", "ADD6443A-41BD-E414-F6AD-E58D267F4E95"),
] as const;

type Character = (typeof CHARACTERS)[number];

export { CHARACTERS };
export type { Character };
