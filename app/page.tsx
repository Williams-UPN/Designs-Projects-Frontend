import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@/components/ui/button"
 
export default function Home() {
  return (
    <main className="container mx-auto py-6">
      <Button>Click me</Button>
    </main>
  )
}