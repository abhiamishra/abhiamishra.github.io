import GradientDescentHero from "./components/GradientDescentHero";
import MarkdownDoc from "./components/MarkdownDoc";
import PageTerrain from "./components/PageTerrain";
import ThemeSwitcher from "./components/ThemeSwitcher";

export default function Home() {
  return (
    <div className="workshop">
      <div className="workshop-theme">
        <ThemeSwitcher />
      </div>
      <GradientDescentHero />
      <MarkdownDoc />
      <PageTerrain seed="abhi.md" targetId="abhi-md" />
    </div>
  );
}
