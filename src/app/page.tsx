// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/auth/login');
  return null; // vẫn cần return component hợp lệ
}