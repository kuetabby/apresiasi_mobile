export interface UserProfile {
  balance: number;
  category: string | null;
  cover_img: string | null;
  description: string | null;
  is_page_active: string | null;
  judul: string | null;
  name: string;
  profile_img: string | null;
  target_dana: string | null;
  username: string | null;
}

export interface Category {
  id: string;
  category: string;
}
