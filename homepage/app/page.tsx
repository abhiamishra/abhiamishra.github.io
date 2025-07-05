import ProductCard from "./components/ProductCard";
import Sidebar from "./components/Sidebar";
import Layout from "./components/Layout";
import Switch from "./components/Switch";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Carousel from "./components/Carousel";
import Link from "next/link";
import GitHubStats from "./components/GithubStats";
import SpotifyEmbed from "./components/SpotifyEmbed";

const imageData = [
  { imageLink: 'https://picsum.photos/seed/random101/500/500' },
  { imageLink: 'https://picsum.photos/seed/random102/500/500' },
  { imageLink: 'https://picsum.photos/seed/random103/500/500' },
]
export default function Home() {
  return (
      <Layout>
      <h1 className="text-5xl font-bold"> abhi's workshop </h1>
      <p className="mt-4">
        welcome to the place where i reside, virtually.
      </p>
      <br></br>
      <p className="mt-4">
        this is my homepage, my workshop - a place where my ideas sit, my projects live, and where i like to explore my creativity.
      </p>
      <br></br>
      <p className="mt-4">
        currently, i am working as a software developer for an airlines company working on artificial intelligence.
      </p>
      <br></br>
      <p>
        along with that, i'm doing my masters of cs at <Link href="https://omscs.gatech.edu/" className="text-yellow-600 underline">georgia tech</Link> with a specialization of ml.
      </p>
      <br></br>
  

      <main className="mt-4">
        <h1 className="text-2xl font-bold mb-6">Currently tinkering with 🔨💻</h1>
        <p>
          i'm currently taking <Link href="https://omscs.gatech.edu/cs-6250-computer-networks" className="text-yellow-600 underline">cs 6250: computer networks</Link> in my summer semester.
        </p>
        <br></br>
        <p>
          on my own time, i've been really interested in researching how watermarking can apply to ai-generated content.
        </p>
      </main>
      <br></br>
      <main className="mt-4">
        <h1 className="text-2xl font-bold">current fav track:</h1>
          <SpotifyEmbed/>
      </main>
      
      {/* <main className="mt-4">
          <h1 className="text-2xl font-bold">carousel:</h1>
          <Carousel data={imageData} ></Carousel>
        </main> */}
    </Layout>
  );
}
