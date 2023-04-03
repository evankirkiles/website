/*
 * index.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's website 
 */
import s from "@/styles/components/NavBar.module.scss";

export default function NavBar() {
  return <nav className={s.container}>
    <span>March 10, 2023</span>
    <button className={s.button}>Menu</button>
  </nav>
}