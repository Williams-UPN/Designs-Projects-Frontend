import { getHome } from "@/lib/get-home";

export default async function Home() {
  const { title, description } = await getHome();
  return (
    <main>
      <h1>{title}</h1>
      <p>{description}</p>
    </main>
  );
}
