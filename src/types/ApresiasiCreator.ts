export interface Creator {
  balance: number;
  category: string;
  cover_img: string;
  description: string;
  id: string;
  is_page_active: string;
  judul: string;
  name: string;
  profile_img: string;
  target_dana: string;
}

export interface Donation {
  id: string;
  customer_name: string;
  payment_amount: string;
  payment_tanggal: string;
  pesan_dukungan: string;
}

export interface Post {
  announcement: string;
  id: string;
  post_img: string;
  title: string;
}
