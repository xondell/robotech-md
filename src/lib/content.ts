import { createClient } from "@supabase/supabase-js";
import { awards as localAwards } from "@/data/awards";
import { team as localTeam } from "@/data/team";
import type { Award, TeamMember } from "@/data/types";

type TeamRow = {
  id: string;
  name: string;
  role: TeamMember["role"];
  programs: TeamMember["programs"];
  photo_path: string;
  alumni: boolean;
  mentor: boolean;
  bio: TeamMember["bio"] | null;
};

type AwardRow = {
  id: string;
  year_label: string;
  season: string | null;
  program: Award["program"];
  competition: Award["competition"];
  award: Award["award"];
  stage: Award["stage"] | null;
  official_url: string | null;
  photo_path: string | null;
};

export async function getPublicContent(): Promise<{ team: TeamMember[]; awards: Award[] }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return { team: localTeam, awards: localAwards };

  try {
    const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const [teamResult, awardsResult] = await Promise.all([
      supabase.from("team_members").select("id,name,role,programs,photo_path,alumni,mentor,bio").eq("published", true).order("sort_order"),
      supabase.from("awards").select("id,year_label,season,program,competition,award,stage,official_url,photo_path").eq("published", true).order("sort_order"),
    ]);
    if (teamResult.error || awardsResult.error || !teamResult.data?.length || !awardsResult.data?.length) {
      return { team: localTeam, awards: localAwards };
    }
    const members = (teamResult.data as TeamRow[]).map((row) => ({
      id: row.id,
      name: row.name,
      role: row.role,
      programs: row.programs,
      photo: row.photo_path,
      alumni: row.alumni,
      mentor: row.mentor,
      ...(row.bio ? { bio: row.bio } : {}),
    }));
    const awards = (awardsResult.data as AwardRow[]).map((row) => ({
      id: row.id,
      year: row.year_label,
      ...(row.season ? { season: row.season } : {}),
      program: row.program,
      competition: row.competition,
      award: row.award,
      ...(row.stage ? { stage: row.stage } : {}),
      ...(row.official_url ? { officialUrl: row.official_url } : {}),
      ...(row.photo_path ? { photo: row.photo_path } : {}),
    }));
    return { team: members, awards };
  } catch {
    return { team: localTeam, awards: localAwards };
  }
}
